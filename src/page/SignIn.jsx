import React, { useState } from "react";
import Link from "@mui/material/Link";
import { Box, TextField, Typography, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
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
              Sign in
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
              <Box sx={{ position: "relative" }}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="password"
                  label="Password"
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                    "& input": { pr: 5 },
                  }}
                />
                <Box
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    right: "16px",
                    opacity: "50%",
                    cursor: "pointer",
                    transform: "translateY(-50%)",
                    display: "inline-flex",
                    "& svg": { fontSize: "20px" },
                  }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </Box>
              </Box>
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
            <Link
              href="./ForgotPassword"
              underline="none"
              sx={{
                display: "inline-block",
                mb: 1.25,
                cursor: "pointer",
                lineHeight: 1,
                fontSize: "14px",
              }}
            >
              Forgot password?
            </Link>
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
