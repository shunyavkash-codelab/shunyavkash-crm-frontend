import { Box, Typography } from "@mui/material";
import { FormikProvider, useFormik } from "formik";
import React from "react";
import CustomInput from "./formik/CustomInput";
import MobileNumberInput from "./formik/MobileNumberInput";
import FileUploadButton from "../FileUploadButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnack } from "../../hooks/store/useSnack";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";
import * as Yup from "yup";
import ThemeButton from "../ThemeButton";

export default function AddClientForm({ id, initialValues, clientList }) {
  const { setSnack } = useSnack();
  const location = useLocation();
  const navigate = useNavigate();
  const { apiCall, isLoading } = useApi();
  const schema = Yup.object({
    name: Yup.string()
      .required("Name is required.")
      .trim()
      .matches(
        /^[a-zA-Z\s]*$/,
        "Only alphabets and spaces are allowed in the name."
      ),
    email: Yup.string()
      .email("Field should contain a valid e-mail")
      .max(255)
      .required("Email is required.")
      .trim(),
    mobileNumber: Yup.string()
      .required("Mobile number is required.")
      .matches(/^\+?[0-9]{10}$/, {
        message: "Mobile number should consist of exactly 10 numerical digits.",
      })
      .max(12, "Mobile number should not exceed 12 characters.")
      .min(10, "Mobile number should be at least 10 characters."),

    websiteURL: Yup.string().url("Invalid URL"),
    accountNumber: Yup.number(),
    IFSC: Yup.string().length(11),

    bankName: Yup.string(),
    holderName: Yup.string(),
  });
  const onFormSubmit = async (values) => {
    let formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      const res = await apiCall({
        url: id ? APIS.CLIENT.EDIT(id) : APIS.CLIENT.ADD,
        method: id ? "patch" : "post",
        headers: "multipart/form-data",
        data: formData,
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        !id && navigate("/clients");
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };
  const formik = useFormik({
    validationSchema: schema,
    initialValues: initialValues,
    enableReinitialize: true,
    onSubmit: onFormSubmit,
    validateOnBlur: true,
  });
  return (
    <FormikProvider value={formik}>
      <Box
        component="form"
        autoComplete="off"
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        sx={{
          p: 2.5,
          pt: 1.75,
          backgroundColor: "white",
          borderRadius: 2.5,
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
          <CustomInput
            formik={formik}
            label={"Full Name"}
            name={"name"}
            sx={{ "& input": { textTransform: "capitalize", py: 1.5 } }}
          />
          <CustomInput
            formik={formik}
            label={"Email"}
            sx={{ "& input": { py: 1.5 } }}
            name={"email"}
          />
          <MobileNumberInput formik={formik} />
          <CustomInput
            formik={formik}
            label="Company Name"
            name={"companyName"}
            sx={{ "& input": { textTransform: "capitalize", py: 1.5 } }}
          />
          <CustomInput
            formik={formik}
            name="websiteURL"
            label="Website"
            sx={{ "& input": { py: 1.5 }, gridColumn: { sm: "span 2" } }}
          />
          <CustomInput
            name="address"
            label="Address"
            formik={formik}
            multiline
            rows={4}
            InputProps={{
              readOnly: location.pathname.includes("/view/"),
            }}
            sx={{
              "&>label,& input,&>div": { fontSize: "14px" },
              "&>label": { top: "4px" },
              "&>div": { py: 1.5 },
              gridColumn: { sm: "span 2" },
            }}
          />
          <Box sx={{ gridColumn: { sm: "span 2", md: "span 1" } }}>
            <FileUploadButton
              formik={formik}
              title={"Profile Image"}
              id={"profile_img"}
              label={"Profile Image"}
              value={clientList.profile_img}
              view={location.pathname.includes("/view/")}
            />
          </Box>
          <Box sx={{ gridColumn: { sm: "span 2", md: "span 1" } }}>
            <FileUploadButton
              formik={formik}
              title={"Company Logo"}
              id="companyLogo"
              label="Company Logo"
              value={clientList.companyLogo}
              view={location.pathname.includes("/view/")}
            />
          </Box>
        </Box>

        <Box
          sx={{
            mt: 3,
            py: 2.5,
            backgroundColor: "white",
            borderRadius: 2.5,
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
              pb: 2,
              mb: 3,
              borderBottom: "1px solid rgba(0,0,0,0.06)",
            }}
          >
            Add Bank Details
          </Typography>
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
            <CustomInput
              name="bankName"
              label="Bank Name"
              formik={formik}
              sx={{ "& input": { py: 1.5 } }}
            />

            <CustomInput
              name="IFSC"
              label="IFSC"
              formik={formik}
              sx={{ "& input": { py: 1.5 } }}
            />

            <CustomInput
              name="holderName"
              label="A/c Holder Name"
              formik={formik}
              sx={{ "& input": { py: 1.5 } }}
            />

            <CustomInput
              fullWidth
              name="accountNumber"
              inputProps={{ maxLength: 14 }}
              label="A/c Number"
              formik={formik}
              sx={{ "& input": { py: 1.5 } }}
            />
          </Box>
        </Box>

        {!location.pathname.includes("/view/") && (
          <Box sx={{ display: "flex", gap: 2, mt: 2.5 }}>
            <ThemeButton
              isLoading={isLoading}
              success
              Text={location.pathname.includes("/edit/") ? "Update" : "Create"}
              type="submit"
            />
            <ThemeButton
              discard
              Text="Discard"
              onClick={() => navigate("/clients")}
            />
          </Box>
        )}
      </Box>
    </FormikProvider>
  );
}
