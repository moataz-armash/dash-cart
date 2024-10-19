import { Typography } from "@mui/material";
function MainCard({ fontSize, fontWeight, text }) {
  return (
    <Typography
      variant={fontSize}
      align="center"
      gutterBottom
      sx={{
        fontWeight: { fontWeight },
        color: "text",
        marginTop: "8px",
      }}>
      {text}
    </Typography>
  );
}

export default MainCard;
