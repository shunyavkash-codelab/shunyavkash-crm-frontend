import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
  Box,
  TextField,
  Button,
  Typography,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";

export default function AddClientsModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const [countryList, setCountryList] = useState([]);
  const [country, setCountry] = useState(null);

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    email: Yup.string().required("Email is required.").trim(),
    mobileNumber: Yup.string().required("Mobile Number is required.").trim(),
  });
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      mobileCode: "",
      mobileNumber: "",
      companyName: "",
      address: "",
    },
    onSubmit: async (values) => {
      try {
        // values.currency = currencyValue?.symbol;
        const res = await apiCall({
          url: APIS.CLIENT.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 201) {
          setSnack(res.data.message);
          setOpen(false);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

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
    fetchCountry();
  }, []);

  return (
    <>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: { xs: 0, sm: "50%" },
              left: { xs: 0, sm: "50%" },
              transform: { sm: "translate(-50%, -50%)" },
              width: { xs: "100%", sm: "500px" },
              height: { xs: "100vh", sm: "unset" },
              bgcolor: "white",
              borderRadius: { sm: 2.5 },
              py: { xs: 2.25, sm: 2.75 },
              px: { xs: 2.25, sm: 3.25 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", sm: "block" },
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3.25,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Add Client
              </Typography>
              <Button
                onClick={handleClose}
                disableRipple
                disableElevation
                id="cancle_icon"
                sx={{
                  color: "white",
                  position: { sm: "absolute" },
                  top: { sm: "0" },
                  right: { sm: "0" },
                  transform: { sm: "translate(22px, -22px)" },
                  borderRadius: "100%",
                  minWidth: "unset",
                  p: 0,
                  height: "44px",
                  width: "44px",
                  "&,&:hover": {
                    bgcolor: "text.primary",
                  },
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: "25px",
                  }}
                  open={open}
                  aria-label="close"
                />
              </Button>
            </Box>
            <Box
              component="form"
              onSubmit={formik.handleSubmit}
              autoComplete="off"
            >
              <Box
                sx={{ display: "grid", gap: 2.25 }}
                id="transition-modal-title"
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
                    // value={formik.values.mobileCode}
                    onChange={(event, newValue) => {
                      formik.setFieldValue("mobileCode", newValue?.phone); // Update Formik field value
                      setCountry(newValue);
                    }}
                    // defaultValue={"njdkjds"}
                    name="mobileCode"
                    options={countryList}
                    autoHighlight
                    getOptionLabel={(option) => option.phone}
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
                    // defaultValue={clientList?.mobileNumber}
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
                      formik.touched.mobileNumber && formik.errors.mobileNumber
                    }
                  />
                </Box>
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
                    options={countryList}
                    getOptionLabel={(option) => option.label}
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
                    name="mobileCode"
                    onChange={(event, newValue) => {
                      console.log(newValue, "------------------220");
                      formik.setFieldValue("mobileCode", newValue?.phone); // Update Formik field value
                      setCountry(newValue);
                      console.log(country, "---------------223----country");
                    }}
                    autoHighlight
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
                          srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
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
                          inputProps={{
                            ...params.inputProps,
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
                    id="Number"
                    type="tel"
                    autoComplete="off"
                    placeholder="Number"
                    sx={{
                      "& input,&>div": { fontSize: "14px" },
                      "&>label": { top: "4px" },
                      "& input": { py: 1.5 },
                      "& fieldset": {
                        borderRadius: "0 6px 6px 0 !important",
                        borderLeft: 0,
                      },
                    }}
                  />
                </Box> */}
                {/* <TextField
                  fullWidth
                  size="small"
                  id="mobileNumber"
                  label="Number"
                  type="tel"
                  autoComplete="off"
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
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
                /> */}
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
                />
                <TextField
                  fullWidth
                  size="small"
                  id="address"
                  label="Address"
                  autoComplete="off"
                  multiline
                  rows={4}
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
              </Box>

              <Box sx={{ textAlign: "center", mt: 2.5 }}>
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
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
