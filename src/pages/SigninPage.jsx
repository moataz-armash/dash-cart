import MainCard from "../components/MainCard";
import SecondaryCard from "../components/SecondaryCard";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import StepBox from "../components/StepBox";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import PersonIcon from "@mui/icons-material/Person";
import AgreementText from "../components/AgreementText";
const SigninPage = () => {
  return (
    <MainCard backgroundColor="white">
      <SecondaryCard maxHeight="70%">
        <Box
          sx={{
            width: "50%",
            backgroundColor: "secondary.cardColor",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            padding: "36px",
          }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              flex: 4,
              color: "white",
              textWrap: "nowrap",
            }}>
            Sign in to start <br /> shopping!
          </Typography>
          <StepBox
            stepNumber="1"
            description={`Open your Nane app \n and tap "In-store Code"`}
          />
          <StepBox
            stepNumber="2"
            description={`Hold your phone under the \n scanner and scan "In Store QR" code`}
          />
          <StepBox
            stepNumber="3"
            description={`Open your Nane app \n and tap "In-store Code"`}
          />
        </Box>
        <Box
          sx={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            gap: 5,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <QrCode2Icon
            sx={{
              color: "#000",
              fontSize: "150px",
            }}></QrCode2Icon>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              color: "#000",
            }}>
            OR
          </Typography>

          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "primary",
              color: "#000",
              fontWeight: "bold",
              borderRadius: "80px",
              "&:hover": { backgroundColor: "#64dd17" },
            }}>
            <PersonIcon
              sx={{
                color: "#000",
                marginRight: "10px",
              }}></PersonIcon>
            Continue using phone number
          </Button>
        </Box>
      </SecondaryCard>
      <AgreementText marginTop="48px" />
    </MainCard>
  );
};

export default SigninPage;
