import React, { useEffect, useRef, useState } from "react";
import { Modal, styled, Button } from "@mui/material";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import DragDropIcon from "./DragDropIcon";
import UploadIcon from "./UploadIcon";
import { useTheme } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Add";

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
  const [gender, setgender] = useState("");
  const fileInput = useRef(null);
  const [file, setFile] = useState([]);
  const { palette } = useTheme();

  const handleChange = (event) => {
    setgender(event.target.value);
  };

  // const handleDragOver = (e) => {
  //   console.log("run");
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log(e);
  //   console.log("test");
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   console.log(e);
  //   const { files: uploadedFiles } = e.dataTransfer;
  //   setFile(uploadedFiles);
  // };
  // useEffect(() => {
  //   const dropElement = fileInput.current;
  //   if (!dropElement) {
  //     return;
  //   }
  //   console.log(dropElement);
  //   const handleDragOver = (e) => {
  //     console.log("run");
  //     e.preventDefault();
  //     e.stopPropagation();
  //     console.log(e);
  //     console.log("test");
  //   };
  //   const handleDrop = (e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     const { files: uploadedFiles } = e.dataTransfer;
  //     setFile(uploadedFiles);
  //   };
  //   dropElement.addEventListener("dragover", handleDragOver);
  //   dropElement.addEventListener("drop", handleDrop);

  //   return () => {
  //     dropElement.removeEventListener("dragover", handleDragOver);
  //     dropElement.removeEventListener("drop", handleDrop);
  //   };
  // }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
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
                borderRadius: 2.5,
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
                "&>label,& input": { fontSize: "14px" },
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
                "&>label,& input": { fontSize: "14px" },
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
                "&>label,& input": { fontSize: "14px" },
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
                "&>label,& input": { fontSize: "14px" },
              }}
            />
            <TextField
              required
              fullWidth
              size="small"
              id="outlined-string"
              label="Reference"
              autoComplete="off"
              sx={{
                "&>label,& input": { fontSize: "14px" },
              }}
            />
            <TextField
              fullWidth
              size="small"
              id="outlined-string"
              label="Website"
              autoComplete="off"
              sx={{
                "&>label,& input": { fontSize: "14px" },
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
                  borderRadius: 2.5,
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
                <VisuallyHiddenInput
                  // onChange={(e) => {
                  //   console.log(e.target.files);
                  // }}
                  // onDragOver={handleDragOver}
                  // onDrop={handleDrop}
                  // ref={fileInput}
                  id="test"
                  type="file"
                />
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
                  borderRadius: 2.5,
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
                <VisuallyHiddenInput
                  // onChange={(e) => {
                  //   console.log(e.target.files);
                  // }}
                  // onDragOver={handleDragOver}
                  // onDrop={handleDrop}
                  // ref={fileInput}
                  id="test"
                  type="file"
                />
              </Button>
            </Box>
            <Box>
              <Typography variant="subtitle2" sx={{ lineHeight: 1, mb: 1 }}>
                Signature
              </Typography>
              <Button
                disableRipple
                disableElevation
                component="label"
                variant="contained"
                id="signature"
                startIcon={<CloudUploadIcon />}
                sx={{
                  textTransform: "capitalize",
                  width: "100%",
                  borderRadius: 2.5,
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
                Signature
                <VisuallyHiddenInput
                  // onChange={(e) => {
                  //   console.log(e.target.files);
                  // }}
                  // onDragOver={handleDragOver}
                  // onDrop={handleDrop}
                  // ref={fileInput}
                  id="test"
                  type="file"
                />
              </Button>
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
        </Box>
      </Modal>
    </>
  );
}
