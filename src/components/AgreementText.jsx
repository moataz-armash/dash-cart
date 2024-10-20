import { Typography, Link } from "@mui/material";
function AgreementText({ marginTop }) {
  return (
    <Typography variant="body2" sx={{ color: "text", marginTop: marginTop }}>
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
  );
}

export default AgreementText;
