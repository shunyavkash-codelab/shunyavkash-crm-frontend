import React, { useState } from "react";
import SideBar from "../component/SideBar";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
import { Box, Grid, Typography } from "@mui/material";

function AccountManage() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [dashboardData, setDashboardData] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { accessToken, user } = useAuth();
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
          <Typography
            variant="h5"
            sx={{ textTransform: "capitalize", mb: 0.5 }}
          >
            Account Management
          </Typography>
          <Grid container rowSpacing={2.5} columnSpacing={2.5} mt={0}>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  15
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Casual Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  5
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Sick Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  5
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Unpaid Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  N/A
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default AccountManage;
