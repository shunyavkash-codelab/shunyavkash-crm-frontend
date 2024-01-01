import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Pagination,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { BarChart } from "@mui/x-charts/BarChart";
import TaskDetail from "../component/employeeDashboard/TaskDetail";
import TaskCard from "../component/employeeDashboard/TaskCard";

export default function EmployeeDashboard() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, user } = useAuth();

  const [page, setPage] = React.useState(2);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
      {user.role !== 0 && (
        <Box
          sx={{ display: "flex", height: "100vh", ml: { lg: sideBarWidth } }}
        >
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
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                sx={{
                  "&>*>*": {
                    height: "100%",
                  },
                }}
              >
                <TaskCard heading={"Today's Priority"} />
                <TaskCard heading={"Upcoming Due (Task)"} />
                <Grid item xs={12} xl={4}>
                  <Box
                    sx={{
                      pt: 2.5,
                      bgcolor: "white",
                      boxShadow: "0 0 14px 0px rgb(42, 64, 98, 10%)",
                      color: "text.primary",
                      borderRadius: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 3,
                        px: 1.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textTransform: "capitalize",
                          lineHeight: 1.4,
                          fontSize: { xs: "15px", sm: "18px" },
                        }}
                      >
                        Tracked Time By You
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          textTransform: "capitalize",
                          fontSize: "15px",
                        }}
                      >
                        (42 Hours)
                      </Typography>
                    </Box>
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
                            label: "Hours",
                            color: "#00ac8d",
                          },
                        ]}
                        sx={{ width: "100%" }}
                        height={250}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
              <Box sx={{ mt: 8 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 3,
                    mb: 3.25,
                  }}
                >
                  <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                    Employee Tasks
                  </Typography>
                  <TablePagination
                    component="div"
                    count={10}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    sx={{
                      "&>div": {
                        p: 0,
                        minHeight: "24px",
                        "& .MuiTablePagination-selectLabel": {
                          lineHeight: 1,
                        },
                        "& .MuiTablePagination-input": {
                          mr: 0,
                          "&>div": {
                            p: "0 24px 0 0",
                          },
                        },
                        "& .MuiTablePagination-displayedRows,& .MuiTablePagination-actions":
                          {
                            display: "none",
                          },
                      },
                    }}
                  />
                </Box>
                <TableContainer
                  component={Paper}
                  sx={{
                    border: "1px solid rgba(224, 224, 224, 1)",
                    borderRadius: 2.5,
                  }}
                >
                  <Table
                    className="projectTable"
                    sx={{
                      minWidth: 650,
                      textTransform: "capitalize",
                      textWrap: "nowrap",
                      "& th,& td": { borderBottom: 0 },
                      "& tbody tr": {
                        borderTop: "1px solid rgba(224, 224, 224, 1)",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow
                        sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}
                      >
                        <TableCell sx={{ minWidth: "300px" }} colSpan={2}>
                          Task Name
                        </TableCell>
                        <TableCell sx={{ width: "150px" }}>Priority</TableCell>
                        <TableCell sx={{ width: "150px" }}>Due Date</TableCell>
                        <TableCell sx={{ width: "150px" }}>Assignee</TableCell>
                        <TableCell sx={{ width: "150px" }}>
                          Time Tracked
                        </TableCell>
                        <TableCell sx={{ width: "150px" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TaskDetail
                        task={"some thing is fishy!"}
                        showExtraDetail
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  count={3}
                  sx={{ mt: 3.5, "& ul": { justifyContent: "center" } }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
