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

export default function AddClientsModal({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

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
                Invitation Member
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
            <Box component="form" autoComplete="off">
              <Box sx={{ display: "grid", gap: 2.25, width: "100%" }}>
                <TextField
                  fullWidth
                  size="small"
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
                  id="email"
                  label="Email"
                  autoComplete="off"
                  sx={{
                    "&>label,& input,&>div": { fontSize: "14px" },
                  }}
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
                  />
                  <Box
                    onClick={handleClickShowPassword}
                    sx={{
                      position: "absolute",
                      top: "50%",
                      right: "16px",
                      opacity: "50%",
                      cursor: "pointer",
                      transform: "translateY(-50%)",
                      display: "inline-flex",
                      "& svg": { fontSize: "20px" },
                    }}
                  >
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </Box>
                </Box>
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
                    Role
                  </InputLabel>
                  <Select id="role" label="Role" sx={{ fontSize: "14px" }}>
                    <MenuItem
                      sx={{ textTransform: "capitalize", fontSize: "14px" }}
                      value={"Super Admin"}
                    >
                      super admin
                    </MenuItem>
                    <MenuItem
                      sx={{ textTransform: "capitalize", fontSize: "14px" }}
                      value={"Manager"}
                    >
                      manager
                    </MenuItem>
                    <MenuItem
                      sx={{ textTransform: "capitalize", fontSize: "14px" }}
                      value={"Member"}
                    >
                      member
                    </MenuItem>
                  </Select>
                </FormControl>
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
                  <span style={{ position: "relative" }}>Submit</span>
                </Button>
                <Button
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
                </Button>
              </Box>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}
