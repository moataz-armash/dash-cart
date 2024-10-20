import { Box, Typography } from "@mui/material";
import PrimaryButton from "../components/PrimaryButton";
import MainCard from "../components/MainCard";
import SecondaryCard from "../components/SecondaryCard";
import MainText from "../components/MainText";
import learnHowToShop from "../assets/learn-how-to-shop.webp";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { Link } from "react-router-dom";

const LearnPage = () => {
  return (
    <MainCard backgroundColor="secondary.main">
      <MainText
        fontSize="h2"
        fontWeight="700"
        text="Ready to Shop?"
        color="white"
      />
      <MainText
        fontSize="h5"
        fontWeight="300"
        text="Watch the learn how to shop video or start shopping."
        color="white"
        marginBottom="48px"
      />
      <SecondaryCard maxHeight="50%">
        <Box
          sx={{
            position: "relative",
            width: "45%",
            border: 3,
            borderColor: "primary.main",
            borderRadius: "21px",
          }}>
          <Box
            component="img"
            src={learnHowToShop}
            correct
            image
            path
            alt="learn how to shop"
            sx={{
              width: "100%",
              height: "100%",
              borderRadius: "21px",
              opacity: "0.3",
            }}></Box>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              backgroundColor: "white",
              width: "100%",
              height: "100%",
              opacity: 0.3,
              borderRadius: "21px",
            }}></Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <Typography variant="h4" sx={{ color: "white", fontWeight: "600" }}>
              Learn How <br /> to shop
              <PlayCircleIcon
                sx={{
                  fontSize: "45px",
                  marginBottom: "-10px",
                  marginLeft: "8px",
                }}></PlayCircleIcon>
            </Typography>
          </Box>
        </Box>
        <Box
          component={Link}
          to="/signin-page"
          sx={{
            position: "relative",
            width: "45%",
            height: "100%",
            backgroundColor: "secondary.subMain",
            borderRadius: "21px",
            border: 3,
            borderColor: "primary.main",
          }}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}>
            <Typography
              variant="h4"
              sx={{
                color: "white",
                fontWeight: "600",
                textWrap: "nowrap",
                textAlign: "center",
              }}>
              I'm ready to start <br /> shopping!
            </Typography>
          </Box>
        </Box>
      </SecondaryCard>
      {/* <PrimaryButton name="(Test) back to home" path="/" /> */}
    </MainCard>
  );
};

export default LearnPage;
