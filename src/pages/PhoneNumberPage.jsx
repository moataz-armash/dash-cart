import React, { useState, useContext } from "react";
import MainCard from "../components/MainCard";
import SecondaryCard from "../components/SecondaryCard";
import { Typography, Box, Button } from "@mui/material";
import MainText from "../components/MainText";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { useNavigate, Link } from "react-router-dom";
import { PhoneNumberContext } from "../contexts/PhoneNumberContext";
import VirtualKeyboard from "../components/VirtualKeyboard";

function PhoneNumberPage() {
  const { phoneNumber, setPhoneNumber, error, sendOtp } =
    useContext(PhoneNumberContext);
  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [showKeyboard, setShowKeyboard] = useState(false);
  const navigate = useNavigate();

  // Update phone number and manage keyboard visibility
  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    // setShowKeyboard(true);
    if (error) setError("");
    setIsPhoneValid(true);
  };

  return (
    <MainCard backgroundColor="#EEEEEE">
      <Box
        sx={{
          justifyContent: "center",
          backgroundColor: "white",
          gap: 1,
          width: "80%",
          borderRadius: "21px",
          border: 1,
          padding: "16px",
          borderColor: "#D9D9D9",
        }}
      >
        <MainText
          fontSize="h5"
          color="#000"
          text="Login using phone number"
          fontWeight="500"
          marginBottom="10"
          marginTop="20px"
        />
        <Box
          sx={{
            display: "flex",

            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            // padding: "12px",
          }}
        >
          <PhoneInput
            country={"tr"}
            value={phoneNumber}
            onFocus={(e) => {
              setShowKeyboard(true);
              // Place the cursor at the end of the input value
              setTimeout(() => {
                if (e.target && e.target.setSelectionRange) {
                  e.target.setSelectionRange(
                    e.target.value.length,
                    e.target.value.length
                  );
                }
              }, 0);
            }}
            inputProps={{
              name: "Phone Number",
              required: true,
              autoFocus: true,
            }}
            containerStyle={{ marginTop: "10px", width: "70%" }}
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
              sx={{ color: "red", fontWeight: "600" }}
            >
              {error}
            </Typography>
          )}

          {showKeyboard && (
            <VirtualKeyboard
              inputValue={phoneNumber}
              onInputChange={handlePhoneNumberChange}
              width="35%"
              />
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={sendOtp}
            sx={{
              width: "100%",
              maxWidth: "55%",
              color: "white",
              fontSize: "18px",
              borderRadius: "8px",
              // marginTop: "24px",
            }}
          >
            Continue
          </Button>
          <Typography
            variant="body1"
            sx={{
              color: "#171717",
              opacity: "70%",
              fontWeight: "600",
              marginTop: "8px",
            }}
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
    </MainCard>
  );
}

export default PhoneNumberPage;
