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
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { Link } from "react-router-dom";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import moment from "moment";

export default function Leaves() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [approveList, setApproveList] = useState([]);
  const { accessToken } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();

  const approveLeaveList = async () => {
    try {
      const res = await apiCall({
        url: APIS.LEAVE.APPROVELIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setApproveList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    approveLeaveList();
  }, []);

  const leavesRequests = [
    {
      id: 1,
      username: "Deep Bhimani",
      type: "casual",
      reason: "Marriage Function",
      startDate: "15/01/2023",
      endDate: "17/01/2023",
    },
    {
      id: 2,
      username: "Deep Bhimani",
      type: "sick",
      reason: "Medical",
      startDate: "25/02/2023",
      endDate: "27/02/2023",
    },
    {
      id: 3,
      username: "Deep Bhimani",
      type: "paid",
      reason: "Going to Village",
      startDate: "31/04/2023",
      endDate: "2/05/2023",
    },
    {
      id: 4,
      username: "Deep Bhimani",
      type: "unpaid",
      reason: "Going to Friend's Birthday Party",
      startDate: "25/04/2023",
      endDate: "25/04/2023",
    },
  ];

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
          <Box sx={{ mb: 3.25 }}>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              Members Leaves
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "capitalize",
                    color: "primary.main",
                    transition: "all 0.4s ease-in-out",
                    ":not(:hover)": {
                      opacity: 0.7,
                    },
                  }}
                >
                  Dashboard /
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                leaves
              </Typography>
            </Box>
          </Box>

          <Box>
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
                {approveList.length > 0 && (
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
                          {moment(leaveRequest.startDate).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {moment(leaveRequest.endDate).format("DD/MM/YYYY")}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}
