import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Input,
  Autocomplete,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";

import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { FormikProvider, useFormik } from "formik";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useNavigate, useParams, useLocation } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const names = ["Oliver Hansen", "Van Henry", "April Tucker", "Ralph Hubbard"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const [clientList, setClientList] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { id } = useParams();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: clientList?.email,
      mobileNumber: clientList?.mobileNumber,
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
      <Box sx={{ display: "flex", height: "100vh", ml: { lg: sideBarWidth } }}>
        <Box
          component="main"
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
              Invoice
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              Invoice
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              p: 6.75,
              borderRadius: 2.5,
              maxWidth: "1280px",
              mx: "auto",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                }}
              >
                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "28px",
                      textTransform: "capitalize",
                      lineHeight: 1.5,
                    }}
                  >
                    Shunyavkash PVT. LTD
                  </Typography>
                  <Box>
                    <Box
                      sx={{
                        mt: 0.25,
                        "&>*:not(:first-child)": {
                          mt: 3,
                        },
                        textAlign: "left",
                      }}
                    >
                      {/* <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                        Invoice no:
                      </Typography> */}
                      <Typography
                        variant="subtitle3"
                        sx={{ lineHeight: 1.6, fontSize: "13px" }}
                      >
                        311, Ambika Pinnacle, Lajamni chowk,
                        <br /> Mota varachha, Surat- 395006
                      </Typography>

                      <Box
                        sx={{
                          mt: 0.25,
                          "&>*:not(:first-child)": {
                            mt: 0,
                          },
                          textAlign: "left",
                        }}
                      >
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
                                // p: 2.5,
                                // pt: 1.75,
                                backgroundColor: "white",
                                borderRadius: 2.5,
                              }}
                            >
                              <Box
                                sx={{
                                  flexGrow: { md: 0 },
                                  overflowY: { md: "auto" },
                                  "& fieldset": {
                                    borderRadius: 1.5,
                                  },
                                  display: "grid",
                                  // gridTemplateColumns: {
                                  //   xs: "repeat(1, 1fr)",
                                  //   sm: "repeat(2, 1fr)",
                                  // },
                                  gap: 2.5,
                                }}
                              >
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
                                    "&>label,& input,&>div": {
                                      fontSize: "14px",
                                    },
                                  }}
                                  onChange={formik.handleChange}
                                  value={formik.values.email}
                                  InputProps={
                                    location.pathname.includes("/view/") && {
                                      readOnly: true,
                                    }
                                  }
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
                                      "& button[title='Clear']": {
                                        display: "none",
                                      },
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
                                          "& > img": {
                                            mr: 0.75,
                                            flexShrink: 0,
                                          },
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
                                    InputProps={
                                      location.pathname.includes("/view/") && {
                                        readOnly: true,
                                      }
                                    }
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
                              </Box>
                            </Box>
                          </FormikProvider>
                        )}

                        {/* <Typography
                          variant="subtitle3"
                          sx={{
                            lineHeight: 1.6,
                            display: "block",
                            fontSize: "13px",
                          }}
                        >
                          +91 8155926380
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          sx={{
                            lineHeight: 1.6,
                            display: "block",
                            fontSize: "13px",
                          }}
                        >
                          hiren.polra@shunyavkash.com
                        </Typography> */}
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    maxHeight: "140px",
                    maxWidth: "280px",
                    minWidth: "80px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="/images/logo.svg"
                    style={{
                      maxHeight: "inherit",
                      width: "100%",
                      display: "block",
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 6,
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    From
                  </Typography>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      mt: 1,
                      width: "300px",
                      display: "flex",
                      "&>label": { fontSize: "12px" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      From
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="from"
                      label="From"
                      sx={{ fontSize: "12px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"shunyavkash"}
                      >
                        Shunyavkash
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    label="Address"
                    autoComplete="off"
                    multiline
                    rows={4}
                    sx={{
                      mt: 2.25,
                      width: "300px",
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    Bill to
                  </Typography>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      mt: 1,
                      width: "300px",
                      display: "flex",
                      "&>label": { fontSize: "12px" },
                      "&>div": { textAlign: "left" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      To
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="to"
                      label="To"
                      sx={{ fontSize: "12px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"shunyavkash"}
                      >
                        Shunyavkash
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    label="Address"
                    autoComplete="off"
                    multiline
                    rows={4}
                    sx={{
                      mt: 2.25,
                      width: "300px",
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    Project
                  </Typography>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      mt: 1,
                      width: "300px",
                      display: "flex",
                      "&>label": { fontSize: "12px" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      Select Project
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="select_project"
                      label="Select Project"
                      sx={{ fontSize: "12px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"Project 1"}
                      >
                        Project 1
                      </MenuItem>
                    </Select>
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
                      mt: 2.25,
                      width: "300px",
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 10 }}>
              <FormControl
                fullWidth
                size="small"
                sx={{
                  mt: 1,
                  width: "450px",
                  display: "flex",
                  "&>label": { fontSize: "12px" },
                }}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                >
                  Select Tasks
                </InputLabel>
                <Select
                  multiple
                  labelId="demo-simple-select-label"
                  id="select_tasks"
                  label="Select Tasks"
                  sx={{
                    fontSize: "12px",
                    "&>div": {
                      "&>div": {
                        position: "absolute",
                        top: "50%",
                        transform: "translateY(-50%)",
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        "&::-webkit-scrollbar": { display: "none" },
                        "&>*": {
                          height: "auto",
                          "&>span": {
                            py: 0.25,
                            px: 1,
                            fontSize: "12px",
                          },
                        },
                      },
                    },
                  }}
                  value={personName}
                  onChange={handleChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName, theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TableContainer
                component={Paper}
                sx={{
                  mt: 2,
                  borderRadius: 2.5,
                }}
              >
                <Table
                  className="projectTable"
                  sx={{
                    minWidth: 650,
                    textTransform: "capitalize",
                    textWrap: "nowrap",
                    boxShadow: "0 0 10px rgba(0,0,0,1)",
                    "& th,& td": {
                      borderBottom: 0,
                    },
                    "& tbody tr,& tfoot tr": {
                      borderTop: "1px solid rgba(224, 224, 224, 1)",
                    },
                    "& tbody tr td:first-child": {
                      maxWidth: "400px",
                      textWrap: "wrap",
                    },
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        "& th": {
                          lineHeight: 1,
                          fontWeight: 600,
                          bgcolor: "rgb(22 119 255/ 6%)",
                          color: "black",
                        },
                      }}
                    >
                      <TableCell>description</TableCell>
                      <TableCell>price per hours</TableCell>
                      <TableCell>hours</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": {
                          p: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Recurring Bill (Hosting)</TableCell>
                      <TableCell>$652.87</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>$1,958.61</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": {
                          p: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Recurring Bill (Domain)</TableCell>
                      <TableCell>$239.00</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>$717.00</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": {
                          p: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Web design</TableCell>
                      <TableCell>$958.00</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>$958.00</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": {
                          p: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                        bgcolor: "rgba(243 ,243 ,243 ,1)",
                      }}
                    >
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{ fontWeight: "600", color: "black" }}>
                        Total:
                      </TableCell>
                      <TableCell sx={{ fontWeight: "600", color: "black" }}>
                        $3633.61
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  maxWidth: "300px",
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, lineHeight: 1, mb: 1.75 }}
                >
                  Bank Details
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    mt: 1,
                    // width: "300px",
                    display: "flex",
                    "&>label": { fontSize: "12px" },
                    "&>div": { textAlign: "left" },
                  }}
                >
                  <InputLabel
                    sx={{ textTransform: "capitalize" }}
                    id="demo-simple-select-label"
                  >
                    Select Bank
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="select Bank"
                    label="Select Bank"
                    sx={{ fontSize: "12px" }}
                  >
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"Kotak"}
                    >
                      Kotak
                    </MenuItem>
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"HDFC"}
                    >
                      HDFC
                    </MenuItem>
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"Kotak"}
                    >
                      Custom Add
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  id="ifsc"
                  label="IFSC Code"
                  sx={{
                    mt: 2.25,
                    width: "300px",
                    "&>label,& input,&>div": { fontSize: "12px" },
                  }}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="Acc Holder"
                  label="Account Holder Name"
                  autoComplete="off"
                  multiline
                  sx={{
                    mt: 2.25,
                    width: "300px",
                    "&>label,& input,&>div": { fontSize: "12px" },
                  }}
                />

                <TextField
                  fullWidth
                  size="small"
                  id="Acc Number"
                  label="Account Number"
                  sx={{
                    mt: 2.25,
                    width: "300px",
                    "&>label,& input,&>div": { fontSize: "12px" },
                  }}
                />
              </Box>
              <Box
                sx={{
                  ml: "auto",
                  flexShrink: 0,
                  "&>*": { "&:not(:first-child)": { mt: 1.75 }, px: 1.75 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                      fontWeight: "700!important",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    subtotal:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $3633.61
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Discount (20%):
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    shipping cost:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    sales tax:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $450.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    total:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $4083.61
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    amount paid:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    py: 1.75,
                    bgcolor: "primary.light",
                    borderRadius: 2.5,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                      fontWeight: 700,
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    balance due:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $4083.61
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 6,
              }}
            >
              <Box sx={{ maxWidth: "400px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, lineHeight: 1, fontSize: "13px" }}
                >
                  Notes
                </Typography>
                <Box
                  sx={{
                    mt: 2.25,
                    "&>*": {
                      display: "block",
                      lineHeight: 1.5,
                    },
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="description"
                    label="Description"
                    autoComplete="off"
                    multiline
                    rows={4}
                    sx={{
                      mt: 2.25,
                      width: "300px",
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                </Box>
              </Box>
              <Box sx={{ height: "100px" }}>
                <img
                  src="/images/sign.svg"
                  style={{ height: "100%", width: "auto" }}
                ></img>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2.5 }}
          >
            <Link to="./preview">
              <Button
                disableRipple
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
            </Link>
            <Link to="../invoices">
              <Button
                disableRipple
                sx={{
                  maxHeight: "42px",
                  position: "relative",
                  px: 2.5,
                  py: 1.5,
                  bgcolor: "error.main",
                  border: "1px solid",
                  borderColor: "error.main",
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
                    color: "error.main",
                    bgcolor: "error.main",
                    "&:before": { height: "10rem" },
                  },
                }}
              >
                <span style={{ position: "relative" }}>Cancel</span>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
