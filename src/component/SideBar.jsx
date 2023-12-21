import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/GridViewOutlined";
import ManagerIcon from "@mui/icons-material/PermIdentityOutlined";
import ClientsIcon from "@mui/icons-material/PeopleAltOutlined";
import ProjectsIcon from "@mui/icons-material/FileCopyOutlined";
import InvoicesIcon from "@mui/icons-material/ReceiptOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function SideBar({
  sideBarWidth,
  setSidebarWidth,
  showSidebar,
  setShowSidebar,
  accessToken,
}) {
  const navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, []);
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
            mb: "15px",
            px: 3.5,
            pb: "23px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
            maxWidth: "100%",
          }}
        >
          <img
            src="./images/shunyavkash-logo.svg"
            style={{ height: "auto", width: "100%" }}
            alt="shunyavkash-logo"
          />
        </Box>
        <Box sx={{ flexGrow: 1, height: "500px", overflowY: "auto", px: 2 }}>
          <List>
            {[
              {
                text: "DashBoard",
                icon: <DashboardIcon />,
                link: "/",
              },
              { text: "Manager", icon: <ManagerIcon />, link: "/managers" },
              { text: "Clients", icon: <ClientsIcon />, link: "/clients" },
              { text: "Projects", icon: <ProjectsIcon />, link: "/projects" },
              { text: "Invoices", icon: <InvoicesIcon />, link: "/invoices" },
            ].map((item, index) => (
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
                  "&:not(:first-child)": { mt: 0.75 },
                  borderRadius: "10px",
                  overflow: "hidden",
                  color: location.pathname == item.link && "primary.main",
                  bgcolor: location.pathname == item.link && "primary.light",
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
                        location.pathname == item.link
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
      ></Box>
    </>
  );
}
