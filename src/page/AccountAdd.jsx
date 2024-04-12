import React, { useEffect, useState, useCallback } from "react";
import SectionHeader from "../component/SectionHeader";
import { Box, Button, Card, FormControl, Grid, Tooltip } from "@mui/material";
import ImageUploder from "../component/form/ImageUploder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ThemeButton from "../component/ThemeButton";
import { FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import * as Yup from "yup";
import AddClientsModal from "../component/AddClientsModal";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CustomRadioButton from "../component/form/input/CustomRadioButton";
import CustomDate from "../component/form/input/CustomDate";
import CustomInput from "../component/form/input/CustomInput";
import CustomSelect from "../component/form/input/CustomSelect";
import CustomAutocomplete from "../component/form/input/CustomAutocomplete";

const invoiceOwnerList = ["Shunyavkash", "Hiren Polara", "Jaydip Suvagiya"];

const EXPENSE_TYPE = [
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];
const INVOICE_TYPES = [
  { value: "inbound", label: "Inbound" },
  { value: "outbound", label: "Outbound" },
];
const EXPENSE_OPTIONS = [
  { value: "rent-and-maintenance", label: "Rent & Maintenance" },
  { value: "salary", label: "Salary" },
  { value: "miscellaneous", label: "Miscellaneous" },
  { value: "asset-purchase", label: "Asset Purchase" },
];

const PAYMENT_METHOD_OPTIONS = [
  { label: "Cash", value: "card" },
  { label: "Bank Transfer", value: "bankTransfer" },
  { label: "UPI", value: "upi" },
];

function AccountAdd() {
  const [viewTransaction, setViewTransaction] = useState(false);
  const [clientList, setClientList] = useState([]);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
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
      type: viewTransaction?.type || "income",
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

  useEffect(() => {
    if (formik.values.date === "") {
      formik.setFieldValue("date", new Date().toISOString());
    }
  }, [formik, formik.values.date]);
  // useEffect(() => {
  //   if (formik.values.type === "income") {
  //     formik.setFieldValue("invoiceType", "outbound");
  //   } else if (formik.values.type === "expense") {
  //     formik.setFieldValue("invoiceType", "inbound");
  //   }
  // }, [formik, formik.values.type]);
  const getTransaction = useCallback(
    async (id) => {
      try {
        const res = await apiCall({
          url: APIS.ACCOUNTMANAGE.GET(id),
          method: "get",
        });
        if (res.data.success === true) {
          setViewTransaction(res.data.data);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
    [apiCall, setSnack]
  );
  const fetchClients = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.LIST,
        method: "get",
        params: { limit: 1000 },
      });
      if (res.data.success === true) {
        let data = res.data.data.data;
        setClientList([
          ...data.map((client) => ({ label: client.name, value: client._id })),
          {
            label: (
              <Box sx={{ display: "flex" }}>
                <ThemeButton
                  Text="Add Client"
                  buttonStyle={{ maxHeight: "36px" }}
                  onClick={() => setOpen(true)}
                />
              </Box>
            ),
            value: "",
          },
        ]);
        return res.data.data.data;
      }
    } catch (error) {
      console.error(error, setSnack);
    }
  }, [apiCall, setSnack]);
  // delete employee and user
  const deleteEmpandman = async () => {
    try {
      const res = await apiCall({
        url: APIS.ACCOUNTMANAGE.DELETE(id),
        method: "delete",
      });
      if (res.status === 200) {
        setSnack(res.data.message);
        navigate("/account-management");
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    if (id) {
      getTransaction(id);
    }
  }, [id, getTransaction]);

  return (
    <>
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
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    "& > .MuiFormControl-root": {
                      display: "flex",
                      flexDirection: "row",
                    },
                  }}
                >
                  <FormControl
                    fullWidth
                    sx={{
                      "& > .MuiFormGroup-root": {
                        width: "auto",
                        marginRight: "auto",
                      },
                    }}
                  >
                    <CustomRadioButton
                      formik={formik}
                      radioOptions={EXPENSE_TYPE}
                      name={"type"}
                    />
                    {location.pathname.includes("/edit/") && (
                      <Tooltip title="Delete" sx={{ width: "auto" }} arrow>
                        <Button
                          disableRipple
                          sx={{
                            transition: "all 0.4s ease-in-out",
                          }}
                          onClick={() => deleteEmpandman()}
                        >
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <CustomDate
                    name="date"
                    label="Date"
                    format="DD/MM/YYYY"
                    formik={formik}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput name="title" label="Title" formik={formik} />
                </Grid>
                <Grid item xs={12}>
                  <CustomInput
                    name="description"
                    label="Description"
                    formik={formik}
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CustomInput name="amount" label="Amount" formik={formik} />
                </Grid>
                {formik.values.type === "expense" && (
                  <Grid item xs={12} lg={6}>
                    <CustomSelect
                      name="expenseType"
                      label="Expense Type"
                      formik={formik}
                      options={EXPENSE_OPTIONS}
                    />
                  </Grid>
                )}
                {/* Collaborator */}
                {formik.values.type === "income" && (
                  <Grid item xs={12} lg={6}>
                    <CustomSelect
                      formik={formik}
                      name="collaborator"
                      label="Collaborator"
                      options={clientList}
                    />
                    <AddClientsModal
                      open={open}
                      setOpen={setOpen}
                      onSuccess={async (id) => {
                        await fetchClients();
                        formik.setFieldValue("collaborator", id);
                      }}
                    />
                  </Grid>
                )}
                {/* Invoice Type */}
                <Grid item xs={12} lg={6}>
                  <CustomSelect
                    name="invoiceType"
                    label="Invoice Type"
                    formik={formik}
                    options={INVOICE_TYPES}
                  />
                </Grid>
                {/* Invoice Owner */}
                <Grid item xs={12} md={6}>
                  <CustomAutocomplete
                    name="invoiceOwner"
                    label="Invoice Owner"
                    formik={formik}
                    options={invoiceOwnerList}
                  />
                </Grid>
                {/* Payment Method */}
                <Grid item xs={12} lg={6}>
                  <CustomSelect
                    name="paymentMethod"
                    label="Payment Method"
                    formik={formik}
                    options={PAYMENT_METHOD_OPTIONS}
                  />
                </Grid>
                {/* Invoice Upload  */}
                <Grid item xs={12} lg={6}>
                  <ImageUploder
                    formik={formik}
                    name="invoiceUpload"
                    title="Invoice Upload"
                    fileTypes={[".jpeg", ".jpg", "pdf", ".png"]}
                    doc={viewTransaction?.invoiceUpload}
                    removeDocument={(name) => formik.setFieldValue(name, "")}
                    style={{
                      py: 0.75,
                      "& .react-file-reader-button": {
                        display: "flex",
                        "& > div": { py: 0.5 },
                      },
                    }}
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
    </>
  );
}

export default AccountAdd;
