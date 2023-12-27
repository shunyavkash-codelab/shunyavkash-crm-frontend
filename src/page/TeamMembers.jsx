import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  Button,
  Autocomplete,
  InputAdornment,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";

export default function TeamMembers() {
  const { accessToken } = useAuth();
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);

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
          <Box></Box>
        </Box>
      </Box>
    </>
  );
}
