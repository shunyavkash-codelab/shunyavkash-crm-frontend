import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Grid, Card, Button } from "@mui/material";
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

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

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

const TabUI = styled(Tab)(({ theme }) => ({
  textAlign: "left",
  justifyContent: "start",
  minHeight: "auto",
  textTransform: "capitalize",
}));

export default function Profile() {
  const handleClick = console.log("Badge Clicked!");
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [value, setValue] = React.useState(0);
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
      />
      <Header
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Box sx={{ display: "flex", height: "100vh", ml: { lg: sideBarWidth } }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
          }}
        >
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
                width: "25%",
                maxWidth: 250,
                padding: 2,
                pl: 0,
                borderRight: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                borderRadius: { xs: 4, sm: 6 },
                border: "1px solid rgba(224, 224, 224, 1)",
                flexShrink: 0,
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
                borderRight: 1,
                borderColor: "divider",
                bgcolor: "background.paper",
                borderRadius: { xs: 4, sm: 6 },
                border: "1px solid rgba(224, 224, 224, 1)",
                flexGrow: 1,
              }}
            >
              <TabPanel value={value} index={0}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
                  Personal Info
                </Typography>
                <Stack
                  direction="row"
                  sx={{ marginTop: 2, alignItems: "center", gap: 1.5 }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    badgeContent={<SmallAvatar sx={{ fontSize: 10 }} />}
                    onClick={handleClick}
                  >
                    <Avatar
                      alt="Travis Howard"
                      src="https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
                      sx={{ width: 64, height: 64 }}
                    />
                  </Badge>
                  <Stack direction="column">
                    <Typography
                      variant="div"
                      gutterBottom
                      sx={{ fontSize: 16, fontWeight: "600" }}
                    >
                      John Doe
                    </Typography>
                    <Typography
                      variant="div"
                      sx={{
                        fontSize: 12,
                        color: "#848484",
                        fontWeight: "500",
                      }}
                    >
                      crm.demo@gmail.com
                    </Typography>
                  </Stack>
                </Stack>
                <Box component="form">
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={2}
                    mt={2}
                    sx={{
                      maxWidth: 600,
                      "& .MuiFormLabel-root, & .MuiInputBase-input": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Full Name"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Username"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Email"
                          variant="outlined"
                          type="email"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Company"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained">Save Changes</Button>
                        <Button variant="outlined">Cancel</Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
                  Address
                </Typography>
                <Box component="form">
                  <Grid
                    container
                    rowSpacing={2}
                    columnSpacing={2}
                    mt={2}
                    sx={{
                      maxWidth: 600,
                      "& .MuiFormLabel-root, & .MuiInputBase-input": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Address Line 1"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Address Line 2"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Landmark"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Pincode"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained">Save Changes</Button>
                        <Button variant="outlined">Cancel</Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
                  Password
                </Typography>
              </TabPanel>
              <TabPanel value={value} index={3}>
                <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
                  Bank Details
                </Typography>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
