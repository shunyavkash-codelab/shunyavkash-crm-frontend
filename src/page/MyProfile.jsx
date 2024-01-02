import React, { useState } from "react";
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
import Link from "@mui/material/Link";
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
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();

  const [changeStatus, setChangeStatus] = useState(true);

  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [url, setUrl] = useState(
    "https://gull-html-laravel.ui-lib.com/assets/images/faces/1.jpg"
  );

  const handleFiles = (files) => {
    console.log(files);
    setUrl(files.base64);
  };

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
        <Box
          component="main"
          sx={{
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
            maxWidth: "1200px",
            mx: "auto",
          }}
        >
          <Box sx={{ mb: 3.25 }}>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              User Profile
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
                Deep Bhimani
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
            {/* <Box
              sx={{
                padding: "100px 50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: "#002544",
              }}
            >
              <img
                src="/images/logo-text-white.svg"
                alt="logo-text-white"
                style={{ maxHeight: "150px" }}
              />
            </Box> */}
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
                }}
              >
                <Avatar
                  sx={{
                    width: "100px",
                    borderRadius: "100%",
                    bgcolor: "grey.light",
                    height: "100px",
                    flexShrink: 0,
                    boxShadow: "0 0 0 4px white",
                  }}
                  alt="avatar"
                  src={url}
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
                    label="Employee"
                    sx={{ height: "auto", py: "2px" }}
                  ></Chip>
                  <Typography
                    variant="h5"
                    sx={{ color: "black", fontWeight: 500 }}
                  >
                    Deep Bhimani
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
                      Frontend development
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
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Button
                    disableRipple
                    type="submit"
                    onClick={() => setChangeStatus(!changeStatus)}
                    sx={{
                      maxHeight: "42px",
                      position: "relative",
                      px: 2.5,
                      py: 1.5,
                      bgcolor: changeStatus ? "error.main" : "success.main",
                      border: "1px solid",
                      borderColor: changeStatus ? "error.main" : "success.main",
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
              <Box className="cardHeader">
                <Typography className="cardTitle">
                  employment details
                </Typography>
                <Chip
                  label="Edit"
                  icon={<EditIcon />}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ cursor: "pointer", height: "unset", py: 0.5, px: 0.75 }}
                />
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"date of joining"}
                    Text={"01/12/2022"}
                    Icon={<DateIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"employee id"}
                    Text={"1234"}
                    Icon={<Grid3x3Icon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"work email"}
                    Text={"deep.bhimani@shunyavkash.com"}
                    Icon={<EmailOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"designation"}
                    Text={"Frontend Devlopment"}
                    Icon={<AccountBoxOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"role"}
                    Text={"Employee"}
                    Icon={<PermIdentityOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Personal Details</Typography>
                <Chip
                  label="Edit"
                  icon={<EditIcon />}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ cursor: "pointer", height: "unset", py: 0.5, px: 0.75 }}
                />
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"full name"}
                    Text={"deep bhimani"}
                    Icon={<PermIdentityOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"gender"}
                    Text={"male"}
                    Icon={<WcOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"DOB"}
                    Text={"08/01/2003"}
                    Icon={<DateIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"hobbies"}
                    Text={"Bording Games, Gym, Traveling"}
                    Icon={<SportsSoccerOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"phobia"}
                    Text={"Nothing"}
                    Icon={<SickOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Contact Details</Typography>
                <Chip
                  label="Edit"
                  icon={<EditIcon />}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ cursor: "pointer", height: "unset", py: 0.5, px: 0.75 }}
                />
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"Phone number"}
                    Text={"+91 6359276907"}
                    Icon={<PhoneOutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"whatsApp number"}
                    Text={"+91 6359276907"}
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
                      "403, saffron luxuria, near shyamdham mandir, jakatnaka, surat 395006."
                    }
                    Icon={<HomeOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Family Details</Typography>
                <Chip
                  label="Edit"
                  icon={<EditIcon />}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ cursor: "pointer", height: "unset", py: 0.5, px: 0.75 }}
                />
              </Box>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"father's name"}
                    Text={"Navnitbhai"}
                    Icon={<Man2OutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"mother's name"}
                    Text={"Induben"}
                    Icon={<Woman2OutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"sister's name"}
                    Text={"Urvisha"}
                    Icon={<Woman2OutlinedIcon />}
                  />
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                  <DetailsList
                    Title={"father's number"}
                    Text={"+91 9099962993"}
                    Icon={<PhoneOutlinedIcon />}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box>
              <Box className="cardHeader">
                <Typography className="cardTitle">Document Details</Typography>
                <Chip
                  label="Edit"
                  icon={<EditIcon />}
                  color="primary"
                  variant="outlined"
                  size="small"
                  sx={{ cursor: "pointer", height: "unset", py: 0.5, px: 0.75 }}
                />
              </Box>
              {/* <Typography sx={{ fontSize: 14, px: 3, mb: 1.5 }}>
                Degree Certification
              </Typography> */}
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
                    href="javascript:void(0)"
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
                    href="javascript:void(0)"
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
                    href="javascript:void(0)"
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
                    href="javascript:void(0)"
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
                    href="javascript:void(0)"
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
            <Box>Salary</Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Box>Leave</Box>
          </CustomTabPanel>
        </Box>
      </Box>
    </>
  );
}
