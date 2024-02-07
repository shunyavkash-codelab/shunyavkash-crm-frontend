import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import PasswordField from "../component/PasswordField";
import ThemeButton from "../component/ThemeButton";

export default function ConfirmPassword() {
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const [query] = useSearchParams();
  const navigate = useNavigate();

  // yup data validator schhema
  const schema = Yup.object({
    password: Yup.string()
      .required("Password is required.")
      .trim()
      .min(8)
      .max(20, "Password must be at most 20 letter."),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      password: "",
      confirm_password: "",
    },
    onSubmit: async (values) => {
      try {
        if (values.password !== values.confirm_password) {
          throw new Error("Password and confirm password do not match.");
        }
        const res = await apiCall({
          url: APIS.USER.RESETPASSWORD,
          method: "post",
          data: JSON.stringify(values, null, 2),
          params: { key: query.get("key") },
        });
        if (res.status === 200) {
          setSnack(res.data.message);
          navigate("/signin");
        }
      } catch (error) {
        let errorMessage = error?.response?.data?.message || error;
        setSnack(errorMessage, "warning");
      }
    },
  });
  return (
    <>
      {Boolean(query.get("key")) && (
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
              Confirm Password
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
              <PasswordField
                formik={formik}
                id={"password"}
                label={"Password"}
                Inputstyle={{
                  "&>div": { fontSize: "14px" },
                  "&>label": { top: "4px" },
                  "& input": {
                    py: 1.5,
                    pr: 5,
                  },
                }}
                Iconstyle={{ top: "13px" }}
              />

              <PasswordField
                formik={formik}
                id={"confirm_password"}
                label={"Confirm Password"}
                Inputstyle={{
                  "&>div": { fontSize: "14px" },
                  "&>label": { top: "4px" },
                  "& input": {
                    py: 1.5,
                    pr: 5,
                  },
                }}
                Iconstyle={{ top: "13px" }}
              />

              <ThemeButton
                success
                Text="Create New password"
                type="submit"
                btnColor="text.primary"
                buttonStyle={{
                  width: "100%",
                }}
              />
            </Box>
          </Box>
        </Stack>
      )}
    </>
  );
}
