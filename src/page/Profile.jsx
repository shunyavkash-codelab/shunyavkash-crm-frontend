import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar, Grid, Card, Button } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
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
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";

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

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#1677FF" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function Profile() {
  const handleClick = console.log("Badge Clicked!");
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [showPassword, setShowPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
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
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Username"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
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
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                      "& .MuiFormLabel-root, & .MuiInputBase-input": {
                        fontSize: "14px",
                      },
                    }}
                  >
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Address Line 1"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Address Line 2"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Landmark"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                <Box component="form">
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
                        <FormControl
                          sx={{ width: "100%", fontSize: "14px" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-password">
                            Old Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                  edge="end"
                                >
                                  {showPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Old Password"
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FormControl
                          sx={{ width: "100%", fontSize: "14px" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-new-password">
                            New Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-new-password"
                            type={showNewPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  onMouseDown={handleMouseDownNewPassword}
                                  edge="end"
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="New Password"
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <FormControl
                          sx={{ width: "100%", fontSize: "14px" }}
                          variant="outlined"
                        >
                          <InputLabel htmlFor="outlined-adornment-confirm-password">
                            Confirm Password
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-confirm-password"
                            type={showNewPassword ? "text" : "password"}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowNewPassword}
                                  onMouseDown={handleMouseDownNewPassword}
                                  edge="end"
                                >
                                  {showNewPassword ? (
                                    <VisibilityOff />
                                  ) : (
                                    <Visibility />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Confirm Password"
                          />
                        </FormControl>
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
              <TabPanel value={value} index={3}>
                <Stack
                  direction="row"
                  sx={{
                    flexDirection: { sm: "column", md: "row" },
                    justifyContent: "space-between",
                    alignItems: { sm: "start", md: "center" },
                  }}
                >
                  <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
                    Bank Details
                  </Typography>
                  <Button variant="contained">Add Bank</Button>
                </Stack>
                <Box
                  component="form"
                  sx={{
                    "& .MuiGrid-container:not(:last-child)": {
                      borderBottom: "1px solid rgba(224, 224, 224, 1)",
                      pb: "32px",
                    },
                  }}
                >
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
                          label="Bank account holder name"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Bank Name"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Account number"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Confirm Account number"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="IFSC"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box>
                        <FormControlLabel
                          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                          label="Make Default bank"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained">Save Changes</Button>
                        <Button variant="outlined" color="error">
                          Remove
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
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
                          label="Bank account holder name"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Bank Name"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Account number"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="Confirm Account number"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Box>
                        <TextField
                          id="outlined-basic"
                          label="IFSC"
                          variant="outlined"
                          sx={{ width: "100%", fontSize: "14px" }}
                        />
                      </Box>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Box>
                        <FormControlLabel
                          control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
                          label="Make Default bank"
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              fontSize: "14px",
                            },
                          }}
                        />
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={2}>
                        <Button variant="contained">Save Changes</Button>
                        <Button variant="outlined" color="error">
                          Remove
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </Box>
              </TabPanel>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
