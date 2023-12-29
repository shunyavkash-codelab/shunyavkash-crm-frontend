import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import PriorityIcon from "@mui/icons-material/Tour";
import StartTimeIcon from "@mui/icons-material/PlayCircle";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";

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
            <Box sx={{ mb: 3.25 }}>
              <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                Employee Dashboard
              </Typography>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} md={6} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    py: { xs: 3, sm: 3.25 },
                    px: { xs: 3, sm: 2.5 },
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
                      mb: 3,
                      fontSize: { xs: "16px", sm: "18px" },
                    }}
                  >
                    Today's Priority
                  </Typography>
                  <Box>
                    <TableContainer
                      component={Paper}
                      sx={{
                        boxShadow: "none",
                      }}
                    >
                      <Table
                        sx={{
                          textTransform: "capitalize",
                          textWrap: "nowrap",
                          "& th,& td": { borderBottom: 0 },
                        }}
                      >
                        <TableHead>
                          <TableRow
                            sx={{ "& th": { lineHeight: 1, fontWeight: 600 } }}
                          >
                            <TableCell sx={{ p: 1.5, pl: 0 }}>
                              Task Name
                            </TableCell>
                            <TableCell sx={{ p: 1.5, width: "110px" }}>
                              Due date
                            </TableCell>
                            <TableCell sx={{ p: 1.5, width: "90px" }}>
                              Priority
                            </TableCell>
                            <TableCell sx={{ p: 1.5, pr: 0, width: "90px" }}>
                              Track Time
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                              "&>td": {
                                fontSize: { xs: "12px", sm: "14px" },
                              },
                            }}
                          >
                            <TableCell sx={{ p: "12px", pl: 0 }}>
                              Task
                            </TableCell>
                            <TableCell sx={{ p: "12px" }}>30/12/23</TableCell>
                            <TableCell sx={{ p: "12px" }}>
                              <Box
                                className="urgent"
                                sx={{
                                  display: "flex",
                                  "&.urgent": {
                                    color: "#B13A41",
                                  },
                                  "&.high": {
                                    color: "secondary.main",
                                  },
                                  "&.normal": {
                                    color: "primary.main",
                                  },
                                  "&.low": {
                                    color: "grey.dark",
                                  },
                                }}
                              >
                                <PriorityIcon sx={{ fontSize: "20px" }} />
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "12px", pr: 0 }}>
                              <Button
                                sx={{
                                  display: "flex",
                                  justifyContent: "start",
                                  p: 0,
                                }}
                              >
                                <StartTimeIcon
                                  sx={{
                                    fontSize: "20px",
                                    color: "#008844",
                                  }}
                                />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Grid>
              {/* <Grid item xs={12} md={6} xxl={4} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    py: { xs: 3, sm: 3.25 },
                    px: { xs: 3, sm: 2.5 },
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
                      mb: { xs: 3.5, sm: 4.5 },
                      fontSize: { xs: "16px", sm: "18px" },
                    }}
                  >
                    Upcoming Due
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} xxl={4} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    py: { xs: 3, sm: 3.25 },
                    px: { xs: 3, sm: 2.5 },
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
                      mb: { xs: 3.5, sm: 4.5 },
                      fontSize: { xs: "16px", sm: "18px" },
                    }}
                  >
                    Tracked Time By You (This Week)
                  </Typography>
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
