import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Button,
  InputBase,
  Typography,
  Avatar,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import DashboardIcon from "@mui/icons-material/GridViewOutlined";
import ManagerIcon from "@mui/icons-material/PermIdentityOutlined";
import ClientsIcon from "@mui/icons-material/PeopleAltOutlined";
import ProjectsIcon from "@mui/icons-material/FileCopyOutlined";
import InvoicesIcon from "@mui/icons-material/ReceiptOutlined";
import ToggleIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PlusIcon from "@mui/icons-material/CloseOutlined";

const Search = styled("div")();
const SearchIconWrapper = styled("div")();
const StyledInputBase = styled(InputBase)();

const sideBarWidth = "240px";

export default function Home() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <Box
      // className={`${showSidebar ? "show" : "hide"}`}
      sx={{ display: "flex", height: "100vh" }}
    >
      <Box
        sx={{
          pt: 3.5,
          px: 2,
          height: "100%",
          width: sideBarWidth,
          flexShrink: 0,
          display: {
            xxs: showSidebar ? "flex" : "none",
            lg: "flex",
          },
          flexDirection: "column",
          bgcolor: "white",
        }}
      >
        <Box sx={{ flexShrink: 0, display: "flex", mb: 3, px: 1.5 }}>
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
              fill-rule="evenodd"
              d="m37.1 7l4.8 11.6h0.2l4.7-11.6h3.6v16h-2.8v-11h-0.2l-4.4 11h-2.1l-4.4-11h-0.1v11h-2.8v-16zm15.7 12.6c0-2.7 2.2-3.4 4.5-3.6 2.2-0.2 3-0.3 3-1.1 0-1.2-0.7-1.9-2-1.9-1.4 0-2.2 0.7-2.5 1.5l-2.6-0.3c0.6-2.2 2.5-3.4 5.1-3.4 2.2 0 4.8 1 4.8 4.2v8h-2.7v-1.6h-0.1c-0.5 1-1.6 1.8-3.5 1.8-2.3 0-4-1.2-4-3.6zm7.5-0.9v-1.4c-0.4 0.3-1.8 0.5-2.6 0.6-1.2 0.1-2.2 0.6-2.2 1.7 0 1 0.9 1.6 2 1.6 1.7 0 2.8-1.2 2.8-2.5zm8.5 4.3h-2.8v-12h2.7v2h0.1c0.6-1.3 1.8-2.2 3.6-2.2 2.5 0 4.1 1.7 4.1 4.6v7.6h-2.8v-7.2c0-1.6-0.9-2.6-2.4-2.6-1.4 0-2.5 1-2.5 2.8zm16.6-9.8h-2.4v6.2c0 1.1 0.6 1.3 1.3 1.3 0.3 0 0.7 0 0.8-0.1l0.5 2.3c-0.3 0.1-0.9 0.2-1.7 0.2-2.1 0.1-3.7-1-3.7-3.3v-6.6h-1.7v-2.2h1.7v-2.9h2.8v2.9h2.4zm2.3-2.2h2.9v12h-2.9zm-0.2-3.3c0-0.8 0.8-1.5 1.7-1.5 0.9 0 1.6 0.7 1.6 1.5 0 0.9-0.7 1.6-1.6 1.6-0.9 0-1.7-0.7-1.7-1.6zm12.9 6.7c-0.2-0.8-0.9-1.5-2.2-1.5-1.2 0-2.1 0.6-2.1 1.4 0 0.7 0.5 1.1 1.7 1.4l2 0.4c2.3 0.5 3.4 1.6 3.4 3.3 0 2.3-2.1 3.8-5.1 3.8-3 0-4.8-1.3-5.2-3.5l2.8-0.3c0.2 1.1 1.1 1.7 2.4 1.7 1.3 0 2.2-0.6 2.2-1.5 0-0.6-0.5-1.1-1.6-1.3l-2-0.5c-2.3-0.4-3.4-1.6-3.4-3.3 0-2.3 1.9-3.7 4.8-3.7 2.8 0 4.5 1.3 4.9 3.4z"
            />
          </svg>
        </Box>
        <Box sx={{ flexGrow: 1, height: "500px", overflowY: "auto" }}>
          <List>
            {["DashBoard", "Manager", "Clients", "Projects", "Invoices"].map(
              (text, index) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    mt: 0.5,
                    ":first-child": { mt: 0 },
                    "&:first-child > div": {
                      color: "primary.main",
                      bgcolor: "primary.light",
                    },
                  }}
                >
                  <ListItemButton
                    sx={{
                      p: 1.5,
                      borderRadius: 2.5,
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
                      {index === 0 ? <DashboardIcon /> : ""}
                      {index === 1 ? <ManagerIcon /> : ""}
                      {index === 2 ? <ClientsIcon /> : ""}
                      {index === 3 ? <ProjectsIcon /> : ""}
                      {index === 4 ? <InvoicesIcon /> : ""}
                    </ListItemIcon>
                    <ListItemText
                      sx={{ my: 0, "&>span": { fontSize: "14px" } }}
                      primary={text}
                    />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
        </Box>
      </Box>
      <AppBar
        position="fixed"
        sx={{
          top: 0,
          width: `calc(100% - ${sideBarWidth})`,
          bgcolor: "transparent",
          boxShadow: "none",
          width: {
            xxs: showSidebar ? `calc(100% - ${sideBarWidth})` : "100%",
            lg: `calc(100% - ${sideBarWidth})`,
          },
        }}
      >
        <Box
          sx={{
            pt: 3,
            pb: 1.5,
            px: 2.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            sx={{
              color: "text.primary",
              display: { lg: "none" },
              p: 0,
              minWidth: 0,
              borderRadius: 1,
            }}
            onClick={() => {
              setShowSidebar(!showSidebar);
            }}
          >
            <ToggleIcon
              sx={{
                width: "auto",
                height: "32px",
              }}
            />
          </Button>
          <Search
            sx={{
              position: "relative",
              ml: 0,
              width: "280px",
              height: "40px",
              display: { xxs: "none", lg: "inline-flex" },
            }}
          >
            <SearchIconWrapper
              sx={{
                zIndex: 1,
                color: "rgba(42, 64, 98, 50%)",
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                height: "24px",
                "&>svg": {
                  height: "100%",
                  width: "auto",
                },
              }}
            >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              sx={{
                width: "100%",
                "&>input": {
                  width: "100%",
                  borderRadius: 6,
                  borderWidth: "1px",
                  borderStyle: "solid",
                  borderColor: "text.primaryLight",
                  transition: "all 0.4s ease-in-out",
                  py: 1,
                  pl: 5,
                  pr: 2,
                  ":focus": {
                    width: "100%",
                    borderColor: "text.primary",
                  },
                },
              }}
            />
          </Search>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box sx={{ display: "inline-flex" }}>
              <Button
                variant="contained"
                color="success"
                sx={{
                  borderRadius: 2.5,
                  py: 1,
                  ":hover": { bgcolor: "success.light" },
                  fontSize: { xxs: "12px", xs: "14px" },
                  "&>span": { mr: { xxs: 0.5 } },
                }}
                endIcon={
                  <PlusIcon
                    sx={{
                      transform: "rotate(45deg)",
                      fontSize: { xxs: "16px!important", xs: "18px!important" },
                    }}
                  />
                }
              >
                Add Profile
              </Button>
            </Box>
            <Button
              href="javascript:void(0);"
              sx={{
                minWidth: 0,
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: "grey.light",
                borderRadius: 6,
                gap: 1,
                py: { xxs: 0, xs: 0.75 },
                px: { xxs: 0, xs: 1.5 },
              }}
            >
              <Typography
                variant="overline"
                sx={{
                  textTransform: "capitalize",
                  color: "text.primary",
                  lineHeight: 1,
                  display: { xxs: "none", xs: "block" },
                }}
              >
                Hi, Aaron Cooper
              </Typography>
              <Avatar
                sx={{
                  width: "auto",
                  borderRadius: "100%",
                  bgcolor: "grey.light",
                  height: { xxs: "32px", xs: "28px" },
                }}
                alt="Remy Sharp"
                src="https://uko-react.vercel.app/static/avatar/001-man.svg"
              />
            </Button>
          </Box>
        </Box>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          pt: 13,
          px: 2.5,
          height: "100%",
          overflowY: "auto",
        }}
      >
        <Box>
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={3}>
              <Box>
                <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
                  Total Employee
                </Typography>
                <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                  12
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
