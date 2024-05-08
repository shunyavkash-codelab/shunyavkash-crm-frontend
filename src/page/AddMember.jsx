import React, { useEffect, useState } from "react";
import { FormHelperText, Stack } from "@mui/material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Autocomplete,
  // InputAdornment,
} from "@mui/material";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import FileUploadButton from "../component/FileUploadButton";
import * as Yup from "yup";
import PasswordField from "../component/PasswordField";
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";

export default function AddMember() {
  const [userList, setUserList] = useState([]);
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  // const [countryList, setCountryList] = useState([]);
  // const [country, setCountry] = useState(null);

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    email: Yup.string()
      .email("Field should contain a valid e-mail")
      .max(255)
      .required("Email is required.")
      .trim(),
    mobileNumber: Yup.string().matches(
      /^[0-9]+$/,
      "Mobile number must only contain numeric digits"
    ),
    password: Yup.string()
      .required("Password is required.")
      .trim()
      .min(8)
      .max(20, "Password must be at most 20 letter."),
    confirm_password: Yup.string()
      .required("Confirm password is required.")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    role: Yup.string().required("Role is required."),
    // companyName: Yup.string().required("Company name is required.").trim(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      gender: "",
      // companyName: "",
      // websiteURL: "",
      reference: "",
      profile_img: undefined,
      // companyLogo: undefined,
      // signature: undefined,
      mobileCode: "+91",
      password: "",
      confirm_password: "",
      role: "",
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
          navigate("/members");
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
  // const fetchCountry = async () => {
  //   try {
  //     const res = await apiCall({
  //       url: APIS.COUNTRY.GET,
  //       method: "get",
  //     });
  //     if (res.data.success === true) {
  //       setCountryList(res.data.data);
  //     }
  //   } catch (error) {
  //     console.log(error, setSnack);
  //   }
  // };

  useEffect(() => {
    fetchUsers();
    // fetchCountry();
  }, []);

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Add Member"
          BreadCrumbPreviousLink="/members"
          BreadCrumbPreviousTitle="Members"
          BreadCrumbCurrentTitle="Add Member"
          stackSx={{ mb: 0 }}
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

              {/* <Box
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
                        p: "0px 24px 0px 6px!important",
                        bgcolor: "#f4f4f4",
                      },
                      "& input+div": {
                        right: "0!important",
                      },
                    }}
                    value={formik.values.mobileCode}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("mobileCode", newValue.phone); // Update Formik field value
                      // setCountry(newValue);
                    }}
                    name="mobileCode"
                    // options={countryList}
                    autoHighlight
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => {
                      return (
                        <TextField
                          placeholder="+91"
                          sx={{
                            "& input,&>div": { fontSize: "14px" },
                            "&>label": { top: "4px" },
                            "& input": { textTransform: "capitalize", py: 1.5 },
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
                    placeholder="Mobile Number"
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
                </Box> */}

              <Stack
                direction="row"
                sx={{
                  "&:hover fieldset": {
                    borderColor: "text.primary",
                  },
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  id="mobileCode"
                  autoComplete="off"
                  defaultValue="+91"
                  sx={{
                    maxWidth: "75px",
                    mr: "-1px",
                    "& > div.Mui-error": {
                      "& fieldset": {
                        borderRightWidth: "1px",
                      },
                      "& input": {
                        color: "error.main",
                      },
                    },
                    "&>label,& input,&>div": { fontSize: "14px" },
                    "& input": {
                      py: 1.5,
                      textAlign: "center",
                      bgcolor: "#f4f4f4",
                      borderRadius: "6px 0 0 6px!important",
                    },
                    "& fieldset": {
                      borderRight: 0,
                      borderRadius: "6px 0 0 6px!important",
                    },
                  }}
                  onChange={formik.handleChange}
                />

                <TextField
                  fullWidth
                  size="small"
                  id="mobileNumber"
                  placeholder="Mobile Number"
                  autoComplete="off"
                  inputProps={{ maxLength: 10 }}
                  sx={{
                    "& > div.Mui-error": {
                      "& fieldset": {
                        borderLeftWidth: "1px",
                      },
                      "& input::placeholder": {
                        color: "error.main",
                        opacity: 1,
                      },
                    },
                    "&>label,& input,&>div": { fontSize: "14px" },
                    "& input": { py: 1.5 },
                    "& fieldset": {
                      borderLeft: 0,
                      borderRadius: "0 6px 6px 0!important",
                    },
                  }}
                  onChange={formik.handleChange}
                />
              </Stack>

              <FormControl
                fullWidth
                size="small"
                sx={{
                  "&>label": { fontSize: "14px", top: "4px" },
                  "&>div>div": { py: 1.5 },
                }}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
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

              <FormControl
                fullWidth
                size="small"
                sx={{
                  "&>label": { fontSize: "14px", top: "4px" },
                  "&>div>div": { py: 1.5 },
                }}
                error={formik.touched.role && Boolean(formik.errors.role)}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                >
                  Member Type
                </InputLabel>
                <Field
                  name="file"
                  render={({ field, form }) => (
                    <>
                      <Select
                        id="role"
                        label="Member Type"
                        sx={{ fontSize: "14px" }}
                        {...field}
                        onChange={(event) => {
                          form.setFieldValue("role", event.target.value);
                        }}
                      >
                        <MenuItem
                          sx={{
                            textTransform: "capitalize",
                            fontSize: "14px",
                          }}
                          value={"manager"}
                        >
                          manager
                        </MenuItem>
                        <MenuItem
                          sx={{
                            textTransform: "capitalize",
                            fontSize: "14px",
                          }}
                          value={"employee"}
                        >
                          employee
                        </MenuItem>
                      </Select>
                      {formik.touched.role && Boolean(formik.errors.role) && (
                        <FormHelperText error={true}>
                          {formik.touched.role && formik.errors.role}
                        </FormHelperText>
                      )}
                    </>
                  )}
                />
              </FormControl>
              <Autocomplete
                id="free-solo-demo"
                freeSolo
                options={userList.map((option) => option.name)}
                sx={{
                  fontSize: "14px!important",
                  "& .MuiAutocomplete-clearIndicator": {
                    display: "none",
                  },
                }}
                renderOption={(props, option) => (
                  <Box
                    component="li"
                    sx={{
                      "&": { fontSize: "14px", textTransform: "capitalize" },
                    }}
                    {...props}
                  >
                    {option}
                  </Box>
                )}
                onChange={(event, newValue) => {
                  formik.setFieldValue("reference", newValue); // Update Formik field value
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    onKeyUp={(e) => {
                      let value = e.target.value;
                      formik.setFieldValue("reference", value);
                    }}
                    sx={{
                      "& input,&>div,&>label": { fontSize: "14px" },
                      "&>label": { lineHeight: 1 },
                      "&>div": { height: "44px", pl: "12px!important" },
                      "& input": {
                        textTransform: "capitalize",
                        p: "0!important",
                      },
                    }}
                    label="Reference"
                  />
                )}
              />

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
                autoComplete="off"
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

              {/* <TextField
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
                /> */}

              <Box>
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
            </Box>

            {/* <Box
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
                </Box>{" "}
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
              </Box> */}

            <Box sx={{ display: "flex", gap: 2, mt: 2.5 }}>
              <ThemeButton success Text="Create" type="submit" />
              <ThemeButton
                discard
                Text="Discard"
                onClick={() => navigate("/members")}
              />
            </Box>
          </Box>
        </FormikProvider>
      </Box>
    </>
  );
}
