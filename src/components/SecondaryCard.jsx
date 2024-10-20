import { Box } from "@mui/material";
function MainCard({ children, maxHeight }) {
  return (
    <Box
      sx={{
        width: "90%",
        maxHeight: { maxHeight },
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        // backgroundColor: "#000",
      }}>
      {children}
    </Box>
  );
}

export default MainCard;
