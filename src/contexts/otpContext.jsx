// contexts/OtpContext.js

import React, { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const OtpContext = createContext();

export const OtpProvider = ({ children }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [focusedIndex, setFocusedIndex] = useState(0);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const isOtpComplete = (otpArray) => otpArray.every((digit) => digit !== "");

  const handleOtpChange = (value, index) => {
    if (!/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < otp.length - 1 && value !== "") {
      setFocusedIndex(index + 1);
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] !== "") {
      handleOtpChange("", index);
    } else if (index > 0) {
      setFocusedIndex(index - 1);
    }
  };

  const handleSubmit = async (phoneNumber) => {
    const otpCode = otp.join("");
    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        phoneNumber: phoneNumber,
        otp: otpCode,
      });

      if (response.data.success) {
        navigate("/signing-animation-page");
      } else {
        alert("Invalid OTP!");
        setOtp(new Array(6).fill(""));
        setFocusedIndex(0);
      }
    } catch (error) {
      navigate("/signing-animation-page");
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying the OTP. Please try again.");
    }
  };

  return (
    <OtpContext.Provider
      value={{
        otp,
        focusedIndex,
        setOtp,
        setFocusedIndex,
        inputRefs,
        handleOtpChange,
        handleBackspace,
        handleSubmit,
        isOtpComplete,
      }}
    >
      {children}
    </OtpContext.Provider>
  );
};
