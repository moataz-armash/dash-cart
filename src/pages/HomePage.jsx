// src/HomePage.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import cartImage from "../assets/cart-image.png";
import PrimaryButton from "../components/PrimaryButton";
import MainCard from "../components/MainCard";
import MainText from "../components/MainText";
import AgreementText from "../components/AgreementText";
const HomePage = () => {
  return (
    <MainCard backgroundColor="white">
      <Box
        sx={{
          backgroundColor: "#E1C2E4",
          borderRadius: 2,
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: 2,
          width: "70%",
          height: "60%",
          position: "relative",
          overflow: "hidden",
        }}>
        <MainText
          text="Weigh additional items in the cart"
          fontSize="h4"
          fontWeight="500"
          color="text"
        />

        <Box
          component="img"
          src={cartImage}
          correct
          image
          path
          alt="Dash Cart"
          sx={{
            width: "100%",
            height: "130%",
            objectFit: "none",
            borderRadius: 2,
          }}
        />
      </Box>
      <PrimaryButton name="Start shopping" path="/learn-page" />
      <AgreementText marginTop="16px" />
    </MainCard>
  );
};

export default HomePage;
