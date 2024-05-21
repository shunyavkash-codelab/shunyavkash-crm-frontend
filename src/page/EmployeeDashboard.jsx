import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import { BarChart } from "@mui/x-charts/BarChart";
import TaskDetail from "../component/employee/TaskDetail";
import TaskCard from "../component/employee/TaskCard";
import SectionHeader from "../component/SectionHeader";
import ThemePagination from "../component/ThemePagination";
import CounterCards from "../component/CounterCards";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { APIS } from "../api/apiList";

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();

  // pagination
  // eslint-disable-next-line no-unused-vars
  const [page, setPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const fetchDashboardData = async () => {
    try {
      const res = await apiCall({
        url: APIS.DASHBOARD.DATA,
        method: "get",
      });
      if (res.data.success === true) {
        setDashboardData(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
      // handleApiError(error, setSnack);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <>
      {user.role !== 0 && (
        <Box component="main">
          <SectionHeader Title="Employee Dashboard" />

          {/* <Grid
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
          </Grid> */}
          <Grid container spacing={2.5}>
            {/* <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                CardBgcolor={"rgba(74, 210, 146, 10%)"}
                Title={"Clients"}
                Counter={dashboardData.totalClient || 0}
                Text={"lorem ipsum sit amet."}
                Link={"/clients"}
                ArrowBgColor={"rgba(74, 210, 146, 60%)"}
                titleStyle={{
                  opacity: "100%",
                }}
                counterStyle={{
                  fontSize: "30px",
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                CardBgcolor={"rgb(153 143 66 / 10%)"}
                Title={"projects"}
                Counter={dashboardData.totalProject || 0}
                Text={"lorem ipsum sit amet."}
                Link={"/projects"}
                ArrowBgColor={"rgb(153 143 66 / 60%)"}
                titleStyle={{
                  opacity: "100%",
                }}
                counterStyle={{
                  fontSize: "30px",
                }}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                CardBgcolor={"rgb(53 113 51 / 10%)"}
                Title={"invoices"}
                Counter={dashboardData.totalInvoice || 0}
                Text={"lorem ipsum sit amet."}
                Link={"/invoices"}
                ArrowBgColor={"rgb(53 113 51 / 60%)"}
                titleStyle={{
                  opacity: "100%",
                }}
                counterStyle={{
                  fontSize: "30px",
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                CardBgcolor={"rgb(33 63 177 / 10%)"}
                Title={"employees"}
                Counter={dashboardData.totalEmployee || 0}
                Text={"lorem ipsum sit amet."}
                Link={"/employees"}
                ArrowBgColor={"rgb(33 63 177 / 60%)"}
                titleStyle={{
                  opacity: "100%",
                }}
                counterStyle={{
                  fontSize: "30px",
                }}
              />
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
      )}
    </>
  );
}
