import { Typography } from "@mui/material";
function MainText({
  fontSize,
  fontWeight,
  text,
  color,
  marginBottom,
  marginTop,
}) {
  return (
    <Typography
      variant={fontSize}
      align="center"
      gutterBottom
      sx={{
        fontWeight: { fontWeight },
        color: color,
        marginBottom: marginBottom,
        marginTop: marginTop,
      }}>
      {text}
    </Typography>
  );
}

export default MainText;
