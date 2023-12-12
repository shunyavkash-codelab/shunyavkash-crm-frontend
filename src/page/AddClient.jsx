import React, { useEffect, useRef, useState } from "react";
import { styled, Button } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useAuth } from "../hooks/store/useAuth";

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

export default function AddClient({ open, setOpen }) {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [gender, setgender] = useState("");
  const { accessToken } = useAuth();

  const handleChange = (event) => {
    setgender(event.target.value);
  };

  return (
    <>
      <SideBar
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        accessToken={accessToken}
      />
      <Header
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Box
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "100vh", ml: { lg: sideBarWidth } }}
      >
        <Box
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box sx={{ mb: 3.25 }}>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              Add Client
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              Add Client
            </Typography>
          </Box>
          <Box component="form" noValidate autoComplete="off">
            <Box
              sx={{
                pt: 0.75,
                flexGrow: { md: 0 },
                overflowY: { md: "auto" },
                "&>*:not(:first-child)": { mt: 2.5 },
                "& fieldset": {
                  borderRadius: 2.5,
                  "& legend": { fontSize: "0.65em" },
                },
              }}
            >
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 2.5,
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
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 2.5,
                }}
              >
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
                    sx={{ fontSize: "14px" }}
                  >
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"male"}
                    >
                      Male
                    </MenuItem>
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"female"}
                    >
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
              </Box>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                  gap: 2.5,
                }}
              >
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
                  fullWidth
                  size="small"
                  id="outlined-string"
                  label="Website"
                  autoComplete="off"
                  sx={{
                    "&>label,& input": { fontSize: "14px" },
                  }}
                />
              </Box>
              <TextField
                fullWidth
                size="small"
                id="outlined-string"
                label="Address"
                autoComplete="off"
                multiline
                rows={4}
                sx={{
                  "&>label,& input": { fontSize: "14px" },
                }}
              />
              <Box>
                <Typography variant="subtitle1" sx={{ lineHeight: 1, mb: 1 }}>
                  Profile Image
                </Typography>
                <Button
                  disableRipple
                  disableElevation
                  component="label"
                  variant="contained"
                  id="profile_img"
                  startIcon={
                    <CloudUploadIcon
                      sx={{
                        fontSize: {
                          xs: "18px!important",
                          sm: "30px!important",
                        },
                      }}
                    />
                  }
                  sx={{
                    textTransform: "capitalize",
                    width: "100%",
                    borderRadius: 2.5,
                    bgcolor: "transparent",
                    border: "1px solid rgba(0,0,0,0.15)",
                    boxShadow: "none",
                    color: "text.secondary",
                    transition: "0s",
                    height: { xs: "100px", sm: "200px" },
                    fontSize: { xs: "18px", sm: "30px" },
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
                <Typography variant="subtitle1" sx={{ lineHeight: 1, mb: 1 }}>
                  Company Logo
                </Typography>
                <Button
                  disableRipple
                  disableElevation
                  component="label"
                  variant="contained"
                  id="company_logo"
                  startIcon={
                    <CloudUploadIcon
                      sx={{
                        fontSize: {
                          xs: "18px!important",
                          sm: "30px!important",
                        },
                      }}
                    />
                  }
                  sx={{
                    textTransform: "capitalize",
                    width: "100%",
                    borderRadius: 2.5,
                    bgcolor: "transparent",
                    border: "1px solid rgba(0,0,0,0.15)",
                    boxShadow: "none",
                    color: "text.secondary",
                    transition: "0s",
                    height: { xs: "100px", sm: "200px" },
                    fontSize: { xs: "18px", sm: "30px" },
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
