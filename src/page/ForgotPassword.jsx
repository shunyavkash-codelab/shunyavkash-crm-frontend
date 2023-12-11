import React, { useState } from "react";
import Link from "@mui/material/Link";
import { Box, TextField, Typography, Button } from "@mui/material";

export default function ForgotPassword() {
  return (
    <Box component="main" sx={{ height: "100vh" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            padding: { xs: 2, sm: 3 },
            flexGrow: 1,
            maxWidth: "350px",
            borderRadius: 2.5,
            bgcolor: "white",
            mx: 1.5,
          }}
        >
          <Box component="form" noValidate autoComplete="off">
            <Typography
              id="modal-modal-title"
              variant="h6"
              sx={{
                textAlign: "center",
                fontSize: { xs: "22px", sm: "26px" },
                textTransform: "capitalize",
                mb: 3.75,
                fontWeight: 700,
              }}
            >
              Forgot Password
            </Typography>
            <Box
              sx={{
                "&>*:not(:first-child)": { mt: 2 },
                "& fieldset": {
                  borderRadius: 2.5,
                  "& legend": { fontSize: "0.65em" },
                },
              }}
            >
              <TextField
                fullWidth
                size="small"
                required
                id="email"
                label="Email"
                autoComplete="off"
                sx={{
                  "&>label,& input": { fontSize: "14px" },
                }}
              />
              <Button
                disableRipple
                fullWidth
                sx={{
                  p: 1.75,
                  bgcolor: "success.main",
                  color: "white",
                  lineHeight: 1,
                  borderRadius: 2.5,
                  "&:hover": { bgcolor: "rgb(74, 210, 146, 80%)" },
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 2.5 }}>
            <Typography sx={{ fontSize: "14px" }}>
              Don't have an account?
              <Link
                underline="none"
                href="./SignUp"
                sx={{
                  display: "inline-block",
                  ml: 0.75,
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
