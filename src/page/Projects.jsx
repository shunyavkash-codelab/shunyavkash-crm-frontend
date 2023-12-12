import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
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
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import handleApiError from "../utils/handleApiError";
import AddProject from "../component/AddProject";
import ViewProject from "../component/ViewProject";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";

export default function Project() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { accessToken } = useAuth();
  const fetchManagers = async () => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setProjectList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
      handleApiError(error, setSnack);
    }
  };
  useEffect(() => {
    fetchManagers();
  }, []);
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
                  onClick={() => setOpenAdd(true)}
                >
                  New Project
                </Button>
                {openAdd && <AddProject open={openAdd} setOpen={setOpenAdd} />}
              </Link>
            </Box>
          </Box>
          {projectList.length === 0 ? (
            <Box
              sx={{
                width: "100%",
                display: "block",
                padding: "25px 16px",
                backgroundColor: "primary.light",
                textAlign: "center",
                borderRadius: 2.5,
              }}
            >
              <Typography
                mb={1.5}
                variant="h4"
                sx={{
                  fontSize: "20px",
                  color: "#1677FF",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                No data available in table
              </Typography>
              <Typography
                variant="h6"
                sx={{ fontSize: 14, color: "#848484", fontWeight: "400" }}
              >
                Currently there no data available!
              </Typography>
            </Box>
          ) : (
            <>
              <TableContainer
                component={Paper}
                sx={{
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: 5,
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
                    <TableRow sx={{ "&>th": { lineHeight: 1 } }}>
                      <TableCell>Project Name</TableCell>
                      {/* <TableCell>Assign Member</TableCell> */}
                      <TableCell>Client</TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell>Start date</TableCell>
                      <TableCell>End date</TableCell>
                      <TableCell>Currency/hour</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projectList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                          "&>*": { p: 1.5 },
                        }}
                      >
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.clientName}</TableCell>
                        <TableCell>{row.managerName}</TableCell>
                        <TableCell>
                          {moment(row.startDate).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell>
                          {moment(row.endDate).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell>
                          {row.currency == "Doller" ? "$" : ""}
                          {row.perHourCharge}/hour
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
                            <Box>
                              <Button
                                sx={{
                                  p: 0,
                                  minWidth: "auto",
                                  color: "black",
                                  "&:hover": { color: "blue" },
                                }}
                                onClick={() => setOpenView(true)}
                              >
                                <VisibilityIcon />
                              </Button>
                              <ViewProject
                                open={openView}
                                setOpen={setOpenView}
                              />
                            </Box>
                            <Box>
                              <Button
                                sx={{
                                  p: 0,
                                  minWidth: "auto",
                                  color: "black",
                                  "&:hover": { color: "blue" },
                                }}
                                onClick={() => setOpenEdit(true)}
                              >
                                <CreateIcon />
                              </Button>
                              <AddProject
                                open={openEdit}
                                setOpen={setOpenEdit}
                              />
                            </Box>
                            {/* <DeleteIcon /> */}
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
