import React, { useEffect, useState } from "react";
import { Button, Grid } from "@mui/material";
import ThemeInput from "./ThemeInput";

// Icons
import DateIcon from "@mui/icons-material/DateRangeOutlined";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import ThemeSelect from "./ThemeSelect";
import { useFormik } from "formik";
import { APIS } from "../../api/apiList";
import useApi from "../../hooks/useApi.js";
import { useSnack } from "../../hooks/store/useSnack.js";
import { useParams } from "react-router-dom";

export default function EmployeeDetailsForm({
  data,
  uniqId,
  open,
  setOpen,
  onSuccess = () => {},
}) {
  const { apiCall } = useApi();
  const { setSnack } = useSnack();

  const formik = useFormik({
    initialValues: {
      joinDate: data.dateOfJoining,
      employeeId: data.employeeId,
      email: data.email,
      designation: data.designation,
      role: data.role,
    },
    onSubmit: async (values) => {
      // let formData = new FormData();
      // values.profile_img = url?.fileList[0];
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
  console.log(formik.values);
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
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ThemeInput
          placeholder="Date Of Joining"
          Icon={DateIcon}
          name="joinDate"
          onChange={formik.handleChange}
          formik={formik}
          // defultValue={data?.dateOfJoining}
        />
        {/* <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            sx={{ fontSize: 14 }}
            startAdornment={
              <InputAdornment position="start">
                <DateIcon />
              </InputAdornment>
            }
          />
        </FormControl> */}
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
        {/* <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            sx={{ fontSize: 14 }}
            startAdornment={
              <InputAdornment position="start">
                <Grid3x3Icon />
              </InputAdornment>
            }
          />
        </FormControl> */}
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
        {/* <OutlinedInput
                          placeholder="Work Email"
                          sx={{ fontSize: 14 }}
                          startAdornment={
                            <InputAdornment position="start">
                              <EmailOutlinedIcon />
                            </InputAdornment>
                          }
                        /> */}
        {/* </FormControl> */}
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
