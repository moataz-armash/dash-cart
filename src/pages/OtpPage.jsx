import React, { useState, useRef, useEffect, useContext } from "react";
import { Box, Button, Typography, TextField, Grid2 } from "@mui/material";
import axios from "axios";
import { PhoneNumberContext } from "../contexts/PhoneNumberContext";
import { useNavigate } from "react-router-dom"; // To navigate between pages
import mobileVerificationIicon from "../assets/mobileVerification-icon.png";
import VirtualKeyboard from "../components/VirtualKeyboard";

const OtpPage = () => {
  const { phoneNumber } = useContext(PhoneNumberContext);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);

  useEffect(() => {
    if (inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex].focus();
    }
  }, [focusedIndex]);

  const isOtpComplete = (otpArray) => {
    return otpArray.every((digit) => digit !== "");
  };

  const handleChange = async (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (index < 5 && value !== "") {
      setFocusedIndex(index + 1);
    }

    if (isOtpComplete(newOtp)) {
      await handleSubmit(newOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        e.preventDefault();
      } else if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleSubmit = async (otpArray) => {
    console.log(otpArray);
    const otpCode = otpArray.join("");
    try {
      // Show a message or loader for signing-in indication
      navigate("/signing-in");

      const response = await axios.post("http://localhost:5000/verify-otp", {
        phoneNumber: phoneNumber,
        otp: otpCode,
      });

      if (response.data.success) {
        console.log("OTP verified successfully");
        // Redirect to the next page if verification is successful
        navigate("/signing-animation-page");
      } else {
        alert("Invalid OTP!");
        // Redirect back to the OTP page for retry if verification fails
        navigate("/otp-page");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("An error occurred while verifying the OTP. Please try again.");
      // Redirect back to the OTP page for retry
      navigate("/otp-page");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        padding: "32px",
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Enter OTP
      </Typography>

      <form onSubmit={(e) => e.preventDefault()}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            gutterBottom
            sx={{
              textAlign: "center",
              maxWidth: "50%",
              marginBottom: "10px",
              color: "primary.grey",
            }}
          >
            Please enter the 6-digit OTP sent to your phone.
          </Typography>
          <Grid2
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginBottom: "10px", maxWidth: "50%" }}
          >
            {otp.map((data, index) => (
              <Grid2 item key={index}>
                <TextField
                  autoFocus={index === 0}
                  type="text"
                  slotProps={{
                    input: {
                      maxLength: 1,
                      style: { textAlign: "center" },
                    },
                  }}
                  value={data}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  sx={{ width: 50, fontSize: "24px" }}
                />
              </Grid2>
            ))}
          </Grid2>
          <VirtualKeyboard
            inputValue={otp[focusedIndex] || ""}
            onInputChange={setOtp}
            width="30%"
            isOtp={true}
            focusedIndex={focusedIndex}
            setFocusedIndex={setFocusedIndex}
          />
        </Box>
      </form>
      <Typography
        variant="body2"
        gutterBottom
        sx={{
          textAlign: "center",
          maxWidth: "50%",
          marginBottom: "10px",
          color: "primary.grey",
        }}
      >
        Don't recieve the OTP ?{" "}
        <Typography
          sx={{
            color: "primary.main",
            display: "inline",
            textTransform: "uppercase",
          }}
        >
          Resend OTP
        </Typography>
      </Typography>
      <Button
        onSubmit={handleSubmit}
        variant="contained"
        color="primary"
        disabled={!isOtpComplete(otp)}
        sx={{ width: "100%", maxWidth: "350px", color: "white" }}
      >
        Sign in
      </Button>
    </Box>
  );
};

export default OtpPage;
