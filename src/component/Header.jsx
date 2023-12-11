import React, { useEffect, useState } from "react";
import {
  Box,
  InputBase,
  AppBar,
  Button,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ToggleIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useLocation } from "react-router-dom";

const Search = styled("div")();
const SearchIconWrapper = styled("div")();
const StyledInputBase = styled(InputBase)();

export default function Header({ sideBarWidth, showSidebar, setShowSidebar }) {
  const [userAvtar, setUserAvtar] = useState({ name: "Aaron Cooper" });
  const [anchorEl, setAnchorEl] = useState(null);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  let location = useLocation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // Function to add data to localStorage
  const addDataToLocalStorage = (data) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  // Function to get data from localStorage
  const getDataFromLocalStorage = () => {
    setUserAvtar(JSON.parse(localStorage.getItem("user")));
  };
  useEffect(() => {
    // userAvtarCall("6569ca3bd8635fedc401bc8b");
    addDataToLocalStorage({
      name: "hiren",
      profile_img:
        "https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27",
      _id: "6569ca3bd8635fedc401bc8b",
      email: "hiren.polara@shunyavkash.com",
    });
    getDataFromLocalStorage();
  }, []);

  return (
    <>
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
            {location.pathname == "/" ? (
              ""
            ) : (
              <Box>
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
            )}
          </Box>
          <Box sx={{ position: "relative" }}>
            {isLoading ? (
              <>Loading..</>
            ) : (
              <>
                {" "}
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
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
                    Hi, {userAvtar.name.slice(0, 6)}
                  </Typography>
                  <Avatar
                    sx={{
                      borderRadius: "100%",
                      bgcolor: "grey.light",
                      height: { xs: "36px", sm: "30px" },
                      width: { xs: "36px", sm: "30px" },
                      flexShrink: 0,
                    }}
                    alt={userAvtar.name}
                    src={
                      userAvtar.profile_img ||
                      "https://uko-react.vercel.app/static/avatar/001-man.svg"
                    }
                  />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  <MenuItem
                    sx={{
                      p: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 2.5,
                      cursor: "text",
                      bgcolor: "transparent!important",
                    }}
                  >
                    <Avatar
                      sx={{
                        width: "36px",
                        borderRadius: "100%",
                        bgcolor: "grey.light",
                        height: "36px",
                        flexShrink: 0,
                      }}
                      alt="Remy Sharp"
                      src={
                        userAvtar.profile_img
                          ? userAvtar.profile_img
                          : "https://uko-react.vercel.app/static/avatar/001-man.svg"
                      }
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
                        {userAvtar.email
                          ? userAvtar.email
                          : "aaron@example.com"}
                      </Typography>
                    </Box>
                  </MenuItem>
                  <Divider sx={{ borderColor: "rgba(0,0,0,10%)" }} />
                  <MenuItem
                    onClick={handleClose}
                    sx={{ lineHeight: 1, fontWeight: 600, fontSize: "14px" }}
                  >
                    Profile
                  </MenuItem>
                  <Divider sx={{ borderColor: "rgba(0,0,0,10%)" }} />
                  <MenuItem
                    onClick={handleClose}
                    sx={{ lineHeight: 1, fontWeight: 600, fontSize: "14px" }}
                  >
                    Sign Out
                  </MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Box>
      </AppBar>
    </>
  );
}
