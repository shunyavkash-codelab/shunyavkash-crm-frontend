import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box, TextField, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { APIS } from "../../api/apiList.js";
import { useSnack } from "../../hooks/store/useSnack.js";
import useApi from "../../hooks/useApi";
import ThemeButton from "../ThemeButton.jsx";

export default function InvoiceInputForm({
  open,
  setOpen,
  label,
  val,
  uniqId,
  identify,
  onSuccess = () => {},
}) {
  const handleClose = () => setOpen(false);
  const { apiCall } = useApi();
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
      description: "",
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
        let res;
        if (identify === 1) {
          res = await apiCall({
            url: APIS.ADMIN.EDIT,
            method: "patch",
            data: JSON.stringify(nonBlankValues, null, 2),
          });
        } else if (identify === 2) {
          res = await apiCall({
            url: APIS.CLIENT.EDIT(uniqId),
            method: "patch",
            data: JSON.stringify(nonBlankValues, null, 2),
          });
        } else if (identify === 3) {
          res = await apiCall({
            url: APIS.PROJECT.EDIT(uniqId),
            method: "patch",
            data: JSON.stringify(nonBlankValues, null, 2),
          });
        } else if (identify === 4) {
          res = await apiCall({
            url: APIS.ADMIN.EDIT,
            method: "patch",
            data: JSON.stringify(nonBlankValues, null, 2),
          });
        } else if (identify === 5) {
          res = await apiCall({
            url: APIS.ADMIN.EDIT,
            method: "patch",
            data: JSON.stringify(nonBlankValues, null, 2),
          });
        }

        if (res.data.success === true) {
          setSnack(res.data.message);
          console.log(res.data.data);
          setOpen(false);
          onSuccess();
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
                onClick={handleClose}
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
                  aria-label="close"
                />
              </Button>
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
                      multiline
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
                <ThemeButton success Text="Submit" type="submit" />
                <ThemeButton discard Text="discard" />
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
