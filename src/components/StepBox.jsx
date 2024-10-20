import React from "react";
import { Box, Typography } from "@mui/material";

const StepBox = ({ stepNumber, description }) => {
  return (
    <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
      <Box
        sx={{
          position: "relative",
          width: "13%",
          height: "100%",
          borderRadius: "50%",
          border: 3,
          borderColor: "white",
        }}>
        <Typography
          variant="body1"
          sx={{
            color: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}>
          {stepNumber}
        </Typography>
      </Box>
      <Typography
        variant="body3"
        sx={{
          color: "white",
          whiteSpace: "pre-line", // Ensures new lines are rendered
        }}>
        {description}
      </Typography>
    </Box>
  );
};

export default StepBox;
