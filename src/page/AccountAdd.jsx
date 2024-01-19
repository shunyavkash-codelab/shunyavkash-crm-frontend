import React, { useEffect, useState } from "react";
import SideBar from "../component/SideBar";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
import SectionHeader from "../component/SectionHeader";
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ImageUploder from "../component/form/ImageUploder";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ThemeButton from "../component/ThemeButton";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import * as Yup from "yup";

function AccountAdd() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [viewTransaction, setViewTransaction] = useState(false);
  const [clientList, setClientList] = useState([]);
  const { accessToken } = useAuth();
  const { id } = useParams();
  const [selected, setSelected] = useState(true);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    validationSchema: Yup.object({
      type: Yup.string().required("Transaction type is required."),
      date: Yup.date().required("Date is required."),
      title: Yup.string().required("Title is required."),
      description: Yup.string().required("Description is required."),
      amount: Yup.number().required("Amount is required."),
      expenseType: Yup.string(),
      invoiceOwner: Yup.string().required("InvoiceOwner is required."),
      invoiceType: Yup.string().required("InvoiceType is required."),
      paymentMethod: Yup.string().required("paymentMethod is required."),
      collaborator: Yup.string(),
    }),
    enableReinitialize: true,
    initialValues: {
      type: viewTransaction?.type || "",
      date: viewTransaction?.date || "",
      title: viewTransaction?.title || "",
      description: viewTransaction?.description || "",
      amount: viewTransaction?.amount || "",
      expenseType: viewTransaction?.expenseType || "",
      invoiceOwner: viewTransaction?.invoiceOwner || "",
      invoiceType: viewTransaction?.invoiceType || "",
      paymentMethod: viewTransaction?.paymentMethod || "",
      collaborator: viewTransaction?.collaborator || "",
      invoiceUpload: viewTransaction?.invoiceUpload || "",
    },

    onSubmit: async (values) => {
      let formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value && key !== "invoiceUpload") {
          formData.append(key, value);
        }
      });
      formData.append("invoiceUpload", values.invoiceUpload);
      try {
        const res = await apiCall({
          url: id ? APIS.ACCOUNTMANAGE.EDIT(id) : APIS.ACCOUNTMANAGE.ADD,
          method: id ? "patch" : "post",
          headers: "multipart/form-data",
          data: formData,
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          navigate("/account-management");
        }
      } catch (error) {
        let errorMessage =
          error.response?.data?.message || "Something went wrong.";
        setSnack(errorMessage, "warning");
      }
    },
  });

  const getTransaction = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.ACCOUNTMANAGE.GET(id),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setViewTransaction(res.data.data);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };
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

  useEffect(() => {
    fetchClients();
  }, []);
  useEffect(() => {
    if (id) {
      getTransaction(id);
    }
  }, [id]);

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
            Title={
              location.pathname.includes("/edit/") ? "Edit Entry" : "Add Entry"
            }
            BreadCrumbPreviousLink="/account-management"
            BreadCrumbPreviousTitle="A/C Management"
            BreadCrumbCurrentTitle={
              location.pathname.includes("/edit/") ? "Edit Entry" : "Add Entry"
            }
          />
          <Card
            sx={{
              p: 3,
              border: 0,
              borderRadius: 3,
              boxShadow: "none",
              maxWidth: 600,
            }}
          >
            <FormikProvider value={formik}>
              <Box component="form" onSubmit={formik.handleSubmit}>
                <Grid container spacing={2.5}>
                  {/* Radio Buttons */}
                  <Grid
                    item
                    xs={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FormControl
                      sx={{ "& > .MuiFormControl-root": { minWidth: "100%" } }}
                    >
                      <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        // defaultValue="Credit"
                        name="type"
                        sx={{
                          width: "100%",
                          flexDirection: "row",
                          justifyContent: "center",
                          "& span": {
                            py: 0,
                            fontSize: "14px",
                            bgcolor: "transparent!important",
                          },
                        }}
                        onClick={formik.handleChange}
                        value={formik.values.type}
                      >
                        <FormControlLabel
                          value="income"
                          control={<Radio />}
                          label="Income"
                          onClick={() => setSelected(true)}
                        />
                        <FormControlLabel
                          value="expense"
                          control={<Radio />}
                          label="Expense"
                          onClick={() => setSelected(false)}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Grid>
                  {/* Date */}
                  <Grid item xs={12} lg={6}>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      style={{
                        width: "100%",
                        maxWidth: "100%",
                      }}
                    >
                      <MobileDatePicker
                        name="date"
                        label="Date"
                        value={dayjs(formik.values.date || new Date())}
                        onChange={(e) => formik.setFieldValue("date", e)}
                        sx={{
                          minWidth: "100% !important",
                          "& > *": { fontSize: "14px !important" },
                        }}
                        error={
                          formik.touched.date && Boolean(formik.errors.date)
                        }
                      />
                      {formik.touched.date && Boolean(formik.errors.date) && (
                        <FormHelperText error={true}>
                          {formik.touched.date && formik.errors.date}
                        </FormHelperText>
                      )}
                    </LocalizationProvider>
                  </Grid>
                  {/* Title */}
                  <Grid item xs={12}>
                    <TextField
                      id="title"
                      label="Title"
                      defaultValue=""
                      size="normal"
                      onChange={formik.handleChange}
                      value={formik.values.title}
                      sx={{
                        width: "100%",
                        "& > .MuiFormLabel-root": { fontSize: 14 },
                      }}
                      error={
                        formik.touched.title && Boolean(formik.errors.title)
                      }
                      helperText={formik.touched.title && formik.errors.title}
                    />
                  </Grid>
                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      multiline
                      rows={4}
                      id="description"
                      label="Description"
                      defaultValue=""
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      sx={{
                        width: "100%",
                        fontSize: 14,
                        "& > *": { fontSize: 14 },
                      }}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
                    />
                  </Grid>
                  {/* Amount */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="amount"
                      label="Amount"
                      defaultValue=""
                      onChange={formik.handleChange}
                      value={formik.values.amount}
                      sx={{ width: "100%", "& > *": { fontSize: 14 } }}
                      error={
                        formik.touched.amount && Boolean(formik.errors.amount)
                      }
                      helperText={formik.touched.amount && formik.errors.amount}
                    />
                  </Grid>
                  {/* Expance Type */}
                  {!selected && (
                    <Grid item xs={12} lg={6}>
                      <FormControl
                        fullWidth
                        size="normal"
                        sx={{
                          "&>label": { fontSize: "14px" },
                        }}
                      >
                        <InputLabel
                          sx={{ textTransform: "capitalize" }}
                          id="demo-simple-select-label"
                        >
                          Expance Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Expanse Type"
                          name="expenseType"
                          value={formik.values.expenseType}
                          onChange={(e) =>
                            formik.setFieldValue("expenseType", e.target.value)
                          }
                          sx={{ fontSize: "14px" }}
                          error={
                            formik.touched.expenseType &&
                            Boolean(formik.errors.expenseType)
                          }
                        >
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={"rent-and-maintenance"}
                          >
                            Rent & Maintenance
                          </MenuItem>
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={"salary"}
                          >
                            Salary
                          </MenuItem>
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={"miscellaneous"}
                          >
                            Miscellaneous
                          </MenuItem>
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={"asset-purchase"}
                          >
                            Asset purchase
                          </MenuItem>
                        </Select>
                        {formik.touched.expenseType &&
                          Boolean(formik.errors.expenseType) && (
                            <FormHelperText error={true}>
                              {formik.touched.expenseType &&
                                formik.errors.expenseType}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                  )}
                  {/* Collaborator */}
                  {selected && (
                    <Grid item xs={12} lg={6}>
                      <FormControl
                        fullWidth
                        size="normal"
                        sx={{
                          "&>label": { fontSize: "14px" },
                        }}
                      >
                        <InputLabel
                          sx={{ textTransform: "capitalize" }}
                          id="demo-simple-select-label"
                        >
                          Collaborator
                        </InputLabel>
                        {/* <Field
                          name="file"
                          render={({ field, form }) => (
                            <>
                              <Select
                                labelId="demo-simple-select-label"
                                id="collaborator"
                                label="Collaborator"
                                sx={{ fontSize: "14px" }}
                                {...field}
                                defaultValue={viewTransaction?.collaborator}
                                onChange={(event) => {
                                  form.setFieldValue(
                                    "collaborator",
                                    event.target.value
                                  );
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
                              {formik.touched.collaborator &&
                                Boolean(formik.errors.collaborator) && (
                                  <FormHelperText error={true}>
                                    {formik.touched.collaborator &&
                                      formik.errors.collaborator}
                                  </FormHelperText>
                                )}
                            </>
                          )}
                        /> */}
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Collaborator"
                          name="collaborator"
                          value={formik.values.collaborator}
                          onChange={(e) =>
                            formik.setFieldValue("collaborator", e.target.value)
                          }
                          sx={{ fontSize: "14px" }}
                          error={
                            formik.touched.collaborator &&
                            Boolean(formik.errors.collaborator)
                          }
                        >
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={"pixel"}
                          >
                            Pixel
                          </MenuItem>
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={"simpliigence"}
                          >
                            Simpliigence
                          </MenuItem>
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={"rewenewd"}
                          >
                            Rewenewd
                          </MenuItem>
                        </Select>
                        {formik.touched.collaborator &&
                          Boolean(formik.errors.collaborator) && (
                            <FormHelperText error={true}>
                              {formik.touched.collaborator &&
                                formik.errors.collaborator}
                            </FormHelperText>
                          )}
                      </FormControl>
                    </Grid>
                  )}
                  {/* Invoice Type */}
                  <Grid item xs={12} lg={6}>
                    <FormControl
                      fullWidth
                      size="normal"
                      sx={{
                        "&>label": { fontSize: "14px" },
                      }}
                    >
                      <InputLabel
                        sx={{ textTransform: "capitalize" }}
                        id="demo-simple-select-label"
                      >
                        Invoice Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Invoice Type"
                        name="invoiceType"
                        value={formik.values.invoiceType}
                        onChange={(e) =>
                          formik.setFieldValue("invoiceType", e.target.value)
                        }
                        sx={{ fontSize: "14px" }}
                        error={
                          formik.touched.invoiceType &&
                          Boolean(formik.errors.invoiceType)
                        }
                      >
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          value={"inbound"}
                        >
                          Inbound
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          value={"outbound"}
                        >
                          Outbound
                        </MenuItem>
                      </Select>
                      {formik.touched.invoiceType &&
                        Boolean(formik.errors.invoiceType) && (
                          <FormHelperText error={true}>
                            {formik.touched.invoiceType &&
                              formik.errors.invoiceType}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  {/* Invoice Owner */}
                  <Grid item xs={12} md={6}>
                    <TextField
                      id="invoice-owner"
                      label="Invoice Owner"
                      defaultValue=""
                      name="invoiceOwner"
                      onChange={formik.handleChange}
                      value={formik.values.invoiceOwner}
                      sx={{ width: "100%", "& > *": { fontSize: 14 } }}
                      error={
                        formik.touched.invoiceOwner &&
                        Boolean(formik.errors.invoiceOwner)
                      }
                      helperText={
                        formik.touched.invoiceOwner &&
                        formik.errors.invoiceOwner
                      }
                    />
                  </Grid>
                  {/* Payment Method */}
                  <Grid item xs={12} lg={6}>
                    <FormControl
                      fullWidth
                      size="normal"
                      sx={{
                        "&>label": { fontSize: "14px" },
                      }}
                    >
                      <InputLabel
                        sx={{ textTransform: "capitalize" }}
                        id="demo-simple-select-label"
                      >
                        Payment Method
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Payment Method"
                        name="paymentMethod"
                        value={formik.values.paymentMethod}
                        onChange={(e) =>
                          formik.setFieldValue("paymentMethod", e.target.value)
                        }
                        sx={{ fontSize: "14px" }}
                        error={
                          formik.touched.paymentMethod &&
                          Boolean(formik.errors.paymentMethod)
                        }
                      >
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          value={"card"}
                        >
                          Card
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          value={"bankTransfer"}
                        >
                          Bank Transfer
                        </MenuItem>
                      </Select>
                      {formik.touched.paymentMethod &&
                        Boolean(formik.errors.paymentMethod) && (
                          <FormHelperText error={true}>
                            {formik.touched.paymentMethod &&
                              formik.errors.paymentMethod}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  {/* Invoice Upload */}
                  <Grid item xs={12} lg={6}>
                    <ImageUploder
                      formik={formik}
                      name="invoiceUpload"
                      title="Invoice Upload"
                      fileTypes={[".jpeg", ".jpg", "pdf", ".png"]}
                      doc={viewTransaction?.invoiceUpload}
                      removeDocument={(data) =>
                        formik.setFieldValue("invoiceUpload", "")
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <ThemeButton
                      success
                      Text={
                        location.pathname.includes("/edit/")
                          ? "Edit Entry"
                          : "Add Entry"
                      }
                      type="submit"
                    />
                  </Grid>
                </Grid>
              </Box>
            </FormikProvider>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default AccountAdd;
