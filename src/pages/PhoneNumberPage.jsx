import React, { useState } from "react";
import MainCard from "../components/MainCard";
import SecondaryCard from "../components/SecondaryCard";
import { Typography, Box, Button } from "@mui/material";
import MainText from "../components/MainText";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";
import { Link } from "react-router-dom";

function PhoneNumberPage() {
  const [phone, setPhone] = useState("");

  const handleLogin = (e) => {
    setPhone(e.value.target);
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
              country={"us"} // Default country
              value={phone}
              onChange={setPhone}
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
            />
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              onClick={handleLogin}
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
              </Typography>{" "}
            </Typography>
          </Box>
        </Box>
      </SecondaryCard>
    </MainCard>
  );
}

export default PhoneNumberPage;
