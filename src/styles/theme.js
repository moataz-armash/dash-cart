// src/styles/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#89CC00", // Your primary color (light green as seen in the button)
      contrastText: "#000", // Text color for primary (black in this case)
      white: "#ffffff",
    },
    secondary: {
      main: "#568000", // Your secondary color (e.g., dark grey from the text in the image)
      subMain: "#679900",
    },
    background: {
      default: "#f3e5f5", // Default background color
    },
    text: {
      primary: "#0D2C54", // Default text color (dark grey)
      secondary: "#33691e", // Link or secondary text color (green as seen in the Terms & Conditions)
    },
  },
  typography: {
    fontFamily: "'Alexandria', sans-serif", // Add both Google Font and custom font
    h1: {
      fontFamily: "'Alexandria', sans-serif", // Specific fonts for headers if needed
      fontWeight: 700,
    },
    body1: {
      fontFamily: "'Alexandria', sans-serif", // Default for body text
      fontSize: "1rem",
    },
    button: {
      fontFamily: "'Alexandria', sans-serif", // Font for buttons
      fontWeight: 500,
      textTransform: "none",
    },
  },
});

export default theme;
