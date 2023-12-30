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
import StatusIcon from "@mui/icons-material/SquareRounded";
import ArrowIcon from "@mui/icons-material/ArrowForwardRounded";
import { BarChart } from "@mui/x-charts/BarChart";

const options = ["urgent", "high", "normal", "low"];

export default function EmployeeDashboard() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, user } = useAuth();
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

  const tasks = [
    "Web design",
    "web devlopment",
    "img compressor",
    "svg design",
    "create dynamic",
  ];

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
      {user.role !== 0 && (
        <Box
          sx={{ display: "flex", height: "100vh", ml: { lg: sideBarWidth } }}
        >
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
              <Grid
                container
                rowSpacing={2}
                columnSpacing={2}
                sx={{
                  "&>*>*": {
                    height: "100%",
                  },
                }}
              >
                <Grid item xs={12} xl={4}>
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
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textTransform: "capitalize",
                          fontSize: { xs: "16px", sm: "18px" },
                        }}
                      >
                        Today's Priority
                      </Typography>
                      <Button
                        disableRipple
                        sx={{
                          bgcolor: "transparent!important",
                          p: 0,
                          lineHeight: 1,
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                          color: "#00ac8d",
                          "&:hover svg": {
                            transform: "translatex(2px)",
                          },
                        }}
                      >
                        See all
                        <ArrowIcon
                          sx={{
                            fontSize: "20px",
                            transition: "all 0.4s ease-in-out",
                          }}
                        />
                      </Button>
                    </Box>
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
                                  p: 1.25,
                                  fontSize: "12px",
                                },
                              }}
                            >
                              <TableCell
                                colspan={2}
                                sx={{ minWidth: "200px", pl: 1 }}
                              >
                                Task Name
                              </TableCell>
                              <TableCell sx={{ width: "64px" }}>
                                Priority
                              </TableCell>
                              <TableCell
                                sx={{
                                  width: "84px",
                                  textAlign: "center",
                                }}
                              >
                                Due date
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
                            {tasks.map((task) => (
                              <TableRow
                                key={task.id}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                  "&>td": {
                                    fontSize: "12px",
                                    p: 1.25,
                                  },
                                }}
                              >
                                <TableCell
                                  variant="contained"
                                  ref={anchorRef}
                                  sx={{ px: 1.5, width: "58px" }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.75,
                                    }}
                                  >
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
                                    <Button
                                      onClick={handleToggle}
                                      disableRipple
                                      className="urgent"
                                      sx={{
                                        bgcolor: "transparent!important",
                                        minWidth: "unset",
                                        padding: 0,
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
                                  </Box>
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
                                                  selected={
                                                    index === selectedIndex
                                                  }
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
                                                    fontSize: "12px",
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
                                                    <Tooltip
                                                      title="Urgent"
                                                      arrow
                                                    >
                                                      <StatusIcon
                                                        sx={{
                                                          fontSize: "16px",
                                                        }}
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
                                <TableCell
                                  sx={{ pl: "0!important", lineHeight: 1 }}
                                >
                                  <Box
                                    className="truncate line-clamp-1"
                                    sx={{ opacity: 0.6 }}
                                  >
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry
                                  </Box>
                                </TableCell>
                                <TableCell>
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
                                  sx={{
                                    p: "12px",
                                    lineHeight: 1,
                                    opacity: 0.6,
                                  }}
                                >
                                  30/12/2023
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12} xl={4}>
                  <Box
                    sx={{
                      pt: 2.5,
                      bgcolor: "white",
                      boxShadow: "0 0 14px 0px rgb(42, 64, 98, 10%)",
                      color: "text.primary",
                      borderRadius: 2.5,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 2,
                        mb: 3,
                        px: 1.5,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          textTransform: "capitalize",
                          fontSize: { xs: "16px", sm: "18px" },
                        }}
                      >
                        Tracked Time By You
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 600,
                          textTransform: "capitalize",
                          fontSize: "16px",
                        }}
                      >
                        (42 Hours)
                      </Typography>
                    </Box>
                    <Box>
                      <BarChart
                        xAxis={[
                          {
                            id: "barCategories",
                            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                            scaleType: "band",
                          },
                        ]}
                        series={[
                          {
                            data: [2, 4, 5, 3, 8, 4],
                            color: "#00ac8d",
                          },
                        ]}
                        sx={{ width: "100%" }}
                        height={250}
                      />
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
