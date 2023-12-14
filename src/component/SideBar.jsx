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
          pt: 3.5,
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
            mb: 3,
            px: 3.5,
            pb: "23px",
            borderBottom: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <svg
            version="1.2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 104 29"
            width="104"
            height="29"
          >
            <path
              id="Layer"
              fill="#0958d9"
              d="m1.6 12.9l2.3-2.3 0.1-0.1h4.3l-1.7 1.8-0.5 0.4-1.7 1.8 0.2 0.2 9.9 9.9 10.1-10.1-1.7-1.8-0.1-0.1-2.1-2.1h4.3l0.1 0.1 1.8 1.8 2.1 2.1-14.5 14.5-14.5-14.5zm12.9-12.9l8.3 8.4h-4.3l-4-4-4.1 4h-4.3z"
            />
            <path
              id="Layer"
              fill="url(#g1)"
              d="m4.4 14.5l1.7-1.8 0.5-0.4-1.8-1.8h-0.8l-0.1 0.1-2.3 2.3 2.3 2.2z"
            />
            <path
              id="Layer"
              fill="url(#g2)"
              d="m22.9 12.7l1.7 1.8-0.1 0.2 2.4-2.3-1.8-1.8-0.1-0.1h-0.1l-2.1 2.1z"
            />
            <path
              id="Layer"
              fill="#1677ff"
              d="m3.9 10.5v0.1l2.2 2.1 8.4 8.4 10.6-10.6z"
            />
            <path
              id="Layer"
              fill="#000000"
              opacity="0.9"
              fillRule="evenodd"
              d="m37.1 7l4.8 11.6h0.2l4.7-11.6h3.6v16h-2.8v-11h-0.2l-4.4 11h-2.1l-4.4-11h-0.1v11h-2.8v-16zm15.7 12.6c0-2.7 2.2-3.4 4.5-3.6 2.2-0.2 3-0.3 3-1.1 0-1.2-0.7-1.9-2-1.9-1.4 0-2.2 0.7-2.5 1.5l-2.6-0.3c0.6-2.2 2.5-3.4 5.1-3.4 2.2 0 4.8 1 4.8 4.2v8h-2.7v-1.6h-0.1c-0.5 1-1.6 1.8-3.5 1.8-2.3 0-4-1.2-4-3.6zm7.5-0.9v-1.4c-0.4 0.3-1.8 0.5-2.6 0.6-1.2 0.1-2.2 0.6-2.2 1.7 0 1 0.9 1.6 2 1.6 1.7 0 2.8-1.2 2.8-2.5zm8.5 4.3h-2.8v-12h2.7v2h0.1c0.6-1.3 1.8-2.2 3.6-2.2 2.5 0 4.1 1.7 4.1 4.6v7.6h-2.8v-7.2c0-1.6-0.9-2.6-2.4-2.6-1.4 0-2.5 1-2.5 2.8zm16.6-9.8h-2.4v6.2c0 1.1 0.6 1.3 1.3 1.3 0.3 0 0.7 0 0.8-0.1l0.5 2.3c-0.3 0.1-0.9 0.2-1.7 0.2-2.1 0.1-3.7-1-3.7-3.3v-6.6h-1.7v-2.2h1.7v-2.9h2.8v2.9h2.4zm2.3-2.2h2.9v12h-2.9zm-0.2-3.3c0-0.8 0.8-1.5 1.7-1.5 0.9 0 1.6 0.7 1.6 1.5 0 0.9-0.7 1.6-1.6 1.6-0.9 0-1.7-0.7-1.7-1.6zm12.9 6.7c-0.2-0.8-0.9-1.5-2.2-1.5-1.2 0-2.1 0.6-2.1 1.4 0 0.7 0.5 1.1 1.7 1.4l2 0.4c2.3 0.5 3.4 1.6 3.4 3.3 0 2.3-2.1 3.8-5.1 3.8-3 0-4.8-1.3-5.2-3.5l2.8-0.3c0.2 1.1 1.1 1.7 2.4 1.7 1.3 0 2.2-0.6 2.2-1.5 0-0.6-0.5-1.1-1.6-1.3l-2-0.5c-2.3-0.4-3.4-1.6-3.4-3.3 0-2.3 1.9-3.7 4.8-3.7 2.8 0 4.5 1.3 4.9 3.4z"
            />
          </svg>
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
                  mt: 0.5,
                  ":first-child": { mt: 0 },
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
                    transitionProperty: "all",

                    ":hover": {
                      color: "primary.main",
                      bgcolor: "primary.light",
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
