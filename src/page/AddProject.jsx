import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
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
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useAuth } from "../hooks/store/useAuth";

import Chip from "@mui/material/Chip";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//     },
//   },
// };

// const names = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"];

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function AddProject({ open, setOpen }) {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [client, setClient] = useState("");
  const [payPeriod, setPayPeriod] = useState("");
  const [status, setStatus] = useState("");
  const [clientList, setClientList] = useState([]);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
  const navigate = useNavigate();
  const [currencylist, setCurrencyList] = useState([]);
  const [currencyValue, setCurrencyValue] = useState(null);

  const handleValueChange = (event, newValue) => {
    setCurrencyValue(newValue);
    // You can perform additional actions here based on the new selected value
  };
  console.log(currencyValue);

  const formik = useFormik({
    initialValues: {
      name: "",
      clientId: "",
      description: "",
      startDate: "",
      endDate: "",
      perHourCharge: "",
      currency: currencyValue,
      payPeriod: "",
      prefix: "",
      status: "",
    },
    onSubmit: async (values) => {
      try {
        values.currency = currencyValue?.symbol;
        const res = await apiCall({
          url: APIS.PROJECT.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 201) {
          setSnack(res.data.message);
          navigate("/clients");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  const fetchClients = async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setClientList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchClients();
    fetchCurrency();
  }, []);

  const theme = useTheme();
  // future employee add
  // const [personName, setPersonName] = React.useState([]);
  // const handleChange2 = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPersonName(
  //     // On autofill we get a stringified value.
  //     typeof value === "string" ? value.split(",") : value
  //   );
  // };

  const fetchCurrency = async () => {
    try {
      const res = await apiCall({
        url: APIS.CURRENCY.GET,
        method: "get",
      });
      if (res.data.success === true) {
        setCurrencyList(res.data.data);
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
              Add Project
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Link to={"/projects"} style={{ textDecoration: "none" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "capitalize",
                    color: "primary.main",
                    transition: "all 0.4s ease-in-out",
                    ":not(:hover)": {
                      opacity: 0.7,
                    },
                  }}
                >
                  Projects /
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                Add Project
              </Typography>
            </Box>
          </Box>
          <FormikProvider value={formik}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                p: 2.5,
                pt: 1.75,
                backgroundColor: "white",
                borderRadius: 2.5,
              }}
              onSubmit={formik.handleSubmit}
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
                  label="Project Name"
                  autoComplete="off"
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.name}
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
                  >
                    Client
                  </InputLabel>
                  <Field
                    name="file"
                    render={({ field, form }) => (
                      <Select
                        labelId="demo-simple-select-label"
                        id="clientId"
                        label="Client"
                        sx={{ fontSize: "14px" }}
                        {...field}
                        onChange={(event) => {
                          form.setFieldValue("clientId", event.target.value);
                        }}
                      >
                        {clientList.map((item) => (
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={item._id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>

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
                      minWidth: "85px",
                      maxWidth: "85px",
                      bgcolor: "#f4f4f4",
                    }}
                  >
                    <Select
                      sx={{
                        fontSize: "14px",
                        "& input,&>div": { fontSize: "14px" },
                        "&>div": {
                          pr: "24px!important",
                          display: "flex",
                          alignItems: "center",
                        },
                        "&>svg": { fontSize: "18px" },
                        "& fieldset": {
                          borderRadius: "6px 0 0 6px !important",
                          borderRight: 0,
                        },
                      }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"₹"}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.25,
                          }}
                        >
                          <img
                            src="https://img.freepik.com/free-vector/illustration-india-flag_53876-27130.jpg"
                            style={{ maxHeight: "14px", maxWidth: "25px" }}
                          ></img>
                          <Typography
                            variant="subtitle2"
                            sx={{ lineHeight: 1 }}
                          >
                            ₹
                          </Typography>
                        </Box>
                      </MenuItem>
                    </Select>
                  </FormControl> */}
                  <Autocomplete
                    size="small"
                    id="country-select-demo"
                    sx={{
                      flexShrink: 0,
                      width: "85px",
                      "& input": { fontSize: "14px" },
                      "& button[title='Clear']": { display: "none" },
                      "& fieldset": {
                        borderRadius: "6px 0 0 6px !important",
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
                    options={currencylist}
                    autoHighlight
                    getOptionLabel={(option) => option.code}
                    renderOption={(props, option) => (
                      <Box
                        component="li"
                        id="currency"
                        sx={{
                          "& > img": { mr: 0.75, flexShrink: 0 },
                          fontSize: { xs: "12px", sm: "14px" },
                        }}
                        // onChange={(event) => {
                        //   option.setFieldValue("currency", event.target.value);
                        // }}
                        {...props}
                      >
                        ({option.symbol}) {option.code}
                      </Box>
                    )}
                    renderInput={(params) => (
                      <TextField name="currency" {...params} />
                    )}
                    value={currencyValue}
                    onChange={handleValueChange}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="perHourCharge"
                    type="tel"
                    autoComplete="off"
                    placeholder="Per Hours Charge"
                    sx={{
                      "& input,&>div": { fontSize: "14px" },
                      "& fieldset": {
                        borderRadius: "0 6px 6px 0 !important",
                        borderLeft: 0,
                      },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.perHourCharge}
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
                    Pay Period
                  </InputLabel>
                  <Field
                    name="file"
                    render={({ field, form }) => (
                      <Select
                        labelId="demo-simple-select-label"
                        id="payPeriod"
                        label="Pay Period"
                        sx={{ fontSize: "14px" }}
                        {...field}
                        onChange={(event) => {
                          form.setFieldValue("payPeriod", event.target.value);
                        }}
                      >
                        <MenuItem
                          sx={{ textTransform: "capitalize", fontSize: "14px" }}
                          value={"weekly"}
                        >
                          Weekly
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize", fontSize: "14px" }}
                          value={"fortnightly"}
                        >
                          fortnightly
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize", fontSize: "14px" }}
                          value={"monthly"}
                        >
                          Monthly
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize", fontSize: "14px" }}
                          value={"yearly"}
                        >
                          Yearly
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  id="startDate"
                  label="Project Start"
                  autoComplete="off"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="mm/dd/yyyy"
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.startDate}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="endDate"
                  label="Project End"
                  autoComplete="off"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="mm/dd/yyyy"
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.endDate}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="prefix"
                  label="Prefix"
                  autoComplete="off"
                  inputProps={{ maxLength: 3 }}
                  sx={{
                    "&>label,& input,&>div": {
                      fontSize: "14px",
                    },
                    "& input": {
                      textTransform: "uppercase",
                    },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.prefix}
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
                  >
                    Status
                  </InputLabel>
                  <Field
                    name="file"
                    render={({ field, form }) => (
                      <Select
                        labelId="demo-simple-select-label"
                        id="status"
                        label="Status"
                        sx={{ fontSize: "14px" }}
                        {...field}
                        onChange={(event) => {
                          form.setFieldValue("status", event.target.value);
                        }}
                      >
                        <MenuItem
                          sx={{ textTransform: "capitalize", fontSize: "14px" }}
                          value={"toDo"}
                        >
                          To do
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize", fontSize: "14px" }}
                          value={"inProgress"}
                        >
                          In Progress
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize", fontSize: "14px" }}
                          value={"inReview"}
                        >
                          In Review
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize", fontSize: "14px" }}
                          value={"completed"}
                        >
                          Completed
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  id="description"
                  label="Description"
                  autoComplete="off"
                  multiline
                  rows={4}
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
                    gridColumn: { sm: "span 2" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.description}
                />
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
                    color: "text.primary",
                    bgcolor: "#e4e4e4",
                    border: "1px solid",
                    borderColor: "#e4e4e4",
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
                      bgcolor: "#e4e4e4",
                      "&:before": { height: "10rem" },
                    },
                  }}
                  onClick={() => navigate("/projects")}
                >
                  <span style={{ position: "relative" }}>discard</span>
                </Button>
              </Box>
            </Box>
          </FormikProvider>
        </Box>
      </Box>
    </>
  );
}
