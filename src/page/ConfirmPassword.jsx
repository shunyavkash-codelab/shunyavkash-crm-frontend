import React, { useState } from "react";
import Link from "@mui/material/Link";
import { Box, Typography, Button } from "@mui/material";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useFormik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import VisibilityIconSet from "../component/VisibilityIconSet";

export default function ConfirmPassword() {
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
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
          throw "Password and confirm password not match.";
        }
        const res = await apiCall({
          url: APIS.MANAGER.RESETPASSWORD,
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
                  Confirm Password
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
                  <Box sx={{ position: "relative" }}>
                    <VisibilityIconSet
                      formik={formik}
                      id={"password"}
                      label={"Password"}
                    />
                  </Box>
                  <Box sx={{ position: "relative" }}>
                    <VisibilityIconSet
                      formik={formik}
                      id={"confirm_password"}
                      label={"Confirm Password"}
                    />
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
                    Submit
                  </Button>
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
      )}
    </>
  );
}
