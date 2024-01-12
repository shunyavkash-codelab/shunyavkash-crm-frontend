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
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import handleApiError from "../utils/handleApiError";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import { useSearchData } from "../hooks/store/useSearchData";
import NoData from "../component/NoData";

export default function Project() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const { accessToken } = useAuth();
  const { searchData } = useSearchData();
  const fetchProjects = async () => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.LIST,
        method: "get",
        params: { search: searchData },
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
    fetchProjects();
  }, []);
  // });
  useEffect(() => {
    if (searchData !== undefined) fetchProjects();
  }, [searchData]);
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
                  projects
                </Typography>
              </Box>
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
                  <span style={{ position: "relative" }}>Add Project</span>
                </Button>
              </Link>
            </Box>
          </Box>
          {projectList.length === 0 ? (
            <NoData />
          ) : (
            <>
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
                    <TableRow
                      sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}
                    >
                      <TableCell>Project Name</TableCell>
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
                        <TableCell>{row.userName}</TableCell>
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
                            sx={{
                              fontSize: "12px",
                              p: 0.5,
                              borderRadius: 1,
                              maxWidth: "fit-content",
                              lineHeight: 1,
                              color: "white",
                              bgcolor:
                                row.status === "completed"
                                  ? "success.main"
                                  : row.status === "inReview"
                                  ? "review.main"
                                  : row.status === "inProgress"
                                  ? "secondary.main"
                                  : "grey.dark",
                            }}
                          >
                            {row.status}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 1.25, sm: 1.5 },
                              opacity: 0.3,
                              "& button": {
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              },
                              "& svg": {
                                fontSize: { xs: "20px", sm: "22px" },
                              },
                            }}
                          >
                            <Link to={`./view/${row._id}`}>
                              <Button disableRipple>
                                <VisibilityIcon />
                              </Button>
                            </Link>
                            <Link to={`./edit/${row._id}`}>
                              <Button disableRipple>
                                <CreateIcon />
                              </Button>
                            </Link>
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
