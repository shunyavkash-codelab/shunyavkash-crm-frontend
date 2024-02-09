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
  Stack,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { BarChart } from "@mui/x-charts/BarChart";
import TaskDetail from "../component/employee/TaskDetail";
import TaskCard from "../component/employee/TaskCard";
import SectionHeader from "../component/SectionHeader";
import ThemePagination from "../component/ThemePagination";

export default function EmployeeDashboard() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, user } = useAuth();

  // pagination
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
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
        <Box sx={{ ml: { lg: sideBarWidth } }}>
          <Box component="main">
            <SectionHeader Title="Employee Dashboard" />

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
              <Grid item xs={12} xl={4}>
                <TaskCard heading={"Today's Priority"} />
              </Grid>
              <Grid item xs={12} xl={4}>
                <TaskCard heading={"Upcoming Due (Task)"} />
              </Grid>
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

            <SectionHeader Title="Employee Tasks" style={{ mt: 8 }} />

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
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}>
                    <TableCell sx={{ minWidth: "300px" }} colSpan={2}>
                      Task Name
                    </TableCell>
                    <TableCell sx={{ width: "150px" }}>Priority</TableCell>
                    <TableCell sx={{ width: "150px" }}>Due Date</TableCell>
                    <TableCell sx={{ width: "150px" }}>Assignee</TableCell>
                    <TableCell sx={{ width: "150px" }}>Time Tracked</TableCell>
                    <TableCell sx={{ width: "150px" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TaskDetail task showExtraDetail />
                </TableBody>
              </Table>
            </TableContainer>
            {/* pagination */}
            <ThemePagination
              totalpage={totalPage}
              onChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
