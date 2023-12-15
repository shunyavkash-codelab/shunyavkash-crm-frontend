import React, { useState } from "react";
import Link from "@mui/material/Link";
import { Box, TextField, Typography, Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.MANAGER.LOGIN,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          let {
            name,
            email,
            role,
            mobileCode,
            mobileNumber,
            profile_img,
            token,
            _id,
          } = res.data.data;
          login({
            user: { name, email, role, mobileCode, mobileNumber, profile_img },
            accessToken: token,
            userId: _id,
          });
          setSnack(res.data.message);
          navigate("/");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });
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
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
          >
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
                  borderRadius: 1.5,
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
                name="email"
                autoComplete="off"
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
                }}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              <Box sx={{ position: "relative" }}>
                <TextField
                  required
                  fullWidth
                  size="small"
                  id="password"
                  label="Password"
                  name="password"
                  autoComplete="off"
                  type={showPassword ? "text" : "password"}
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
                    "& input": { pr: 5 },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.password}
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
                type="submit"
              >
                sign in
              </Button>
            </Box>
          </Box>
          <Box sx={{ mt: 2.5 }}>
            <Link
              href="./forgot-password"
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
