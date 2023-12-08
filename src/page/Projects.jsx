import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Icon,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";

import AvatarGroup from "@mui/material/AvatarGroup";

const rows = [
  {
    name: "CRM-Shunyavkash",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "ravi chodvadiya" },
      { id: "6565b5f43cf3461aeaff7639", name: "akash hirapra" },
    ],
    startDate: "2023-11-29",
    endDate: "2023-12-29",
    currency: "Doller",
    perHourCharge: 40,
    status: "completed",
    avatar: "https://mui.com/static/images/avatar/2.jpg",
  },
  {
    name: "Ploom",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "shyam tala" },
      { id: "6565b5f43cf3461aeaff7639", name: "mohit patel" },
    ],
    startDate: "2023-01-01",
    endDate: "2023-05-15",
    currency: "Doller",
    perHourCharge: 50,
    status: "initial",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    name: "automobile-Shunyavkash",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "sujit hirapra" },
      { id: "6565b5f43cf3461aeaff7639", name: "akash hirapra" },
    ],
    startDate: "2023-11-29",
    endDate: "2023-12-29",
    currency: "Doller",
    perHourCharge: 40,
    status: "initial",
    avatar: "https://mui.com/static/images/avatar/2.jpg",
  },
  {
    name: "Shunyavkash",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "prince patel" },
      { id: "6565b5f43cf3461aeaff7639", name: "deep patel" },
    ],
    startDate: "2023-11-29",
    endDate: "2023-12-29",
    currency: "Doller",
    perHourCharge: 30,
    status: "initial",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    name: "Shunyavkash 1",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "ravi chodvadiya" },
      { id: "6565b5f43cf3461aeaff7639", name: "akash hirapra" },
    ],
    startDate: "2023-11-29",
    endDate: "2023-12-29",
    currency: "Doller",
    perHourCharge: 40,
    status: "initial",
    avatar: "https://mui.com/static/images/avatar/3.jpg",
  },
  {
    name: "Shunyavkash 2",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "ravi chodvadiya" },
      { id: "6565b5f43cf3461aeaff7639", name: "akash hirapra" },
    ],
    startDate: "2023-11-29",
    endDate: "2023-12-29",
    currency: "Doller",
    perHourCharge: 60,
    status: "inProgress",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    name: "Shunyavkash 3",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "dipali patel" },
      { id: "6565b5f43cf3461aeaff7639", name: "pooja patel" },
    ],
    startDate: "2023-10-29",
    endDate: "2023-12-15",
    currency: "Doller",
    perHourCharge: 20,
    status: "completed",
    avatar: "https://mui.com/static/images/avatar/2.jpg",
  },
  {
    name: "Shunyavkash 4",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "ravi chodvadiya" },
      { id: "6565b5f43cf3461aeaff7639", name: "akash hirapra" },
    ],
    startDate: "2023-11-29",
    endDate: "2023-12-29",
    currency: "Doller",
    perHourCharge: 40,
    status: "inProgress",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },
  {
    name: "Shunyavkash 5",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "ravi chodvadiya" },
      { id: "6565b5f43cf3461aeaff7639", name: "akash hirapra" },
    ],
    startDate: "2023-11-29",
    endDate: "2023-12-29",
    currency: "Doller",
    perHourCharge: 40,
    status: "inProgress",
    avatar: "https://mui.com/static/images/avatar/2.jpg",
  },
  {
    name: "Shunyavkash 6",
    employeeId: [
      { id: "6565810a7374346225094fa7", name: "ravi chodvadiya" },
      { id: "6565b5f43cf3461aeaff7639", name: "akash hirapra" },
    ],
    startDate: "2023-11-29",
    endDate: "2023-12-29",
    currency: "Doller",
    perHourCharge: 40,
    status: "completed",
    avatar: "https://mui.com/static/images/avatar/1.jpg",
  },
];

export default function Project() {
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
          <Box
            sx={{
              mb: 3.25,
              display: "flex",
              alignItems: { sm: "center" },
              justifyContent: { sm: "space-between" },
              flexDirection: { xs: "column", sm: "row" },
              columnGap: 2,
              rowGap: 2.5,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ mb: 0.75, textTransform: "capitalize" }}
              >
                Our Projects
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                project
              </Typography>
            </Box>
            <Box>
              <Link variant="Button" to="javascript:void(0);">
                <Button
                  disableRipple
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    bgcolor: "primary.main",
                    color: "white",
                    lineHeight: 1,
                    borderRadius: 2.5,
                    maxHeight: "42px",
                    "&:hover": { bgcolor: "rgb(22, 119, 255, 80%)" },
                  }}
                  startIcon={<CloseIcon sx={{ transform: "rotate(45deg)" }} />}
                >
                  New Project
                </Button>
              </Link>
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid rgba(224, 224, 224, 1)",
              borderRadius: 5,
              mx: { xs: "-10px", sm: 0 },
              width: { xs: "auto", sm: "auto" },
              borderRadius: { xs: 4, sm: 6 },
            }}
          >
            <Table
              className="projectTable"
              sx={{
                minWidth: 650,
                textTransform: "capitalize",
                textWrap: "nowrap",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ "&>th": { lineHeight: 1 } }}>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Assign Member</TableCell>
                  <TableCell>Start date</TableCell>
                  <TableCell>End date</TableCell>
                  <TableCell>Currency/hour</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&>*": { p: 1.5 },
                    }}
                  >
                    <TableCell>{row.name}</TableCell>
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.75,
                        }}
                      >
                        <AvatarGroup max={3}>
                          <Avatar alt="Remy Sharp" src={row.avatar} />
                          <Avatar alt="Travis Howard" src={row.avatar} />
                          <Avatar alt="Cindy Baker" src={row.avatar} />
                          <Avatar alt="Agnes Walker" src={row.avatar} />
                          <Avatar alt="Trevor Henderson" src={row.avatar} />
                        </AvatarGroup>
                      </Box>
                    </TableCell>
                    <TableCell>{row.startDate}</TableCell>
                    <TableCell>{row.endDate}</TableCell>
                    <TableCell>
                      {row.currency}/{row.perHourCharge}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={
                          row.status === "completed"
                            ? {
                                py: 1,
                                px: 1.75,
                                bgcolor: "rgba(74, 210, 146, 10%)",
                                color: "success.main",
                                borderRadius: 2.5,
                              }
                            : "" || row.status === "initial"
                            ? {
                                py: 1,
                                px: 1.75,
                                bgcolor: "rgb(187 177 180 / 30%)",
                                color: "rgb(123 119 120)",
                                borderRadius: 2.5,
                              }
                            : "" || row.status === "inProgress"
                            ? {
                                py: 1,
                                px: 1.75,
                                bgcolor: "rgb(248 193 7 / 30%);",
                                color: "rgb(253 146 5);",
                                borderRadius: 2.5,
                              }
                            : ""
                        }
                      >
                        {row.status}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1.25, sm: 1.75 },
                          opacity: 0.3,
                          "&>svg": { fontSize: { xs: "20px", sm: "24px" } },
                        }}
                      >
                        <VisibilityIcon />
                        <CreateIcon />
                        <DeleteIcon />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
