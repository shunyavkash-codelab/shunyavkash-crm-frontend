import React, { useState } from "react";
import { Box, Typography, Grid, Card } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";

const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);
export default function Invoices() {
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
      <Box sx={{ display: "flex", height: "100vh", ml: { lg: sideBarWidth } }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box>
            {
              <Box sx={{ mb: 3.25 }}>
                <Typography
                  variant="h5"
                  sx={{ mb: 0.75, textTransform: "capitalize" }}
                >
                  Our Recent Invoices
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.4, textTransform: "capitalize" }}
                >
                  Invoices
                </Typography>
              </Box>
            }
          </Box>
          {
            <Box sx={{ mt: 6 }}>
              <Box>
                <Grid container rowSpacing={2} columnSpacing={2}>
                  {gridItems.map((item) => (
                    <Grid
                      key={item}
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={6}
                      xl={4}
                      xxl={3}
                      sx={{ maxWidth: "420px", mx: { xs: "auto", sm: "0" } }}
                    >
                      <Card
                        variant="outlined"
                        sx={{ height: "450px", borderRadius: 2.5 }}
                      >
                        {/* Add your card content here */}
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </Box>
          }
        </Box>
      </Box>
    </>
  );
}
