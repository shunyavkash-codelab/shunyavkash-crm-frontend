import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box, Button, Typography } from "@mui/material";
import { useFormik } from "formik";
// import CloseIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { Children } from "react";

// const style = {
//   // @media only screen and(max-width: 768px){
//   // height: "100vh",
//   // }
// };

export default function ModalComponent({ open, setOpen }) {
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
              position: { xs: "absolute", sm: "relative" },
              top: { xs: 0, sm: "50%" },
              left: { xs: 0, sm: "50%" },
              transform: { xs: "translate(0)", sm: "translate(-50%, -50%)" },
              width: { xs: "100%", sm: 500, md: 600 },
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
                display: { xs: "flex", sm: "block" },
                alignItems: { xs: "center", sm: "start" },
                justifyContent: { xs: "space-between", sm: "start" },
                mb: 2.5,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  textTransform: "capitalize",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {Children.title}
              </Typography>
              <Button
                disableRipple
                disableElevation
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
                  display: "inline-flex",
                  alignItems: "center",
                  color: "#ffffff",
                  position: { xs: "relative", sm: "absolute" },
                  top: { xs: "unset", sm: "0" },
                  right: { xs: "unset", sm: "0" },
                  transform: {
                    xs: "translate(0)",
                    sm: "translate(24px, -22px)",
                  },
                  borderRadius: "100%",
                  minWidth: "unset",
                  p: 0,
                  // bgcolor: "primary.main",
                }}
              ></Button>
            </Box>
            {Children}
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
