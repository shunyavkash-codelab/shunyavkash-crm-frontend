import React from "react";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { Box, Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ModalComponent({ open, setOpen, ...props }) {
  const handleClose = () => setOpen(false);
  const modalSize = props.size;
  const maxWidth = { xs: "100%", sm: 500, md: 600 };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        sx={{ p: { sm: 3.5 } }}
      >
        <Fade in={open}>
          <Box
            className="modal"
            sx={{
              position: { xs: "absolute", sm: "relative" },
              top: { xs: 0, sm: "50%" },
              left: { xs: 0, sm: "50%" },
              transform: { xs: "translate(0)", sm: "translate(-50%, -50%)" },
              width: "100%",
              height: { xs: "100vh", sm: "unset" },
              bgcolor: "background.paper",
              borderRadius: { xs: 0, sm: 2 },
              boxShadow: 24,
              p: 3,
              maxWidth: modalSize === "large" ? "800px" : maxWidth,
              ...props.modelStyle,
            }}
          >
            <Box
              sx={
                props.modalTitle && {
                  display: { xs: "flex", sm: "block" },
                  alignItems: { xs: "center", sm: "start" },
                  justifyContent: { xs: "space-between", sm: "start" },
                  pb: { xs: 1.5, sm: 2.5 },
                  mb: 1.75,
                  borderBottom: "1px solid #f5f5f5",
                }
              }
            >
              {props.modalTitle && (
                <Typography
                  variant="h5"
                  sx={{
                    textTransform: "capitalize",
                    textAlign: { xs: "center", sm: "left" },
                    fontSize: 20,
                    fontWeight: "600",
                  }}
                >
                  {props.modalTitle}
                </Typography>
              )}

              <Button
                onClick={handleClose}
                disableRipple
                disableelevation="true"
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
              sx={{
                maxHeight: { xs: "calc(100vh - 120px)", sm: "80vh" },
                overflowY: "auto",
                pt: 0.75,
              }}
            >
              {props.children}
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
