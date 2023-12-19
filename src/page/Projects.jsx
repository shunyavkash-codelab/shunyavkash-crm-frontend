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
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
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
              <Link to="./add">
                <Button
                  disableRipple
                  startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
                  sx={{
                    maxHeight: "42px",
                    position: "relative",
                    px: 2.5,
                    py: 1.5,
                    bgcolor: "primary.main",
                    border: "1px solid",
                    borderColor: "primary.main",
                    color: "white",
                    lineHeight: 1,
                    borderRadius: 2.5,
                    overflow: "hidden",
                    "&:before": {
                      content: "''",
                      height: 0,
                      width: "10rem",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      zIndex: "0",
                      bgcolor: "white",
                      transform: "rotate(-45deg) translate(-50%, -50%)",
                      transformOrigin: "0% 0%",
                      transition: "all 0.4s ease-in-out",
                    },
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: "primary.main",
                      "&:before": { height: "10rem" },
                    },
                  }}
                >
                  <span style={{ position: "relative" }}>New Project</span>
                </Button>
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
                    <TableRow
                      sx={{ "&>*": { lineHeight: 1, fontWeight: 700 } }}
                    >
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
                          {row.currency}
                          {row.perHourCharge}/hour
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={
                              row.status === "completed"
                                ? {
                                    color: "white",
                                    bgcolor: "success.main",
                                    fontSize: "12px",
                                    py: 0.5,
                                    px: 0.75,
                                    borderRadius: 1.5,
                                    maxWidth: "fit-content",
                                    lineHeight: 1,
                                  }
                                : "" || row.status === "initial"
                                ? {
                                    color: "white",
                                    bgcolor: "grey.dark",
                                    fontSize: "12px",
                                    py: 0.5,
                                    px: 0.75,
                                    borderRadius: 1.5,
                                    maxWidth: "fit-content",
                                    lineHeight: 1,
                                  }
                                : "" || row.status === "inProgress"
                                ? {
                                    color: "white",
                                    bgcolor: "secondary.main",
                                    fontSize: "12px",
                                    py: 0.5,
                                    px: 0.75,
                                    borderRadius: 1.5,
                                    maxWidth: "fit-content",
                                    lineHeight: 1,
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
                            <Button
                              disableRipple
                              sx={{
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              }}
                            >
                              <VisibilityIcon />
                            </Button>
                            <Button
                              disableRipple
                              sx={{
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              }}
                            >
                              <CreateIcon />
                            </Button>
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
