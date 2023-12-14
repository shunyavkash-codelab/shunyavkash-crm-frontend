import React, { useEffect, useRef, useState } from "react";
import { styled, Button } from "@mui/material";
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
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth } from "../hooks/store/useAuth";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import FileUploadButton from "../component/FileUploadButton";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function AddManager({ open, setOpen }) {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [managerList, setManagerList] = useState([]);
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
      reference: "",
      profile_img: undefined,
      companyLogo: undefined,
      signature: undefined,
      mobileCode: "+1",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.MANAGER.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 201) {
          setSnack(res.data.message);
          navigate("/managers");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  const fetchManagers = async () => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setManagerList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchManagers();
  }, []);

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
              Add Manager
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              Add Manager
            </Typography>
          </Box>
          <FormikProvider value={formik}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
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
                    Reference
                  </InputLabel>
                  <Field
                    name="file"
                    render={({ field, form }) => (
                      <Select
                        labelId="demo-simple-select-label"
                        id="reference"
                        label="Reference"
                        sx={{ fontSize: "14px" }}
                        {...field}
                        onChange={(event) => {
                          form.setFieldValue("reference", event.target.value);
                        }}
                      >
                        {managerList.map((item) => (
                          <MenuItem
                            sx={{ textTransform: "capitalize" }}
                            value={item._id}
                          >
                            {item.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                {/* <TextField
                  fullWidth
                  size="small"
                  id="reference"
                  label="Reference"
                  autoComplete="off"
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.reference}
                /> */}
                <TextField
                  fullWidth
                  size="small"
                  id="websiteURL"
                  label="Website"
                  autoComplete="off"
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                    gridColumn: { sm: "span 2" },
                  }}
                  onChange={formik.handleChange}
                  value={formik.values.websiteURL}
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
                <Box sx={{ gridColumn: { sm: "span 2" } }}>
                  <Typography variant="subtitle1" sx={{ lineHeight: 1, mb: 1 }}>
                    Signature
                  </Typography>
                  <FileUploadButton
                    formik={formik}
                    id={"signature"}
                    label={"Signature"}
                  />
                </Box>
                {/* <Box>
            <Typography variant="h6" sx={{}}>
              Company Logo
            </Typography>
            <Button
              component="label"
              variant="contained"
              id="company_logo"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box> */}
                {/* <Box>
            <Typography variant="h6" sx={{}}>
              Signature
            </Typography>
            <Button
              component="label"
              variant="contained"
              id="signature"
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Box> */}
                {/* <Box
            ref={fileInput}
            sx={{
              marginTop: "24px",
              width: "30%",
              display: "grid",
              placeItems: "center",
              gap: "12px",
              position: "relative",
              cursor: "pointer",
            }}
            htmlFor="uploadFile"
            component={"label"}
          >
            <DragDropIcon
              width="100%"
              height="100%"
              color={palette.primary["main"]}
              bg={"white"}
              border={"white"}
            ></DragDropIcon>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <UploadIcon color={"gray"} />
              <Typography
                sx={{
                  mt: "20px",
                  color: "primary.main",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                Upload Your Video Or Photo
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  fontStyle: " normal",
                  lineHeight: "normal",
                  letterSpacing: "-0.408px",
                  color: "primary.main",
                  opacity: 0.85,
                }}
              >
                jpg,png,mp4 up to 100mb
              </Typography>
            </Box>
          </Box> */}
                {/* <Button variant="contained" color="success"></Button> */}
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
                  onClick={() => navigate("/managers")}
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
