import React from "react";
import { Typography } from "@mui/material";
import PrimaryButton from "../components/PrimaryButton";

const NotFoundPage = () => {
  return (
    <div>
      <Typography variant="h4">404 - Not Found</Typography>
      <Typography>Sorry, the page you're looking for doesn't exist.</Typography>
      <PrimaryButton path="/" name="To home" />
    </div>
  );
};

export default NotFoundPage;
