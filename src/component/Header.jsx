import React, { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  AppBar,
  Button,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ToggleIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import useApi from "../hooks/useApi";
import {useSnack} from "../hooks/store/useSnack"

const Search = styled("div")();
const SearchIconWrapper = styled("div")();
const StyledInputBase = styled(InputBase)();

export default function Header({
  sideBarWidth,
  setSidebarWidth,
  showSidebar,
  setShowSidebar,
}) {
  const [showDorpDownMenu, setShowDorpDownMenu] = useState(false);
  const [userAvtar, setUserAvtar] = useState({name:"Aaron Cooper"});
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack()

  // const userAvtarCall = async (id) => {
  //   try {
  //     const res = await apiCall({
  //       url: `manager/${id}`,
  //       method: "get",
  //     });
  //     if (res.data.success === true) {
  //       setSnack(res.data.message);
  //       setUserAvtar(res.data.data)
  //     }
  //   } catch (error) {
  //     console.log(error, setSnack);
  //     // handleApiError(error, setSnack);
  //   }
  // };
  // useEffect(() => {
  //     userAvtarCall('6569ca3bd8635fedc401bc8b')
  // }, []);
  return (
    <AppBar
      position="fixed"
      sx={{
        py: 2.25,
        px: 2.5,
        top: 0,
        width: `calc(100% - ${sideBarWidth})`,
        bgcolor: "#f3f4f9",
        boxShadow: "none",
        border: 0,
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        width: {
          lg: `calc(100% - ${sideBarWidth})`,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
              display: { xs: "none", sm: "inline-flex" },
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
                  border: "1px solid ",
                  borderColor: "grey.light",
                  transition: "all 0.2s ease-in-out",
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
        </Box>
        <Box sx={{ position: "relative" }}>
          <Button
            onClick={() => {
              setShowDorpDownMenu(!showDorpDownMenu);
            }}
            sx={{
              minWidth: 0,
              border: "1px solid",
              borderColor: "grey.light",
              borderRadius: 6,
              gap: 1,
              py: { xs: 0, sm: 0.75 },
              px: { xs: 0, sm: 1.5 },
            }}
          >
            <Typography
              variant="overline"
              sx={{
                textTransform: "capitalize",
                color: "text.primary",
                lineHeight: 1,
                display: { xs: "none", sm: "block" },
              }}
            >
              Hi, {userAvtar.name.slice(0,6)}
            </Typography>
            <Avatar
              sx={{
                width: "auto",
                borderRadius: "100%",
                bgcolor: "grey.light",
                height: { xs: "36px", sm: "28px" },
              }}
              alt="Remy Sharp"
              src={userAvtar.profile_img ? userAvtar.profile_img : "https://uko-react.vercel.app/static/avatar/001-man.svg"}
            />
          </Button>
          <Box
            sx={{
              py: 1,
              color: "text.primary",
              position: "absolute",
              top: "130%",
              right: 0,
              bgcolor: "white",
              minWidth: "240px",
              borderRadius: 1.5,
              transition: "all 0.3s ease-in-out",
              transformOrigin: "top center",
              transform: showDorpDownMenu ? "scale(1)" : "scale(0)",
              opacity: showDorpDownMenu ? "1" : "0",
            }}
          >
            <Box
              sx={{
                p: 2,
                display: "flex",
                alignItems: "center",
                gap: 2.5,
              }}
            >
              <Avatar
                sx={{
                  width: "auto",
                  borderRadius: "100%",
                  bgcolor: "grey.light",
                  height: { xs: "36px" },
                }}
                alt="Remy Sharp"
                src={userAvtar.profile_img ? userAvtar.profile_img : "https://uko-react.vercel.app/static/avatar/001-man.svg"}
              />
              <Box
                sx={{
                  textAlign: "left",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    mb: 1,
                    fontWeight: 600,
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                   {userAvtar.name}
                </Typography>
                <Typography
                  variant="overline"
                  sx={{
                    opacity: 0.4,
                    lineHeight: 1,
                    textTransform: "lowercase",
                    display: "block",
                  }}
                >
                    {userAvtar.email ? userAvtar.email : "aaron@example.com"}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ borderColor: "rgba(0,0,0,10%)" }} />
            <List
              sx={{
                textTransform: "capitalize",
              }}
            >
              {["Profile"].map((text) => (
                <ListItem
                  key={text}
                  disablePadding
                  sx={{
                    mt: 0.5,
                    lineHeight: 1,
                    ":first-child": { mt: 0 },
                  }}
                >
                  <ListItemButton
                    sx={{
                      p: 1.5,
                      transitionProperty: "all",
                      ":hover": {
                        bgcolor: "primary.light",
                        color: "primary.main",
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ lineHeight: 1, fontWeight: 600 }}
                    >
                      {text}
                    </Typography>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ borderColor: "rgba(0,0,0,10%)" }} />
            <Button
              sx={{
                color: "text.primary",
                width: "100%",
                justifyContent: "start",
                textTransform: "capitalize",
                padding: 1.5,
                lineHeight: 1,
                mt: 1,
                ":hover": {
                  bgcolor: "primary.light",
                  color: "primary.main",
                },
              }}
            >
              Sign Out
            </Button>
          </Box>
        </Box>
      </Box>
    </AppBar>
  );
}
