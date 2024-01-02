import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import AddClientsModal from "../component/AddClientsModal";
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
import { useAuth } from "../hooks/store/useAuth";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import moment from "moment";

export default function AddProject() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [clientList, setClientList] = useState([]);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
  const navigate = useNavigate();
  const [currencylist, setCurrencyList] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const formik = useFormik({
    initialValues: {
      name: projectData?.name,
      clientId: projectData?.clientId,
      description: projectData?.description,
      startDate: moment(projectData?.startDate).format("YYYY-MM-DD"),
      endDate: moment(projectData?.endDate).format("YYYY-MM-DD"),
      perHourCharge: projectData?.perHourCharge,
      currency: projectData?.currency,
      payPeriod: projectData?.payPeriod,
      prefix: projectData?.prefix,
      status: projectData?.status,
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        // values.currency = currencyValue?.symbol;
        const res = await apiCall({
          url: id ? APIS.PROJECT.EDIT(id) : APIS.PROJECT.ADD,
          method: id ? "patch" : "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          !id && navigate("/projects");
        }
      } catch (error) {
        console.log(error, "=================77");
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

  const fetchProject = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setProjectData(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    if (id !== undefined) fetchProject(id);
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
              sx={{ mb: 2.25, textTransform: "capitalize" }}
            >
              {projectData ? "Edit Project" : "Add Project"}
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
                {projectData ? "Edit Project" : "Add Project"}
              </Typography>
            </Box>
          </Box>
          {(projectData || id === undefined) && (
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
                onSubmit={(e) => {
                  e.preventDefault();
                  formik.handleSubmit();
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
                    label="Project Name"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    defaultValue={projectData?.name}
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
                          defaultValue={projectData?.clientId}
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
                          <MenuItem>
                            <Box sx={{ display: "flex" }}>
                              <Button
                                disableRipple
                                onClick={handleOpen}
                                sx={{
                                  maxHeight: "36px",
                                  position: "relative",
                                  px: 2.5,
                                  py: 1,
                                  bgcolor: "primary.main",
                                  border: "1px solid",
                                  borderColor: "primary.main",
                                  color: "white",
                                  lineHeight: 1,
                                  borderRadius: 2.5,
                                  overflow: "hidden",
                                  display: "flex",
                                  justifyContent: "center",
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
                              >
                                <span style={{ position: "relative" }}>
                                  Add Client
                                </span>
                              </Button>
                            </Box>
                          </MenuItem>
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
                      getOptionLabel={(option) => option.symbol}
                      renderOption={(props, option) => (
                        <Box
                          component="li"
                          sx={{
                            "& > img": { mr: 0.75, flexShrink: 0 },
                            fontSize: { xs: "12px", sm: "14px" },
                          }}
                          {...props}
                        >
                          ({option.symbol}) {option.code}
                        </Box>
                      )}
                      defaultValue={
                        currencylist[
                          currencylist.findIndex(
                            (currency) =>
                              currency.symbol === projectData?.currency
                          )
                        ]
                      }
                      value={formik.values.currency}
                      onChange={(event, newValue) => {
                        formik.setFieldValue("currency", newValue.symbol); // Update Formik field value
                      }}
                      renderInput={(params) => (
                        <TextField name="currency" {...params} />
                      )}
                    />
                    <TextField
                      fullWidth
                      size="small"
                      id="perHourCharge"
                      type="number"
                      autoComplete="off"
                      placeholder="Per Hours Charge"
                      sx={{
                        "& input,&>div": { fontSize: "14px" },
                        "& fieldset": {
                          borderRadius: "0 6px 6px 0 !important",
                          borderLeft: 0,
                        },
                      }}
                      defaultValue={projectData?.perHourCharge}
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
                          defaultValue={projectData?.payPeriod}
                          onChange={(event) => {
                            form.setFieldValue("payPeriod", event.target.value);
                          }}
                        >
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"weekly"}
                          >
                            Weekly
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"fortnightly"}
                          >
                            fortnightly
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"monthly"}
                          >
                            Monthly
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
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
                    defaultValue={projectData?.startDate}
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
                    value={formik.values.endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="mm/dd/yyyy"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    // defaultValue={projectData?.endDate}
                    onChange={formik.handleChange}
                    // value={formik.values.endDate}
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
                    defaultValue={projectData?.prefix}
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
                          defaultValue={projectData?.status}
                          onChange={(event) => {
                            form.setFieldValue("status", event.target.value);
                          }}
                        >
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"toDo"}
                          >
                            To do
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"inProgress"}
                          >
                            In Progress
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"inReview"}
                          >
                            In Review
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
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
                    defaultValue={projectData?.description}
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
          )}
          <AddClientsModal open={open} setOpen={setOpen} />
        </Box>
      </Box>
    </>
  );
}
