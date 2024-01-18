import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../hooks/store/useAuth";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/DashboardOutlined";
import UserIcon from "@mui/icons-material/PermIdentityOutlined";
import ClientsIcon from "@mui/icons-material/PeopleAltOutlined";
import ProjectsIcon from "@mui/icons-material/FileCopyOutlined";
import InvoicesIcon from "@mui/icons-material/ReceiptOutlined";
// import EmployeesIcon from "@mui/icons-material/BadgeOutlined";
import LeavesRequests from "@mui/icons-material/AccessTimeOutlined";
// import EmployeeDashboardIcon from "@mui/icons-material/AccountBoxOutlined";
import AccountManagement from "@mui/icons-material/ManageHistoryOutlined";
import EmployeesDashboardIcon from "@mui/icons-material/PermContactCalendarOutlined";
import SetupProfileIcon from "@mui/icons-material/PendingActionsOutlined";
import LeavesIcon from "@mui/icons-material/ExitToApp";

export default function SideBar({
  sideBarWidth,
  showSidebar,
  setShowSidebar,
  accessToken,
}) {
  const navigate = useNavigate();
  let location = useLocation();
  const { user } = useAuth();

  let sidebarList = [
    {
      text: "Dashboard",
      icon: <DashboardIcon />,
      link: "/",
    },
    { text: "Members", icon: <UserIcon />, link: "/members" },
    // { text: "Manager", icon: <UserIcon />, link: "/users" },
    { text: "Clients", icon: <ClientsIcon />, link: "/clients" },
    { text: "Projects", icon: <ProjectsIcon />, link: "/projects" },
    { text: "Invoices", icon: <InvoicesIcon />, link: "/invoices" },
    {
      text: "Account Management",
      icon: <AccountManagement />,
      link: "/account-management",
    },
    // {
    //   text: "Employees",
    //   icon: <EmployeesIcon />,
    //   link: "/employees",
    // },
    {
      text: "Leaves Requests",
      icon: <LeavesRequests />,
      link: "/leaves-requests",
    },
    {
      text: "Employee Dashboard",
      icon: <EmployeesDashboardIcon />,
      link: "/employee-dashboard",
    },
    {
      text: "Leaves",
      icon: <LeavesIcon />,
      link: "/leaves",
    },
  ];
  let newArray = sidebarList.filter((ele) => {
    return (
      !(
        [
          "Members",
          "Invoices",
          "Clients",
          "Manager",
          "Projects",
          "Dashboard",
          "Account Management",
          "Employees",
          "Leaves Requests",
        ].includes(ele.text) && user.role !== 0
      ) && !(["Employee Dashboard"].includes(ele.text) && user.role === 0)
    );
  });
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, []);
  // });
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1300,
          pt: 3,
          height: "100%",
          width: sideBarWidth,
          flexShrink: 0,
          display: {
            xs: showSidebar ? "flex" : "none",
            lg: "flex",
          },
          flexDirection: "column",
          bgcolor: "white",
        }}
      >
        <Box
          sx={{
            flexShrink: 0,
            display: "flex",
            px: 3.5,
            pb: "23px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            maxWidth: "100%",
          }}
        >
          <Link to={"/"} style={{ display: "inline-flex" }}>
            <img
              src="/images/shunyavkash-logo.svg"
              style={{ height: "auto", width: "100%" }}
              alt="shunyavkash-logo"
            />
          </Link>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            height: "500px",
            overflowY: "auto",
            pt: "15px",
            px: 2,
          }}
        >
          <List sx={{ pt: 0 }}>
            {newArray.map((item, index) => (
              <ListItem
                key={item.text}
                disablePadding
                sx={{
                  transition: "all 0.4s ease-in-out",
                  "&:hover": {
                    boxShadow: "0 0 4px 2px rgb(22, 119, 255, 20%)",
                    "& svg": {
                      animation: "swing ease-in-out 0.4s alternate",
                    },
                  },
                  "&:not(:first-of-type)": { mt: 0.75 },
                  borderRadius: "10px",
                  overflow: "hidden",
                  color: location.pathname === item.link && "primary.main",
                  bgcolor: location.pathname === item.link && "primary.light",
                  //   color:
                  //     (location.pathname === item.link && "primary.main") ||
                  //     (location.pathname === item.link + "/add" &&
                  //       "primary.main"),
                  //   bgcolor:
                  //     (location.pathname === item.link && "primary.light") ||
                  //     (location.pathname === item.link + "/add" &&
                  //       "primary.light"),
                }}
              >
                <ListItemButton
                  disableRipple
                  component={Link} // Use Link component for routing
                  to={item.link} // Specify the route to navigate to
                  sx={{
                    p: 1.5,
                    transition: "all 0.4s ease-in-out",
                    ":hover": {
                      color: "primary.main",
                      bgcolor:
                        location.pathname === item.link
                          ? "transparent"
                          : "primary.light",
                      // bgcolor:
                      //   (location.pathname === item.link
                      //     ? "transparent"
                      //     : "primary.light") ||
                      //   (location.pathname === item.link + "/add"
                      //     ? "transparent"
                      //     : "primary.light"),
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: "currentcolor",
                      minWidth: "40px",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    sx={{ my: 0, "&>span": { fontSize: "14px" } }}
                    primary={item.text}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

        {user.role !== 0 && (
          <List sx={{ px: 2, py: 1.5, bgcolor: "#f9f9f9" }}>
            <ListItem
              key={"Setup my Profile"}
              disablePadding
              sx={{
                transition: "all 0.4s ease-in-out",
                "&:hover": {
                  boxShadow: "0 0 4px 2px rgb(22, 119, 255, 20%)",
                  "& svg": {
                    animation: "swing ease-in-out 0.4s alternate",
                  },
                },
                "&:not(:first-of-type)": { mt: 0.75 },
                borderRadius: "10px",
                overflow: "hidden",
                color: location.pathname === "/my-profile" && "primary.main",
                bgcolor: location.pathname === "/my-profile" && "primary.light",
              }}
            >
              <ListItemButton
                disableRipple
                component={Link} // Use Link component for routing
                to="/my-profile" // Specify the route to navigate to
                sx={{
                  p: 1.5,
                  transition: "all 0.4s ease-in-out",
                  ":hover": {
                    color: "primary.main",
                    bgcolor:
                      location.pathname === "/my-profile"
                        ? "transparent"
                        : "primary.light",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: "currentcolor",
                    minWidth: "40px",
                  }}
                >
                  <SetupProfileIcon />
                </ListItemIcon>
                <ListItemText
                  sx={{ my: 0, "&>span": { fontSize: "14px" } }}
                  primary={"Setup my Profile"}
                />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Box>

      <Box
        onClick={() => {
          setShowSidebar(!showSidebar);
        }}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1299,
          height: "100%",
          width: "100%",
          bgcolor: "rgba(0,0,0,0.3)",
          display: {
            xs: showSidebar ? "flex" : "none",
            lg: "none",
          },
        }}
      />
    </>
  );
}
