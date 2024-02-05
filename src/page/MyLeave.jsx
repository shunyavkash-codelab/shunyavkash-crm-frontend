import React, { useState } from "react";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import SectionHeader from "../component/SectionHeader";
import { Box, Stack } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import UserLeave from "./UserLeave";

export default function MyLeave() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, userId } = useAuth();
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
      <Box sx={{ ml: { lg: sideBarWidth } }}>
        <Box component="main">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent={{ sm: "space-between" }}
            columnGap={2}
            rowGap={2.5}
            sx={{
              mb: 3.25,
            }}
          >
            <SectionHeader
              Title="My Leave"
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="My Leave"
              style={{ mb: 0 }}
            />
          </Stack>
          <UserLeave profileId={userId} />
        </Box>
      </Box>
    </>
  );
}
