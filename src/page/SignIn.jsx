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
import * as Yup from "yup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    apiCall,
    // isLoading
  } = useApi();
  const { setSnack } = useSnack();
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // yup data validator schhema
  const schema = Yup.object({
    email: Yup.string()
      .email("Enter an valid email address")
      .max(255)
      .required("Email is required.")
      .trim(),
    password: Yup.string().required("Password is required.").trim(),
  });

  const formik = useFormik({
    validationSchema: schema,
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
          if (role === 0) navigate("/");
          else navigate("/employee-dashboard");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "error");
      }
    },
  });
  return (
    <Box
      component="main"
      sx={{
        p: 0,
        maxWidth: "unset",
        height: "100vh",
        backgroundImage: "url('./images/wave-img2.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
          flexDirection: "column",
          width: "100%",
          borderRadius: "10px",
        }}
      >
        <Box
          sx={{
            padding: { xs: 3, sm: 5 },
            borderRadius: "10px",
            bgcolor: "white",
            boxShadow: "0 0 20px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            sx={{
              minWidth: { xs: "100%", sm: "260px", xl: "300px", xxl: "350px" },
              minHeight: { xs: "100%", sm: "100%" },
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                maxWidth: "200px",
                maxheight: "80px",
                flexShrink: 0,
                pb: 6.625,
                // margin: "0 auto",
              }}
            >
              <img
                src="./images/logo.svg"
                alt="img"
                style={{ maxWidth: "100%", maxheight: "100%" }}
              />
            </Box>
            <Box>
              <Typography
                id="modal-modal-title"
                variant="h6"
                sx={{
                  textAlign: "start",
                  fontSize: { xs: "22px", sm: "26px" },
                  textTransform: "capitalize",
                  mb: 1.2,
                  fontWeight: 700,
                }}
              >
                {/* 👋 */}
                Welcome Back!
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  mb: 6.75,
                  color: "grey.dark",
                  display: "block",
                }}
              >
                Enter your details to access your account
              </Typography>
            </Box>
            <Box
              sx={{
                "&>*:not(:first-of-type)": { mt: 2 },
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
                  "&>label,& input,&>div": {
                    fontSize: "14px",
                  },
                  "& input": {
                    py: 1.38,
                    px: 1.75,
                  },
                }}
                onChange={formik.handleChange}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
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
                    "& input": {
                      pr: 5,
                      py: 1.38,
                      px: 1.75,
                    },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
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

              <Box
                sx={{
                  mt: 2.5,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <FormControl
                    component="fieldset"
                    sx={{
                      "&>label,&>span": {
                        p: 0,
                        pl: 1,
                      },
                    }}
                  >
                    <FormControlLabel
                      value="start"
                      control={<Checkbox />}
                      label="Remember Me"
                      // color="success.main"
                      sx={{
                        "&>span:not(:first-of-type)": {
                          fontSize: "14px",
                          fontWeight: 500,
                          lineHeight: 1,
                          pl: 0.75,
                          color: "text.secondary",
                        },

                        "& svg": {
                          fontSize: "20px",
                          color: "text.primary",
                          // color: "success.main",
                        },
                        pr: 0,
                        py: 0,
                        mr: 0,
                        p: 0,
                        // display: "block",
                        "&>label,&>span": {
                          p: "0 6px 0 0",
                        },
                      }}
                    />
                  </FormControl>
                </Box>
                <Link
                  href="./forgot-password"
                  underline="none"
                  sx={{
                    display: "inline-block",
                    cursor: "pointer",
                    lineHeight: 1,
                    fontSize: "14px",
                    fontWeight: "500",
                    "&:hover": {
                      color: "rgb(22, 119, 255, 80%)",
                    },
                  }}
                >
                  Forgot password?
                </Link>
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
                  "&:hover": {
                    // bgcolor: "primary.main",
                    bgcolor: "rgb(74, 210, 146, 80%)",
                  },
                }}
                type="submit"
              >
                sign in
              </Button>
            </Box>
            {/* <Typography sx={{ fontSize: "14px", mt: 2 }}>
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
                Create an account
              </Link>
            </Typography> */}
          </Box>
        </Box>
        {/* <Box
          sx={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,1) 15%, rgba(22,119,255,1) 100%)",
            // background:
            //   "linear-gradient(180deg, rgba(255,255,255,1) 15%, rgba(42,64,98,1) 100%)",
            width: { xs: "100%" },
            minHeight: { xs: "100%", sm: "500px", md: "600px" },
            // height: "100%",
            display: "flex",
            alignItems: "center",
            p: { xs: "3", sm: "2" },
            borderRadius: { xs: "0", sm: "0 10px 10px 0" },
          }}
        >
          <Box
            style={{
              maxWidth: "600px",
              height: "100%",
              flexGrow: 1,
            }}
          >
            <img
              src="./images/login-preview.png"
              style={{ height: "auto", width: "100%" }}
              alt="signin"
            />
          </Box>
        </Box> */}
      </Box>
    </Box>
  );
}
