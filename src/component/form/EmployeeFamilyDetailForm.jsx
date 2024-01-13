import { Button, FormControl, Grid } from "@mui/material";
import React from "react";
import ThemeInput from "./ThemeInput";

// Icons
import Man2OutlinedIcon from "@mui/icons-material/Man2Outlined";
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import { useFormik } from "formik";
import { APIS } from "../../api/apiList";
import useApi from "../../hooks/useApi.js";
import { useSnack } from "../../hooks/store/useSnack.js";
import * as Yup from "yup";
import ThemeButton from "../ThemeButton.jsx";

// yup data validator schhema
const schema = Yup.object({
  fatherNumber: Yup.string()
    .required("Father number is required.")
    .matches(/^\+?[0-9]{10}$/, {
      message: "Father number should consist of exactly 10 numerical digits.",
    })
    .max(12, "Father number should not exceed 12 characters.")
    .min(10, "Father number should be at least 10 characters."),
  fatherName: Yup.string()
    .matches(
      /^[a-zA-Z\s']+$/,
      "Father name should only contain letters, spaces, and apostrophes."
    )
    .max(24, "Father name should not exceed 24 characters.")
    .required("Father name is required."),
  motherName: Yup.string()
    .matches(
      /^[a-zA-Z\s']+$/,
      "Mother name should only contain letters, spaces, and apostrophes."
    )
    .max(24, "Mother name should not exceed 24 characters.")
    .required("Mother name is required."),
});

export default function EmployeeFamilyDetailForm({
  data,
  uniqId,
  setOpen,
  onSuccess = () => {},
}) {
  const { apiCall } = useApi();
  const { setSnack } = useSnack();

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      fatherName: data.fatherName,
      motherName: data.motherName,
      fatherNumber: data.fatherNumber,
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.MANAGER.EDIT(uniqId),
          method: "patch",
          data: values,
        });
        if (res.status === 200) {
          setSnack(res.data.message);
          setOpen(false);
          onSuccess();
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });
  return (
    <Grid
      container
      rowSpacing={2.5}
      columnSpacing={2.5}
      component={"form"}
      onSubmit={formik.handleSubmit}
    >
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <ThemeInput
            placeholder={"Father's Name"}
            Icon={Man2OutlinedIcon}
            name="fatherName"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <ThemeInput
            placeholder={"Mother's Name"}
            Icon={Woman2OutlinedIcon}
            name="motherName"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} lg={6}>
        <FormControl fullWidth>
          <ThemeInput
            placeholder={"Father's Number"}
            Icon={PhoneOutlinedIcon}
            name="fatherNumber"
            type="tel"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <ThemeButton success Text="Save" type="submit" />
      </Grid>
    </Grid>
  );
}
