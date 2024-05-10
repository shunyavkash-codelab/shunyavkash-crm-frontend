import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  Paper,
  Grid,
  Tab,
  Tabs,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
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
import LoadingIcon from "../component/icons/LoadingIcon.jsx";
import CustomTableHeader from "../component/table/CustomTableHeader.jsx";

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
      {value === index && <Box sx={{ pt: 0 }}>{children}</Box>}
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
  const { user } = useAuth();
  const [managerList, setManagerList] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const { inviteMemberStore } = useInviteMemberStore();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [employeesList, setEmployeesList] = useState([]);
  const [invitedList, setInvitedList] = useState([]);
  const { apiCall, isLoading } = useApi();
  const { searchData, setSearchData } = useSearchData();
  const { setSnack } = useSnack();
  const [params] = useSearchParams();
  const page = +params.get("page") || 1;
  const limit = +params.get("limit") || 10;
  const [totalPage, setTotalPage] = useState(1);
  const [jobRoleList, setJobRoleList] = useState([]);
  const [selectJobRole, setSelectJobRole] = useState("all");
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = () => {
    params.set("page", 1);
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const fetchDashboard = async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.DASHBOARD,
        method: "get",
      });
      if (res.data.success === true) {
        setDashboard(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const fetchManager = useCallback(
    async (search) => {
      try {
        const res = await apiCall({
          url: APIS.USER.MANAGERLIST,
          method: "get",
          params: {
            search: search,
            page: page,
            limit: limit,
            filter: selectJobRole === "all" ? undefined : selectJobRole,
          },
        });
        if (res.data.success === true) {
          setManagerList(res.data.data.data);
          setTotalPage(res.data.data.pagination.pages);
        }
      } catch (error) {
        console.log(error, setSnack);
      }
    },
    [apiCall, limit, page, selectJobRole, setSnack]
  );

  const fetchEmployees = useCallback(
    async (search) => {
      try {
        const res = await apiCall({
          url: APIS.USER.EMPLOYEELIST,
          method: "get",
          params: {
            search: search,
            page: page,
            limit: limit,
            filter: selectJobRole === "all" ? undefined : selectJobRole,
          },
        });
        if (res.data.success === true) {
          setEmployeesList(res.data.data.data);
          setTotalPage(res.data.data.pagination.pages);
        }
      } catch (error) {
        console.log(error, setSnack);
      }
    },
    [apiCall, limit, page, selectJobRole, setSnack]
  );

  const fetchInvited = useCallback(
    async (search) => {
      try {
        const res = await apiCall({
          url: APIS.USER.INVITEDLIST,
          method: "get",
          params: {
            search: search,
            page: page,
            limit: limit,
            filter: selectJobRole === "all" ? undefined : selectJobRole,
          },
        });
        if (res.data.success === true) {
          setInvitedList(res.data.data.data);
          setTotalPage(res.data.data.pagination.pages);
        }
      } catch (error) {
        console.log(error, setSnack);
      }
    },
    [apiCall, limit, page, selectJobRole, setSnack]
  );

  const fetchJobRoles = async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.JOBROLES,
        method: "get",
      });
      if (res.data.success === true) {
        setJobRoleList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    setSearchData("");
  }, []);

  useEffect(() => {
    if (searchData) {
      const getData = setTimeout(async () => {
        if (page !== 1) {
          handlePageChange();
        } else {
          if (value === 0) fetchManager(searchData);
          else if (value === 1) fetchEmployees(searchData);
          else if (value === 2 && user.role === 0) fetchInvited(searchData);
        }
      }, 1000);
      return () => {
        clearTimeout(getData);
      };
    } else {
      fetchJobRoles();
      fetchManager();
      fetchEmployees();
      if (user.role === 0) fetchInvited();
    }
  }, [searchData]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  // employee
  useEffect(() => {
    if (inviteMemberStore) {
      setEmployeesList([...[inviteMemberStore], ...employeesList]);
      setInvitedList([...[inviteMemberStore], ...invitedList]);
    }
  }, [inviteMemberStore]);

  const TABLE_HEADINGS = [
    {
      id: "employee",
      label: value === 0 ? "Manager" : "Employee",
      sortable: false,
    },
    { id: "mobile", label: "Mobile Number", sortable: false },
    {
      id: "role",
      label: user.role === 0 ? "Role" : "Job Role",
      sortable: false,
    },
    user.role === 0 && { id: "status", label: "Status", sortable: false },
    user.role === 0 && {
      id: "actions",
      label: "Actions",
      sortable: false,
      textAlign: "center",
    },
  ];

  return (
    <>
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
            stackSx={{ mb: 0 }}
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
                (dashboard.manager || 0) + (dashboard.employee || 0)
              }`}
            />
          </Grid>
          <Grid item xs={6} md={3} lg={4}>
            <CounterCards
              Title="Total Managers"
              Counter={dashboard.manager || 0}
            />
          </Grid>
          <Grid item xs={6} md={3} lg={4}>
            <CounterCards
              Title="Total Employee"
              Counter={dashboard.employee || 0}
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 3,
            py: 3,
            px: 0,
            mt: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{
                minHeight: "38px",
                // borderBottom: "1px solid #f2f2f2",
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
                disableelevation="true"
                label="Manager"
                {...a11yProps(0)}
                sx={{
                  color: "primary.main",
                  px: 2.5,
                }}
              />
              <Tab
                disableRipple
                disableelevation="true"
                label="Employee"
                {...a11yProps(1)}
                sx={{
                  color: "primary.main",
                  px: 2.5,
                }}
              />
              {user.role === 0 && (
                <Tab
                  disableRipple
                  disableelevation="true"
                  label="Invited Members"
                  {...a11yProps(2)}
                  sx={{
                    color: "primary.main",
                    px: 2.5,
                  }}
                />
              )}
            </Tabs>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                minHeight: "38px",
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                gap: 2.5,
                "& fieldset": { borderRadius: "6px" },
                maxWidth: "140px",
                margin: "0 15px 5px",
              }}
            >
              <FormControl
                size="small"
                sx={{
                  "&>label": { fontSize: "14px" },
                  flexGrow: 1,
                }}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="date-wise-select-label"
                >
                  Job Role
                </InputLabel>
                <Select
                  labelId="date-wise-select-label"
                  id="demo-simple-select"
                  value={selectJobRole}
                  label="Date"
                  onChange={(e) => setSelectJobRole(e.target.value)}
                  sx={{
                    fontSize: "14px",
                    "&": {
                      bgcolor: "white",
                    },
                  }}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"all"}
                  >
                    All
                  </MenuItem>
                  {jobRoleList.length > 0 &&
                    jobRoleList.map((jobrole) => (
                      <MenuItem
                        sx={{ textTransform: "capitalize", fontSize: "14px" }}
                        value={jobrole._id}
                        key={jobrole._id}
                      >
                        {jobrole._id}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
          </Box>
          {/* Manager */}
          <CustomTabPanel value={value} index={0}>
            {isLoading ? (
              <LoadingIcon style={{ height: "50vh" }} />
            ) : managerList.length === 0 ? (
              <Box p={2.5}>
                <NoData />
              </Box>
            ) : (
              <>
                <TableContainer
                  component={Paper}
                  sx={{
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    mx: { xs: "-10px", sm: 0 },
                    width: { xs: "auto", sm: "auto" },
                    borderRadius: 0,
                    boxShadow: 0,
                  }}
                >
                  <Table
                    className="userTable"
                    sx={{
                      minWidth: 650,
                      textTransform: "capitalize",
                      textWrap: "nowrap",
                      "& th,& td": {
                        borderBottom: 0,
                      },
                      "& tbody tr": {
                        borderTop: "1px solid rgba(224, 224, 224, 1)",
                      },
                    }}
                    aria-label="simple table"
                  >
                    <CustomTableHeader headings={TABLE_HEADINGS} />
                    <TableBody>
                      {managerList.map((row) => (
                        <EmployeeListRaw
                          row={row}
                          uniqId={row._id}
                          setEmployeesList={setManagerList}
                          dataList={managerList}
                          user={user}
                          key={row._id}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            {/* pagination */}
            {managerList.length > 0 && (
              <ThemePagination
                totalpage={totalPage}
                count={managerList.length}
              />
            )}
          </CustomTabPanel>

          {/* Employee */}
          <CustomTabPanel value={value} index={1}>
            {isLoading ? (
              <LoadingIcon style={{ height: "50vh" }} />
            ) : employeesList.length === 0 ? (
              <Box p={2.5}>
                <NoData />
              </Box>
            ) : (
              <>
                <TableContainer
                  component={Paper}
                  sx={{
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    mx: { xs: "-10px", sm: 0 },
                    width: { xs: "auto", sm: "auto" },
                    borderRadius: 0,
                    boxShadow: 0,
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
                    <CustomTableHeader headings={TABLE_HEADINGS} />
                    <TableBody>
                      {employeesList.map((row) => (
                        <EmployeeListRaw
                          row={row}
                          uniqId={row._id}
                          setEmployeesList={setEmployeesList}
                          employeesList={employeesList}
                          user={user}
                          key={row._id}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            {/* pagination */}
            {employeesList.length > 0 && (
              <ThemePagination
                totalpage={totalPage}
                count={employeesList.length}
              />
            )}
          </CustomTabPanel>

          {/* Invited */}
          <CustomTabPanel value={value} index={2}>
            {isLoading ? (
              <LoadingIcon style={{ height: "50vh" }} />
            ) : invitedList.length === 0 ? (
              <Box p={2.5}>
                <NoData />
              </Box>
            ) : (
              <>
                <TableContainer
                  component={Paper}
                  sx={{
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                    borderBottom: "1px solid rgba(224, 224, 224, 1)",
                    mx: { xs: "-10px", sm: 0 },
                    width: { xs: "auto", sm: "auto" },
                    borderRadius: 0,
                    boxShadow: 0,
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
                    <CustomTableHeader headings={TABLE_HEADINGS} />
                    <TableBody>
                      {invitedList.map((row) => (
                        <EmployeeListRaw
                          row={row}
                          uniqId={row._id}
                          setEmployeesList={setEmployeesList}
                          invitedList={invitedList}
                          user={user}
                          key={row._id}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
            {/* pagination */}
            {invitedList.length > 0 && (
              <ThemePagination
                totalPage={totalPage}
                count={invitedList.length}
              />
            )}
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}
