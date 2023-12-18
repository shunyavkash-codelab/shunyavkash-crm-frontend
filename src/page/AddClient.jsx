import React, { useEffect, useState } from "react";
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
  Button,
  Autocomplete,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import FileUploadButton from "../component/FileUploadButton";
import { Field, FormikProvider, useFormik } from "formik";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function AddClient() {
  const { id } = useParams();
  const location = useLocation();

  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
  const navigate = useNavigate();
  const [clientList, setClientList] = useState(false);
  const [countryList, setCountryList] = useState([]);

  const formik = useFormik({
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
      mobileCode: clientList?.mobileCode,
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: id ? APIS.CLIENT.EDIT(id) : APIS.CLIENT.ADD,
          method: id ? "patch" : "post",
          data: JSON.stringify(values, null, 2),
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

  // get client list
  const fetchClient = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
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
              {clientList ? "Edit Client" : "Add Client"}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              {clientList ? "Edit Client" : "Add Client"}
            </Typography>
          </Box>
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
                    label="Name"
                    autoComplete="off"
                    defaultValue={clientList?.name}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    disabled={location.pathname.includes("/view/")}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    label="Email"
                    autoComplete="off"
                    defaultValue={clientList?.email}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    disabled={location.pathname.includes("/view/")}
                  />

                  <Box
                    sx={{
                      display: "flex",
                      "&:hover fieldset": {
                        borderColor: "text.primary",
                      },
                    }}
                  >
                    {/* <FormControl
                      size="small"
                      sx={{
                        minWidth: "102px",
                        maxWidth: "102px",
                        bgcolor: "#f4f4f4",
                      }}
                    >
                      <Field
                        name="file"
                        render={({ field, form }) => (
                          <Select
                            id="mobileCode"
                            defaultValue={clientList?.mobileCode}
                            sx={{
                              fontSize: "14px",
                              "& input,&>div": {
                                fontSize: "14px",
                              },
                              "&>div": {
                                pr: "24px!important",
                                display: "flex",
                                alignItems: "center",
                              },
                              "&>svg": { fontSize: "18px" },
                              "& fieldset": {
                                borderRadius: "6px 0 0 6px",
                                borderRight: 0,
                              },
                            }}
                            onChange={(event) => {
                              form.setFieldValue(
                                "mobileCode",
                                event.target.value
                              );
                            }}
                            disabled={location.pathname.includes("/view/")}
                          >
                            {countryList.map((item) => (
                              <>
                                <MenuItem
                                  // InputLabelProps={{
                                  //   shrink: true,
                                  // }}
                                  sx={{ textTransform: "capitalize" }}
                                  value={item._id}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.75,
                                    }}
                                  >
                                    <img
                                      srcSet={`https://flagcdn.com/w40/${item.code.toLowerCase()}.png 2x`}
                                      src={`https://flagcdn.com/w20/${item.code.toLowerCase()}.png`}
                                      style={{
                                        maxHeight: "14px",
                                        maxWidth: "25px",
                                      }}
                                    ></img>
                                    <Typography
                                      variant="subtitle2"
                                      sx={{ lineHeight: 1 }}
                                    >
                                      {item.phone}
                                    </Typography>
                                  </Box>
                                </MenuItem>
                              </>
                            ))}
                          </Select>
                        )}
                      />
                    </FormControl> */}
                    <Autocomplete
                      size="small"
                      id="country-select-demo"
                      sx={{
                        flexShrink: 0,
                        width: { xs: "100px", sm: "120px" },
                        "& input": { fontSize: "14px" },
                        "& button[title='Clear']": { display: "none" },
                        "& fieldset": {
                          borderRadius: "6px 0 0 6px",
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
                      defaultValue={clientList?.mobileNumber}
                      disabled={location.pathname.includes("/view/")}
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      sx={{
                        "& input,&>div": { fontSize: "14px" },
                        "& fieldset": {
                          borderRadius: "0 6px 6px 0",
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
                          defaultValue={clientList?.gender}
                          disabled={location.pathname.includes("/view/")}
                          // InputLabelProps={{
                          //   shrink: true,
                          // }}
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
                    defaultValue={clientList?.companyName}
                    disabled={location.pathname.includes("/view/")}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
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
                    disabled={location.pathname.includes("/view/")}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.websiteURL}
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
                    disabled={location.pathname.includes("/view/")}
                    // InputLabelProps={{
                    //   shrink: true,
                    // }}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      gridColumn: { sm: "span 2" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                  <Box sx={{ gridColumn: { sm: "span 2", md: "span 1" } }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ lineHeight: 1, mb: 1 }}
                    >
                      Profile Image
                    </Typography>
                    {/* <img
                      src={clientList.profile_img}
                      alt="Profile"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    /> */}
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
                      sx={{ lineHeight: 1, mb: 1 }}
                    >
                      Company Logo
                    </Typography>
                    {/* <img
                      src={clientList.companyLogo}
                      alt="Compnay logo"
                      style={{ maxWidth: "100%", maxHeight: "200px" }}
                    /> */}
                    <FileUploadButton
                      formik={formik}
                      id="companyLogo"
                      label="Company Logo"
                      value={clientList.companyLogo}
                      view={location.pathname.includes("/view/") ? true : false}
                    />
                  </Box>
                </Box>
                {!location.pathname.includes("/view/") && (
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
                      onClick={() => navigate("/clients")}
                    >
                      <span style={{ position: "relative" }}>Cancel</span>
                    </Button>
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
