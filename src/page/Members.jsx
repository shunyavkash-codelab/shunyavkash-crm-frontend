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

  const fetchManager = async () => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.LIST,
        method: "get",
        params: { search: searchData },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setManagerList(res.data.data.data);
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
  }, []);

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
          <Box
            sx={{
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
                Our Members
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
                  Member
                </Typography>
              </Box>
            </Box>

            {user.role === 0 && (
              <Box>
                <Link to="./add">
                  <ThemeButton
                    Text="Add Member"
                    startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
                  />
                </Link>
              </Box>
            )}
          </Box>

          <Grid
            container
            rowSpacing={2.5}
            columnSpacing={2.5}
            sx={{ mt: 0.75 }}
          >
            <Grid item xs={6} md={3} lg={4}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Members
                </Typography>
                <Typography
                  sx={{
                    fontSize: 22,
                    color: "black",
                    fontWeight: 600,
                    mt: 2,
                  }}
                >
                  {`${(managerList.length || 0) + (employeesList.length || 0)}`}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={4}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Managers
                </Typography>
                <Typography
                  sx={{
                    fontSize: 22,
                    color: "black",
                    fontWeight: 600,
                    mt: 2,
                  }}
                >
                  {managerList.length || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={4}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Employee
                </Typography>
                <Typography
                  sx={{
                    fontSize: 22,
                    color: "black",
                    fontWeight: 600,
                    mt: 2,
                  }}
                >
                  {employeesList.length || 0}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              backgroundColor: "white",
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
            </CustomTabPanel>

            {/* Employee */}
            <CustomTabPanel value={value} index={1}>
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
                      <TableCell sx={{ width: "400px" }}>employee</TableCell>
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
            </CustomTabPanel>

            {/* <CustomTabPanel value={value} index={0}>
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
                      <TableCell>Manager</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Mobile Number</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList.map((row) => (
                      <TableRow
                        key={row.fullname}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&>td": { fontSize: { xs: "12px", sm: "14px" } },
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
                        <TableCell>{row.mobileNumber}</TableCell>
                        <TableCell>{row.gender}</TableCell>
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
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomTabPanel> */}

            {/* <CustomTabPanel value={value} index={1}>
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
                      <TableCell>Employee</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Mobile Number</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userList.map((row) => (
                      <TableRow
                        key={row.fullname}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&>td": { fontSize: { xs: "12px", sm: "14px" } },
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
                        <TableCell>{row.mobileNumber}</TableCell>
                        <TableCell>{row.gender}</TableCell>
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
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CustomTabPanel> */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
