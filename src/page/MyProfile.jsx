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
import ThemeButton from "../component/ThemeButton.jsx";
import SectionHeader from "../component/SectionHeader.jsx";

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

export default function MyProfile() {
  const { id } = useParams();
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, userId, user } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();

  const [profileUser, setProfileUser] = useState();
  const [changeStatus, setChangeStatus] = useState(true);
  const [value, setValue] = useState(0);
  const [userBank, setUserBank] = useState(false);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [url, setUrl] = useState();
  const handleFiles = async (files) => {
    setUrl(files.base64);
    let formData = new FormData();
    formData.append("profile_img", files.fileList[0]);

    try {
      const res = await apiCall({
        url: APIS.MANAGER.EDIT(id || userId),
        method: "patch",
        headers: "multipart/form-data",
        data: formData,
      });
      if (res.status === 200) {
        setSnack(res.data.message);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  const [open, setOpen] = useState({ open: false, type: "" });

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
        setProfileUser(res.data.data);
        setChangeStatus(res.data.data.isActive);
        setUrl(res.data.data.profile_img);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  const viewUserBank = async (userId) => {
    try {
      const res = await apiCall({
        url: APIS.BANK.USERBANK(userId),
        method: "get",
      });
      if (res.data.success === true) {
        setUserBank(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    viewEmployees();
    viewUserBank(id || userId);
  }, []);

  // const originalDateString = "2024-1-1T03:56:27.414+00:00";
  let joiningFormattedDate;
  if (profileUser?.dateOfJoining) {
    let originalDate = moment(profileUser?.dateOfJoining);
    joiningFormattedDate = originalDate.format("DD/MM/YYYY");
  }

  let dobFormattedDate;
  if (profileUser?.dob) {
    let originalDate = moment(profileUser?.dob);
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
          <SectionHeader
            Title={
              profileUser?.role === 0
                ? "my Profile"
                : profileUser?.role === 1
                ? "Manager Profile"
                : "Employee Profile"
            }
            BreadCrumbPreviousLink="/members"
            BreadCrumbPreviousTitle="Members"
            BreadCrumbCurrentTitle={profileUser?.name}
          />

          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 4,
              overflow: "hidden",
              p: 3,
              pb: 0,
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
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
                    height: "100px",
                    borderRadius: "100%",
                    bgcolor: "grey.light",
                    boxShadow: "0 0 0 4px white",
                  }}
                  alt="avatar"
                  src={url ? url : isLoading}
                />
                <Button
                  disableRipple
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
                    gap: 1.25,
                  }}
                >
                  <Chip
                    label={
                      profileUser?.role === 0
                        ? "Admin"
                        : profileUser?.role === 1
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
                    {profileUser?.name}
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
                        textTransform: "capitalize",
                      }}
                    >
                      {profileUser?.designation}
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
                    <ThemeButton
                      Text={changeStatus ? "deactive" : "active"}
                      type="submit"
                      btnColor={changeStatus ? "error.main" : "success.main"}
                      onClick={() => handleChangeActiveDeactive()}
                    />
                    <ThemeButton
                      error
                      Text="delete"
                      type="submit"
                      onClick={() => handleChangeUserDelete()}
                    />
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
                  // px: 2,
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
                pt: 2,
                pb: 3,
                "&:not(:first-child)": {
                  mt: 3,
                },
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
              <Box className="cardHeader">
                <Typography className="cardTitle">
                  {profileUser?.role === 0
                    ? "Admin"
                    : profileUser?.role === 1
                    ? "Manager"
                    : "Employee"}{" "}
                  Details
                </Typography>
                {user.role === 0 && (
                  <ThemeButton
                    transparent
                    smallRounded
                    Text="edit"
                    startIcon={<EditIcon sx={{ fontSize: "16px!important" }} />}
                    onClick={handleOpen.bind(null, "employee-detail")}
                  />
                )}
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"date of joining"}
                    Text={joiningFormattedDate || "N/A"}
                    Icon={<DateIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"employee id"}
                    Text={profileUser?.employeeId || "N/A"}
                    Icon={<Grid3x3Icon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"work email"}
                    Text={profileUser?.email || "N/A"}
                    Icon={<EmailOutlinedIcon />}
                    TextStyle={{ wordBreak: "break-all" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"Job Title"}
                    Text={profileUser?.designation || "N/A"}
                    Icon={<AccountBoxOutlinedIcon />}
                    TextStyle={{ textTransform: "capitalize" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"role"}
                    Text={
                      profileUser?.role === 0
                        ? "admin"
                        : profileUser?.role === 1
                        ? "Manager"
                        : profileUser?.role === 2
                        ? "Employee"
                        : "N/A"
                    }
                    Icon={<PermIdentityOutlinedIcon />}
                    TextStyle={{ textTransform: "capitalize" }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Personal Details</Typography>
                <ThemeButton
                  transparent
                  smallRounded
                  Text="edit"
                  startIcon={<EditIcon sx={{ fontSize: "16px!important" }} />}
                  onClick={handleOpen.bind(null, "personal-detail")}
                />
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"full name"}
                    Text={profileUser?.name || "N/A"}
                    Icon={<PermIdentityOutlinedIcon />}
                    TextStyle={{ textTransform: "capitalize" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"gender"}
                    Text={profileUser?.gender || "N/A"}
                    Icon={<WcOutlinedIcon />}
                    TextStyle={{ textTransform: "capitalize" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"DOB"}
                    Text={dobFormattedDate || "N/A"}
                    Icon={<DateIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"hobbies"}
                    Text={profileUser?.hobbies || "N/A"}
                    Icon={<SportsSoccerOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"phobia"}
                    Text={profileUser?.phobia || "N/A"}
                    Icon={<SickOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Contact Details</Typography>
                <ThemeButton
                  transparent
                  smallRounded
                  Text="edit"
                  startIcon={<EditIcon sx={{ fontSize: "16px!important" }} />}
                  onClick={handleOpen.bind(null, "contact-detail")}
                />
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"Phone number"}
                    Text={
                      profileUser?.mobileCode + profileUser?.mobileNumber ||
                      "N/A"
                    }
                    Icon={<PhoneOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"whatsApp number"}
                    Text={profileUser?.whatsappNumber || "N/A"}
                    // Todo : Add whatsapp icon here
                    Icon={<PhoneOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"personal email"}
                    Text={profileUser?.personalEmail || "N/A"}
                    Icon={<EmailOutlinedIcon />}
                    TextStyle={{ wordBreak: "break-all" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"Address"}
                    Text={
                      (profileUser?.address &&
                        profileUser.address +
                          " " +
                          profileUser.address2 +
                          " " +
                          profileUser.landmark +
                          "-" +
                          profileUser.pincode) ||
                      "N/A"
                    }
                    // Text={
                    //   profileUser?.address?.split("\n").map((line, index) => (
                    //     <React.Fragment key={index}>
                    //       {line}
                    //       {index < profileUser.address.split("\n").length - 1 && (
                    //         <br />
                    //       )}
                    //     </React.Fragment>
                    //   )) || "N/A"
                    // }
                    Icon={<HomeOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Family Details</Typography>
                <ThemeButton
                  transparent
                  smallRounded
                  Text="edit"
                  startIcon={<EditIcon sx={{ fontSize: "16px!important" }} />}
                  onClick={handleOpen.bind(null, "family-detail")}
                />
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"father's name"}
                    Text={profileUser?.fatherName || "N/A"}
                    Icon={<Man2OutlinedIcon />}
                    TextStyle={{ textTransform: "capitalize" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"father's number"}
                    Text={profileUser?.fatherNumber || "N/A"}
                    Icon={<PhoneOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Title={"mother's name"}
                    Text={profileUser?.motherName || "N/A"}
                    Icon={<Woman2OutlinedIcon />}
                    TextStyle={{ textTransform: "capitalize" }}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Document Details</Typography>
                {(user.role === 1 || user.role === 2) && (
                  <ThemeButton
                    transparent
                    smallRounded
                    Text="edit"
                    startIcon={<EditIcon sx={{ fontSize: "16px!important" }} />}
                    onClick={handleOpen.bind(null, "document-detail")}
                  />
                )}
              </Box>
              <Box
                sx={{
                  px: 3,
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 1,
                }}
              >
                {profileUser?.signature && (
                  <Link
                    to={profileUser?.signature}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-flex",
                    }}
                  >
                    <DetailsList
                      Title={"signature"}
                      Icon={<FileDownloadOutlinedIcon />}
                      MainStyle={{ mb: 0 }}
                    />
                  </Link>
                )}

                {profileUser?.degreeCertification && (
                  <Link
                    to={profileUser.degreeCertification}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-flex",
                    }}
                    MainStyle={{ mb: 0 }}
                  >
                    <DetailsList
                      Title={"HSC-SSC certification"}
                      Icon={<FileDownloadOutlinedIcon />}
                      style={{
                        textDecoration: "none",
                        color: "#2a4062",
                        opacity: "0.8",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        borderRadius: 1,
                        padding: "5px 10px",
                        display: "inline-flex",
                      }}
                      MainStyle={{ mb: 0 }}
                    />
                  </Link>
                )}
                {profileUser?.adharCard && (
                  <Link
                    to={profileUser.adharCard}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-flex",
                    }}
                    MainStyle={{ mb: 0 }}
                  >
                    <DetailsList
                      Title={"Adhar Card"}
                      Icon={<FileDownloadOutlinedIcon />}
                      style={{
                        textDecoration: "none",
                        color: "#2a4062",
                        opacity: "0.8",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        borderRadius: 1,
                        padding: "5px 10px",
                        display: "inline-flex",
                      }}
                      MainStyle={{ mb: 0 }}
                    />
                  </Link>
                )}
                {profileUser?.addressProof && (
                  <Link
                    to={profileUser.addressProof}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-flex",
                    }}
                    MainStyle={{ mb: 0 }}
                  >
                    <DetailsList
                      Title={"Adress Proof"}
                      Icon={<FileDownloadOutlinedIcon />}
                      style={{
                        textDecoration: "none",
                        color: "#2a4062",
                        opacity: "0.8",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        borderRadius: 1,
                        padding: "5px 10px",
                        display: "inline-flex",
                      }}
                      MainStyle={{ mb: 0 }}
                    />
                  </Link>
                )}
                {profileUser?.propertyTax && (
                  <Link
                    to={profileUser.propertyTax}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-flex",
                    }}
                    MainStyle={{ mb: 0 }}
                  >
                    <DetailsList
                      Title={"Property tax bill"}
                      Icon={<FileDownloadOutlinedIcon />}
                      style={{
                        textDecoration: "none",
                        color: "#2a4062",
                        opacity: "0.8",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        borderRadius: 1,
                        padding: "5px 10px",
                        display: "inline-flex",
                      }}
                      MainStyle={{ mb: 0 }}
                    />
                  </Link>
                )}
                {profileUser?.electricityBill && (
                  <Link
                    to={profileUser.electricityBill}
                    target="_blank"
                    style={{
                      textDecoration: "none",
                      color: "#2a4062",
                      opacity: "0.8",
                      backgroundColor: "rgba(0,0,0,0.1)",
                      borderRadius: 1,
                      padding: "5px 10px",
                      display: "inline-flex",
                    }}
                    MainStyle={{ mb: 0 }}
                  >
                    <DetailsList
                      Title={"Electricity bill"}
                      Icon={<FileDownloadOutlinedIcon />}
                      style={{
                        textDecoration: "none",
                        color: "#2a4062",
                        opacity: "0.8",
                        backgroundColor: "rgba(0,0,0,0.1)",
                        borderRadius: 1,
                        padding: "5px 10px",
                        display: "inline-flex",
                      }}
                      MainStyle={{ mb: 0 }}
                    />
                  </Link>
                )}
              </Box>
            </Box>
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <UserSalary
              userId={id || userId}
              userBank={userBank}
              setUserBank={setUserBank}
            />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            <UserLeave profileId={id || userId} />
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
                data={profileUser}
                uniqId={id || userId}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
            {open.type === "personal-detail" && (
              <EmployeePersonalDetailForm
                data={profileUser}
                uniqId={id || userId}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
            {open.type === "contact-detail" && (
              <EmployeeContactForm
                data={profileUser}
                uniqId={id || userId}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
            {open.type === "family-detail" && (
              <EmployeeFamilyDetailForm
                data={profileUser}
                uniqId={id || userId}
                setOpen={setOpen}
                onSuccess={viewEmployees}
              />
            )}
            {open.type === "document-detail" && (
              <EmployeeDocumentDetailForm
                data={profileUser}
                uniqId={id || userId}
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
