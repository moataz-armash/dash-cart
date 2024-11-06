// src/contexts/PhoneNumberContext.js
import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendOtpApi } from "../services/apiService"; // Import your API function here

// Create the context
export const PhoneNumberContext = createContext();

// Create a provider component
export const PhoneNumberProvider = ({ children }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate phone number format
  const validatePhoneNumber = () => {
    if (phoneNumber.length < 12) {
      setError("Please enter a valid phone number");
      setIsPhoneValid(false);
      return false;
    }
    setError("");
    setIsPhoneValid(true);
    return true;
  };

  // Send OTP function
  const sendOtp = async () => {
    if (!validatePhoneNumber()) {
      return;
    }
    try {
      const data = await sendOtpApi(phoneNumber); // API call to send OTP
      setPhoneNumber("");
      navigate("/otp-page");
    } catch (error) {
      console.error("Error sending OTP:", error);
      setError("Failed to send OTP. Please try again.");
    }
  };

  return (
    <PhoneNumberContext.Provider
      value={{
        phoneNumber,
        setPhoneNumber,
        isPhoneValid,
        error,
        validatePhoneNumber,
        sendOtp,
      }}
    >
      {children}
    </PhoneNumberContext.Provider>
  );
};
