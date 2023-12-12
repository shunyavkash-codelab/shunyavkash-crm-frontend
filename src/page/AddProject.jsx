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
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { useAuth } from "../hooks/store/useAuth";

// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";

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

export default function AddProject({ open, setOpen }) {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [client, setClient] = useState("");
  const [user, setUser] = useState("");
  const [payPeriod, setPayPeriod] = useState("");
  const [status, setStatus] = useState("");
  const fileInput = useRef(null);
  const [file, setFile] = useState([]);
  const { palette } = useTheme();
  const { accessToken } = useAuth();

  const handleChange = (event) => {
    setClient(event.target.value);
  };
  const handleChange2 = (event) => {
    setUser(event.target.value);
  };
  const handleChange3 = (event) => {
    setPayPeriod(event.target.value);
  };
  const handleChange4 = (event) => {
    setStatus(event.target.value);
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
              Add Project
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              Add Project
            </Typography>
          </Box>
          <Box component="form" noValidate autoComplete="off">
            <Box
              sx={{
                pt: 0.75,
                flexGrow: { md: 0 },
                overflowY: { md: "auto" },
                // "& .css-bkzwk2-MuiStack-root": { p: 0 },
                "& fieldset": {
                  borderRadius: 2.5,
                },
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 2.5,
              }}
            >
              <TextField
                fullWidth
                size="small"
                id="project_name"
                label="Project Name"
                autoComplete="off"
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
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
                  Client
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={client}
                  label="Client"
                  onChange={handleChange}
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID1"}
                  >
                    ID1
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID2"}
                  >
                    ID2
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID3"}
                  >
                    ID3
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID4"}
                  >
                    ID4
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID5"}
                  >
                    ID5
                  </MenuItem>
                </Select>
              </FormControl>
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
                  User
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={user}
                  label="User"
                  onChange={handleChange2}
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID1"}
                  >
                    ID1
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID2"}
                  >
                    ID2
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID3"}
                  >
                    ID3
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID4"}
                  >
                    ID4
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"ID5"}
                  >
                    ID5
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl
                fullWidth
                size="small"
                sx={{
                  "&>label,& input": { fontSize: "14px" },
                }}
              >
                <InputLabel>Per Hour</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
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
                  Pay Period
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={payPeriod}
                  label="Pay Period"
                  onChange={handleChange3}
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"Weekly"}
                  >
                    Weekly
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"twiceWeekly"}
                  >
                    Twice Weekly
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"monthly"}
                  >
                    Monthly
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"yearly"}
                  >
                    Yearly
                  </MenuItem>
                </Select>
              </FormControl>
              <TextField
                fullWidth
                size="small"
                id="invoice_number"
                label="Invoice Number"
                autoComplete="off"
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
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
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={handleChange4}
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"initial"}
                  >
                    Initial
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"inProgress"}
                  >
                    In Progress
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"completed"}
                  >
                    Completed
                  </MenuItem>
                </Select>
              </FormControl>
              {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker label="Start Project" />
                </DemoContainer>
              </LocalizationProvider> */}
              <TextField
                fullWidth
                size="small"
                id="description"
                label="Description"
                autoComplete="off"
                multiline
                rows={4}
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
                  gridColumn: "span 2",
                }}
              />
              <Box sx={{ gridColumn: "span 2" }}>
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
            </Box>
            <Button
              disableRipple
              sx={{
                mt: 2.5,
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
    </>
  );
}
