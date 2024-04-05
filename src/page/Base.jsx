import React, { useState } from "react";
import { Box } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";

export default function Base() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();

  return (
    <>
      <Box component="main">
        <Box>Hello</Box>
      </Box>
    </>
  );
}
