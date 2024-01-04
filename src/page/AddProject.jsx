import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, FormHelperText } from "@mui/material";
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
// import { useTheme } from "@emotion/react";
import { useAuth } from "../hooks/store/useAuth";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import moment from "moment";
import * as Yup from "yup";

export default function AddProject() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [clientList, setClientList] = useState([]);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const [currencylist, setCurrencyList] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    clientId: Yup.string().required("Client is required.").trim(),
    startDate: Yup.string().required("Start date is required.").trim(),
    endDate: Yup.string().required("End date is required.").trim(),
    perHourCharge: Yup.number().required("Per hour charge is required."),
    currency: Yup.string().required("Currency is required.").trim(),
    payPeriod: Yup.string().required("Pay period is required.").trim(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: projectData?.name,
      clientId: projectData?.clientId,
      description: projectData?.description,
      startDate: moment(projectData?.startDate).format("YYYY-MM-DD"),
      endDate: moment(projectData?.endDate).format("YYYY-MM-DD"),
      perHourCharge: projectData?.perHourCharge,
      currency: projectData?.currency,
      payPeriod: projectData?.payPeriod,
      // prefix: projectData?.prefix,
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
  console.log(formik.errors, "=============86");

  const fetchClients = async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.LIST,
        method: "get",
      });
      if (res.data.success === true) {
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
    // }, []);
  });

  // const theme = useTheme();

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
        sx={{ ml: { lg: sideBarWidth } }}
      >
        <Box component="main">
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
                      "&>label": { top: "4px" },
                      "& input": { py: 1.5 },
                    }}
                    defaultValue={projectData?.name}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />

                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      "&>label": {
                        fontSize: "14px",
                        top: "4px",
                      },
                      "&>div>div": { py: 1.5 },
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
                        <>
                          <Select
                            labelId="demo-simple-select-label"
                            id="clientId"
                            label="Client"
                            sx={{ fontSize: "14px" }}
                            {...field}
                            defaultValue={projectData?.clientId}
                            onChange={(event) => {
                              form.setFieldValue(
                                "clientId",
                                event.target.value
                              );
                            }}
                            error={
                              formik.touched.clientId &&
                              Boolean(formik.errors.clientId)
                            }
                            helperText={
                              formik.touched.clientId && formik.errors.clientId
                            }
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
                          {formik.touched.clientId &&
                            Boolean(formik.errors.clientId) && (
                              <FormHelperText error={true}>
                                {formik.touched.clientId &&
                                  formik.errors.clientId}
                              </FormHelperText>
                            )}
                        </>
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
                    <Autocomplete
                      size="small"
                      id="country-select-demo"
                      sx={{
                        mr: "-1px",
                        flexShrink: 0,
                        width: "85px",
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
                        <TextField
                          name="currency"
                          {...params}
                          error={
                            formik.touched.currency &&
                            Boolean(formik.errors.currency)
                          }
                          helperText={
                            formik.touched.currency && formik.errors.currency
                          }
                        />
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
                        "&>label": { top: "4px" },
                        "& input": { py: 1.5 },
                        "& fieldset": {
                          borderRadius: "0 6px 6px 0 !important",
                          borderLeft: 0,
                        },
                      }}
                      defaultValue={projectData?.perHourCharge}
                      onChange={formik.handleChange}
                      value={formik.values.perHourCharge}
                      error={
                        formik.touched.perHourCharge &&
                        Boolean(formik.errors.perHourCharge)
                      }
                      helperText={
                        formik.touched.perHourCharge &&
                        formik.errors.perHourCharge
                      }
                    />
                  </Box>

                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      "&>label": {
                        fontSize: "14px",
                        top: "4px",
                      },
                      "&>div>div": { py: 1.5 },
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
                        <>
                          {" "}
                          <Select
                            labelId="demo-simple-select-label"
                            id="payPeriod"
                            label="Pay Period"
                            sx={{
                              fontSize: "14px",
                              "&>label": { top: "4px" },
                              "& input": { py: 1.5 },
                            }}
                            {...field}
                            defaultValue={projectData?.payPeriod}
                            onChange={(event) => {
                              form.setFieldValue(
                                "payPeriod",
                                event.target.value
                              );
                            }}
                            error={
                              formik.touched.payPeriod &&
                              Boolean(formik.errors.payPeriod)
                            }
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
                          {formik.touched.payPeriod &&
                            Boolean(formik.errors.payPeriod) && (
                              <FormHelperText error={true}>
                                {formik.touched.payPeriod &&
                                  formik.errors.payPeriod}
                              </FormHelperText>
                            )}
                        </>
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
                      "& input": { py: 1.5 },
                    }}
                    defaultValue={projectData?.startDate}
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
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
                      "& input": { py: 1.5 },
                    }}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.endDate && Boolean(formik.errors.endDate)
                    }
                    helperText={formik.touched.endDate && formik.errors.endDate}
                  />

                  {/* <TextField
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
                      "&>label": { top: "4px" },
                      "& input": {
                        textTransform: "uppercase",
                        py: 1.5,
                      },
                    }}
                    defaultValue={projectData?.prefix}
                    onChange={formik.handleChange}
                    value={formik.values.prefix}
                  /> */}

                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      "&>label": {
                        fontSize: "14px",
                        top: "4px",
                      },
                      "&>div>div": { py: 1.5 },
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
                          sx={{
                            fontSize: "14px",
                          }}
                          {...field}
                          defaultValue={projectData?.status || "toDo"}
                          onChange={(event) => {
                            form.setFieldValue("status", event.target.value);
                          }}
                        >
                          <MenuItem value={"toDo"}>
                            <Box
                              sx={{
                                color: "white",
                                fontSize: "12px",
                                p: 0.5,
                                borderRadius: 1,
                                maxWidth: "fit-content",
                                lineHeight: 1,
                                bgcolor: "grey.dark",
                              }}
                            >
                              To Do
                            </Box>
                          </MenuItem>
                          <MenuItem value={"inProgress"}>
                            <Box
                              sx={{
                                color: "white",
                                fontSize: "12px",
                                p: 0.5,
                                borderRadius: 1,
                                maxWidth: "fit-content",
                                lineHeight: 1,
                                bgcolor: "secondary.main",
                              }}
                            >
                              In Progress
                            </Box>
                          </MenuItem>
                          <MenuItem value={"inReview"}>
                            <Box
                              sx={{
                                color: "white",
                                fontSize: "12px",
                                p: 0.5,
                                borderRadius: 1,
                                maxWidth: "fit-content",
                                lineHeight: 1,
                                bgcolor: "review.main",
                              }}
                            >
                              In Review
                            </Box>
                          </MenuItem>
                          <MenuItem value={"completed"}>
                            <Box
                              sx={{
                                color: "white",
                                fontSize: "12px",
                                p: 0.5,
                                borderRadius: 1,
                                maxWidth: "fit-content",
                                lineHeight: 1,
                                bgcolor: "success.main",
                              }}
                            >
                              Completed
                            </Box>
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
                      "&>label": { top: "4px" },
                      "&>div": { py: 1.5 },
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
