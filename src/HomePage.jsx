// src/HomePage.js
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import cartImage from "./assets/cart-image.png";
import PrimaryButton from "./components/PrimaryButton";
import MainCard from "./components/MainCard";
import MainText from "./components/MainText";
const HomePage = () => {
  return (
    <MainCard>
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
      <PrimaryButton name="Start shopping" />
      <Typography variant="body2" sx={{ color: "text", marginTop: "16px" }}>
        By using the Nane Dash Cart you are agreeing to our{" "}
        <Link
          href="#"
          underline="hover"
          sx={{
            color: "primary",
            textDecoration: "underline",
          }}>
          Terms & Conditions.
        </Link>
      </Typography>
    </MainCard>
  );
};

export default HomePage;
