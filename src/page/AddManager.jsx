import React, { useEffect, useRef, useState } from "react";
import { styled, Button } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Autocomplete,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth } from "../hooks/store/useAuth";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import FileUploadButton from "../component/FileUploadButton";
import * as Yup from "yup";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddManager({ open, setOpen }) {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [managerList, setManagerList] = useState([]);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);

  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    email: Yup.string()
      .email("Field should contain a valid e-mail")
      .max(255)
      .required("email is required.")
      .trim(),
    companyName: Yup.string().required("Company name is required.").trim(),
    reference: Yup.string().required("Reference name is required.").trim(),
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
      mobileCode: "+1",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.MANAGER.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 201) {
          setSnack(res.data.message);
          navigate("/managers");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  const fetchManagers = async () => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setManagerList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchManagers();
  }, []);

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

  return (
    <>
      <SideBar
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        accessToken={accessToken}
      />
      <Header
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Box
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "100vh", ml: { lg: sideBarWidth } }}
      >
        <Box
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box sx={{ mb: 3.25 }}>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              Add Manager
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              Add Manager
            </Typography>
          </Box>
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
                  label="Name"
                  autoComplete="off"
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
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
                      flexShrink: 0,
                      width: { xs: "100px", sm: "120px" },
                      "& input": { fontSize: "14px" },
                      "& button[title='Clear']": { display: "none" },
                      "& fieldset": {
                        borderRadius: "6px 0 0 6px!important",
                        borderRight: 0,
                      },
                      "&>div>div": {
                        pr: "24px!important",
                        bgcolor: "#f4f4f4",
                      },
                      "& input+div": {
                        right: "0!important",
                      },
                    }}
                    options={countryList}
                    autoHighlight
                    getOptionLabel={(option) => option.phone}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        sx={{
                          "& > img": { mr: 0.75, flexShrink: 0 },
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        {...props}
                      >
                        <img
                          loading="lazy"
                          width="20"
                          height="14"
                          src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        />
                        +{option.phone}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "new-password", // disable autocomplete and autofill
                        }}
                      />
                    )}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    id="mobileNumber"
                    type="tel"
                    autoComplete="off"
                    placeholder="Number"
                    sx={{
                      "& input,&>div": { fontSize: "14px" },
                      "& fieldset": {
                        borderRadius: "0 6px 6px 0!important",
                        borderLeft: 0,
                      },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.mobileNumber}
                  />
                </Box>

                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    "&>label": { fontSize: "14px" },
                  }}
                  error={formik.touched.gender && Boolean(formik.errors.gender)}
                  helperText={formik.touched.gender && formik.errors.gender}
                >
                  <InputLabel
                    sx={{ textTransform: "capitalize" }}
                    id="demo-simple-select-label"
                    error={
                      formik.touched.gender && Boolean(formik.errors.gender)
                    }
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
                  }}
                >
                  <InputLabel
                    sx={{ textTransform: "capitalize" }}
                    id="demo-simple-select-label"
                    error={
                      formik.touched.reference &&
                      Boolean(formik.errors.reference)
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
                        error={
                          formik.touched.reference &&
                          Boolean(formik.errors.reference)
                        }
                        helperText={
                          formik.touched.reference && formik.errors.reference
                        }
                      >
                        {managerList.map((item) => (
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={item._id}
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
                    gridColumn: { sm: "span 2" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.websiteURL}
                />

                <Box sx={{ gridColumn: { sm: "span 2", md: "span 1" } }}>
                  <Typography variant="subtitle1" sx={{ lineHeight: 1, mb: 1 }}>
                    Profile Image
                  </Typography>
                  <FileUploadButton
                    formik={formik}
                    id={"profile_img"}
                    label={"Profile Image"}
                  />
                </Box>

                <Box sx={{ gridColumn: { sm: "span 2", md: "span 1" } }}>
                  <Typography variant="subtitle1" sx={{ lineHeight: 1, mb: 1 }}>
                    Company Logo
                  </Typography>
                  <FileUploadButton
                    formik={formik}
                    id={"companyLogo"}
                    label={"Company Logo"}
                  />
                </Box>

                <Box sx={{ gridColumn: { sm: "span 2" } }}>
                  <Typography variant="subtitle1" sx={{ lineHeight: 1, mb: 1 }}>
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
                  <span style={{ position: "relative" }}>Submit</span>
                </Button>
                <Button
                  disableRipple
                  sx={{
                    maxHeight: "42px",
                    position: "relative",
                    px: 2.5,
                    py: 1.5,
                    border: "1px solid",
                    borderColor: "error.main",
                    color: "error.main",
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
                      bgcolor: "error.main",
                      transform: "rotate(-45deg) translate(-50%, -50%)",
                      transformOrigin: "0% 0%",
                      transition: "all 0.4s ease-in-out",
                    },
                    "&:hover": {
                      color: "white",
                      "&:before": { height: "10rem" },
                    },
                  }}
                  onClick={() => navigate("/managers")}
                >
                  <span style={{ position: "relative" }}>Cancel</span>
                </Button>
              </Box>
            </Box>
          </FormikProvider>
        </Box>
      </Box>
    </>
  );
}
