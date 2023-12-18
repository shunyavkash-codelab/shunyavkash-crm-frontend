import { createTheme } from "@mui/material";
export const theme = createTheme({
  // breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1400,
    },
  },
  //   colors
  palette: {
    neutral: {
      100: "#FAFAFA",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#D0347E",
      900: "#111827",
      1000: "#ffffff",
    },
    action: {
      active: "#6B7280",
      focus: "rgba(55, 65, 81, 0.12)",
      hover: "rgba(55, 65, 81, 0.04)",
      selected: "rgba(55, 65, 81, 0.08)",
      disabledBackground: "rgba(55, 65, 81, 0.12)",
      disabled: "rgba(55, 65, 81, 0.26)",
    },
    background: {
      default: "#F9FAFC",
      white: "#FFFFFF",
      main: "#D0347E",
      transparent: "transparent",
    },
    grey: {
      main: "#BFC6D0",
      light: "#e8e8e8",
      dark: "#5E738D",
    },
    divider: "#E6E8F0",
    primary: {
      main: "#1677FF",
      light: "rgb(22 119 255/ 6%)",
      dark: "#0B815A",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#FFC675",
      light: "#828DF8",
      dark: "#b50458",
      contrastText: "#FFFFFF",
    },
    text: {
      primary: "#2A4062",
      primaryLight: "rgba(42, 64, 98, 30%)",
      secondary: "#65748B",
      disabled: "rgba(55, 65, 81, 0.48)",
    },
    success: {
      main: "#4AD292",
      light: "rgba(74, 210, 146, 80%)",
      dark: "#0E8074",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#f44336",
      light: "rgba(244, 67, 54, 80%)",
      dark: "#B27B16",
      contrastText: "#FFFFFF",
    },
    warning: {
      main: "#D14343",
      light: "#DA6868",
      dark: "#922E2E",
      contrastText: "#FFFFFF",
    },
    info: {
      main: "#2196F3",
      light: "#64B6F7",
      dark: "#0B79D0",
      contrastText: "#FFFFFF",
    },
  },

  //   typography
  typography: {
    fontFamily: '"Open Sans", "sans-serif"',
    button: {
      fontWeight: 600,
      textWrap: "nowrap",
    },
    body1: {
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: 1.1,
    },
    body2: {
      fontSize: "14px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    subtitle1: {
      fontSize: "16px",
      fontWeight: 500,
      lineHeight: 1.25,
    },
    subtitle2: {
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: 1.5,
    },
    subtitle3: {
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: 1,
    },
    overline: {
      fontSize: "12px",
      fontWeight: 600,
      lineHeight: 1.5,
      textTransform: "uppercase",
      letterSpacing: "0.5px",
    },
    caption: {
      fontSize: "12px",
      fontWeight: 400,
      lineHeight: 1.5,
    },
    h1: {
      fontSize: "56px",
      fontWeight: 700,
      lineHeight: 1,
    },
    h2: {
      fontSize: "48px",
      fontWeight: 700,
      lineHeight: 1,
    },
    h3: {
      fontSize: "36px",
      fontWeight: 700,
      lineHeight: 1,
    },
    h4: {
      fontSize: "32px",
      fontWeight: 700,
      lineHeight: 1,
    },
    h5: {
      fontSize: "26px",
      fontWeight: 700,
      lineHeight: 1.1,
    },
    h6: {
      fontSize: "18px",
      fontWeight: 700,
      lineHeight: 1.1,
    },
    error: {
      main: "#D14343",
      light: "#DA6868",
      dark: "#922E2E",
    },
    success: {
      main: "#14B8A6",
      light: "#43C6B7",
      dark: "#0E8074",
    },
  },

  //   shadows
  shadows: [
    "none",
    "0px 1px 1px rgba(100, 116, 139, 0.06), 0px 1px 2px rgba(100, 116, 139, 0.1)",
    "0px 1px 2px rgba(100, 116, 139, 0.12)",
    "0px 1px 4px rgba(100, 116, 139, 0.12)",
    "0px 1px 5px rgba(100, 116, 139, 0.12)",
    "0px 1px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 6px rgba(100, 116, 139, 0.12)",
    "0px 3px 6px rgba(100, 116, 139, 0.12)",
    "0px 2px 4px rgba(31, 41, 55, 0.06), 0px 4px 6px rgba(100, 116, 139, 0.12)",
    "0px 5px 12px rgba(100, 116, 139, 0.12)",
    "0px 5px 14px rgba(100, 116, 139, 0.12)",
    "0px 5px 15px rgba(100, 116, 139, 0.12)",
    "0px 6px 15px rgba(100, 116, 139, 0.12)",
    "0px 7px 15px rgba(100, 116, 139, 0.12)",
    "0px 8px 15px rgba(100, 116, 139, 0.12)",
    "0px 9px 15px rgba(100, 116, 139, 0.12)",
    "0px 10px 15px rgba(100, 116, 139, 0.12)",
    "0px 12px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 13px 22px -8px rgba(100, 116, 139, 0.25)",
    "0px 14px 24px -8px rgba(100, 116, 139, 0.25)",
    "0px 10px 10px rgba(31, 41, 55, 0.04), 0px 20px 25px rgba(31, 41, 55, 0.1)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
    "0px 25px 50px rgba(100, 116, 139, 0.25)",
  ],
});
