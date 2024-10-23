import React, { useState, useRef, useEffect, useContext } from 'react';
import { Box, Button, Typography, TextField, Grid2 } from '@mui/material';
import axios from 'axios';
import { PhoneNumberContext } from '../contexts/PhoneNumberContext';
import { useNavigate } from 'react-router-dom'; // To navigate between pages
import mobileVerificationIicon from "../assets/mobileVerification-icon.png";

const OtpPage = () => {
  const { phoneNumber } = useContext(PhoneNumberContext);
  const [otp, setOtp] = useState(new Array(6).fill("")); // State to store OTP digits
  const inputRefs = useRef([]); // Store references to input fields
  const navigate = useNavigate(); // React Router's navigate function

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); // Focus the first input field
    }
  }, []);

  // Check if all input fields are filled
  const isOtpComplete = (otpArray) => {
    return otpArray.every((digit) => digit !== ""); // Return true if all fields are filled
  };

  // Handle OTP input and move focus to the next field
  const handleChange = async (e, index) => {
    const value = e.target.value;

    // Only allow numeric input
    if (!/^[0-9]$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move focus to the next input field if the current one is filled
    if (index < 5 && value !== "") {
      inputRefs.current[index + 1].focus();
    }

    // Automatically submit if all fields are filled
    if (isOtpComplete(newOtp)) {
      await handleSubmit(newOtp); // Call submit once OTP is complete
    }
  };

  // Handle backspace to clear the current field or move focus to the previous field
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      // If the current field is not empty, clear it
      if (otp[index] !== "") {
        const newOtp = [...otp];
        newOtp[index] = ""; // Clear the current input
        setOtp(newOtp);
        e.preventDefault(); // Prevent default backspace behavior (e.g., navigating to previous page)
      } else if (index > 0) {
        // Move to the previous input field if the current one is empty
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Handle OTP verification submission
  const handleSubmit = async (otpArray) => {
    const otpCode = otpArray.join(""); // Combine OTP digits into one string
    try {
      // Redirect to the "Signing In" page first
      navigate('/signing-in'); // Redirect to "Signing In" page

      const response = await axios.post('http://localhost:5000/verify-otp', {
        phoneNumber: phoneNumber,
        otp: otpCode,
      });

      if (response.data.success) {
        // Handle successful OTP verification
        console.log('OTP verified successfully!');
        // Here you can redirect the user to a dashboard or home page after verification
        setTimeout(() => navigate('/signing-animation-page'), 2000); // Example: redirect to homepage after 2 seconds
      } else {
        // Handle OTP failure (redirect back to OTP page)
        alert('Invalid OTP!');
        navigate('/signing-animation-page'); // Bring the user back to OTP input if it fails
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      navigate('/signing-animation-page'); // In case of an error, redirect back to OTP page
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: '100%', height: '100vh', padding: '0 20px 20px 20px' }}
    >
      <Box 
      component="img"
      src={mobileVerificationIicon}
      sx={{width:"12%", height: "25%", marginLeft: "20px", marginBottom: "36px"}}
      ></Box>
      <Typography variant="h5" gutterBottom>
        Enter OTP
      </Typography>
  
      <form onSubmit={(e) => e.preventDefault()}>
        <Typography variant="body2" gutterBottom sx={{textAlign: "center"}}>
          Please enter the 6-digit OTP sent to your phone.
        </Typography>
        <Grid2 container spacing={2} justifyContent="center" sx={{ marginBottom: '20px' }}>
          {otp.map((data, index) => (
            <Grid2 item key={index}>
              <TextField
                autoFocus={index === 0}
                type="text"
                slotProps={{
                  input: {
                    maxLength: 1,
                    style: { textAlign: 'center' },
                  },
                }}
                value={data}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputRef={(el) => (inputRefs.current[index] = el)} // Store reference for each input
                sx={{ width: 50, fontSize: '24px' }}
              />
            </Grid2>
          ))}
        </Grid2>
      </form>
      <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isOtpComplete(otp)} // Disable until OTP is filled
          sx={{ width: '100%', maxWidth: '200px' }}
        >
          Verify OTP
        </Button>
    
    </Box>
  );
};

export default OtpPage;
