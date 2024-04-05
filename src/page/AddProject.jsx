import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
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
import * as Yup from "yup";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";

export default function AddProject() {
  const [clientList, setClientList] = useState([]);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const [currencylist, setCurrencyList] = useState([]);
  const [projectData, setProjectData] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  let location = useLocation();

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
      startDate: dayjs(projectData?.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(projectData?.endDate).format("YYYY-MM-DD"),
      perHourCharge: projectData?.perHourCharge,
      currency: projectData?.currency ? projectData.currency : "$",
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
  }, []);
  // });

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
      <Box component="main">
        <SectionHeader
          Title="Add Project"
          BreadCrumbPreviousLink="/projects"
          BreadCrumbPreviousTitle="Projects"
          BreadCrumbCurrentTitle="Add Project"
        />

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
                  error={
                    formik.touched.clientId && Boolean(formik.errors.clientId)
                  }
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
                          <MenuItem onClick={() => setOpen(true)}>
                            <Box sx={{ display: "flex" }}>
                              <ThemeButton
                                Text="Add Client"
                                buttonStyle={{ maxHeight: "36px" }}
                              />
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
                  {currencylist.length > 0 && (
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
                      getOptionLabel={(option) => option}
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
                      // defaultValue={
                      //   currencylist[
                      //     currencylist.findIndex(
                      //       (currency) =>
                      //         currency.symbol === projectData?.currency
                      //     )
                      //   ]
                      // }
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
                  )}
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
                  error={
                    formik.touched.payPeriod && Boolean(formik.errors.payPeriod)
                  }
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
                        <Select
                          labelId="demo-simple-select-label"
                          id="payPeriod"
                          label="Pay Period"
                          sx={{
                            fontSize: "14px",
                            "& input": { py: 1.5 },
                            "&>label": { top: "4px" },
                          }}
                          {...field}
                          defaultValue={
                            projectData?.payPeriod ? projectData?.payPeriod : ""
                          }
                          onChange={(event) => {
                            form.setFieldValue(
                              "payPeriod",
                              event?.target?.value
                            );
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

                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <MobileDatePicker
                    label="Project Start Date"
                    format="DD/MM/YYYY"
                    value={dayjs(formik.values.startDate)}
                    sx={{
                      "&,&>div,&>label": { fontSize: "14px!important" },
                      "& input": {
                        py: 1.5,
                      },
                    }}
                    id="startDate"
                    name="startDate"
                    type="date"
                    onChange={(e) => {
                      formik.setFieldValue("startDate", e);
                    }}
                    formik={formik}
                    error={
                      formik.touched.startDate &&
                      Boolean(formik.errors.startDate)
                    }
                    helperText={
                      formik.touched.startDate && formik.errors.startDate
                    }
                  />
                </LocalizationProvider>

                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  style={{
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  <MobileDatePicker
                    label="Project End Date"
                    format="DD/MM/YYYY"
                    minDate={dayjs(formik.values.startDate).add(1, "day")}
                    value={dayjs(formik.values.endDate).add(1, "day")}
                    sx={{
                      "&,&>div,&>label": { fontSize: "14px!important" },
                      "& input": {
                        py: 1.5,
                      },
                    }}
                    id="endDate"
                    name="endDate"
                    type="date"
                    onChange={(e) => {
                      formik.setFieldValue("endDate", e);
                    }}
                    formik={formik}
                    error={
                      formik.touched.endDate && Boolean(formik.errors.endDate)
                    }
                    helperText={formik.touched.endDate && formik.errors.endDate}
                  />
                </LocalizationProvider>

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
                              bgcolor: "warning.main",
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
                <ThemeButton
                  success
                  Text={
                    location.pathname.includes("/projects/edit")
                      ? "Update"
                      : "Create"
                  }
                  type="submit"
                />
                <ThemeButton
                  discard
                  Text="discard"
                  onClick={() => navigate("/projects")}
                />
              </Box>
            </Box>
          </FormikProvider>
        )}

        <AddClientsModal
          open={open}
          setOpen={setOpen}
          fetchClients={fetchClients}
        />
      </Box>
    </>
  );
}
