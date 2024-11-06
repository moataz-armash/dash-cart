import React, { useContext } from "react";
import { Box, Button, Typography, TextField, Grid } from "@mui/material";
import { PhoneNumberContext } from "../contexts/PhoneNumberContext";
import { OtpContext } from "../contexts/otpContext";
import VirtualKeyboard from "../components/VirtualKeyboard";

const OtpPage = () => {
  const { phoneNumber, sendOtp } = useContext(PhoneNumberContext);
  const {
    otp,
    focusedIndex,
    setOtp,
    setFocusedIndex,
    inputRefs,
    handleOtpChange,
    handleBackspace,
    handleSubmit,
    isOtpComplete,
  } = useContext(OtpContext);

  const handleVirtualKeyboardInput = (value) => {
    handleOtpChange(value, focusedIndex);
    if (
      isOtpComplete([
        ...otp.slice(0, focusedIndex),
        value,
        ...otp.slice(focusedIndex + 1),
      ])
    ) {
      handleSubmit(phoneNumber);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" sx={{ width: "100%", padding: "32px", backgroundColor: "white", height: "100vh" }}>
      <Typography variant="h5" gutterBottom>
        Enter OTP
      </Typography>
      <form onSubmit={(e) => e.preventDefault()}>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <Typography variant="body2" gutterBottom sx={{ textAlign: "center", maxWidth: "50%", marginBottom: "10px", color: "primary.grey" }}>
            Please enter the 6-digit OTP sent to your phone.
          </Typography>
          <Grid container spacing={2} justifyContent="center" sx={{ marginBottom: "10px", maxWidth: "50%" }}>
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
                  onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
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
      <Typography variant="body2" gutterBottom sx={{ textAlign: "center", maxWidth: "50%", marginBottom: "10px", color: "primary.grey" }}>
        Didn't receive the OTP?{" "}
        <Typography onClick={() => { sendOtp(); window.location.reload(); }} sx={{ color: "primary.main", display: "inline", textTransform: "uppercase" }}>
          Resend OTP
        </Typography>
      </Typography>
      <Button onClick={() => handleSubmit(phoneNumber)} variant="contained" color="primary" disabled={!isOtpComplete(otp)} sx={{ width: "100%", maxWidth: "350px", color: "white" }}>
        Sign in
      </Button>
    </Box>
  );
};

export default OtpPage;
