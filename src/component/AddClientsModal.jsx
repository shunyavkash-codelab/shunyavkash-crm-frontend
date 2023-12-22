import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
// import CloseIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

// const style = {
//   // @media only screen and(max-width: 768px){
//   // height: "100vh",
//   // }
// };

export default function AddClientsModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      clientId: "",
      description: "",
      startDate: "",
      endDate: "",
      perHourCharge: "",
      payPeriod: "",
      prefix: "",
      status: "",
    },
    onSubmit: async (values) => {
      // try {
      //   values.currency = currencyValue?.symbol;
      //   const res = await apiCall({
      //     url: APIS.PROJECT.ADD,
      //     method: "post",
      //     data: JSON.stringify(values, null, 2),
      //   });
      //   if (res.status === 201) {
      //     setSnack(res.data.message);
      //     navigate("/clients");
      //   }
      // } catch (error) {
      //   let errorMessage = error.response.data.message;
      //   setSnack(errorMessage, "warning");
      // }
    },
  });
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        setOpen={setOpen}
      >
        <Fade in={open}>
          <Box
            sx={{
              position: { xs: "relative", sm: "absolute" },
              top: { xs: 0, sm: "50%" },
              left: { xs: 0, sm: "50%" },
              transform: { xs: "translate(0)", sm: "translate(-50%, -50%)" },
              width: { xs: "100%", sm: 600 },
              height: { xs: "100vh", sm: "unset" },
              bgcolor: "background.paper",
              borderRadius: { xs: 0, sm: 2 },
              boxShadow: 24,
              p: 4,
            }}
            className="modal"
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Button
                disableRipple
                disableElevation
                component="label"
                variant="contained"
                id="cancle_icon"
                className="modalCloseBtn"
                startIcon={
                  <CloseIcon
                    sx={{
                      fontSize: "unset",
                    }}
                    open={open}
                    onClick={handleClose}
                    aria-label="close"
                  />
                }
                sx={{
                  color: "#ffffff",
                  position: "absolute",
                  top: 0,
                  right: 0,
                  transform: { xs: "0", sm: "Translate(24px, -22px)" },
                  borderRadius: "100%",
                  minWidth: "unset",
                  bgcolor: "primary.main",
                }}
              ></Button>
              <Typography
                variant="h5"
                sx={{ mb: 2.5, textTransform: "capitalize" }}
              >
                Add Client
              </Typography>
            </Box>

            <Box
              sx={{ display: "grid", gap: 2.25, width: "100%" }}
              id="transition-modal-title"
            >
              <Box
                sx={{
                  display: "block",
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    id="name"
                    label="Name"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.name}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "block",
                }}
              >
                <Box>
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
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "block",
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    id="number"
                    label="Number"
                    type="tel"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.number}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "block",
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    id="companyName"
                    label="Company Name"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.companyName}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "block",
                }}
              >
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    label="Address"
                    autoComplete="off"
                    multiline
                    rows={2}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                  />
                </Box>
              </Box>
              {/* <Typography
                id="transition-modal-description"
                sx={{ mt: 2 }}
              ></Typography> */}
            </Box>
          </Box>
        </Fade>
        {/* <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            bgcolor: "background.white",
            position: "absolute",
            top: { xs: 0, md: "50%" },
            left: { xs: 0, md: "50%" },
            transform: { md: "translate(-50%, -50%)" },
            padding: 3,
            pt: { xs: 0, md: 3 },
            width: { xs: "100%", md: "620px" },
            height: { xs: "100vh", md: "unset" },
            borderRadius: { md: 2.5 },
            overflowY: { xs: "auto", md: "unset" },
            display: { md: "flex" },
            flexDirection: { md: "column" },
            maxHeight: { md: "88vh" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
              pt: { xs: 1.5, md: 0 },
              pb: 2.25,
              position: { xs: "sticky", md: "unset" },
              top: { xs: 0, md: "unset" },
              bgcolor: "white",
              zIndex: 2,
              flexShrink: { md: 0 },
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              sx={{
                fontSize: { xs: "18px", sm: "22px", md: "18px" },
                textTransform: "capitalize",
              }}
            >
              Add new manager
            </Typography>
            <Box
              onClick={() => setOpen(false)}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "44px",
                width: "44px",
                borderRadius: "100%",
                bgcolor: "text.primary",
                color: "white",
                cursor: "pointer",
                position: { md: "absolute" },
                top: { md: 0 },
                right: { md: 0 },
                transform: { md: "translate(50%, -50%)" },
              }}
            >
              <CloseIcon sx={{ transform: "rotate(45deg)" }} />
            </Box>
          </Box>
          <Box
            sx={{
              pt: 0.75,
              flexGrow: { md: 0 },
              overflowY: { md: "auto" },
              "&>*:not(:first-child)": { mt: 2 },
              "& fieldset": {
                borderRadius: 1.5,
                "& legend": { fontSize: "0.65em" },
              },
            }}
          >
            <TextField
              fullWidth
              size="small"
              required
              id="name"
              label="Name"
              autoComplete="off"
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
              }}
            />
            <TextField
              fullWidth
              size="small"
              required
              id="email"
              label="Email"
              autoComplete="off"
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
              }}
            />
            <TextField
              required
              fullWidth
              size="small"
              id="mobile"
              label="Mobile Number"
              type="phone"
              autoComplete="off"
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
              }}
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
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="Gender"
                onChange={handleChange}
                sx={{ fontSize: "14px" }}
              >
                <MenuItem sx={{ textTransform: "capitalize" }} value={"male"}>
                  Male
                </MenuItem>
                <MenuItem sx={{ textTransform: "capitalize" }} value={"female"}>
                  Female
                </MenuItem>
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={"transgender"}
                >
                  Transgender
                </MenuItem>
              </Select>
            </FormControl>
            <TextField
              required
              fullWidth
              size="small"
              id="outlined-string"
              label="Company Name"
              autoComplete="off"
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
              }}
            />
            <TextField
              fullWidth
              size="small"
              id="outlined-string"
              label="Website"
              autoComplete="off"
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
              }}
            />
            <TextField
              fullWidth
              size="small"
              id="outlined-string"
              label="Address"
              autoComplete="off"
              multiline
              rows={2}
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
              }}
            />
            <Box>
              <Typography variant="subtitle2" sx={{ lineHeight: 1, mb: 1 }}>
                Profile Image
              </Typography>
              <Button
                disableRipple
                disableElevation
                component="label"
                variant="contained"
                id="profile_img"
                startIcon={<CloudUploadIcon />}
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  borderRadius: 1.5,
                  bgcolor: "transparent",
                  border: "1px solid rgba(0,0,0,0.15)",
                  boxShadow: "none",
                  color: "text.primary",
                  transition: "0s",
                  ":hover": {
                    bgcolor: "transparent",
                    borderColor: "text.primary",
                  },
                }}
              >
                Profile Image
                <VisuallyHiddenInput id="test" type="file" />
              </Button>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ lineHeight: 1, mb: 1 }}>
                Company Logo
              </Typography>
              <Button
                disableRipple
                disableElevation
                component="label"
                variant="contained"
                id="company_logo"
                startIcon={<CloudUploadIcon />}
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  borderRadius: 1.5,
                  bgcolor: "transparent",
                  border: "1px solid rgba(0,0,0,0.15)",
                  boxShadow: "none",
                  color: "text.primary",
                  transition: "0s",
                  ":hover": {
                    bgcolor: "transparent",
                    borderColor: "text.primary",
                  },
                }}
              >
                Company Logo
                <VisuallyHiddenInput id="test" type="file" />
              </Button>
            </Box>
            <Button
              disableRipple
              sx={{
                px: 2.5,
                py: 1.5,
                bgcolor: "success.main",
                color: "white",
                lineHeight: 1,
                borderRadius: 2.5,
                maxHeight: "42px",
                "&:hover": { bgcolor: "rgb(74, 210, 146, 80%)" },
              }}
            >
              Submit
            </Button>
          </Box>
        </Box> */}
      </Modal>
    </>
  );
}
