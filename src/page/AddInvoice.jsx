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
import { FieldArray, Form, Formik } from "formik";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import InvoiceTable from "../component/InvoiceTable";
import CustomFormikField from "../component/form/CustomFormikField";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

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
  const [taskCount, setTaskCount] = useState(1);
  const [selectedProject, setSelectedProject] = useState();
  const { setInvoiceData } = useInvoiceStore();
  const { invoiceNumber } = useParams();
  const [projectDescription, setProjectDescription] = useState();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const location = useLocation();
  const taskInitialValues = { name: "", pricePerHours: "", number: "1" };

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
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  // get project list by clientId
  const fetchProject = async (clientId) => {
    console.log(clientId, "-----------------123");
    try {
      const res = await apiCall({
        url: APIS.PROJECT.CLIENTWISEPROJECT(clientId),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setProjectList(res.data.data);

        console.log(res.data.data, "---------------------132");
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
        // console.log(res.data.data, "-------------------------160");
        // console.log(
        //   res.data.data.bank[0].bankName,
        //   "---------------------bank"
        // );
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  // get task details
  const fetchTask = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.TASK.GET(id),
        method: "get",
      });
      if (res.data.success === true) {
        setAdminList(res.data.data);
        console.log(res.data.data, "-------------------------183");
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const clientData = async (id) => {
    console.log(id, "---------------------191");
    const clientAddress = clientList.find((client) => {
      return client._id === id;
    });
    console.log(clientAddress, "--------------------195");
    setSelectedClient(clientAddress.address);
    await fetchProject(id);
  };

  const handleProjectChange = async (event) => {
    const projectId = event.target.value;
    const project = projectList.find((proj) => proj._id === projectId);

    // formik.setFieldValue('projectDescription', project.description);
    setProjectDescription(project.description);
  };

  useEffect(() => {
    fetchClient();
    fetchCountry();
    fetchAdmin();
  }, []);

  // task increment
  const taskIncrement = () => {
    setTaskCount(taskCount + 1);
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
        component={Formik}
        enableReinitialize={true}
        initialValues={{
          email: adminList.email,
          address: adminList.address,
          address2: adminList.address2,
          landmark: "",
          pincode: "",
          mobileCode: adminList.mobileCode,
          mobileNumber: adminList.mobileNumber,
          invoiceNumber: "",
          task: [taskInitialValues],
          clientAddress: selectedClient || "",
          total: "10",
          projectDescription: projectDescription || "",
          // to: clientAddress._id,
          // projectDescription: "",
        }}
        onSubmit={async (values) => {
          try {
            console.log(values, "==================submit");
            setInvoiceData(values);
            navigate("./preview");
          } catch (error) {
            let errorMessage = error.response.data.message;
            setSnack(errorMessage, "warning");
          }
        }}
      >
        {({ values }) => {
          console.log(values, "---------------------------240");
          return (
            <Box
              component="main"
              sx={{
                pt: 13,
                px: 2.5,
                pb: 5,
                height: "100%",
                overflowY: "auto",
                ml: { lg: sideBarWidth },
              }}
            >
              <Box sx={{ mb: 3.25, textAlign: "center" }}>
                <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                  Add Invoice
                </Typography>
              </Box>
              <Form
                // component={"form"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  mt: 2.5,
                }}
              >
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
                    <Box sx={{ flexGrow: 1 }}>
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
                        <CustomFormikField
                          name={"address"}
                          label="Address"
                          multiline
                          rows={3}
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <Box
                          sx={{
                            mt: 3.25,
                            maxWidth: "300px",
                            "& > *:not(:first-child)": {
                              mt: 1.75,
                            },
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
                                width: { xs: "100px", sm: "112px" },
                                "& input": { fontSize: "12px" },
                                "& button[title='Clear']": {
                                  display: "none",
                                },
                                "& fieldset": {
                                  borderRadius: "4px 0 0 4px",
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
                              // onChange={(_, newValue) => {
                              //   formik.setFieldValue("mobileCode", newValue);
                              // }}
                              // value={formik.values.mobileCode}
                              // inputValue={formik.values.mobileCode?.phone}
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
                                return (
                                  <CustomFormikField
                                    name={"mobileCode"}
                                    {...params}
                                  />
                                );
                              }}
                            />
                            <CustomFormikField
                              name={"mobileNumber"}
                              sx={{
                                "&>label,& input,&>div": {
                                  fontSize: "12px!important",
                                },
                                "& input": {
                                  p: 0,
                                },
                                "&>div": {
                                  py: "8.5px",
                                  px: 1.75,
                                },
                                "& fieldset": {
                                  borderRadius: "0 4px 4px 0",
                                  borderLeft: 0,
                                },
                              }}
                            />
                          </Box>
                          <CustomFormikField
                            name="email"
                            label="Email"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        flexShrink: 0,
                        maxHeight: "140px",
                        maxWidth: "200px",
                        minWidth: "80px",
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
                  <Box>
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
                      <Box sx={{ flexGrow: 1, maxWidth: "300px" }}>
                        <Typography
                          variant="subtitle3"
                          sx={{
                            fontWeight: 700,
                            display: "block",
                            fontSize: "13px",
                          }}
                        >
                          Bill to
                        </Typography>
                        <FormControl
                          fullWidth
                          size="small"
                          sx={{
                            mt: 2,
                            mb: 1.75,
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
                                key={clientName.name}
                                sx={{ textTransform: "capitalize" }}
                                value={clientName._id}
                              >
                                {clientName.name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                        <CustomFormikField
                          name={"clientAddress"}
                          label="Address"
                          multiline
                          rows={3}
                        />
                      </Box>
                      <Box
                        sx={{
                          flexGrow: 1,
                          maxWidth: "300px",
                          "&>*:not(:first-child)": {
                            mt: 1.75,
                          },
                        }}
                      >
                        <CustomFormikField
                          name={"invoiceNumber"}
                          label="invoice No."
                        />
                        <CustomFormikField
                          name={"invoiceDate"}
                          label="Invoice Date"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                        <CustomFormikField
                          name={"invoiceDueDate"}
                          label="Invoice Due"
                          type="date"
                          InputLabelProps={{
                            shrink: true,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box sx={{ width: "300px", mt: 6 }}>
                      <Typography
                        variant="subtitle3"
                        sx={{
                          fontWeight: 700,
                          display: "block",
                          fontSize: "13px",
                        }}
                      >
                        Project
                      </Typography>
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{
                          mt: 2,
                          mb: 1.75,
                          display: "flex",
                          "&>label": { fontSize: "12px" },
                        }}
                      >
                        <InputLabel
                          sx={{ textTransform: "capitalize" }}
                          id="demo-simple-select-label"
                        >
                          Project
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="project"
                          label="Project"
                          // onChange={(e) => clientData(e.target.value)}
                          sx={{ fontSize: "12px" }}
                          onChange={handleProjectChange}
                        >
                          {projectList.map((projectName) => (
                            <MenuItem
                              key={projectName.name}
                              sx={{ textTransform: "capitalize" }}
                              value={projectName._id}
                            >
                              {projectName.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <CustomFormikField
                        name={"projectDescription"}
                        label="Description"
                        multiline
                        rows={3}
                      />
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
                          maxWidth: "480px",
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
                            position: "relative",
                            "&>div": {
                              "&>div": {
                                position: "absolute",
                                top: "50%",
                                left: "14px",
                                right: "32px",
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
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                              }}
                            >
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
                              <TableCell sx={{ width: "110px" }}>
                                price/hours
                              </TableCell>
                              <TableCell sx={{ width: "110px" }}>
                                hours
                              </TableCell>
                              <TableCell sx={{ width: "110px" }}>
                                Amount
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          {/* component render   */}
                          {/* {Array.from({ length: taskCount }, (_, i) => ( */}
                          <FieldArray name="task">
                            {({ insert, remove, push }) => (
                              <>
                                {values.task.map((taskDetail, i) => (
                                  <InvoiceTable
                                    values={values.task[i]}
                                    name={`task.${i}`}
                                    key={i}
                                    taskDetail={taskDetail}
                                  />
                                ))}
                                <Button
                                  disableRipple
                                  sx={{
                                    ml: 1.5,
                                    mb: 1.5,
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
                                      transform:
                                        "rotate(-45deg) translate(-50%, -50%)",
                                      transformOrigin: "0% 0%",
                                      transition: "all 0.4s ease-in-out",
                                    },
                                    "&:hover": {
                                      color: "primary.main",
                                      bgcolor: "primary.main",
                                      "&:before": { height: "10rem" },
                                    },
                                  }}
                                  onClick={() => {
                                    push(taskInitialValues);
                                  }}
                                >
                                  <span style={{ position: "relative" }}>
                                    Add Task
                                  </span>
                                </Button>
                              </>
                            )}
                          </FieldArray>
                          <TableFooter>
                            <TableRow
                              sx={{
                                "&:last-child td, &:last-child th": {
                                  border: 0,
                                },
                                "&>td": {
                                  fontSize: { xs: "12px", sm: "14px" },
                                },
                                "&>*": {
                                  p: 1.5,
                                  "&:first-child": { fontWeight: "600" },
                                },
                                bgcolor: "rgba(243 ,243 ,243 ,1)",
                              }}
                            >
                              {/* <TableCell sx={{ py: "4px!important" }}>
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
                                    transform:
                                      "rotate(-45deg) translate(-50%, -50%)",
                                    transformOrigin: "0% 0%",
                                    transition: "all 0.4s ease-in-out",
                                  },
                                  "&:hover": {
                                    color: "primary.main",
                                    bgcolor: "primary.main",
                                    "&:before": { height: "10rem" },
                                  },
                                }}
                                onClick={taskIncrement}
                              >
                                <span style={{ position: "relative" }}>
                                  not Task
                                </span>
                              </Button>
                            </TableCell> */}
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell
                                sx={{ fontWeight: "600", color: "black" }}
                              >
                                Total:
                              </TableCell>
                              <TableCell
                                sx={{ fontWeight: "600", color: "black" }}
                              >
                                $
                                {values.task.reduce((accum, taskDetail) => {
                                  accum +=
                                    taskDetail.pricePerHours *
                                    taskDetail.number;
                                  return accum;
                                }, 0)}
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
                        "&>*": {
                          px: 1.75,
                          "&:not(:first-child)": { mt: 1.75 },
                        },
                        "& > *": {
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 6.25,
                          "& > *": {
                            lineHeight: "1!important",
                            textTransform: "capitalize",
                          },
                        },
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
                          subtotal:
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
                          $
                          {values.task.reduce((accum, taskDetail) => {
                            accum +=
                              taskDetail.pricePerHours * taskDetail.number;
                            return accum;
                          }, 0)}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          alignItems: "center",
                          "& > *:last-child": {
                            maxWidth: "85px",
                            "& input": {
                              textAlign: "right",
                            },
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ textWrap: "nowrap" }}
                        >
                          Discount :{" "}
                          <Box
                            sx={{
                              alignItems: "center",
                              "& > *:last-child": {
                                maxWidth: "85px",
                              },
                            }}
                          >
                            <CustomFormikField
                              name={"discount"}
                              placeholder="00.00"
                            />
                          </Box>
                        </Typography>
                        <CustomFormikField
                          name={"discount"}
                          placeholder="00.00"
                        />
                      </Box>
                      <Box
                        sx={{
                          alignItems: "center",
                          "& > *:last-child": {
                            maxWidth: "85px",
                            "& input": {
                              textAlign: "right",
                            },
                          },
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ textWrap: "nowrap" }}
                        >
                          sales tax:
                        </Typography>
                        <CustomFormikField
                          name={"salesTax"}
                          placeholder="00.00"
                        />
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">total:</Typography>
                        <Typography variant="subtitle2">$4083.61</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          amount paid:
                        </Typography>
                        <Typography variant="subtitle2">$0.00</Typography>
                      </Box>
                      <Box
                        sx={{
                          py: 1.75,
                          bgcolor: "primary.light",
                          borderRadius: 2.5,
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
                          balance due:
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 700 }}
                        >
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
                              id="select_Bank"
                              label="Select Bank"
                              sx={{ fontSize: "13px" }}
                            >
                              {adminList.bank &&
                                adminList.bank.map((bank) => (
                                  <MenuItem
                                    sx={{ textTransform: "capitalize" }}
                                    value={bank.bankName}
                                  >
                                    {bank.bankName}
                                  </MenuItem>
                                ))}

                              <MenuItem
                                sx={{ textTransform: "capitalize" }}
                                value={"Custom Add"}
                              >
                                Custom Add
                              </MenuItem>
                            </Select>
                          </FormControl>
                          <CustomFormikField
                            name="bankName"
                            label="Bank Name"
                          />
                          <CustomFormikField name="ifsc" label="IFSC" />
                          <CustomFormikField
                            name="accHolder"
                            label="A/c Holder Name"
                          />
                          <CustomFormikField
                            name="accNumber"
                            label="A/c Number"
                          />
                        </Box>
                        <Box sx={{ maxWidth: "500px", mt: 6 }}>
                          <Typography variant="h6" sx={{ mb: 1.75 }}>
                            Notes
                          </Typography>
                          <CustomFormikField
                            name="description"
                            label="Descrption"
                            multiline
                            rows={3}
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
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      mt: 2.5,
                    }}
                  >
                    {/* <Link to="./preview"> */}
                    <Button
                      type="submit"
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
                    {/* </Link> */}
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
              </Form>
            </Box>
          );
        }}
      </Box>
    </>
  );
}
