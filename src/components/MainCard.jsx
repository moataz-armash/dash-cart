import { Box } from "@mui/material";
function MainCard({ children, backgroundColor }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: backgroundColor,
        padding: 2,
      }}>
      {children}
    </Box>
  );
}

export default MainCard;
