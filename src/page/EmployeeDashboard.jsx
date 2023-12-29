import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  Grow,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import PriorityIcon from "@mui/icons-material/Tour";
import StartTimeIcon from "@mui/icons-material/PlayCircle";
import StopTimeIcon from "@mui/icons-material/StopCircle";
import StatusIcon from "@mui/icons-material/RadioButtonChecked";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";

const options = ["urgent", "high", "normal", "low"];

export default function EmployeeDashboard() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, invoiceTable } = useAuth();
  const [startTime, setStartTime] = useState(false);

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };
  console.log(selectedIndex);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
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
          <Box>
            <Box sx={{ mb: 3.25 }}>
              <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                Employee Dashboard
              </Typography>
            </Box>
            <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12} md={6} xl={4} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    py: 2.5,
                    px: 2,
                    bgcolor: "white",
                    boxShadow: "0 0 14px 0px rgb(42, 64, 98, 10%)",
                    color: "text.primary",
                    borderRadius: 2.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "capitalize",
                      mb: 3,
                      fontSize: { xs: "16px", sm: "18px" },
                    }}
                  >
                    Today's Priority
                  </Typography>
                  <Box>
                    <TableContainer
                      component={Paper}
                      sx={{
                        boxShadow: "none",
                        borderRadius: 0,
                      }}
                    >
                      <Table
                        sx={{
                          textTransform: "capitalize",
                          textWrap: "nowrap",
                          "& th,& td": { borderBottom: 0 },
                        }}
                      >
                        <TableHead>
                          <TableRow
                            sx={{
                              bgcolor: "#ECECEC",
                              "& th": {
                                lineHeight: 1,
                                fontWeight: 600,
                                p: 1.5,
                                fontSize: "12px",
                              },
                            }}
                          >
                            <TableCell></TableCell>
                            <TableCell
                              colspan={2}
                              sx={{ minWidth: "200px", pl: 1 }}
                            >
                              Task Name
                            </TableCell>
                            <TableCell sx={{ width: "75px" }}>
                              Priority
                            </TableCell>
                            <TableCell
                              sx={{
                                width: "100px",
                                textAlign: "center",
                              }}
                            >
                              Due date
                            </TableCell>
                            <TableCell sx={{ pr: 1, width: "62px" }}>
                              Track
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          sx={{
                            "&>*:nth-child(even) span": {
                              bgcolor: "red",
                            },
                          }}
                        >
                          <TableRow
                            sx={{
                              "&:last-child td, &:last-child th": {
                                border: 0,
                              },
                              "&>td": {
                                fontSize: "12px",
                              },
                            }}
                          >
                            <TableCell
                              variant="contained"
                              ref={anchorRef}
                              sx={{ p: 0 }}
                            >
                              <Button
                                onClick={handleToggle}
                                disableRipple
                                className="urgent"
                                sx={{
                                  bgcolor: "transparent!important",
                                  minWidth: "unset",
                                  padding: "0 6px 0 0",
                                  display: "flex",
                                  "&.urgent": {
                                    color: "#B13A41",
                                  },
                                  "&.high": {
                                    color: "secondary.main",
                                  },
                                  "&.normal": {
                                    color: "primary.main",
                                  },
                                  "&.low": {
                                    color: "grey.dark",
                                  },
                                }}
                              >
                                <StatusIcon sx={{ fontSize: "16px" }} />
                              </Button>
                              <Popper
                                sx={{
                                  zIndex: 1,
                                }}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                disablePortal
                              >
                                {({ TransitionProps, placement }) => (
                                  <Grow
                                    {...TransitionProps}
                                    style={{
                                      transformOrigin:
                                        placement === "bottom"
                                          ? "center top"
                                          : "center bottom",
                                    }}
                                  >
                                    <Paper>
                                      <ClickAwayListener
                                        onClickAway={handleClose}
                                      >
                                        <MenuList
                                          id="split-button-menu"
                                          autoFocusItem
                                        >
                                          {options.map((option, index) => (
                                            <MenuItem
                                              key={option}
                                              selected={index === selectedIndex}
                                              onClick={(event) =>
                                                handleMenuItemClick(
                                                  event,
                                                  index
                                                )
                                              }
                                              sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                fontSize: "14px",
                                              }}
                                            >
                                              <Box
                                                className={option}
                                                sx={{
                                                  display: "flex",
                                                  "&.urgent": {
                                                    color: "#B13A41",
                                                  },
                                                  "&.high": {
                                                    color: "secondary.main",
                                                  },
                                                  "&.normal": {
                                                    color: "primary.main",
                                                  },
                                                  "&.low": {
                                                    color: "grey.dark",
                                                  },
                                                }}
                                              >
                                                <Tooltip title="Urgent" arrow>
                                                  <StatusIcon
                                                    sx={{ fontSize: "18px" }}
                                                  />
                                                </Tooltip>
                                              </Box>
                                              {option}
                                            </MenuItem>
                                          ))}
                                        </MenuList>
                                      </ClickAwayListener>
                                    </Paper>
                                  </Grow>
                                )}
                              </Popper>
                            </TableCell>
                            <TableCell sx={{ p: "12px", pl: 0, lineHeight: 1 }}>
                              <Box
                                className="truncate line-clamp-1"
                                sx={{ opacity: 0.6 }}
                              >
                                Lorem Ipsum is simply dummy text of the printing
                                and typesetting industry
                              </Box>
                            </TableCell>
                            <TableCell sx={{ p: "12px" }}>
                              <Box
                                className="urgent"
                                sx={{
                                  display: "flex",
                                  justifyContent: "center",
                                  "&.urgent": {
                                    color: "#B13A41",
                                  },
                                  "&.high": {
                                    color: "secondary.main",
                                  },
                                  "&.normal": {
                                    color: "primary.main",
                                  },
                                  "&.low": {
                                    color: "grey.dark",
                                  },
                                }}
                              >
                                <Tooltip title="Urgent" arrow>
                                  <PriorityIcon sx={{ fontSize: "16px" }} />
                                </Tooltip>
                              </Box>
                            </TableCell>
                            <TableCell
                              sx={{ p: "12px", lineHeight: 1, opacity: 0.6 }}
                            >
                              30/12/2023
                            </TableCell>
                            <TableCell sx={{ p: "12px", pr: 0 }}>
                              <Button
                                onClick={() => {
                                  setStartTime(!startTime);
                                }}
                                disableRipple
                                sx={{
                                  minWidth: "unset",
                                  p: 0,
                                  bgcolor: "transparent!important",
                                  display: "block",
                                  mx: "auto",
                                }}
                              >
                                <StartTimeIcon
                                  sx={{
                                    fontSize: "16px",
                                    color: "#008844",
                                    display: startTime ? "none" : "block",
                                  }}
                                />
                                <StopTimeIcon
                                  sx={{
                                    fontSize: "16px",
                                    color: "error.main",
                                    display: startTime ? "block" : "none",
                                  }}
                                />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Box>
                </Box>
              </Grid>
              {/* <Grid item xs={12} md={6} xxl={4} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    py: { xs: 3, sm: 3.25 },
                    px: { xs: 3, sm: 2.5 },
                    bgcolor: "white",
                    boxShadow: "0 0 14px 0px rgb(42, 64, 98, 10%)",
                    color: "text.primary",
                    borderRadius: 2.5,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      textTransform: "capitalize",
                      mb: { xs: 3.5, sm: 4.5 },
                      fontSize: { xs: "16px", sm: "18px" },
                    }}
                  >
                    Upcoming Due
                  </Typography>
                </Box>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
