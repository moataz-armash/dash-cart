import { Box } from "@mui/material";
function MainCard({ children }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "primary.white",
        padding: 2,
      }}>
      {children}
    </Box>
  );
}

export default MainCard;
