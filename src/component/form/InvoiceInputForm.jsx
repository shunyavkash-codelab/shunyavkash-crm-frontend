import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box, TextField, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { APIS } from "../../api/apiList.js";
import { useSnack } from "../../hooks/store/useSnack.js";
import useApi from "../../hooks/useApi";

export default function InvoiceInputForm({
  open,
  setOpen,
  fields,
  label,
  val,
}) {
  const handleClose = () => setOpen(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();

  const formik = useFormik({
    initialValues: {
      address: "",
      address2: "",
      landmark: "",
      pincode: "",
      email: "",
      mobileNumber: "",
      mobileCode: "",
    },
    onSubmit: async (values) => {
      const nonBlankValues = Object.entries(values).reduce(
        (acc, [key, value]) => {
          // Check if the value is not blank (empty or undefined)
          if (value !== "" && value !== undefined) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );
      try {
        const res = await apiCall({
          url: APIS.ADMIN.EDIT,
          method: "patch",
          data: JSON.stringify(nonBlankValues, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          console.log(res.data.data);
          setOpen(false);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
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
              position: { xs: "absolute", sm: "relative" },
              top: { xs: 0, sm: "50%" },
              left: { xs: 0, sm: "50%" },
              transform: { xs: "translate(0)", sm: "translate(-50%, -50%)" },
              width: { xs: "100%", sm: 500, md: 600 },
              height: { xs: "100vh", sm: "unset" },
              bgcolor: "background.paper",
              borderRadius: { xs: 0, sm: 2 },
              boxShadow: 24,
              py: 4,
              px: { xs: 2, sm: 4 },
            }}
            className="modal"
          >
            <Box
              sx={{
                display: { xs: "flex", sm: "block" },
                alignItems: { xs: "center", sm: "start" },
                justifyContent: { xs: "space-between", sm: "start" },
                mb: 3.75,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textTransform: "capitalize",
                  fontSize: { xs: "24px", sm: "26px" },
                }}
              >
                {label}
              </Typography>
              <Button
                disableRipple
                disableElevation
                variant="contained"
                id="cancle_icon"
                className="modalCloseBtn"
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  color: "white",
                  position: { xs: "static", sm: "absolute" },
                  top: { sm: "0" },
                  right: { sm: "0" },
                  transform: {
                    sm: "translate(22px, -22px)",
                  },
                  borderRadius: "100%",
                  minWidth: "unset",
                  p: 0,
                  flexShrink: 0,
                  width: { xs: "36px", sm: "44px" },
                  height: { xs: "36px", sm: "44px" },
                }}
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
              ></Button>
            </Box>
            <Box
              component="form"
              autoComplete="off"
              onSubmit={formik.handleSubmit}
            >
              {val.map((obj, index) =>
                Object.entries(obj).map(([key, value]) => (
                  <Box
                    key={index + key} // Make sure to provide a unique key for each iteration
                    sx={{
                      display: "grid",
                      gap: 2.25,
                      width: "100%",
                      marginBottom: "10px",
                    }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      id={key}
                      label={key}
                      autoComplete="off"
                      defaultValue={value}
                      sx={{
                        "&>label,& input,&>div": { fontSize: "14px" },
                      }}
                      onChange={formik.handleChange}
                      value={formik.values.key}
                    />
                  </Box>
                ))
              )}

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
                  <span style={{ position: "relative" }}>Submit</span>
                </Button>
                <Button
                  disableRipple
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
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
