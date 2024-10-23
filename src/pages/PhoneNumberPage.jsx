import React, { useState,useContext } from "react";
import MainCard from "../components/MainCard";
import SecondaryCard from "../components/SecondaryCard";
import { Typography, Box, Button, TextField } from "@mui/material";
import MainText from "../components/MainText";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useNavigate, Link } from 'react-router-dom';
import {sendOtpApi} from "../services/apiService"
import { PhoneNumberContext } from "../contexts/PhoneNumberContext";

function PhoneNumberPage() {
  const { phoneNumber, setPhoneNumber } = useContext(PhoneNumberContext);
  const [error, setError] = useState(''); 
  const [isPhoneValid, setIsPhoneValid] = useState(true); 

  const navigate = useNavigate();

  
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    if (error) setError(''); 
    setIsPhoneValid(true); 
  };

  const validatePhoneNumber = () => {
    if (phoneNumber.length < 12) {
      setError('Please enter a valid phone number');
      setIsPhoneValid(false); 
      return false;
    }
    return true;
  };

  // Send OTP via the backend
    const sendOtp = async () => {
      if (!validatePhoneNumber()) {
        return; 
      }
      try {
        const data = await sendOtpApi(phoneNumber);
        navigate('/otp-page');
      } catch (error) {
        console.error('Error sending OTP:', error);
      }
      console.log(phoneNumber);
    };

  return (
    <MainCard backgroundColor="#EEEEEE">
      <SecondaryCard
        maxHeight="90%"
        padding="48px"
        flexDirection="column"
        width="70%"
        backgroundColor="white"
      >
        <Box sx={{ marginBottom: "18px" }}>
          <MainText
            fontSize="h4"
            color="#000"
            text="Login using phone number"
            fontWeight="600"
          />
        </Box>
        <Box
          sx={{
            justifyContent: "center",
            display: "flex",
            height: "90%",
            borderRadius: "21px",
            border: 2,
            borderColor: "#D9D9D9",
            padding: "24px 36px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "80%",
              paddingTop: "36px",
            }}
          >
           
            <PhoneInput
              country={"tr"} // Default country
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              inputProps={{
                name: "Phone Number",
                required: true,
                autoFocus: true,
              }}
              containerStyle={{ marginBottom: "20px", width: "100%" }}
              inputStyle={{
                width: "100%",
                padding: "20px 60px",
                fontSize: "24px",
                fontWeight: "600",
                color: "#171717",
                opacity: "70%",
              }}
              isValid={isPhoneValid}
            />
            {!isPhoneValid && (
              <Typography
                variant="body2"
                sx={{ color: "red", fontWeight: "600", marginBottom: "10px" }}
              >
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              color="primary"
              onClick={sendOtp}
              sx={{
                width: "100%",
                maxWidth: "300px",
                color: "white",
                fontSize: "24px",
                borderRadius: "16px",
                marginTop: "24px",
              }}
            >
              Continue
            </Button>
            <Typography
              variant="body1"
              sx={{ color: "#171717", opacity: "70%", fontWeight: "600" }}
            >
              Sign up with{" "}
              <Typography
                component={Link}
                to="/signin-page"
                sx={{
                  textDecoration: "underline",
                  display: "inline",
                  color: "primary.main",
                  fontWeight: "600",
                }}
              >
                scanning
              </Typography>
            </Typography>
          </Box>
        </Box>
      </SecondaryCard>
    </MainCard>
  );
}

export default PhoneNumberPage;
