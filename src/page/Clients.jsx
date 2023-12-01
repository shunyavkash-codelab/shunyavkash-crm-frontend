import React, { useState } from "react";
import { Box } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";

export default function Clients() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <SideBar
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Header
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            ml: { lg: sideBarWidth },
            height: "100%",
            overflowY: "auto",
          }}
        >
          Clients
        </Box>
      </Box>
    </>
  );
}
