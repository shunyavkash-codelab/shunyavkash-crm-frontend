import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Grid,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
// import Link from "@mui/material/Link";
import PropTypes from "prop-types";
import DateIcon from "@mui/icons-material/DateRangeOutlined";
import DetailsList from "../component/employee/DetailsList";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import EditIcon from "@mui/icons-material/CreateOutlined";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import ReactFileReader from "react-file-reader";
import WcOutlinedIcon from "@mui/icons-material/WcOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Man2OutlinedIcon from "@mui/icons-material/Man2Outlined";
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ModalComponent from "../component/ModalComponent";
import UserSalary from "../page/UserSalary";
import UserLeave from "./UserLeave";
import { useParams, useNavigate, Link } from "react-router-dom";
import { APIS } from "../api/apiList.js";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import EmployeeDetailsForm from "../component/form/EmployeeDetailsForm.jsx";
import EmployeeContactForm from "../component/form/EmployeeContactForm.jsx";
import EmployeeFamilyDetailForm from "../component/form/EmployeeFamilyDetailForm.jsx";
import EmployeeDocumentDetailForm from "../component/form/EmployeeDocumentDetailForm.jsx";
import EmployeePersonalDetailForm from "../component/form/EmployeePersonalDetailForm.jsx";
import moment from "moment";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Box>
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

export default function Home() {
  const { id } = useParams();
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, userId } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();

  const [userList, setUserList] = useState();
  const [changeStatus, setChangeStatus] = useState(true);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [url, setUrl] = useState();
  const handleFiles = async (files) => {
    console.log(files, "---------------95");
    setUrl(files.base64);
    let formData = new FormData();
    // values.profile_img = url?.fileList[0];

    formData.append("profile_img", files.fileList[0]);

    try {
      const res = await apiCall({
        url: APIS.MANAGER.EDIT(id),
        method: "patch",
        headers: "multipart/form-data",
        data: formData,
      });
      if (res.status === 200) {
        setSnack(res.data.message);
        // setUrl(files.base64);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  const [open, setOpen] = React.useState({ open: false, type: "" });

  const handleChangeActiveDeactive = async () => {
    setChangeStatus(!changeStatus);
    try {
      const res = await apiCall({
        url: APIS.MANAGER.EDIT(id),
        method: "patch",
        data: { isActive: !changeStatus },
      });
      if (res.status === 200) {
        setSnack(res.data.message);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  const handleChangeUserDelete = async () => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.EDIT(id),
        method: "patch",
        data: { isDeleted: true },
      });
      if (res.status === 200) {
        setSnack(res.data.message);
        navigate("/employees");
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  const handleOpen = (type) => setOpen({ open: true, type });

  const viewEmployees = async () => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.VIEW(id || userId),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setUserList(res.data.data);
        setChangeStatus(res.data.data.isActive);
        setUrl(res.data.data.profile_img);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    viewEmployees();
  }, []);

  // const originalDateString = "2024-1-1T03:56:27.414+00:00";
  let joiningFormattedDate;
  if (userList?.dateOfJoining) {
    let originalDate = moment(userList?.dateOfJoining);
    joiningFormattedDate = originalDate.format("DD/MM/YYYY");
  }

  let dobFormattedDate;
  if (userList?.dob) {
    let originalDate = moment(userList?.dob);
    dobFormattedDate = originalDate.format("DD/MM/YYYY");
  }

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
              {userList?.role === 0
                ? "Admin Profile"
                : userList?.role === 1
                ? "Manager Profile"
                : "Employee Profile"}
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
                {userList?.name}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 4,
              overflow: "hidden",
              p: 2,
              pb: 0,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mt: 0,
                // mx: 3.75,
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "100%",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <Avatar
                  sx={{
                    width: "100px",
                    borderRadius: "100%",
                    bgcolor: "grey.light",
                    height: "100px",
                    boxShadow: "0 0 0 4px white",
                  }}
                  alt="avatar"
                  src={url ? url : isLoading}
                />
                <Button
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    backgroundColor: "rgba(0,0,0,0.4)",
                    "&:hover": {
                      backgroundColor: "rgba(0,0,0,0.5)",
                    },
                  }}
                >
                  <ReactFileReader
                    fileTypes={[".png", ".jpg"]}
                    base64={true}
                    handleFiles={handleFiles}
                    as={Button}
                  >
                    <CameraAltIcon
                      sx={{
                        fontSize: 20,
                        color: "white",
                        display: "block",
                      }}
                    />
                  </ReactFileReader>
                </Button>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: 1.3,
                    py: 1.25,
                  }}
                >
                  <Chip
                    label={
                      userList?.role === 0
                        ? "Admin"
                        : userList?.role === 1
                        ? "Manager"
                        : "Employee"
                    }
                    sx={{ height: "auto", py: "2px" }}
                  ></Chip>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "black",
                      fontWeight: 500,
                      textTransform: "capitalize",
                    }}
                  >
                    {userList?.name}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.75,
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        opacity: 0.5,
                      }}
                    >
                      {userList?.jobRole}
                    </Typography>
                    {/* Todo : This Button is visible for admin only */}
                    <Chip
                      label={changeStatus ? "Active" : "Deactive"}
                      color={changeStatus ? "success" : "error"}
                      sx={{
                        height: "unset",
                        "& span": {
                          color: "white",
                          padding: "3px 10px",
                          fontSize: "12px",
                        },
                      }}
                    />
                  </Box>
                </Box>
                {id && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Button
                      disableRipple
                      type="submit"
                      onClick={() => handleChangeActiveDeactive()}
                      sx={{
                        maxHeight: "42px",
                        position: "relative",
                        px: 2.5,
                        py: 1.5,
                        bgcolor: changeStatus ? "error.main" : "success.main",
                        border: "1px solid",
                        borderColor: changeStatus
                          ? "error.main"
                          : "success.main",
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
                          color: changeStatus ? "error.main" : "success.main",
                          bgcolor: changeStatus ? "error.main" : "success.main",
                          "&:before": { height: "10rem" },
                        },
                      }}
                    >
                      <span style={{ position: "relative" }}>
                        {changeStatus ? "deactive" : "active"}
                      </span>
                    </Button>
                    <Button
                      disableRipple
                      type="submit"
                      onClick={() => handleChangeUserDelete()}
                      sx={{
                        maxHeight: "42px",
                        position: "relative",
                        px: 2.5,
                        py: 1.5,
                        bgcolor: "error.main",
                        border: "1px solid",
                        borderColor: "error.main",
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
                          color: "error.main",
                          bgcolor: "error.main",
                          "&:before": { height: "10rem" },
                        },
                      }}
                    >
                      <span style={{ position: "relative" }}>delete</span>
                    </Button>
                  </Box>
                )}
              </Box>
            </Box>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons={false}
              sx={{
                mt: 2,
                "& .MuiTabs-flexContainer": {
                  justifyContent: "flex-start",
                  px: 2,
                  borderTop: "1px solid rgba(0,0,0,0.1)",
                },
                "& button": {
                  textTransform: "capitalize",
                  py: 2.25,
                },
              }}
            >
              <Tab
                disableRipple
                disableElevation
                label="Details"
                {...a11yProps(0)}
              />
              <Tab
                disableRipple
                disableElevation
                label="Salary"
                {...a11yProps(1)}
              />
              <Tab
                disableRipple
                disableElevation
                label="Leave"
                {...a11yProps(2)}
              />
            </Tabs>
          </Box>

          <CustomTabPanel
            sx={{
              "&>div>div": {
                bgcolor: "white",
                borderRadius: 4,
                mt: 3,
                pt: 2,
                pb: 3,
              },
              "& .cardHeader": {
                px: 3,
                pb: 2,
                mb: 3,
                borderBottom: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              },
              "& .cardTitle": {
                textTransform: "capitalize",
                fontWeight: 600,
              },
            }}
            value={value}
            index={0}
          >
            <Box>
              {id && (
                <Box className="cardHeader">
                  <Typography className="cardTitle">
                    {userList?.role === 0
                      ? "Admin"
                      : userList?.role === 1
                      ? "Manager"
                      : "Employee"}{" "}
                    Details
                  </Typography>
                  <Button
                    onClick={handleOpen.bind(null, "employee-detail")}
                    startIcon={<EditIcon sx={{ width: 16 }} />}
                    sx={{
                      cursor: "pointer",
                      height: "unset",
                      py: 0.3,
                      px: 1.5,
                      border: "1px solid",
                      borderColor: "primary.main",
                      borderRadius: 4,
                    }}
                  >
                    Edit
                  </Button>
                </Box>
              )}
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"date of joining"}
                    Text={joiningFormattedDate || "N/A"}
                    Icon={<DateIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"employee id"}
                    Text={userList?.employeeId || "N/A"}
                    Icon={<Grid3x3Icon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"work email"}
                    Text={userList?.email || "N/A"}
                    Icon={<EmailOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"designation"}
                    Text={userList?.designation || "N/A"}
                    Icon={<AccountBoxOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"role"}
                    Text={
                      userList?.role === 0
                        ? "Admin"
                        : userList?.role === 1
                        ? "Manager"
                        : userList?.role === 2
                        ? "Employee"
                        : "N/A"
                    }
                    Icon={<PermIdentityOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Personal Details</Typography>
                <Button
                  onClick={handleOpen.bind(null, "personal-detail")}
                  startIcon={<EditIcon sx={{ width: 16 }} />}
                  sx={{
                    cursor: "pointer",
                    height: "unset",
                    py: 0.3,
                    px: 1.5,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 4,
                  }}
                >
                  Edit
                </Button>
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"full name"}
                    Text={userList?.name || "N/A"}
                    Icon={<PermIdentityOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"gender"}
                    Text={userList?.gender || "N/A"}
                    Icon={<WcOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"DOB"}
                    Text={dobFormattedDate || "N/A"}
                    Icon={<DateIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"hobbies"}
                    Text={userList?.hobbies || "N/A"}
                    Icon={<SportsSoccerOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"phobia"}
                    Text={userList?.phobia || "N/A"}
                    Icon={<SickOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Contact Details</Typography>
                <Button
                  onClick={handleOpen.bind(null, "contact-detail")}
                  startIcon={<EditIcon sx={{ width: 16 }} />}
                  sx={{
                    cursor: "pointer",
                    height: "unset",
                    py: 0.3,
                    px: 1.5,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 4,
                  }}
                >
                  Edit
                </Button>
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"Phone number"}
                    Text={
                      userList?.mobileCode + userList?.mobileNumber || "N/A"
                    }
                    Icon={<PhoneOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"whatsApp number"}
                    Text={userList?.whatsappNumber || "N/A"}
                    // Todo : Add whatsapp icon here
                    Icon={<PhoneOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"personal email"}
                    Text={"deepbhimani6@gmail.com"}
                    Icon={<EmailOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"Address"}
                    Text={
                      userList?.address +
                        userList?.address2 +
                        userList?.landmark +
                        "-" +
                        userList?.pincode || "N/A"
                    }
                    Icon={<HomeOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Family Details</Typography>
                <Button
                  onClick={handleOpen.bind(null, "family-detail")}
                  startIcon={<EditIcon sx={{ width: 16 }} />}
                  sx={{
                    cursor: "pointer",
                    height: "unset",
                    py: 0.3,
                    px: 1.5,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 4,
                  }}
                >
                  Edit
                </Button>
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"father's name"}
                    Text={userList?.fatherName || "N/A"}
                    Icon={<Man2OutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"father's number"}
                    Text={userList?.fatherNumber || "N/A"}
                    Icon={<PhoneOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"mother's name"}
                    Text={userList?.motherName || "N/A"}
                    Icon={<Woman2OutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Document Details</Typography>
                <Button
                  onClick={handleOpen.bind(null, "document-detail")}
                  startIcon={<EditIcon sx={{ width: 16 }} />}
                  sx={{
                    cursor: "pointer",
                    height: "unset",
                    py: 0.3,
                    px: 1.5,
                    border: "1px solid",
                    borderColor: "primary.main",
                    borderRadius: 4,
                  }}
                >
                  Edit
                </Button>
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Link
                    href={userList?.empaloyeeSignature}
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-block",
                      "& > div": {
                        mb: 0,
                      },
                    }}
                  >
                    <DetailsList
                      Title={"signature"}
                      Icon={<FileDownloadOutlinedIcon />}
                    />
                  </Link>
                  <Link
                    href="#javascript:void(0);"
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-block",
                      "& > div": {
                        mb: 0,
                      },
                    }}
                  >
                    <DetailsList
                      Title={"HSC-SSC certification"}
                      Icon={<FileDownloadOutlinedIcon />}
                    />
                  </Link>
                  <Link
                    href="#javascript:void(0);"
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-block",
                      "& > div": {
                        mb: 0,
                      },
                    }}
                  >
                    <DetailsList
                      Title={"Adhar Card"}
                      Icon={<FileDownloadOutlinedIcon />}
                    />
                  </Link>
                  <Link
                    href="#javascript:void(0);"
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-block",
                      "& > div": {
                        mb: 0,
                      },
                    }}
                  >
                    <DetailsList
                      Title={"Adress Proof"}
                      Icon={<FileDownloadOutlinedIcon />}
                    />
                  </Link>
                  <Link
                    href="#javascript:void(0);"
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-block",
                      "& > div": {
                        mb: 0,
                      },
                    }}
                  >
                    <DetailsList
                      Title={"Property tax bill"}
                      Icon={<FileDownloadOutlinedIcon />}
                    />
                  </Link>
                  <Link
                    href="#javascript:void(0);"
                    target="_blank"
                    sx={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-block",
                      "& > div": {
                        mb: 0,
                      },
                    }}
                  >
                    <DetailsList
                      Title={"Electricity bill"}
                      Icon={<FileDownloadOutlinedIcon />}
                    />
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <Box>
              <UserSalary />
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <UserLeave />
          </CustomTabPanel>

          <ModalComponent
            open={open.open}
            setOpen={() => setOpen({ type: "", open: false })}
            modalTitle={
              open.type === "employee-detail"
                ? "Employment Details"
                : open.type === "personal-detail"
                ? "Personal Details"
                : open.type === "contact-detail"
                ? "Contact Details"
                : open.type === "family-detail"
                ? "Family Details"
                : open.type === "document-detail" && "Document Details"
            }
          >
            {open.type === "employee-detail" && (
              <EmployeeDetailsForm
                data={userList}
                uniqId={id}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
            {open.type === "personal-detail" && (
              <EmployeePersonalDetailForm
                data={userList}
                uniqId={id}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
            {open.type === "contact-detail" && (
              <EmployeeContactForm
                data={userList}
                uniqId={id}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
            {open.type === "family-detail" && (
              <EmployeeFamilyDetailForm
                data={userList}
                uniqId={id}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
            {open.type === "document-detail" && (
              <EmployeeDocumentDetailForm
                data={userList}
                uniqId={id}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
          </ModalComponent>
        </Box>
      </Box>
    </>
  );
}
