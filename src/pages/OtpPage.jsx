import React, { useState, useRef, useEffect, useContext } from "react";
import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import axios from "axios";
import { PhoneNumberContext } from "../contexts/PhoneNumberContext";
import { useNavigate } from "react-router-dom";
import VirtualKeyboard from "../components/VirtualKeyboard";

const OtpPage = () => {
  const { phoneNumber, sendOtp } = useContext(PhoneNumberContext);
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const [focusedIndex, setFocusedIndex] = useState(0);

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

  const handleVirtualKeyboardInput = (value) => {
    handleOtpChange(value, focusedIndex);
    if (
      isOtpComplete([
        ...otp.slice(0, focusedIndex),
        value,
        ...otp.slice(focusedIndex + 1),
      ])
    ) {
      handleSubmit();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] !== "") {
        handleOtpChange("", index);
      } else if (index > 0) {
        setFocusedIndex(index - 1);
      }
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join("");

    try {
      const response = await axios.post("http://localhost:5000/verify-otp", {
        phoneNumber: phoneNumber,
        otp: otpCode,
      });

      if (response.data.success) {
        console.log("OTP verified successfully");
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
          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ marginBottom: "10px", maxWidth: "50%" }}
          >
            {otp.map((data, index) => (
              <Grid item key={index}>
                <TextField
                  autoFocus={index === 0}
                  type="text"
                  inputProps={{
                    maxLength: 1,
                    style: { textAlign: "center" },
                  }}
                  value={data}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputRef={(el) => (inputRefs.current[index] = el)}
                  sx={{ width: 50, fontSize: "24px" }}
                />
              </Grid>
            ))}
          </Grid>
          <VirtualKeyboard
            onInputChange={handleVirtualKeyboardInput}
            width="30%"
            isOtp={true}
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
        Didn't receive the OTP?{" "}
        <Typography
          onClick={() => {
            sendOtp();
            window.location.reload(); // This will refresh the page
          }}
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
        onClick={handleSubmit}
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
