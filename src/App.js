import * as React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Routes from "./Routes";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
