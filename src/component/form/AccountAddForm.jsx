import { Box, Button, FormControl, Grid, Tooltip } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import CustomRadioButton from "./input/CustomRadioButton";
import CustomDate from "./input/CustomDate";
import CustomInput from "./input/CustomInput";
import CustomSelect from "./input/CustomSelect";
import AddClientsModal from "../AddClientsModal";
import CustomAutocomplete from "./input/CustomAutocomplete";
import ImageUploder from "./ImageUploder";
import ThemeButton from "../ThemeButton";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";
import { useSnack } from "../../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";

const INVOICE_OWNERS_OPTIONS = [
  "Shunyavkash",
  "Hiren Polara",
  "Jaydip Suvagiya",
];
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

export default function AccountAddForm({
  viewTransaction,
  id,
  deleteEmpandman,
  clientList,
  isEdit,
  newClientId,
}) {
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
    if (newClientId) {
      formik.setFieldValue("collaborator", newClientId);
    }
  }, [newClientId, formik]);

  useEffect(() => {
    if (formik.values.date === "") {
      formik.setFieldValue("date", new Date().toISOString());
    }
  }, [formik, formik.values.date]);
  return (
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
              {isEdit && (
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
              options={INVOICE_OWNERS_OPTIONS}
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
              Text={isEdit ? "Edit Entry" : "Add Entry"}
              type="submit"
            />
          </Grid>
        </Grid>
      </Box>
    </FormikProvider>
  );
}
