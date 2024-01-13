import React from "react";
import { Button, Grid } from "@mui/material";
import ThemeInput from "./ThemeInput";

// Icons
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import ThemeSelect from "./ThemeSelect";
import { useFormik } from "formik";
import { APIS } from "../../api/apiList";
import useApi from "../../hooks/useApi.js";
import { useSnack } from "../../hooks/store/useSnack.js";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as Yup from "yup";
import ThemeButton from "../ThemeButton.jsx";

// yup data validator schhema
const schema = Yup.object({
  employeeId: Yup.string()
    .required("EmployeeId is required.")
    .matches(
      /^[0-9]+$/,
      "Employee ID should consist only of numerical digits."
    ),
  email: Yup.string()
    .email("Field should contain a valid e-mail")
    .max(255)
    .required("Email is required.")
    .trim(),

  jobRole: Yup.string()
    .required("JobRole is required")
    .matches(
      /^[a-zA-Z ]+$/,
      "JobRole should only contain alphabetical characters"
    ),
  role: Yup.string().required("Role is required."),
});

export default function EmployeeDetailsForm({
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
      dateOfJoining: dayjs(data.dateOfJoining),
      employeeId: data.employeeId,
      email: data.email,
      jobRole: data.jobRole,
      role: data.role,
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
  console.log(formik.errors);
  return (
    <Grid
      component={"form"}
      container
      rowSpacing={2.5}
      columnSpacing={2.5}
      onSubmit={formik.handleSubmit}
    >
      <Grid item xs={12} md={5} lg={6}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <MobileDatePicker
            label="Start Date"
            format="DD/MM/YYYY"
            value={dayjs(formik.values.dateOfJoining)}
            // value={dayjs(date, { format: "DD/MM/YYYY" }).toDate()}
            sx={{
              minWidth: "100% !important",
              fontSize: "14px !important",
              "&>div": { fontSize: "14px" },
              "&>label": { fontSize: "14px" },
            }}
            name="dateOfJoining"
            type="date"
            onChange={(e) => {
              formik.setFieldValue("dateOfJoining", e);
            }}
            formik={formik}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} lg={6}>
        <ThemeInput
          placeholder="Employee Id"
          Icon={Grid3x3Icon}
          name={"employeeId"}
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ThemeInput
          placeholder={"Email"}
          Icon={EmailOutlinedIcon}
          name="email"
          type="email"
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ThemeInput
          placeholder={"Job role"}
          Icon={AccountBoxOutlinedIcon}
          name="jobRole"
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ThemeSelect
          id={"role"}
          options={[
            { name: "Admin", value: 0 },
            { name: "Manager", value: 1 },
            { name: "Employee", value: 2 },
          ]}
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid item xs={12}>
        <ThemeButton success Text="save" type="submit" />
      </Grid>
    </Grid>
  );
}
