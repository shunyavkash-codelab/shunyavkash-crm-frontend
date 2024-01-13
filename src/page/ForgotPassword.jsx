import React from "react";
import { Box, TextField, Typography, Button } from "@mui/material";
import { APIS } from "../api/apiList";
import { useFormik } from "formik";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import * as Yup from "yup";
import ThemeButton from "../component/ThemeButton";

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
          url: APIS.MANAGER.FORGETPASSWORD,
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
    <Box component="main" sx={{ height: "100vh", p: 0, maxWidth: "unset" }}>
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
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <ThemeButton
                success
                Text="get otp"
                type="submit"
                buttonStyle={{
                  width: "100%",
                }}
              />
            </Box>
          </Box>
          {/* <Box sx={{ mt: 2.5 }}>
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
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
}
