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
  Divider,
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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "ravi",
  "akash",
  "mayur",
  "deep",
  "prince",
  "helohelohelohelohelohelohelohelohelohelohelohelohelohelohelo",
  "bfhsgfsdfsgfjshgdfjshgdfhgd",
  "bfshdjgfhsdgfhgvsdjhfdhjvfjs",
];

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
  const [clientList, setClientList] = useState([]);
  const [countryList, setCountryList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [adminList, setAdminList] = useState(false);
  const [selectedClient, setSelectedClient] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const { invoiceNumber } = useParams();

  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: adminList.email,
      address: adminList.address,
      address2: adminList.address2,
      landmark: adminList.landmark,
      pincode: adminList.pincode,
      mobileCode: adminList.mobileCode,
      mobileNumber: adminList.mobileNumber,
      name: clientList.name,
      invoiceNumber: invoiceNumber,
      projectDescription: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.CLIENT.EDIT,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          navigate("/clients");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  // get client list all client
  const fetchClient = async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setClientList(res.data.data.data);
        formik.setFieldValue("name", res.data.data.name);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  // get project list by clientId
  const fetchProject = async (clientId) => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.CLIENTWISEPROJECT(clientId),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setProjectList(res.data.data);
        formik.setFieldValue("name", res.data.data.name);
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

  // get admin details
  const fetchAdmin = async () => {
    try {
      const res = await apiCall({
        url: APIS.ADMIN.GET,
        method: "get",
      });
      if (res.data.success === true) {
        setAdminList(res.data.data);
        formik.setFieldValue("email", res.data.data.email);
        formik.setFieldValue("address", res.data.data.address);
        formik.setFieldValue("address2", res.data.data.address2);
        formik.setFieldValue("landmark", res.data.data.landmark);
        formik.setFieldValue("pincode", res.data.data.pincode);
        formik.setFieldValue("mobileCode", { phone: res.data.data.mobileCode });
        formik.setFieldValue("mobileNumber", res.data.data.mobileNumber);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const clientData = async (id) => {
    const clientAddress = clientList.find((client) => {
      return client._id === id;
    });
    setSelectedClient(clientAddress.address);
    await fetchProject(id);
  };

  const projectData = () => {};

  useEffect(() => {
    fetchClient();
    fetchCountry();
    fetchAdmin();
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
            pb: 5,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box sx={{ mb: 3.25 }}>
            <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
              Add Invoice
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "24px",
                    textTransform: "capitalize",
                  }}
                >
                  Shunyavkash PVT. LTD
                </Typography>
                <Box
                  sx={{
                    mt: 1.75,
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    label="Address"
                    autoComplete="off"
                    onChange={formik.handleChange}
                    // value={`${formik.values.address} ${formik.values.address2} ${formik.values.landmark} ${formik.values.pincode}`}
                    value={
                      formik.values.address +
                      formik.values.address2 +
                      formik.values.landmark +
                      formik.values.pincode
                    }
                    InputProps={
                      location.pathname.includes("/view/") && {
                        readOnly: true,
                      }
                    }
                    multiline
                    rows={4}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                  <Box
                    sx={{
                      mt: 3.25,
                    }}
                  >
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
                          "& input": { fontSize: "12px" },
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
                        onChange={(_, newValue) => {
                          formik.setFieldValue("mobileCode", newValue);
                        }}
                        value={formik.values.mobileCode}
                        inputValue={formik.values.mobileCode?.phone}
                        options={countryList}
                        autoHighlight
                        getOptionLabel={(option) => option.phone}
                        renderOption={(props, option) => {
                          return (
                            <Box
                              component="li"
                              sx={{
                                "& > img": {
                                  mr: 0.75,
                                  flexShrink: 0,
                                },
                                fontSize: "12px",
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
                          );
                        }}
                        renderInput={(params) => {
                          return <TextField {...params} />;
                        }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        id="mobileNumber"
                        type="tel"
                        autoComplete="off"
                        placeholder="Number"
                        InputProps={
                          location.pathname.includes("/view/") && {
                            readOnly: true,
                          }
                        }
                        // InputLabelProps={{
                        //   shrink: true,
                        // }}
                        sx={{
                          "& input,&>div": { fontSize: "12px" },
                          "& fieldset": {
                            borderRadius: "0 6px 6px 0",
                            borderLeft: 0,
                          },
                        }}
                        onChange={formik.handleChange}
                        value={formik.values.mobileNumber}
                      />
                    </Box>
                    <TextField
                      fullWidth
                      size="small"
                      id="email"
                      label="Email"
                      autoComplete="off"
                      // defaultValue={adminList.email}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      sx={{
                        mt: 1.75,
                        "&>label,& input,&>div": {
                          fontSize: "12px",
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
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  maxHeight: "140px",
                  maxWidth: "200px",
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
            <Divider
              sx={{ my: 3.5, borderWidth: "2px", borderColor: "#ededed" }}
            />
            <Typography variant="h4" sx={{ textAlign: "right" }}>
              Invoice
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 6,
                gap: 2,
              }}
            >
              <Box sx={{ width: "300px" }}>
                <Typography
                  variant="subtitle3"
                  sx={{ fontWeight: 700, display: "block", fontSize: "13px" }}
                >
                  Bill to
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    mt: 2,
                    // width: "300px",
                    display: "flex",
                    "&>label": { fontSize: "12px" },
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
                    onChange={(e) => clientData(e.target.value)}
                    sx={{ fontSize: "12px" }}
                  >
                    {clientList.map((clientName) => (
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={clientName._id}
                      >
                        {clientName.name}
                      </MenuItem>
                    ))}
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
                    mt: 1.75,
                    // width: "300px",
                    "&>label,& input,&>div": { fontSize: "12px" },
                  }}
                  value={selectedClient}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box>
              <Box
                sx={{
                  maxWidth: "300px",
                  "&>*:not(:first-child)": {
                    mt: 1.75,
                  },
                }}
              >
                <TextField
                  fullWidth
                  size="small"
                  id="invoiceNumber"
                  label="Invoice No"
                  autoComplete="off"
                  // defaultValue={adminList.email}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{
                    "&>label,& input,&>div": {
                      fontSize: "12px",
                    },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.invoiceNumber}
                  InputProps={
                    location.pathname.includes("/view/") && {
                      readOnly: true,
                    }
                  }
                />
                <TextField
                  fullWidth
                  size="small"
                  id="invoiceDate"
                  label="Invoice Date"
                  autoComplete="off"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="mm/dd/yyyy"
                  sx={{
                    "&>label,& input,&>div": { fontSize: "12px" },
                  }}
                  onChange={formik.handleChange}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="invoiceDueDate"
                  label="Invoice Due Date"
                  autoComplete="off"
                  type="date"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="mm/dd/yyyy"
                  sx={{
                    "&>label,& input,&>div": { fontSize: "12px" },
                  }}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 6,
                gap: 2,
              }}
            >
              <Box sx={{ width: "300px" }}>
                <Typography
                  variant="subtitle3"
                  sx={{ fontWeight: 700, display: "block", fontSize: "13px" }}
                >
                  project
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    mt: 2,
                    // width: "300px",
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
                    // onChange={(e) => clientData(e.target.value)}
                    sx={{ fontSize: "12px" }}
                    onChange={(event) => {
                      let project = projectList.find(
                        (project) => project._id === event.target.value
                      );
                      formik.setFieldValue(
                        "projectDescription",
                        project.description
                      );
                      setSelectedProject(project);
                    }}
                  >
                    {projectList.map((projectName) => (
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={projectName._id}
                      >
                        {projectName.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  id="projectDescription"
                  label="Description"
                  autoComplete="off"
                  multiline
                  rows={4}
                  sx={{
                    mt: 1.75,
                    // width: "300px",
                    "&>label,& input,&>div": { fontSize: "12px" },
                  }}
                  value={formik.values.projectDescription}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={formik.handleChange}
                />
              </Box>
            </Box> */}
            <Box sx={{ my: 7 }}>
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
                    "& th,& td": {
                      borderBottom: 0,
                    },
                    "& tbody tr > *,& tfoot tr > *": {
                      py: 1.5,
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
                      <TableCell sx={{ width: "110px" }}>price/hours</TableCell>
                      <TableCell sx={{ width: "110px" }}>hours</TableCell>
                      <TableCell sx={{ width: "110px" }}>Amount</TableCell>
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
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          id="name"
                          // label="Task"
                          autoComplete="off"
                          placeholder="Enter an item"
                          defaultValue={clientList?.name}
                          // InputLabelProps={{
                          //   shrink: true,
                          // }}
                          sx={{
                            "& input,&>div": { fontSize: "12px" },
                            "& input,& fieldset": {
                              marginLeft: "-12px",
                            },
                            "& fieldset": {
                              borderColor: "transparent",
                            },
                          }}
                          onChange={formik.handleChange}
                          value={formik.values.name}
                          InputProps={
                            location.pathname.includes("/view/") && {
                              readOnly: true,
                            }
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          id="PricePerHours"
                          autoComplete="off"
                          // label="Price"
                          placeholder="$00.00"
                          InputProps={
                            location.pathname.includes("/view/") && {
                              readOnly: true,
                            }
                          }
                          InputLabelProps={{
                            shrink: true,
                          }}
                          sx={{
                            "& input,&>div": { fontSize: "12px" },
                            "& input,& fieldset": {
                              marginLeft: "-12px",
                            },
                            "& fieldset": {
                              borderColor: "transparent",
                            },
                          }}
                          onChange={formik.handleChange}
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          fullWidth
                          size="small"
                          id="number"
                          // label="Hours"
                          autoComplete="off"
                          inputProps={{ min: 1 }}
                          defaultValue="1"
                          type="number"
                          sx={{
                            "& input,&>div": { fontSize: "12px" },
                            "& input,& fieldset": {
                              marginLeft: "-12px",
                            },
                            "& fieldset": {
                              borderColor: "transparent",
                            },
                          }}
                          onChange={formik.handleChange}
                          value={formik.values.hours}
                          InputProps={
                            location.pathname.includes("/view/") && {
                              readOnly: true,
                            }
                          }
                        />
                      </TableCell>
                      <TableCell>$00.00</TableCell>
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
                      <TableCell sx={{ py: "4px!important" }}>
                        <Button
                          disableRipple
                          sx={{
                            maxHeight: "36px",
                            position: "relative",
                            px: 2.5,
                            py: 1.5,
                            bgcolor: "primary.main",
                            border: "1px solid",
                            borderColor: "primary.main",
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
                              color: "primary.main",
                              bgcolor: "primary.main",
                              "&:before": { height: "10rem" },
                            },
                          }}
                        >
                          <span style={{ position: "relative" }}>Add Task</span>
                        </Button>
                      </TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{ fontWeight: "600", color: "black" }}>
                        Total:
                      </TableCell>
                      <TableCell sx={{ fontWeight: "600", color: "black" }}>
                        $00.00
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                ml: "auto",
                maxWidth: "fit-content",
                "&>*": { px: 1.75, "&:not(:first-child)": { mt: 1.75 } },
                "& > *": {
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 15,
                  "& > *": {
                    lineHeight: "1!important",
                    textTransform: "capitalize",
                  },
                },
              }}
            >
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  subtotal:
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  $3633.61
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">Discount (20%):</Typography>
                <Typography variant="subtitle2">$0.00</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">shipping cost:</Typography>
                <Typography variant="subtitle2">$0.00</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">sales tax:</Typography>
                <Typography variant="subtitle2">$450.00</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">total:</Typography>
                <Typography variant="subtitle2">$4083.61</Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2">amount paid:</Typography>
                <Typography variant="subtitle2">$0.00</Typography>
              </Box>
              <Box
                sx={{
                  py: 1.75,
                  bgcolor: "primary.light",
                  borderRadius: 2.5,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  balance due:
                </Typography>
                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                  $4083.61
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "end",
                gap: 2,
              }}
            >
              <Box>
                <Box
                  sx={{
                    maxWidth: "300px",
                    "&>*:not(:first-child)": {
                      mt: 1.75,
                    },
                  }}
                >
                  <Typography variant="h6">Bank Details</Typography>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
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
                      sx={{ fontSize: "13px" }}
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
                    id="bankName"
                    label="Bank Name"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="ifsc"
                    label="IFSC Code"
                    sx={{
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
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="Acc Number"
                    label="Account Number"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                </Box>
                <Box sx={{ maxWidth: "500px", mt: 6 }}>
                  <Typography variant="h6">Notes</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    id="description"
                    label="Description"
                    autoComplete="off"
                    multiline
                    rows={4}
                    sx={{
                      mt: 1.75,
                      "&>label,& input,&>div": { fontSize: "12px" },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 8.5,
                  mr: 6,
                  maxHeight: "80px",
                  maxWidth: "200px",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/sign.svg"
                  style={{
                    maxHeight: "inherit",
                    width: "100%",
                    display: "block",
                  }}
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
              >
                <span style={{ position: "relative" }}>discard</span>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
