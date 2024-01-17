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
  Stack,
  TablePagination,
  Pagination,
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
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Project() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [projectList, setProjectList] = useState([]);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { accessToken } = useAuth();
  const { searchData } = useSearchData();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const fetchProjects = async () => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.LIST,
        method: "get",
        params: { search: searchData, page, limit: rowsPerPage },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setProjectList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
      handleApiError(error, setSnack);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [page, rowsPerPage]);

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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent={{ sm: "space-between" }}
            columnGap={2}
            rowGap={2.5}
            sx={{
              mb: 3.25,
            }}
          >
            <SectionHeader
              Title="Our Projects"
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="projects"
              style={{ mb: 0 }}
            />
            <Link to="./add">
              <ThemeButton
                Text="Add Project"
                startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
              />
            </Link>
          </Stack>

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
                  id={"tableData"}
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
                <Typography>Page: {page}</Typography>
                <Pagination
                  count={totalPage}
                  page={page}
                  onChange={handleChange}
                />
              </Stack>
            </>
          )}
        </Box>
      </Box>
    </>
  );
}
