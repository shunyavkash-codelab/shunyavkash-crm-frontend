import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import {
  Box,
  TextField,
  Typography,
  Button,
  Autocomplete,
  InputAdornment,
  Stack,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import FileUploadButton from "../component/FileUploadButton";
import { FormikProvider, useFormik } from "formik";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import * as Yup from "yup";
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";

export default function AddClient() {
  const { id } = useParams();
  const location = useLocation();

  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const [clientList, setClientList] = useState(false);
  const [bankList, setBankList] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState(null);

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string()
      .required("Name is required.")
      .trim()
      .matches(
        /^[a-zA-Z\s]*$/,
        "Only alphabets and spaces are allowed in the name."
      ),
    email: Yup.string()
      .email("Field should contain a valid e-mail")
      .max(255)
      .required("Email is required.")
      .trim(),
    mobileNumber: Yup.string()
      .required("Mobile number is required.")
      .matches(/^\+?[0-9]{10}$/, {
        message: "Mobile number should consist of exactly 10 numerical digits.",
      })
      .max(12, "Mobile number should not exceed 12 characters.")
      .min(10, "Mobile number should be at least 10 characters."),
    // mobileCode: Yup.string()
    //   .required("Mobile Code is required.")
    //   .matches(/^\+?[0-9]{1,4}$/, {
    //     message: "Mobile code should consist of 2 to 4 numerical digits.",
    //   }),
    websiteURL: Yup.string().url("Invalid URL"),
    accountNumber: Yup.number(),
    IFSC: Yup.string().length(11),
    // .matches(
    //   /^[a-zA-Z]{4}[0][a-zA-Z0-9]{6}$/,
    //   "First 4 characters must be alphabets, 5th is '0' and last 6 characters any alphabets or numbers."
    // ),
    bankName: Yup.string(),
    holderName: Yup.string(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: clientList?.name,
      email: clientList?.email,
      mobileNumber: clientList?.mobileNumber,
      gender: clientList?.gender,
      companyName: clientList?.companyName,
      websiteURL: clientList?.websiteURL,
      address: clientList.address,
      profile_img: clientList?.profile_img,
      companyLogo: clientList?.companyLogo,
      mobileCode: clientList?.mobileCode || "+91",
      bankName: clientList?.bankName,
      IFSC: clientList?.IFSC,
      holderName: clientList?.holderName,
      accountNumber: clientList?.accountNumber,
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
          url: id ? APIS.CLIENT.EDIT(id) : APIS.CLIENT.ADD,
          method: id ? "patch" : "post",
          headers: "multipart/form-data",
          data: formData,
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          !id && navigate("/clients");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  // add bank detiles
  // const bankformik = useFormik({
  //   validationSchema: bankSchema,
  //   initialValues: {
  //     bankName: "",
  //     IFSC: "",
  //     holderName: "",
  //     accountNumber: "",
  //   },
  //   enableReinitialize: true,
  //   onSubmit: async (values) => {
  //     values.defaultBank = false;
  //     try {
  //       const res = await apiCall({
  //         url: APIS.BANK.ADD,
  //         method: "post",
  //         data: JSON.stringify(values, null, 2),
  //       });
  //       if (res.data.success === true) {
  //         setSnack(res.data.message);
  //         navigate("/clients");
  //       }
  //     } catch (error) {
  //       let errorMessage = error.response.data.message;
  //       setSnack(errorMessage, "warning");
  //     }
  //   },
  // });

  // get client list
  const fetchClient = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
        setClientList(res.data.data);
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
    if (id !== undefined) fetchClient(id);
    fetchCountry();
  }, []);
  // });

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
      <Box sx={{ ml: { lg: sideBarWidth } }}>
        <Box component="main">
          <SectionHeader
            Title="Add Client"
            BreadCrumbPreviousLink="/Clients"
            BreadCrumbPreviousTitle="Clients"
            BreadCrumbCurrentTitle="Add Client"
          />
          {(clientList || id === undefined) && (
            <FormikProvider value={formik}>
              <Box
                component="form"
                noValidate
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
                }}
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
                    flexGrow: { md: 0 },
                    overflowY: { md: "auto" },
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
                    defaultValue={clientList?.name}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "&>label": { top: "4px" },
                      "& input": { py: 1.5 },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    InputProps={
                      location.pathname.includes("/view/") && { readOnly: true }
                    }
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    label="Email"
                    autoComplete="off"
                    defaultValue={clientList?.email}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "&>label": { top: "4px" },
                      "& input": { py: 1.5 },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    InputProps={
                      location.pathname.includes("/view/") && { readOnly: true }
                    }
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
                          p: "9px 24px 10px 6px!important",
                          bgcolor: "#f4f4f4",
                        },
                        "& input+div": {
                          right: "0!important",
                        },
                      }}
                      value={formik.values.mobileCode}
                      onChange={(event, newValue) => {
                        formik.setFieldValue("mobileCode", newValue?.phone); // Update Formik field value
                        setCountry(newValue);
                      }}
                      defaultValue={
                        countryList[
                          countryList.findIndex(
                            (country) =>
                              `${country?.phone}` === clientList.mobileCode
                          )
                        ]
                      }
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
                            alt="country flag"
                          />
                          +{option.phone}
                        </Box>
                      )}
                      renderInput={(params) => {
                        return (
                          <TextField
                            name="mobileCode"
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
                            error={
                              formik.touched.mobileCode &&
                              Boolean(formik.errors.mobileCode)
                            }
                            helperText={
                              formik.touched.mobileCode &&
                              formik.errors.mobileCode
                            }
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
                      defaultValue={clientList?.mobileNumber}
                      InputProps={
                        (location.pathname.includes("/view/") && {
                          readOnly: true,
                        },
                        { maxLength: 10 })
                      }
                      inputProps={{ maxLength: 10 }}
                      sx={{
                        "& input,&>div": { fontSize: "14px" },
                        "&>label": { top: "4px" },
                        "& input": { py: 1.5 },
                        "& fieldset": {
                          borderRadius: "0 6px 6px 0 !important",
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
                        formik.touched.mobileNumber &&
                        formik.errors.mobileNumber
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
                      defaultValue={clientList ? clientList.mobileCode : "+91"}
                      InputProps={
                        location.pathname.includes("/view/") && {
                          readOnly: true,
                        }
                      }
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
                      value={formik.values.mobileCode}
                      error={
                        formik.touched.mobileCode &&
                        Boolean(formik.errors.mobileCode)
                      }
                      helperText={
                        formik.touched.mobileCode && formik.errors.mobileCode
                      }
                    />

                    <TextField
                      fullWidth
                      size="small"
                      id="mobileNumber"
                      placeholder="Mobile Number"
                      autoComplete="off"
                      defaultValue={clientList?.mobileNumber}
                      InputProps={
                        location.pathname.includes("/view/") && {
                          readOnly: true,
                        }
                      }
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
                      value={formik.values.mobileNumber}
                      error={
                        formik.touched.mobileNumber &&
                        Boolean(formik.errors.mobileNumber)
                      }
                      helperText={
                        formik.touched.mobileNumber &&
                        formik.errors.mobileNumber
                      }
                    />
                  </Stack>

                  <TextField
                    fullWidth
                    size="small"
                    id="companyName"
                    label="Company Name"
                    autoComplete="off"
                    defaultValue={clientList?.companyName}
                    InputProps={
                      location.pathname.includes("/view/") && { readOnly: true }
                    }
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "&>label": { top: "4px" },
                      "& input": { py: 1.5 },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    id="websiteURL"
                    label="Website"
                    autoComplete="off"
                    defaultValue={clientList?.websiteURL}
                    InputProps={
                      location.pathname.includes("/view/") && { readOnly: true }
                    }
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "&>label": { top: "4px" },
                      "& input": { py: 1.5 },
                      gridColumn: { sm: "span 2" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.websiteURL}
                    error={
                      formik.touched.websiteURL &&
                      Boolean(formik.errors.websiteURL)
                    }
                    helperText={
                      formik.touched.websiteURL && formik.errors.websiteURL
                    }
                  />

                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    label="Address"
                    autoComplete="off"
                    multiline
                    rows={4}
                    defaultValue={clientList?.address}
                    InputProps={
                      location.pathname.includes("/view/") && { readOnly: true }
                    }
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "&>label": { top: "4px" },
                      "&>div": { py: 1.5 },
                      gridColumn: { sm: "span 2" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />

                  <Box sx={{ gridColumn: { sm: "span 2", md: "span 1" } }}>
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
                      value={clientList.profile_img}
                      view={location.pathname.includes("/view/") ? true : false}
                    />
                  </Box>

                  <Box sx={{ gridColumn: { sm: "span 2", md: "span 1" } }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ lineHeight: 1, mb: 1.25 }}
                    >
                      Company Logo
                    </Typography>
                    <FileUploadButton
                      formik={formik}
                      id="companyLogo"
                      label="Company Logo"
                      value={clientList.companyLogo}
                      view={location.pathname.includes("/view/") ? true : false}
                    />
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: 3,
                    py: 2.5,
                    backgroundColor: "white",
                    borderRadius: 2.5,
                  }}
                >
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      fontWeight: 600,
                      pb: 2,
                      mb: 3,
                      borderBottom: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    Add Bank Details
                  </Typography>
                  <Box
                    sx={{
                      pt: 0.75,
                      flexGrow: { md: 0 },
                      overflowY: { md: "auto" },
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
                      id="bankName"
                      label="Bank Name"
                      autoComplete="off"
                      sx={{
                        "&>label,& input,&>div": { fontSize: "14px" },
                        "&>label": { top: "4px" },
                        "& input": { py: 1.5, textTransform: "capitalize" },
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.bankName}
                      error={
                        formik.touched.bankName &&
                        Boolean(formik.errors.bankName)
                      }
                      helperText={
                        formik.touched.bankName && formik.errors.bankName
                      }
                    />

                    <TextField
                      fullWidth
                      size="small"
                      id="IFSC"
                      label="IFSC"
                      autoComplete="off"
                      inputProps={{ maxLength: 11 }}
                      sx={{
                        "&>label,& input,&>div": { fontSize: "14px" },
                        "&>label": { top: "4px" },
                        "& input": { py: 1.5, textTransform: "uppercase" },
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.IFSC}
                      error={formik.touched.IFSC && Boolean(formik.errors.IFSC)}
                      helperText={formik.touched.IFSC && formik.errors.IFSC}
                    />

                    <TextField
                      fullWidth
                      size="small"
                      id="holderName"
                      label="A/c Holder Name"
                      autoComplete="off"
                      sx={{
                        "&>label,& input,&>div": { fontSize: "14px" },
                        "&>label": { top: "4px" },
                        "& input": { py: 1.5, textTransform: "capitalize" },
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.holderName}
                      error={
                        formik.touched.holderName &&
                        Boolean(formik.errors.holderName)
                      }
                      helperText={
                        formik.touched.holderName && formik.errors.holderName
                      }
                    />

                    <TextField
                      fullWidth
                      size="small"
                      id="accountNumber"
                      inputProps={{ maxLength: 14 }}
                      label="A/c Number"
                      autoComplete="off"
                      sx={{
                        "&>label,& input,&>div": { fontSize: "14px" },
                        "&>label": { top: "4px" },
                        "& input": { py: 1.5 },
                      }}
                      onChange={formik.handleChange}
                      value={clientList.accountNumber}
                      error={
                        formik.touched.accountNumber &&
                        Boolean(formik.errors.accountNumber)
                      }
                      helperText={
                        formik.touched.accountNumber &&
                        formik.errors.accountNumber
                      }
                    />
                  </Box>
                </Box>

                {!location.pathname.includes("/view/") && (
                  <Box sx={{ display: "flex", gap: 2, mt: 2.5 }}>
                    <ThemeButton
                      success
                      Text={
                        location.pathname.includes("/edit/")
                          ? "Update"
                          : "Create"
                      }
                      type="submit"
                    />
                    <ThemeButton
                      discard
                      Text="Discard"
                      onClick={() => navigate("/clients")}
                    />
                  </Box>
                )}
              </Box>
            </FormikProvider>
          )}
        </Box>
      </Box>
    </>
  );
}
