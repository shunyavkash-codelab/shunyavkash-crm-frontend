import React, { useState } from "react";
import SideBar from "../component/SideBar";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
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
import { Link, useNavigate } from "react-router-dom";
import ThemeButton from "../component/ThemeButton";
import { useFormik } from "formik";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import * as Yup from "yup";

function AccountAdd() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const [selected, setSelected] = useState(true);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();

  const formik = useFormik({
    validationSchema: Yup.object({
      type: Yup.string().required("Transaction type is required."),
      date: Yup.date().required("Date is required."),
      title: Yup.string().required("Title is required."),
      description: Yup.string().required("Description is required."),
      amount: Yup.number().required("Amount is required."),
      expanseType: Yup.string(),
      invoiceOwner: Yup.string().required("InvoiceOwner is required."),
      invoiceType: Yup.string().required("InvoiceType is required."),
      paymentMethod: Yup.string().required("paymentMethod is required."),
      collaborator: Yup.string(),
    }),
    enableReinitialize: true,
    initialValues: {
      type: "",
      date: "",
      title: "",
      description: "",
      amount: "",
      expanseType: "",
      invoiceOwner: "",
      invoiceType: "",
      paymentMethod: "",
      collaborator: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.ACCOUNTMANAGE.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          navigate("/account-management");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  const changeHandler = (e) => {
    setSelected(e.target.value);
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
      <Box sx={{ ml: { lg: sideBarWidth } }}>
        <Box component="main">
          <Box>
            <Typography
              variant="h5"
              sx={{ textTransform: "capitalize", mb: 0.5 }}
            >
              Add Entry
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Link to="/account-management" style={{ textDecoration: "none" }}>
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
                  A/c Management /
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                Add Entry
              </Typography>
            </Box>
          </Box>
          <Card
            sx={{
              p: 3,
              mt: 3,
              border: 0,
              borderRadius: 3,
              boxShadow: "none",
              maxWidth: 600,
            }}
          >
            <Box component="form" onSubmit={formik.handleSubmit}>
              <Grid container rowSpacing={2.5} columnSpacing={2.5}>
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
                    >
                      <FormControlLabel
                        value="income"
                        control={<Radio />}
                        label="Income"
                        onClick={() => setSelected(true)}
                      />
                      <FormControlLabel
                        value="expance"
                        control={<Radio />}
                        label="Expance"
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
                      error={formik.touched.date && Boolean(formik.errors.date)}
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
                    sx={{
                      width: "100%",
                      "& > .MuiFormLabel-root": { fontSize: 14 },
                    }}
                    error={formik.touched.title && Boolean(formik.errors.title)}
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
                        name="expanseType"
                        value={formik.values.expanseType}
                        onChange={(e) =>
                          formik.setFieldValue("expanseType", e.target.value)
                        }
                        sx={{ fontSize: "14px" }}
                        error={
                          formik.touched.expanseType &&
                          Boolean(formik.errors.expanseType)
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
                      {formik.touched.expanseType &&
                        Boolean(formik.errors.expanseType) && (
                          <FormHelperText error={true}>
                            {formik.touched.expanseType &&
                              formik.errors.expanseType}
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
                    sx={{ width: "100%", "& > *": { fontSize: 14 } }}
                    error={
                      formik.touched.invoiceOwner &&
                      Boolean(formik.errors.invoiceOwner)
                    }
                    helperText={
                      formik.touched.invoiceOwner && formik.errors.invoiceOwner
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
                {/* Invoice Upload */}
                <Grid item xs={12} lg={6}>
                  <ImageUploder
                    name="invoiceUpload"
                    title="Invoice Upload"
                    fileTypes={[".jpeg", ".jpg", "pdf", ".png"]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <ThemeButton success Text="add entry" type="submit" />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default AccountAdd;
