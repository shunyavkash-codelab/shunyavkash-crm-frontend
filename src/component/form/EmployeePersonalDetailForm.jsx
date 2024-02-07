import React from "react";
import { Button, Grid } from "@mui/material";

// Icons
import ThemeInput from "./ThemeInput";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import { useFormik } from "formik";
import { APIS } from "../../api/apiList";
import useApi from "../../hooks/useApi.js";
import { useSnack } from "../../hooks/store/useSnack.js";
import ThemeSelect from "./ThemeSelect.jsx";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import ThemeButton from "../ThemeButton.jsx";

// yup data validator schhema
const schema = Yup.object({
  name: Yup.string()
    .required("Name is required.")
    .matches(
      /^[a-zA-Z\s'-]+$/,
      "Name should only contain alphabetical characters, spaces, hyphens, and apostrophes"
    ),
  hobbies: Yup.string()
    .required("Hobbies is required.")
    .matches(
      /^[a-zA-Z\s,]+$/,
      "Hobbies should only contain alphabetical characters and commas"
    ),
  phobia: Yup.string()
    .required("Phobia is required.")
    .matches(
      /^[a-zA-Z\s,]+$/,
      "Phobia should only contain alphabetical characters and commas"
    ),
});

export default function EmployeePersonalDetailForm({
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
      name: data.name,
      gender: data.gender,
      dob: dayjs(data.dob),
      hobbies: data.hobbies,
      phobia: data.phobia,
    },
    onSubmit: async (values) => {
      // let formData = new FormData();
      // values.profile_img = url?.fileList[0];
      try {
        const res = await apiCall({
          url: APIS.USER.EDIT(uniqId),
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
      <Grid item xs={12} lg={6}>
        <ThemeInput
          placeholder={"Full Name"}
          Icon={PermIdentityOutlinedIcon}
          name="name"
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ThemeSelect
          id={"gender"}
          options={[
            { name: "Male", value: "male" },
            { name: "Female", value: "female" },
          ]}
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          style={{
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <MobileDatePicker
            label="DOB"
            format="DD/MM/YYYY"
            value={dayjs(formik.values.dob)}
            sx={{
              minWidth: "100% !important",
              fontSize: "14px !important",
              "&>div": { fontSize: "14px" },
              "&>label": { fontSize: "14px" },
            }}
            name="dob"
            type="date"
            onChange={(e) => {
              formik.setFieldValue("dob", e);
            }}
            formik={formik}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} lg={6}>
        <ThemeInput
          name="hobbies"
          placeholder="Hobbies"
          Icon={SportsSoccerOutlinedIcon}
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ThemeInput
          name="phobia"
          placeholder="Phobia"
          Icon={SickOutlinedIcon}
          onChange={formik.handleChange}
          formik={formik}
        />
      </Grid>
      <Grid item xs={12}>
        <ThemeButton success Text="Save" type="submit" />
      </Grid>
    </Grid>
  );
}
