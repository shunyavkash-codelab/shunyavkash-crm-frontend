import React, { useState } from "react";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import FileUploadButton from "../component/FileUploadButton";
import { Field, FormikProvider, useFormik } from "formik";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useNavigate } from "react-router-dom";

export default function AddClient() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobileNumber: "",
      gender: "",
      companyName: "",
      websiteURL: "",
      address: "",
      profile_img: undefined,
      companyLogo: undefined,
      mobileCode: "+1",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.CLIENT.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 201) {
          setSnack(res.data.message);
          navigate("/clients");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

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
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              Add Client
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              Add Client
            </Typography>
          </Box>
          <FormikProvider value={formik}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              <Box
                sx={{
                  pt: 0.75,
                  flexGrow: { md: 0 },
                  overflowY: { md: "auto" },
                  "& fieldset": {
                    borderRadius: 2.5,
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
                  label="Name"
                  autoComplete="off"
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.name}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="email"
                  label="Email"
                  autoComplete="off"
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="mobileNumber"
                  label="Mobile Number"
                  type="phone"
                  autoComplete="off"
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.mobileNumber}
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
                    gender
                  </InputLabel>
                  <Field
                    name="file"
                    render={({ field, form }) => (
                      <Select
                        labelId="demo-simple-select-label"
                        id="gender"
                        label="Gender"
                        sx={{ fontSize: "14px" }}
                        {...field}
                        onChange={(event) => {
                          form.setFieldValue("gender", event.target.value);
                        }}
                      >
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          value={"male"}
                        >
                          Male
                        </MenuItem>
                        <MenuItem
                          sx={{ textTransform: "capitalize" }}
                          value={"female"}
                        >
                          Female
                        </MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
                <TextField
                  fullWidth
                  size="small"
                  id="companyName"
                  label="Company Name"
                  autoComplete="off"
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.companyName}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="websiteURL"
                  label="Website"
                  autoComplete="off"
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.websiteURL}
                />
                <TextField
                  fullWidth
                  size="small"
                  id="address"
                  label="Address"
                  autoComplete="off"
                  multiline
                  rows={4}
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                    gridColumn: { sm: "span 2" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                <Box sx={{ gridColumn: { sm: "span 2" } }}>
                  <Typography variant="subtitle1" sx={{ lineHeight: 1, mb: 1 }}>
                    Profile Image
                  </Typography>
                  <FileUploadButton
                    formik={formik}
                    id={"profile_img"}
                    label={"Profile Image"}
                  />
                </Box>
                <Box sx={{ gridColumn: { sm: "span 2" } }}>
                  <Typography variant="subtitle1" sx={{ lineHeight: 1, mb: 1 }}>
                    Company Logo
                  </Typography>
                  <FileUploadButton
                    formik={formik}
                    id={"companyLogo"}
                    label={"Company Logo"}
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  disableRipple
                  sx={{
                    mt: 2.5,
                    px: 2.5,
                    py: 1.5,
                    bgcolor: "success.main",
                    color: "white",
                    lineHeight: 1,
                    borderRadius: 2.5,
                    maxHeight: "42px",
                    "&:hover": { bgcolor: "rgb(74, 210, 146, 80%)" },
                  }}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  disableRipple
                  sx={{
                    mt: 2.5,
                    px: 2.5,
                    py: 1.5,
                    bgcolor: "error.main",
                    color: "white",
                    lineHeight: 1,
                    borderRadius: 2.5,
                    maxHeight: "42px",
                    "&:hover": { bgcolor: "error.light" },
                  }}
                  onClick={() => navigate("/clients")}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </FormikProvider>
        </Box>
      </Box>
    </>
  );
}
