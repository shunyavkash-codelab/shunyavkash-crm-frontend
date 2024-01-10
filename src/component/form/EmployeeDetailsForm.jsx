import React, { useEffect, useState } from "react";
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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo/DemoContainer.js";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import * as Yup from "yup";

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

  designation: Yup.string()
    .required("Designation is required")
    .matches(
      /^[a-zA-Z]+$/,
      "Designation should only contain alphabetical characters"
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
      designation: data.designation,
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
      <Grid
        item
        xs={12}
        md={5}
        lg={6}
        sx={{
          "& > .MuiFormControl-root": { margin: 0 },
        }}
      >
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <DemoContainer components={["DatePicker"]}>
            <MobileDatePicker
              label="Start Date"
              // slotProps={{
              //   textField: {
              //     helperText: "DD/MM/YYYY",
              //   },
              // }}
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
          </DemoContainer>
        </LocalizationProvider>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ThemeInput
          placeholder="Employee Id"
          Icon={Grid3x3Icon}
          name={"employeeId"}
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        {/* <FormControl fullWidth sx={{ m: 1 }}> */}
        <ThemeInput
          placeholder={"Email"}
          Icon={EmailOutlinedIcon}
          name="email"
          type="email"
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        {/* <FormControl fullWidth sx={{ m: 1 }}> */}
        <ThemeInput
          placeholder={"Designation"}
          Icon={AccountBoxOutlinedIcon}
          name="designation"
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
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
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <Button
          disableRipple
          type="submit"
          sx={{
            maxHeight: "42px",
            position: "relative",
            px: 2.5,
            py: 1.5,
            bgcolor: "success.main",
            border: "1px solid",
            borderColor: "success.main",
            color: "white",
            lineHeight: 1,
            borderRadius: 2.5,
            overflow: "hidden",
            "&:before": {
              content: "''",
              height: 0,
              width: "10rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: "0",
              bgcolor: "white",
              transform: "rotate(-45deg) translate(-50%, -50%)",
              transformOrigin: "0% 0%",
              transition: "all 0.4s ease-in-out",
            },
            "&:hover": {
              color: "success.main",
              bgcolor: "success.main",
              "&:before": { height: "10rem" },
            },
          }}
        >
          <span style={{ position: "relative" }}>Save</span>
        </Button>
      </Grid>
    </Grid>
  );
}
