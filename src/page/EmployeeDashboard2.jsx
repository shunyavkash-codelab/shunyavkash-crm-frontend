import React, { useState } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { BarChart } from "@mui/x-charts/BarChart";

export default function Home() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, invoiceTable } = useAuth();

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
          <Box>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} md={4} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    py: { xs: 3, sm: 3.25 },
                    bgcolor: "white",
                    boxShadow: "0 0 14px 0px rgb(42, 64, 98, 10%)",
                    color: "text.primary",
                    borderRadius: 2.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "capitalize",
                      px: { xs: 3, sm: 2.5 },
                      mb: 3,
                      fontSize: { xs: "16px", sm: "18px" },
                    }}
                  >
                    Tracked Time By You (This Week) (42 Hours)
                  </Typography>
                  <Box>
                    <BarChart
                      xAxis={[
                        {
                          id: "barCategories",
                          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                          scaleType: "band",
                        },
                      ]}
                      series={[
                        {
                          data: [2, 4, 5, 3, 8, 4],
                          color: "#00ac8d",
                        },
                      ]}
                      sx={{ width: "100%" }}
                      height={300}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
