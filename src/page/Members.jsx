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
  Grid,
  Tab,
  Tabs,
  Stack,
  TablePagination,
  Pagination,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import PlusIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import EmployeeListRaw from "../component/EmployeeListRaw";
import useApi from "../hooks/useApi.js";
import { APIS } from "../api/apiList.js";
import { useSearchData } from "../hooks/store/useSearchData.js";
import { useSnack } from "../hooks/store/useSnack.js";
import { useInviteMemberStore } from "../hooks/store/useInviteMemberStore.js";
import ThemeButton from "../component/ThemeButton.jsx";
import SectionHeader from "../component/SectionHeader.jsx";
import NoData from "../component/NoData.jsx";
import CounterCards from "../component/CounterCards.jsx";
import ThemePagination from "../component/ThemePagination";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Members() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, user } = useAuth();
  const [managerList, setManagerList] = useState([]);
  const { inviteMemberStore } = useInviteMemberStore();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [employeesList, setEmployeesList] = useState([]);
  const { apiCall } = useApi();
  const { searchData } = useSearchData();
  const { setSnack } = useSnack();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangeOnPageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const fetchManager = async () => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.LIST,
        method: "get",
        params: {
          search: searchData,
          page: searchData ? 1 : page,
          limit: rowsPerPage,
        },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setManagerList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await apiCall({
        url: APIS.EMPLOYEE.ALLLIST,
        method: "get",
        params: { search: searchData },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setEmployeesList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    fetchManager();
    fetchEmployees();
  }, [page, rowsPerPage]);

  // serech data
  useEffect(() => {
    if (searchData !== undefined) fetchManager();
  }, [searchData]);

  // employee
  useEffect(() => {
    if (inviteMemberStore)
      setEmployeesList([...[inviteMemberStore], ...employeesList]);
  }, [inviteMemberStore]);

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
              Title="Our Members"
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="Member"
              style={{ mb: 0 }}
            />
            {user.role === 0 && (
              <Link to="./add">
                <ThemeButton
                  Text="Add Member"
                  startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
                />
              </Link>
            )}
          </Stack>

          <Grid container spacing={2.5}>
            <Grid item xs={6} md={3} lg={4}>
              <CounterCards
                Title="Total Members"
                Counter={`${
                  (managerList.length || 0) + (employeesList.length || 0)
                }`}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={4}>
              <CounterCards
                Title="Total Managers"
                Counter={managerList.length || 0}
              />
            </Grid>
            <Grid item xs={6} md={3} lg={4}>
              <CounterCards
                Title="Total Employee"
                Counter={employeesList.length || 0}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 3,
              p: 3,
              mt: 3,
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                minHeight: "38px",

                "& .MuiTabs-flexContainer": {
                  justifyContent: "flex-start",
                },
                "& button": {
                  textTransform: "capitalize",
                  py: 0,
                  minHeight: "unset",
                },
              }}
            >
              <Tab
                disableRipple
                disableElevation
                label="Manager"
                {...a11yProps(0)}
              />
              <Tab
                disableRipple
                disableElevation
                label="Employee"
                {...a11yProps(1)}
              />
            </Tabs>

            {/* Manager */}
            <CustomTabPanel value={value} index={0}>
              {managerList.length > 0 ? (
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
                      className="userTable"
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
                          sx={{
                            "&>th": { lineHeight: 1, fontWeight: 700 },
                          }}
                        >
                          <TableCell sx={{ width: "400px" }}>Manager</TableCell>
                          <TableCell>mobile number</TableCell>
                          <TableCell sx={{ width: "250px" }}>Role</TableCell>
                          <TableCell sx={{ width: "140px" }}>status</TableCell>
                          <TableCell sx={{ width: "140px" }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {managerList.map((row) => (
                          <EmployeeListRaw
                            row={row}
                            uniqId={row._id}
                            setEmployeesList={setManagerList}
                            dataList={managerList}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* pagination */}
                  <ThemePagination
                    totalpage={totalPage}
                    onChange={handleChangeOnPageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                  {/* <TablePagination
                    component="div"
                    count={10}
                    page={page}
                    onPageChange={handleChangeOnPageChange}
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
                    <Pagination
                      count={totalPage}
                      page={page}
                      onChange={handleChangeOnPageChange}
                    />
                  </Stack> */}
                </>
              ) : (
                <NoData />
              )}
            </CustomTabPanel>

            {/* Employee */}
            <CustomTabPanel value={value} index={1}>
              {employeesList.length > 0 ? (
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
                      className="userTable"
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
                          sx={{
                            "&>th": { lineHeight: 1, fontWeight: 700 },
                          }}
                        >
                          <TableCell sx={{ width: "400px" }}>
                            employee
                          </TableCell>
                          <TableCell>mobile number</TableCell>
                          <TableCell sx={{ width: "250px" }}>Role</TableCell>
                          <TableCell sx={{ width: "140px" }}>status</TableCell>
                          <TableCell sx={{ width: "140px" }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {employeesList.map((row) => (
                          <EmployeeListRaw
                            row={row}
                            uniqId={row._id}
                            setEmployeesList={setEmployeesList}
                            employeesList={employeesList}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {/* pagination */}
                  <TablePagination
                    component="div"
                    count={10}
                    page={page}
                    onPageChange={handleChangeOnPageChange}
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
                      onChange={handleChangeOnPageChange}
                    />
                  </Stack>
                </>
              ) : (
                <NoData />
              )}
            </CustomTabPanel>
          </Box>
        </Box>
      </Box>
    </>
  );
}
