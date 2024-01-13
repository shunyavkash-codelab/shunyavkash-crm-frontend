import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Grid, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import Badge from "@mui/material/Badge";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import { useAuth } from "../hooks/store/useAuth";
import { useFormik } from "formik";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import AddressForm from "../component/form/AddressForm";
import ChangePasswordForm from "../component/form/ChangePasswordForm";
import BankDetailForm from "../component/form/BankDetailForm";
import * as Yup from "yup";
import ReactFileReader from "react-file-reader";
import ThemeButton from "../component/ThemeButton";

// const StyledBadge = styled(Badge)(({ theme }) => ({
//   "& .MuiBadge-badge": {
//     backgroundColor: "#44b700",
//     color: "#44b700",
//     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
//     "&::after": {
//       position: "absolute",
//       top: 0,
//       left: 0,
//       width: "100%",
//       height: "100%",
//       borderRadius: "50%",
//       animation: "ripple 1.2s infinite ease-in-out",
//       border: "1px solid currentColor",
//       content: '""',
//     },
//   },
//   "@keyframes ripple": {
//     "0%": {
//       transform: "scale(.8)",
//       opacity: 1,
//     },
//     "100%": {
//       transform: "scale(2.4)",
//       opacity: 0,
//     },
//   },
// }));

const SmallAvatar = styled(CameraAltOutlinedIcon)(({ theme }) => ({
  width: 26,
  height: 26,
  backgroundColor: `${theme.palette.background.paper}`,
  border: "1px solid rgba(224, 224, 224, 1)",
  borderRadius: "100%",
  padding: 4,
  cursor: "pointer",
  // border: `2px solid ${theme.palette.background.paper}`,
}));
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// const TabUI = styled(Tab)(({ theme }) => ({
//   textAlign: "left",
//   justifyContent: "start",
//   minHeight: "auto",
//   textTransform: "capitalize",
// }));

// const IOSSwitch = styled((props) => (
//   <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
// ))(({ theme }) => ({
//   width: 42,
//   height: 26,
//   padding: 0,
//   "& .MuiSwitch-switchBase": {
//     padding: 0,
//     margin: 2,
//     transitionDuration: "300ms",
//     "&.Mui-checked": {
//       transform: "translateX(16px)",
//       color: "#fff",
//       "& + .MuiSwitch-track": {
//         backgroundColor: theme.palette.mode === "dark" ? "#1677FF" : "#65C466",
//         opacity: 1,
//         border: 0,
//       },
//       "&.Mui-disabled + .MuiSwitch-track": {
//         opacity: 0.5,
//       },
//     },
//     "&.Mui-focusVisible .MuiSwitch-thumb": {
//       color: "#33cf4d",
//       border: "6px solid #fff",
//     },
//     "&.Mui-disabled .MuiSwitch-thumb": {
//       color:
//         theme.palette.mode === "light"
//           ? theme.palette.grey[100]
//           : theme.palette.grey[600],
//     },
//     "&.Mui-disabled + .MuiSwitch-track": {
//       opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
//     },
//   },
//   "& .MuiSwitch-thumb": {
//     boxSizing: "border-box",
//     width: 22,
//     height: 22,
//   },
//   "& .MuiSwitch-track": {
//     borderRadius: 26 / 2,
//     backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
//     opacity: 1,
//     transition: theme.transitions.create(["background-color"], {
//       duration: 500,
//     }),
//   },
// }));
export default function Profile() {
  const handleFiles = (files) => {
    setUrl(files);
    formik.setFieldValue("profile_img", files?.fileList[0]);
  };
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const [showSidebar, setShowSidebar] = useState(false);
  const [value, setValue] = useState(0);
  const { accessToken, userId, setUserDatail } = useAuth();
  const [profileList, setProfileList] = useState(false);
  const [url, setUrl] = useState(profileList?.profile_img);

  // yup data validator schhema
  const schema = Yup.object({
    name: Yup.string().required("Name is required.").trim(),
    companyName: Yup.string().required("Company name is required.").trim(),
  });

  // personal info
  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      name: profileList.name,
      companyName: profileList.companyName,
      profile_img: profileList.profile_img,
    },
    onSubmit: async (values) => {
      let formData = new FormData();
      // values.profile_img = url?.fileList[0];
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
      try {
        const res = await apiCall({
          url: APIS.MANAGER.EDIT(userId),
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
    },
  });

  // address info
  // const addressFormik = useFormik({
  //   validationSchema: schema,
  //   initialValues: {
  //     name: profileList.name,
  //     companyName: profileList.companyName,
  //   },
  //   onSubmit: async (values) => {
  //     try {
  //       const res = await apiCall({
  //         url: APIS.MANAGER.EDIT(userId),
  //         method: "patch",
  //         data: JSON.stringify(values, null, 2),
  //       });
  //       if (res.status === 200) {
  //         setSnack(res.data.message);
  //       }
  //     } catch (error) {
  //       let errorMessage = error.response.data.message;
  //       setSnack(errorMessage, "warning");
  //     }
  //   },
  // });

  // get user detile
  const fetchProfile = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.VIEW(id),
        method: "get",
        // data: id,
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setProfileList(res.data.data);
        formik.setFieldValue("name", res.data.data.name);
        formik.setFieldValue("companyName", res.data.data.companyName);
        formik.setFieldValue("profile_img", res.data.data.profile_img);
        let { name, profile_img, companyName } = res.data.data;
        setUserDatail(name, profile_img, companyName);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    fetchProfile(userId);
  }, []);
  // });

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                My Account
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "start",
              height: "auto",
              flexDirection: { xs: "column", sm: "column", md: "row" },
              gap: 4,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{
                width: { xs: "100%", sm: "100%", md: "25%" },
                maxWidth: { xs: "100%", sm: "100%", md: 250 },
                padding: { xs: 1.5, sm: 1.5, md: 2 },
                pl: 0,
                borderRight: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                borderRadius: { xs: 4, sm: 6 },
                border: "1px solid rgba(224, 224, 224, 1)",
                flexShrink: 0,
                "& .MuiTabs-flexContainer": {
                  flexDirection: { xs: "row", sm: "row", md: "column" },
                  overflow: { xs: "auto", sm: "auto", md: "hidden" },
                },
                "& .MuiTabScrollButton-root": {
                  display: "none",
                },
                "& .MuiTabs-indicator": {
                  display: { xs: "none", sm: "none", md: "block" },
                },
                "& .MuiTab-labelIcon": {
                  textAlign: "left",
                  justifyContent: "start",
                  minHeight: "auto",
                  textTransform: "capitalize",
                },
              }}
            >
              <Tab
                icon={<PersonOutlineOutlinedIcon />}
                label="Personal Info"
                iconPosition="start"
                {...a11yProps(0)}
              />
              <Tab
                icon={<LocationOnOutlinedIcon />}
                label="Address"
                {...a11yProps(1)}
                iconPosition="start"
              />
              <Tab
                icon={<LockOutlinedIcon />}
                label="Password"
                {...a11yProps(2)}
                iconPosition="start"
              />
              <Tab
                icon={<AccountBalanceOutlinedIcon />}
                label="Bank Details"
                {...a11yProps(3)}
                iconPosition="start"
              />
            </Tabs>
            <Box
              sx={{
                maxWidth: 650,
                borderRight: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                borderRadius: { xs: 4, sm: 6 },
                border: "1px solid rgba(224, 224, 224, 1)",
                flexGrow: 1,
              }}
            >
              <TabPanel value={value} index={0}>
                <Box component="form" onSubmit={formik.handleSubmit}>
                  {profileList && (
                    <>
                      <Typography
                        variant="h4"
                        gutterBottom
                        sx={{ fontSize: 16 }}
                      >
                        Personal Info
                      </Typography>
                      <Stack
                        direction="row"
                        sx={{ marginTop: 2, alignItems: "center", gap: 1.5 }}
                      >
                        <ReactFileReader
                          fileTypes={[".png", ".jpg"]}
                          base64={true}
                          name="profile_img"
                          handleFiles={handleFiles}
                        >
                          <Badge
                            overlap="circular"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "right",
                            }}
                            badgeContent={<SmallAvatar sx={{ fontSize: 10 }} />}
                          ></Badge>
                        </ReactFileReader>
                        <Avatar
                          alt="Travis Howard"
                          src={url?.base64 || profileList.profile_img}
                          sx={{ width: 64, height: 64 }}
                        />
                        <Stack direction="column">
                          <Typography
                            variant="div"
                            gutterBottom
                            sx={{ fontSize: 16, fontWeight: "600" }}
                          >
                            {profileList.name}
                          </Typography>
                          <Typography
                            variant="div"
                            sx={{
                              fontSize: 12,
                              color: "#848484",
                              fontWeight: "500",
                            }}
                          >
                            {profileList.email}
                          </Typography>
                        </Stack>
                      </Stack>

                      <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={2}
                        mt={2}
                        sx={{
                          "& .MuiFormLabel-root, & .MuiInputBase-input": {
                            fontSize: "14px",
                          },
                        }}
                      >
                        <Grid item xs={12} sm={6}>
                          <Box>
                            <TextField
                              id="outlined-basic"
                              label="Full Name"
                              variant="outlined"
                              name="name"
                              sx={{ width: "100%", fontSize: "14px" }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              placeholder="Name"
                              onChange={formik.handleChange}
                              value={formik.values.name}
                              error={
                                formik.touched.name &&
                                Boolean(formik.errors.name)
                              }
                              helperText={
                                formik.touched.name && formik.errors.name
                              }
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box>
                            <TextField
                              id="outlined-basic"
                              label="Email"
                              variant="outlined"
                              type="email"
                              name="email"
                              sx={{ width: "100%", fontSize: "14px" }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              placeholder="Email"
                              defaultValue={profileList.email}
                              // onChange={formik.handleChange}
                              // Value={formik..email}
                              disabled
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Box>
                            <TextField
                              id="outlined-basic"
                              label="Company"
                              variant="outlined"
                              name="companyName"
                              sx={{ width: "100%", fontSize: "14px" }}
                              InputLabelProps={{
                                shrink: true,
                              }}
                              placeholder="Company Name"
                              onChange={formik.handleChange}
                              value={formik.values.companyName}
                              error={
                                formik.touched.companyName &&
                                Boolean(formik.errors.companyName)
                              }
                              helperText={
                                formik.touched.companyName &&
                                formik.errors.companyName
                              }
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Stack direction="row" spacing={2}>
                            <ThemeButton Text="Save" type="submit" />
                            <ThemeButton discard Text="discard" />
                          </Stack>
                        </Grid>
                      </Grid>
                    </>
                  )}
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <AddressForm profileList={profileList} />
              </TabPanel>
              <TabPanel value={value} index={2}>
                <ChangePasswordForm profileList={profileList} />
              </TabPanel>
              <TabPanel value={value} index={3}>
                <BankDetailForm />
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
