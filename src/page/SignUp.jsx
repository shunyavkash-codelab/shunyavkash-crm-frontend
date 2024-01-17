import React, { useState } from "react";
import { Box, TextField, Typography, Stack } from "@mui/material";
import ThemeButton from "../component/ThemeButton";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Stack
      component="main"
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: 0,
        maxWidth: "unset",
        height: "100vh",
        backgroundImage: "url('./images/wave-img2.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        flexShrink={0}
        sx={{
          borderRadius: 2.5,
          p: 4.25,
          bgcolor: "rgb(255 255 255 / 30%)",
          maxWidth: "430px",
          flexGrow: 1,
          backdropFilter: "blur(5px)",
          boxShadow: "0 0 28px rgba(0,0,0,0.2)",
        }}
      >
        <Box
          sx={{
            height: "36px",
            flexShrink: 0,
            mb: 6,
            textAlign: "center",
          }}
        >
          <img
            src="./images/logo.svg"
            style={{ width: "auto", height: "100%" }}
            alt="img"
          />
        </Box>

        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "22px",
              mb: 1.2,
            }}
          >
            Create Account! 🎉
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.7,
              lineHeight: 1.2,
            }}
          >
            Add your details to create your account
          </Typography>
        </Box>

        <Box>
          <Box
            sx={{
              "&>*:not(:first-child)": { mt: 2 },
            }}
          >
            <TextField
              fullWidth
              size="small"
              id="name"
              label="Full Name"
              autoComplete="off"
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
                "&>label": { top: "4px" },
                "& input": { py: 1.5 },
              }}
            />

            <TextField
              fullWidth
              required
              size="small"
              id="email"
              label="Email"
              name="email"
              autoComplete="off"
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
                "&>label": { top: "4px" },
                "& input": { py: 1.5 },
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
                  "&>div": { fontSize: "14px" },
                  "&>label": { top: "4px" },
                  "& input": {
                    py: 1.5,
                    pr: 5,
                  },
                }}
              />
              <Box
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                sx={{
                  position: "absolute",
                  top: "13px",
                  right: "16px",
                  opacity: "50%",
                  cursor: "pointer",
                  display: "inline-flex",
                  "& svg": { fontSize: "20px" },
                }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </Box>
            </Box>
          </Box>

          <ThemeButton
            Text="sign up"
            type="submit"
            btnColor="text.primary"
            buttonStyle={{ width: "100%", my: 3 }}
          />
        </Box>

        <Typography sx={{ fontSize: "14px" }}>
          Already have an account?
          <Link
            to="/signin"
            style={{
              display: "inline-block",
              marginLeft: "6px",
              cursor: "pointer",
              lineHeight: 1,
              color: "#1677FF",
              fontWeight: 500,
            }}
          >
            Log in
          </Link>
        </Typography>
      </Box>
    </Stack>
  );
}
