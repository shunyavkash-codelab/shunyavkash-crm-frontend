import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
import CloseIcon from "@mui/icons-material/Close";
import * as Yup from "yup";

export default function AddClientsModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    email: Yup.string().required("Client is required.").trim(),
    number: Yup.string().required("Start date is required.").trim(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: "",
      email: "",
      number: "",
    },
    onSubmit: async (values) => {
      // try {
      //   values.currency = currencyValue?.symbol;
      //   const res = await apiCall({
      //     url: APIS.CLIENT.ADD,
      //     method: "post",
      //     data: JSON.stringify(values, null, 2),
      //   });
      //   if (res.status === 201) {
      //     setSnack(res.data.message);
      //     setOpen(false);
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
                Add Client
              </Typography>
              <Button
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
                  open={open}
                  onClick={handleClose}
                  aria-label="close"
                />
              </Button>
            </Box>
            <Box component="form" autoComplete="off">
              <Box
                sx={{ display: "grid", gap: 2.25 }}
                id="transition-modal-title"
              >
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
                  error={formik.touched.number && Boolean(formik.errors.number)}
                  helperText={formik.touched.number && formik.errors.number}
                />
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
                <TextField
                  fullWidth
                  size="small"
                  id="address"
                  label="Address"
                  autoComplete="off"
                  multiline
                  rows={4}
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ textAlign: "center", mt: 2.5 }}>
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
                <span style={{ position: "relative" }}>Submit</span>
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
