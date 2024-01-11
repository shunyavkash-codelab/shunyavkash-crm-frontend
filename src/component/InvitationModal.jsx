import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Field, FormikProvider, useFormik } from "formik";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { useInviteMemberStore } from "../hooks/store/useInviteMemberStore.js";
import * as Yup from "yup";

export default function InvitationModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const { setInviteMemberStore } = useInviteMemberStore();

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    email: Yup.string()
      .email("Field should contain a valid e-mail")
      .max(255)
      .required("Email is required.")
      .trim(),
    password: Yup.string().required("Password is required.").trim(),
    role: Yup.string().required("Role is required.").trim(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      jobRole: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.EMPLOYEE.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          setOpen(false);
          setInviteMemberStore(res.data.data);
          navigate("/members");
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  return (
    <>
      <Modal open={open} onClose={handleClose} closeAfterTransition>
        <Fade in={open}>
          <Box
            sx={{
              position: "absolute",
              top: { xs: 0, sm: "50%" },
              left: { xs: 0, sm: "50%" },
              transform: { sm: "translate(-50%, -50%)" },
              width: { xs: "100%", sm: "500px" },
              height: { xs: "100vh", sm: "unset" },
              bgcolor: "white",
              borderRadius: { sm: 2.5 },
              py: { xs: 2.25, sm: 2.75 },
              px: { xs: 2.25, sm: 3.25 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", sm: "block" },
                alignItems: "center",
                justifyContent: "space-between",
                mb: 3.25,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Invitation Member
              </Typography>
              <Button
                onClick={() => setOpen(false)}
                disableRipple
                disableElevation
                id="cancle_icon"
                sx={{
                  color: "white",
                  position: { sm: "absolute" },
                  top: { sm: "0" },
                  right: { sm: "0" },
                  transform: { sm: "translate(22px, -22px)" },
                  borderRadius: "100%",
                  minWidth: "unset",
                  p: 0,
                  height: "44px",
                  width: "44px",
                  "&,&:hover": {
                    bgcolor: "text.primary",
                  },
                }}
              >
                <CloseIcon
                  sx={{
                    fontSize: "25px",
                  }}
                  aria-label="close"
                />
              </Button>
            </Box>
            <FormikProvider value={formik}>
              <Box
                component="form"
                autoComplete="off"
                onSubmit={formik.handleSubmit}
              >
                <Box sx={{ display: "grid", gap: 2.25 }}>
                  <TextField
                    fullWidth
                    size="small"
                    id="name"
                    label="Full Name"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "& input": {
                        textTransform: "capitalize",
                      },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="email"
                    label="Email"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                  <Box sx={{ position: "relative" }}>
                    <TextField
                      fullWidth
                      size="small"
                      id="password"
                      label="Password"
                      name="password"
                      autoComplete="off"
                      type={showPassword ? "text" : "password"}
                      sx={{
                        "&>label,& input,&>div": { fontSize: "14px" },
                        "& input": { pr: 5 },
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <Box
                      onClick={handleClickShowPassword}
                      sx={{
                        position: "absolute",
                        top: "9px",
                        right: "16px",
                        opacity: "50%",
                        cursor: "pointer",
                        display: "inline-flex",
                        "& svg": { fontSize: "20px" },
                      }}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </Box>
                  </Box>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      "&>label": { fontSize: "14px" },
                    }}
                    error={formik.touched.role && Boolean(formik.errors.role)}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      Role
                    </InputLabel>
                    <Field
                      name="file"
                      render={({ field, form }) => (
                        <Select
                          id="role"
                          label="Role"
                          sx={{ fontSize: "14px" }}
                          {...field}
                          onChange={(event) => {
                            form.setFieldValue("role", event.target.value);
                          }}
                          helperText={formik.touched.role && formik.errors.role}
                        >
                          {/* <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"superAdmin"}
                          >
                            super admin
                          </MenuItem> */}
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"manager"}
                          >
                            manager
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"employee"}
                          >
                            employee
                          </MenuItem>
                        </Select>
                      )}
                    />
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="jobRole"
                    label="Job Title"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "& input": {
                        textTransform: "capitalize",
                      },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.jobRole}
                    error={
                      formik.touched.jobRole && Boolean(formik.errors.jobRole)
                    }
                    helperText={formik.touched.jobRole && formik.errors.jobRole}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: { xs: "column", sm: "row" },
                    gap: { xs: 1.5, sm: 2 },
                    mt: 2.5,
                  }}
                >
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
                    <span style={{ position: "relative" }}>invite</span>
                  </Button>
                  {/* <Button
                    disableRipple
                    onClick={() => setOpen(false)}
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
                  >
                    <span style={{ position: "relative" }}>discard</span>
                  </Button> */}
                </Box>
              </Box>
            </FormikProvider>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
