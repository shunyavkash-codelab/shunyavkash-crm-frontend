import React, { useRef, useState } from "react";
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
  const [age, setAge] = useState("");
  const fileInput = useRef();
  const { palette } = useTheme();

  const handleChange = (event) => {
    setAge(event.target.value);
  };
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
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
            bgcolor: "background.paper",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "25px",
          }}
          noValidate
          autoComplete="off"
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ marginBottom: "15px" }}
          >
            Add new manager
          </Typography>
          <div>
            <TextField
              required
              id="outlined-required"
              label="Name"
              autoComplete="off"
            />
            <TextField
              required
              id="outlined-required"
              label="Email"
              placeholder="example@xyz.com"
              autoComplete="off"
            />
            <TextField
              id="outlined-number"
              label="Mobile Number"
              type="number"
              autoComplete="off"
            />
            <TextField
              id="outlined-string"
              label="Company Name"
              autoComplete="off"
            />
            <TextField
              id="outlined-string"
              label="Website"
              autoComplete="off"
            />
            <Box sx={{ width: "150px", margin: "8px" }}>
              <FormControl sx={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                  <MenuItem value={"transgender"}>Transgender</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <Typography
              variant="h6"
              sx={{ marginBottom: "3px", fontSize: "15px", marginLeft: "8px" }}
            >
              Profile Image
            </Typography>
            <Button
              component="label"
              variant="contained"
              id="profile_img"
              startIcon={<CloudUploadIcon />}
              sx={{ margin: "8px" }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <Typography
              variant="h6"
              sx={{ marginBottom: "3px", fontSize: "15px", marginLeft: "8px" }}
            >
              Company Logo
            </Typography>
            <Button
              component="label"
              variant="contained"
              id="company_logo"
              startIcon={<CloudUploadIcon />}
              sx={{ margin: "8px" }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <Typography
              variant="h6"
              sx={{ marginBottom: "3px", fontSize: "15px", marginLeft: "8px" }}
            >
              Signature
            </Typography>
            <Button
              component="label"
              variant="contained"
              id="signature"
              startIcon={<CloudUploadIcon />}
              sx={{ margin: "8px" }}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
            <Box>
              <Button
                variant="contained"
                color="success"
                sx={{ float: "right" }}
              >
                Submit
              </Button>
            </Box>
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
          </div>
        </Box>
      </Modal>
    </>
  );
}
