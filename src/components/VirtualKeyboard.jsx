import React from "react";
import { Box, Button, Grid } from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";

const VirtualKeyboard = ({ inputValue, onInputChange, width, isOtp = false, focusedIndex = 0, setFocusedIndex }) => {
  const handleButtonClick = (value) => {
    if (isOtp) {
      // Handle input for OTP array
      onInputChange((prevOtp) => {
        const newOtp = [...prevOtp];
        if (focusedIndex >= 0 && focusedIndex < newOtp.length) {
          newOtp[focusedIndex] = value;
          setFocusedIndex((prev) => (prev < newOtp.length - 1 ? prev + 1 : prev));
        }
        return newOtp;
      });
    } else {
      // Handle input for phone number
      onInputChange((prevValue) => {
        const countryCode = "+90";
        if (prevValue.startsWith(countryCode)) {
          return prevValue + value;
        } else {
          return countryCode + prevValue + value;
        }
      });
    }
  };

  const handleBackspace = () => {
    if (isOtp) {
      // Handle backspace for OTP array
      onInputChange((prevOtp) => {
        const newOtp = [...prevOtp];
        if (focusedIndex >= 0 && newOtp[focusedIndex] !== "") {
          newOtp[focusedIndex] = "";
        } else if (focusedIndex > 0) {
          newOtp[focusedIndex - 1] = "";
          setFocusedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        }
        return newOtp;
      });
    } else {
      // Handle backspace for phone number
      onInputChange((prevValue) => {
        const countryCode = "+90";
        if (prevValue.startsWith(countryCode) && prevValue.length > countryCode.length) {
          return prevValue.slice(0, -1);
        }
        return prevValue;
      });
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
