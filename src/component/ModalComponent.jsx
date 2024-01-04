import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Backdrop from "@mui/material/Backdrop";

export default function SendSalaryModal({ open, setOpen, ...props }) {
  const handleClose = () => setOpen(false);
  const modalSize = props.size;
  const modalStyle = {
    position: { xs: "absolute", sm: "relative" },
    top: { xs: 0, sm: "50%" },
    left: { xs: 0, sm: "50%" },
    transform: { xs: "translate(0)", sm: "translate(-50%, -50%)" },
    width: "100%",
    maxWidth: { xs: "100%", sm: 500, md: 600 },
    height: { xs: "100vh", sm: "unset" },
    bgcolor: "background.paper",
    borderRadius: { xs: 0, sm: 2 },
    boxShadow: 24,
    p: 3,
  };
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box
            sx={modalStyle}
            className="modal"
            style={modalSize === "large" ? { maxWidth: 800 } : ""}
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
                  fontSize: 20,
                  fontWeight: "600",
                  pb: 2.5,
                  borderBottom: "1px solid #f5f5f5",
                }}
              >
                {props.modalTitle}
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
            <Box sx={{ maxHeight: "80vh", overflowY: "auto" }}>
              {props.children}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
