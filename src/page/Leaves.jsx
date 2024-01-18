import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Pagination,
  Stack,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import moment from "moment";
import SectionHeader from "../component/SectionHeader";
import NoData from "../component/NoData.jsx";
import { useSearchData } from "../hooks/store/useSearchData.js";

export default function Leaves() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [approveList, setApproveList] = useState([]);
  const { accessToken } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { searchData } = useSearchData();

  // pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const approveLeaveList = async () => {
    try {
      const res = await apiCall({
        url: APIS.LEAVE.APPROVELIST,
        method: "get",
        params: {
          search: searchData,
          page: searchData ? 1 : page,
          limit: rowsPerPage,
        },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setApproveList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    approveLeaveList();
  }, [page, rowsPerPage]);

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
          <SectionHeader
            Title="Members Leaves"
            BreadCrumbPreviousLink="/"
            BreadCrumbPreviousTitle="Dashboard"
            BreadCrumbCurrentTitle="Leaves"
          />

          {approveList.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                mx: { xs: "-10px", sm: 0 },
                width: { xs: "auto", sm: "auto" },
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
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}>
                    <TableCell>Member</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {approveList.map((leaveRequest) => (
                    <TableRow
                      key={leaveRequest.key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&:first-of-type td": {
                          maxWidth: "250px",
                          textWrap: "wrap",
                        },
                      }}
                    >
                      <TableCell>{leaveRequest.userName}</TableCell>
                      <TableCell
                        sx={{
                          "& .statusBtn": {
                            color: "white",
                            fontSize: "12px",
                            p: 0.5,
                            borderRadius: 1,
                            maxWidth: "fit-content",
                            lineHeight: 1,
                          },
                          "& .casual": {
                            bgcolor: "rgba(94, 115, 141, 15%)",
                            color: "grey.dark",
                          },
                          "& .sick": {
                            bgcolor: "rgba(248, 174, 0, 15%)",
                            color: "secondary.main",
                          },
                          "& .unpaid": {
                            bgcolor: "rgba(225, 107, 22, 15%)",
                            color: "review.main",
                          },
                          "& .paid": {
                            bgcolor: "rgba(74, 210, 146, 15%)",
                            color: "success.main",
                          },
                        }}
                      >
                        <Box
                          className={`statusBtn ${
                            leaveRequest.leaveType === "casual"
                              ? "casual"
                              : leaveRequest.leaveType === "sick"
                              ? "sick"
                              : leaveRequest.leaveType === "unpaid"
                              ? "unpaid"
                              : "paid"
                          }`}
                        >
                          {leaveRequest.leaveType}
                        </Box>
                      </TableCell>
                      <TableCell>{leaveRequest.reason}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.75,
                          }}
                        >
                          <Box>
                            {moment(leaveRequest.startDate).format(
                              "DD/MM/YYYY"
                            )}
                            <Typography
                              sx={{
                                marginTop: "3px",
                                lineHeight: 1,
                                textAlign: "center",
                                fontSize: "12px",
                                color: "darkgray",
                              }}
                            >
                              ({leaveRequest.startDayType})
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.75,
                          }}
                        >
                          <Box>
                            {moment(leaveRequest.endDate).format("DD/MM/YYYY")}
                            <Typography
                              sx={{
                                marginTop: "3px",
                                lineHeight: 1,
                                textAlign: "center",
                                fontSize: "12px",
                                color: "darkgray",
                              }}
                            >
                              ({leaveRequest.endDayType})
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <NoData />
          )}

          {/* pagination */}
          <TablePagination
            component="div"
            count={10}
            page={page}
            onPageChange={handleChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{
              "&>div": {
                p: 0,
                minHeight: "24px",
                "& .MuiTablePagination-selectLabel": {
                  lineHeight: 1,
                  fontWeight: 600,
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
          <Stack spacing={2}>
            {/* <Typography>Page: {page}</Typography> */}
            <Pagination count={totalPage} page={page} onChange={handleChange} />
          </Stack>
        </Box>
      </Box>
    </>
  );
}
