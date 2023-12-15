import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useSnack } from "../../hooks/store/useSnack";

export default function CustomSnack() {
  const { type, open, message, closeSnack } = useSnack((state) => state);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnack();
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
