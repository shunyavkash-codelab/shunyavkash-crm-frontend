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
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/store/useAuth";
import { Link } from "react-router-dom";

const Search = styled("div")();
const SearchIconWrapper = styled("div")();
const StyledInputBase = styled(InputBase)();

export default function Header({ sideBarWidth, showSidebar, setShowSidebar }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const { apiCall, isLoading } = useApi();
  const { user, logout } = useAuth();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  let location = useLocation();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignout = () => {
    logout();
    setSnack("Logout successfully.");
    navigate("/signin");
  };

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
                    mr: 1.5,
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
                        border: "1px solid",
                        borderColor: "rgba(0,0,0,0.1)",
                        transition: "all 0.2s ease-in-out",
                        py: 1,
                        pl: 5,
                        pr: 2,
                        bgcolor: "white",
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
                  disableRipple
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  sx={{
                    minWidth: 0,
                    border: "1px solid",
                    borderColor: "rgba(0,0,0,0.1)",
                    borderRadius: 6,
                    gap: 1,
                    py: { xs: 0, sm: 0.75 },
                    px: { xs: 0, sm: 1.5 },
                    bgcolor: "white",
                  }}
                >
                  <Typography
                    variant="overline"
                    sx={{
                      textTransform: "capitalize",
                      color: "text.primary",
                      lineHeight: 1,
                      display: { xs: "none", sm: "block" },
                      textTransform: "capitalize",
                    }}
                  >
                    Hi,{" "}
                    {user.name.length > 10
                      ? `${user.name?.slice(0, 10)}...`
                      : user.name?.slice(0, 10)}
                  </Typography>
                  <Avatar
                    sx={{
                      borderRadius: "100%",
                      bgcolor: "grey.light",
                      height: { xs: "36px", sm: "30px" },
                      width: { xs: "36px", sm: "30px" },
                      flexShrink: 0,
                    }}
                    alt={user.name}
                    src={
                      user.profile_img ||
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
                        user.profile_img
                          ? user.profile_img
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
                        {user.name}
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
                        {user.email ? user.email : "aaron@example.com"}
                      </Typography>
                    </Box>
                  </MenuItem>
                  <Divider sx={{ borderColor: "rgba(0,0,0,10%)" }} />
                  <Link to="/profile" style={{ textDecoration: "none" }}>
                    <MenuItem
                      onClick={handleClose}
                      sx={{
                        lineHeight: 1,
                        fontWeight: 600,
                        fontSize: "14px",
                      }}
                    >
                      Profile
                    </MenuItem>
                  </Link>

                  <Divider sx={{ borderColor: "rgba(0,0,0,10%)" }} />
                  <MenuItem
                    onClick={handleSignout}
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
