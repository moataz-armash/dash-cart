import { Box } from "@mui/material";
function SecondaryCard({ children, maxHeight, padding, width,flexDirection,backgroundColor }) {
  return (
    <Box
      sx={{
        width: width,
        maxHeight: maxHeight ,
        display: "flex",
        flex: 1,
        flexDirection: flexDirection,
        justifyContent: "space-between",
        backgroundColor: backgroundColor,
        borderRadius: "21px",
        padding: padding,
      }}>
      {children}
    </Box>
  );
}

export default SecondaryCard;
