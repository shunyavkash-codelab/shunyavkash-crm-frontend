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
  Tooltip,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import PriorityIcon from "@mui/icons-material/Tour";
import StartTimeIcon from "@mui/icons-material/PlayCircle";
import StopTimeIcon from "@mui/icons-material/StopCircle";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";

export default function Home() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, invoiceTable } = useAuth();

  const [startTime, setStartTime] = useState(false);

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
              <Grid item xs={12} md={6} xl={4} sx={{ height: "100%" }}>
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
                          minWidth: { xs: "512px" },
                          textTransform: "capitalize",
                          textWrap: "nowrap",
                          "& th,& td": { borderBottom: 0 },
                        }}
                      >
                        <TableHead>
                          <TableRow
                            sx={{
                              borderBottom: "1px dashed rgba(0,0,0,0.2)",
                              "& th": {
                                lineHeight: 1,
                                fontWeight: 600,
                              },
                            }}
                          >
                            <TableCell sx={{ p: 1.5, pl: 0 }}>
                              Task Name
                            </TableCell>
                            <TableCell sx={{ p: 1.5, width: "100px" }}>
                              Due date
                            </TableCell>
                            <TableCell sx={{ p: 1.5, width: "75px" }}>
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
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry
                            </TableCell>
                            <TableCell sx={{ p: "12px" }}>30/12/2023</TableCell>
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
                                <Tooltip title="Urgent" arrow>
                                  <PriorityIcon sx={{ fontSize: "20px" }} />
                                </Tooltip>
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "12px", pr: 0 }}>
                              <Button
                                onClick={() => {
                                  setStartTime(!startTime);
                                }}
                                disableRipple
                                sx={{
                                  display: "flex",
                                  justifyContent: "start",
                                  gap: 0.5,
                                  p: 0,
                                  bgcolor: "transparent!important",
                                }}
                              >
                                <StartTimeIcon
                                  sx={{
                                    fontSize: "20px",
                                    color: "#008844",
                                    display: startTime ? "none" : "block",
                                  }}
                                />
                                <StopTimeIcon
                                  sx={{
                                    fontSize: "20px",
                                    color: "error.main",
                                    display: startTime ? "block" : "none",
                                  }}
                                />
                                <Box
                                  sx={{
                                    fontSize: "13px",
                                    lineHeight: 1,
                                    fontWeight: "500",
                                    color: "text.primary",
                                  }}
                                >
                                  00:00:00
                                </Box>
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
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
