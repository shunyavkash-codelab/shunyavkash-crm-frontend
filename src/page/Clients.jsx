import React, { useEffect, useState } from "react";
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
  Chip,
  Stack,
  TablePagination,
  Pagination,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import PlusIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import { useSearchData } from "../hooks/store/useSearchData.js";
import NoData from "../component/NoData.jsx";
import ThemeButton from "../component/ThemeButton.jsx";
import SectionHeader from "../component/SectionHeader.jsx";

export default function Clients() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [clientList, setClientList] = useState([]);
  const { apiCall } = useApi();
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

  const fetchclientData = async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.LIST,
        method: "get",
        params: {
          search: searchData,
          page: searchData ? 1 : page,
          limit: rowsPerPage,
        },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setClientList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchclientData();
  }, [page, rowsPerPage]);
  // });
  useEffect(() => {
    if (searchData !== undefined) fetchclientData();
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
        setPage={setPage}
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
              Title="Our Clients"
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="Clients"
              style={{ mb: 0 }}
            />
            <Link to="./add">
              <ThemeButton
                Text="Add client"
                startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
              />
            </Link>
          </Stack>

          {clientList.length === 0 ? (
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
                      <TableCell>Name</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Project</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                          "&>*": { p: 1.5 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1.75,
                            }}
                          >
                            <Avatar
                              sx={{
                                width: "36px",
                                height: "36px",
                              }}
                              alt={row.name}
                              src={row.profile_img}
                            />
                            <Box>
                              <Typography
                                sx={{
                                  mb: 0.75,
                                  lineHeight: 1,
                                  fontWeight: 600,
                                  fontSize: { xs: "14px", sm: "16px" },
                                }}
                              >
                                {row.name}
                              </Typography>
                              <Typography
                                sx={{
                                  lineHeight: 1,
                                  textTransform: "lowercase",
                                  fontSize: { xs: "12px", sm: "14px" },
                                }}
                              >
                                {row.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{row.companyName}</TableCell>
                        <TableCell>
                          <Stack sx={{}}>
                            {row.projectName.map((pro) => (
                              <Chip
                                label={pro}
                                sx={{ maxWidth: "fit-content" }}
                              />
                            ))}
                          </Stack>
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
                            {/* <Button
                              disableRipple
                              sx={{
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              }}
                            >
                              <DeleteIcon />
                            </Button> */}
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
                {/* <Typography>Page: {page}</Typography> */}
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
