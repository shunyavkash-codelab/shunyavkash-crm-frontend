import { Button, FormControl, Grid } from "@mui/material";
import React from "react";
import ThemeInput from "./ThemeInput";

// Icons
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useFormik } from "formik";
import { APIS } from "../../api/apiList";
import useApi from "../../hooks/useApi.js";
import { useSnack } from "../../hooks/store/useSnack.js";

export default function EmployeeContactForm({
  data,
  uniqId,
  setOpen,
  onSuccess = () => {},
}) {
  const { apiCall } = useApi();
  const { setSnack } = useSnack();

  const formik = useFormik({
    initialValues: {
      mobileNumber: data.mobileNumber,
      whatsappNumber: data.whatsappNumber,
      personalEmail: data.personalEmail,
      address: data.address,
      address2: data.address2,
      landmark: data.landmark,
      pincode: data.pincode,
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
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Phone Number"}
            Icon={PhoneOutlinedIcon}
            name="mobileNumber"
            type="tel"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"WhatsApp Number"}
            Icon={PhoneOutlinedIcon}
            name="whatsappNumber"
            type="tel"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Personal Email"}
            Icon={EmailOutlinedIcon}
            name="personalEmail"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Line 1"}
            Icon={HomeOutlinedIcon}
            name="address"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Line 2"}
            Icon={HomeOutlinedIcon}
            name="address2"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Landmark"}
            Icon={HomeOutlinedIcon}
            name="landmark"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Pincode"}
            Icon={HomeOutlinedIcon}
            name="pincode"
            onChange={formik.handleChange}
            formik={formik}
          />
        </FormControl>
      </Grid>
      {/* <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Address"}
            Icon={() => <HomeOutlinedIcon sx={{ mt: 2.25, mr: 1.25 }} />}
            name="address"
            multiline
            rows={4}
            sx={{ fontSize: 14, alignItems: "start" }}
          />
        </FormControl>
      </Grid> */}
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
