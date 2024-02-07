import React from "react";
import { Box, TextField, Typography, Button, Stack } from "@mui/material";
import { APIS } from "../api/apiList";
import { useFormik } from "formik";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import * as Yup from "yup";
import ThemeButton from "../component/ThemeButton";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const { setSnack } = useSnack();
  const { apiCall } = useApi();

  // yup data validator schhema
  const schema = Yup.object({
    email: Yup.string()
      .email("Field should contain a valid e-mail")
      .max(255)
      .required("email is required.")
      .trim(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.USER.FORGETPASSWORD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          setSnack(res.data.message);
          // navigate("/");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
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
        onSubmit={formik.handleSubmit}
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
            "&>*:not(:first-of-type)": { mt: 2 },
            "& fieldset": {
              borderRadius: 1.5,
              "& legend": { fontSize: "0.65em" },
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
              "&>label": { top: "4px" },
              "& input": { py: 1.5 },
            }}
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <ThemeButton
            Text="get otp"
            type="submit"
            btnColor="text.primary"
            buttonStyle={{
              width: "100%",
              my: 3,
            }}
          />
        </Box>

        <Typography sx={{ fontSize: "14px" }}>
          You remeber your password?
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

        {/* <Typography sx={{ fontSize: "14px", mt: 1 }}>
          Don't have an account?
          <Link
            to="/SignUp"
            style={{
              display: "inline-block",
              marginLeft: "6px",
              cursor: "pointer",
              lineHeight: 1,
              color: "#1677FF",
              fontWeight: 500,
            }}
          >
            Sign up
          </Link>
        </Typography> */}
      </Box>
    </Stack>
  );
}
