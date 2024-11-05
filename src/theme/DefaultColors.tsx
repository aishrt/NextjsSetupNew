"use client";
import { createTheme } from "@mui/material/styles";
import { Plus_Jakarta_Sans } from "next/font/google";

export const plus = Plus_Jakarta_Sans({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

const baselightTheme = createTheme({
  direction: "ltr",
  palette: {
    primary: {
      main: "#0F2138", 
      light: "#E5F3FB",
      dark: "#4f93cc",
    },
    secondary: {
      main: "#787878",
      light: "#E7ECF0",
      dark: "#707A82",
    },
    success: {
      main: "#4BD08B",
      light: "#DFFFF3",
      dark: "#4BD08B",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#46CAEB",
      light: "#E1F5FA",
      dark: "#46CAEB",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#FB977D",
      light: "#FFEDE9",
      dark: "#FB977D",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#F8C076",
      light: "#FFF6EA",
      dark: "#F8C076",
      contrastText: "#FFFFFF",
    },
    grey: {
      100: "#F2F6FA",
      200: "#F0F5F9",
      300: "#DFE5EF",
      400: "#7C8FAC",
      500: "#5A6A85",
      600: "#111C2D",
    },
    text: {
      primary: "#111C2D",
      secondary: "#FFFFFF",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "#F6F9FC",
    },
    divider: "#E5EAEF",
    background: {
      default: "#FFFFFF",
      paper: "#FFFFFF",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
          boxShadow: "0 9px 17.5px rgb(0,0,0,0.05) !important",
        },
        ".rounded-bars .apexcharts-bar-series.apexcharts-plot-series .apexcharts-series path":
          {
            clipPath: "inset(0 0 5% 0 round 20px)",
          },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "18px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: "25px",
        },
        text: {
          padding: "5px 15px",
        },
      },
    },
  },
});

export { baselightTheme };
