import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import FileUploadButton from "../component/FileUploadButton";
import * as Yup from "yup";
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";

export default function AddUser() {
  const [userList, setUserList] = useState([]);
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState(null);

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    email: Yup.string()
      .email("Field should contain a valid e-mail")
      .max(255)
      .required("email is required.")
      .trim(),
    mobileNumber: Yup.string().matches(
      /^[0-9]+$/,
      "Mobile number must only contain numeric digits"
    ),
    companyName: Yup.string().required("Company name is required.").trim(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      gender: "",
      companyName: "",
      websiteURL: "",
      reference: "",
      profile_img: undefined,
      companyLogo: undefined,
      signature: undefined,
      mobileCode: undefined,
      password: "12345678",
      role: 1,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      let formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
      try {
        const res = await apiCall({
          url: APIS.USER.ADD,
          method: "post",
          headers: "multipart/form-data",
          data: formData,
        });
        if (res.status === 201) {
          setSnack(res.data.message);
          navigate("/users");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  const fetchUsers = async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.ALLUSER,
        method: "get",
      });
      if (res.data.success === true) {
        setUserList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  // get country list
  const fetchCountry = async () => {
    try {
      const res = await apiCall({
        url: APIS.COUNTRY.GET,
        method: "get",
      });
      if (res.data.success === true) {
        setCountryList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCountry();
  }, []);
  // });

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Add manager"
          BreadCrumbPreviousLink="/users"
          BreadCrumbPreviousTitle="Manager"
          BreadCrumbCurrentTitle="Add manager"
        />

        <FormikProvider value={formik}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}
            sx={{
              p: 2.5,
              pt: 1.75,
              backgroundColor: "white",
              borderRadius: 2.5,
            }}
          >
            <Box
              sx={{
                pt: 0.75,
                "& fieldset": {
                  borderRadius: 1.5,
                },
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
                gap: 2.5,
              }}
            >
              <TextField
                fullWidth
                size="small"
                id="name"
                label="Full Name"
                autoComplete="off"
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
                  "&>label": { top: "4px" },
                  "& input": { textTransform: "capitalize", py: 1.5 },
                }}
                onChange={formik.handleChange}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />

              <TextField
                fullWidth
                size="small"
                id="email"
                label="Email"
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

              <Box
                sx={{
                  display: "flex",
                  "&:hover fieldset": {
                    borderColor: "text.primary",
                  },
                }}
              >
                <Autocomplete
                  size="small"
                  id="country-select-demo"
                  sx={{
                    mr: "-1px",
                    flexShrink: 0,
                    width: { xs: "102px", sm: "114px" },
                    "& input": { fontSize: "14px" },
                    "& button[title='Clear']": { display: "none" },
                    "& fieldset": {
                      borderRadius: "6px 0 0 6px !important",
                      borderRight: 0,
                    },
                    "&>div>div": {
                      p: "9px 24px 10px 6px!important",
                      bgcolor: "#f4f4f4",
                    },
                    "& input+div": {
                      right: "0!important",
                    },
                  }}
                  value={formik.values.mobileCode}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("mobileCode", newValue.phone); // Update Formik field value
                    setCountry(newValue);
                  }}
                  name="mobileCode"
                  options={countryList}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{
                        "& > img": { mr: 0.5, flexShrink: 0 },
                        fontSize: { xs: "12px", sm: "14px" },
                      }}
                      {...props}
                    >
                      <img
                        loading="lazy"
                        width="18"
                        height="12"
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => {
                    return (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          startAdornment: country ? (
                            <InputAdornment
                              position="start"
                              sx={{
                                marginLeft: "10px",
                                marginRight: 0,
                              }}
                            >
                              <img
                                loading="lazy"
                                width="20"
                                src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                                alt=""
                              />
                            </InputAdornment>
                          ) : null,
                        }}
                      />
                    );
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="mobileNumber"
                  type="tel"
                  autoComplete="off"
                  placeholder="Number"
                  inputProps={{ maxLength: 10 }}
                  sx={{
                    "& input,&>div": { fontSize: "14px" },
                    "&>label": { top: "4px" },
                    "& input": { textTransform: "capitalize", py: 1.5 },
                    "& fieldset": {
                      borderRadius: "0 6px 6px 0!important",
                      borderLeft: 0,
                    },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.mobileNumber}
                  error={
                    formik.touched.mobileNumber &&
                    Boolean(formik.errors.mobileNumber)
                  }
                  helperText={
                    formik.touched.mobileNumber && formik.errors.mobileNumber
                  }
                />
              </Box>

              <FormControl
                fullWidth
                size="small"
                sx={{
                  "&>label": { fontSize: "14px" },
                  "&>label": { top: "4px" },
                  "&>div>div": { py: 1.5 },
                }}
                error={formik.touched.gender && Boolean(formik.errors.gender)}
                helperText={formik.touched.gender && formik.errors.gender}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  gender
                </InputLabel>
                <Field
                  name="file"
                  render={({ field, form }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="gender"
                      label="Gender"
                      sx={{ fontSize: "14px" }}
                      {...field}
                      onChange={(event) => {
                        form.setFieldValue("gender", event.target.value);
                      }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"Male"}
                      >
                        Male
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"Female"}
                      >
                        Female
                      </MenuItem>
                    </Select>
                  )}
                />
              </FormControl>

              <TextField
                fullWidth
                size="small"
                id="companyName"
                label="Company Name"
                autoComplete="off"
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
                  "&>label": { top: "4px" },
                  "& input": { py: 1.5 },
                }}
                onChange={formik.handleChange}
                value={formik.values.companyName}
                error={
                  formik.touched.companyName &&
                  Boolean(formik.errors.companyName)
                }
                helperText={
                  formik.touched.companyName && formik.errors.companyName
                }
              />

              <FormControl
                fullWidth
                size="small"
                sx={{
                  "&>label": { fontSize: "14px" },
                  "&>label": { top: "4px" },
                  "&>div>div": { py: 1.5 },
                }}
                error={
                  formik.touched.reference && Boolean(formik.errors.reference)
                }
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                  error={
                    formik.touched.reference && Boolean(formik.errors.reference)
                  }
                  helperText={
                    formik.touched.reference && formik.errors.reference
                  }
                >
                  Reference
                </InputLabel>
                <Field
                  name="file"
                  render={({ field, form }) => (
                    <Select
                      labelId="demo-simple-select-label"
                      id="reference"
                      label="Reference"
                      sx={{ fontSize: "14px" }}
                      {...field}
                      onChange={(event) => {
                        form.setFieldValue("reference", event.target.value);
                      }}
                      helperText={
                        formik.touched.reference && formik.errors.reference
                      }
                    >
                      {userList.map((item) => (
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          value={item.name}
                        >
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>

              <TextField
                fullWidth
                size="small"
                id="websiteURL"
                label="Website"
                autoComplete="off"
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
                  "&>label": { top: "4px" },
                  "& input": { py: 1.5 },
                  gridColumn: { sm: "span 2" },
                }}
                onChange={formik.handleChange}
                value={formik.values.websiteURL}
              />
            </Box>
            <Box
              sx={{
                mt: 2.5,
                "& fieldset": {
                  borderRadius: 1.5,
                },
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  xxl: "repeat(3, 1fr)",
                },
                gap: 2.5,
              }}
            >
              <Box sx={{ gridColumn: { md: "span 1" } }}>
                <Typography
                  variant="subtitle1"
                  sx={{ lineHeight: 1, mb: 1.25 }}
                >
                  Profile Image
                </Typography>
                <FileUploadButton
                  formik={formik}
                  id={"profile_img"}
                  label={"Profile Image"}
                  value={""}
                />
              </Box>

              <Box sx={{ gridColumn: { md: "span 1" } }}>
                <Typography
                  variant="subtitle1"
                  sx={{ lineHeight: 1, mb: 1.25 }}
                >
                  Company Logo
                </Typography>
                <FileUploadButton
                  formik={formik}
                  id={"companyLogo"}
                  label={"Company Logo"}
                />
              </Box>

              <Box sx={{ gridColumn: { md: "span 2", xxl: "span 1" } }}>
                <Typography
                  variant="subtitle1"
                  sx={{ lineHeight: 1, mb: 1.25 }}
                >
                  Signature
                </Typography>
                <FileUploadButton
                  formik={formik}
                  id={"signature"}
                  label={"Signature"}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, mt: 2.5 }}>
              <ThemeButton success Text="Create" type="submit" />
              <ThemeButton
                discard
                Text="Discard"
                onClick={() => navigate("/users")}
              />
            </Box>
          </Box>
        </FormikProvider>
      </Box>
    </>
  );
}
