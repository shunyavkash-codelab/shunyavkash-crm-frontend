import React from "react";
import { Box, TextField, Typography, Stack } from "@mui/material";
import { useFormik } from "formik";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import ThemeButton from "../component/ThemeButton";
import PasswordField from "../component/PasswordField";

const userRequired = [
  "mobileNumber",
  "personalEmail",
  "whatsappNumber",
  "motherName",
  "fatherName",
  "fatherNumber",
  "name",
  "phobia",
  "hobbies",
];

export default function SignIn() {
  const {
    apiCall,
    // isLoading
  } = useApi();
  const { setSnack } = useSnack();
  const { login, setUserProfile } = useAuth();
  const navigate = useNavigate();

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
          url: APIS.USER.LOGIN,
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
          let requiredKey = [];
          for (var key of userRequired) {
            if (!res.data.data[key] || res.data.data[key] === "") {
              requiredKey.push(key);
            }
          }
          if (
            requiredKey.length === 0 &&
            (res.data.data.degreeCertification ||
              res.data.data.adharCard ||
              res.data.data.addressProof ||
              res.data.data.propertyTax ||
              res.data.data.electricityBill)
          ) {
            setUserProfile(true);
          }
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
    <Stack
      component="main"
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        p: 0,
        maxWidth: "unset",
        height: "100vh",
        backgroundColor: "white",
        // backgroundImage: "url('./images/wave-img2.png')",
        backgroundImage:
          "url('https://img.freepik.com/free-photo/top-view-internet-communication-network-with-copy-space_23-2148779274.jpg?w=1920&t=st=1707805918~exp=1707806518~hmac=cbc078b47c19ef0f1581ee7a16bd8408ac4bf2859aaff328e65bc242ca0c2c08')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Box
        component="form"
        noValidate
        autoComplete="off"
        flexShrink={0}
        onSubmit={formik.handleSubmit}
        sx={{
          borderRadius: 2.5,
          p: 4.25,
          bgcolor: "white",
          maxWidth: "430px",
          flexGrow: 1,
          backdropFilter: "blur(5px)",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
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
              mb: 1.4,
            }}
          >
            Welcome Back! 👋
          </Typography>
          <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.5,
              lineHeight: 1.2,
            }}
          >
            Enter your details to access your account
          </Typography>
        </Box>

        <Box
          sx={{
            "&>*:not(:first-child)": {
              mt: 2,
            },
          }}
        >
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
              "&>label": { top: "4px", color: "primary.main" },
              "& input": { py: 1.5 },
            }}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <PasswordField
            formik={formik}
            id={"password"}
            label={"Password"}
            Inputstyle={{
              "&>div": { fontSize: "14px" },
              "&>label": { top: "4px", color: "black" },
              "& input": {
                py: 1.5,
                pr: 5,
              },
            }}
            Iconstyle={{ top: "13px" }}
            onChange={formik.handleChange}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
        </Box>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
          sx={{
            my: 3,
          }}
        >
          {/* <FormControlLabel
            label="Add Watermark"
            sx={{
              userSelect: "none",
              gap: 1,
              m: 0,
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
              },
            }}
            control={
              <Checkbox
                disableRipple
                sx={{
                  p: 0,
                  position: "relative",
                  borderRadius: "4px",
                  width: "18px",
                  height: "18px",
                  border: "2px solid",
                  borderColor: "text.primary",
                  "& svg": { opacity: 0 },
                  "&:before": {
                    content: "'✓'",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    opacity: 0,
                    transition: "all 0.2s ease-in-out",
                    color: "text.primary",
                    fontSize: "80%",
                  },
                  "&.Mui-checked:before": {
                    opacity: 1,
                  },
                }}
              />
            }
          /> */}

          <Link
            to="/forgot-password"
            style={{
              display: "inline-block",
              marginLeft: "6px",
              cursor: "pointer",
              lineHeight: 1,
              color: "#00ac8d",
              fontWeight: 500,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            Forgot password?
          </Link>
        </Stack>

        <ThemeButton
          Text="sign in"
          type="submit"
          // btnColor="text.primary"
          buttonStyle={{
            width: "100%",
          }}
        />

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
    </Stack>
  );
}
