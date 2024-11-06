import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { Box, Button, Grid } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import { OtpContext } from "../contexts/otpContext";

const VirtualKeyboard = ({ onInputChange, width, isOtp = false }) => {
  const location = useLocation();
  const {
    otp,
    focusedIndex,
    setOtp,
    setFocusedIndex,
    inputRefs,
    handleOtpChange,
    handleSubmit,
    isOtpComplete,
  } = useContext(OtpContext);

  const isOtpMode = location.pathname.includes("otp");

  const handleButtonClick = (value) => {
    if (isOtpMode) {
      // Directly update OTP value in OTP mode
      onInputChange(value);
    } else {
      if (isOtp) {
        // Handle input for OTP array in non-URL-based OTP mode
        onInputChange((prevOtp) => {
          const newOtp = [...prevOtp];
          if (focusedIndex >= 0 && focusedIndex < newOtp.length) {
            newOtp[focusedIndex] = value;
            setFocusedIndex((prev) =>
              prev < newOtp.length - 1 ? prev + 1 : prev
            );
          }
          return newOtp;
        });
      } else {
        // Handle input for phone number
        onInputChange((prevValue) => {
          const countryCode = "+90";
          return prevValue.startsWith(countryCode)
            ? prevValue + value
            : countryCode + prevValue + value;
        });
      }
    }
  };

  const handleBackspace = () => {
    if (isOtpMode) {
      console.log(isOtpMode);
      // Only proceed if focusedIndex is greater than 0
      if (focusedIndex >= 0) {
        const newOtp = [...otp];

        // Clear the current field
        newOtp[focusedIndex] = "";

        // Update the OTP array
        setOtp(newOtp);

        // Move focus back one field if not at the start
        const newFocusedIndex = focusedIndex > 0 ? focusedIndex - 1 : 0;
        setFocusedIndex(newFocusedIndex);
      }
    } else {
      if (isOtp) {
        // Handle backspace for OTP array in non-URL-based OTP mode
        onInputChange((prevOtp) => {
          const newOtp = [...prevOtp];
          if (focusedIndex >= 0 && focusedIndex < newOtp.length) {
            if (newOtp[focusedIndex] !== "") {
              newOtp[focusedIndex] = "";
            } else if (focusedIndex > 0) {
              newOtp[focusedIndex - 1] = "";
              setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
            }
          }
          return newOtp;
        });
      } else {
        // Handle backspace for phone number
        onInputChange((prevValue) => {
          const countryCode = "+90";
          if (
            prevValue.startsWith(countryCode) &&
            prevValue.length > countryCode.length
          ) {
            return prevValue.slice(0, -1);
          }
          return prevValue;
        });
      }
    }
  };

  const borderRadius = "45%";

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={2}
      width={width}
    >
      <Grid container spacing={2} justifyContent="center">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0"].map(
          (num, index) => (
            <Grid item xs={4} key={index}>
              {num === "" ? (
                <div></div>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => handleButtonClick(num)}
                  sx={{
                    fontSize: "24px",
                    color: "white",
                    borderRadius: borderRadius,
                    padding: "10px 18px",
                    boxShadow: "none",
                    "&:hover": {
                      boxShadow: "none",
                    },
                  }}
                >
                  {num}
                </Button>
              )}
            </Grid>
          )
        )}
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleBackspace}
            sx={{
              fontSize: "16px",
              color: "white",
              borderRadius: borderRadius,
              width: "100%",
              height: "100%",
              boxShadow: "none",
              "&:hover": {
                boxShadow: "none",
              },
            }}
          >
            <BackspaceIcon fontSize="medium" />
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VirtualKeyboard;
