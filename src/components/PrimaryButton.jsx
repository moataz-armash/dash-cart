import { Button } from "@mui/material";

function PrimaryButton({ name }) {
  return (
    <Button
      variant="contained"
      size="large"
      sx={{
        backgroundColor: "primary",
        color: "primary.white",
        fontWeight: "bold",
        marginTop: "48px",
        borderRadius: "80px",
        width: "40%",
        height: "10%",
        fontSize: "24px",
        "&:hover": { backgroundColor: "#64dd17" },
      }}>
      {name}
    </Button>
  );
}

export default PrimaryButton;
