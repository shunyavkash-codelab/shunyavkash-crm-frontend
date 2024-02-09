import React, { useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  TableCell,
  TableRow,
  Tooltip,
} from "@mui/material";
import StartTimeIcon from "@mui/icons-material/PlayCircle";
import StopTimeIcon from "@mui/icons-material/StopCircle";
import StatusIcon from "@mui/icons-material/SquareRounded";
import PriorityIcon from "@mui/icons-material/Tour";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";

const options = ["to do", "in progress", "in review"];

const TaskDetail = ({ task, showExtraDetail = false }) => {
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [timer, setTimer] = useState(0);
  const countRef = useRef(null);

  // stop watch
  const handleStart = () => {
    if (isActive) {
      clearInterval(countRef.current);
    } else {
      countRef.current = setInterval(() => {
        setTimer((timer) => timer + 1);
      }, 1000);
    }
  };

  const formatTime = (timer) => {
    const getSeconds = `0${timer % 60}`.slice(-2);
    const minutes = `${Math.floor(timer / 60)}`;
    const getMinutes = `0${minutes % 60}`.slice(-2);
    const getHours = `0${Math.floor(timer / 3600)}`.slice(-2);

    return `${getHours} : ${getMinutes} : ${getSeconds}`;
  };

  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (event) => {
    // setSelectedIndex(index);
    setOpen(false);
  };
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
    <TableRow
      key={task.id}
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
        "&>td": {
          fontSize: {
            xs: showExtraDetail ? "12px" : "12px",
            sm: showExtraDetail ? "14px" : "12px",
          },
          p: showExtraDetail ? 2 : 1.25,
        },
      }}
    >
      <TableCell
        variant="contained"
        ref={anchorRef}
        sx={{
          width: {
            xs: showExtraDetail ? "40px" : "58px",
            sm: showExtraDetail ? "44px" : "58px",
          },
          pr: "8px!important",
        }}
      >
        <Box
          sx={{
            display: showExtraDetail ? "" : "flex",
            alignItems: showExtraDetail ? "" : "center",
            gap: showExtraDetail ? "" : 0.75,
          }}
        >
          {!showExtraDetail && (
            <Button
              onClick={() => {
                setIsActive(!isActive);
                handleStart();
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
                  display: isActive ? "none" : "block",
                }}
              />
              <StopTimeIcon
                sx={{
                  fontSize: "16px",
                  color: "error.main",
                  display: isActive ? "block" : "none",
                }}
              />
            </Button>
          )}
          <Button
            onClick={handleToggle}
            disableRipple
            className="toDo"
            sx={{
              bgcolor: "transparent!important",
              minWidth: "unset",
              padding: 0,
              display: "flex",
              "&.toDo": {
                color: "grey.dark",
              },
              "&.inProgress": {
                color: "secondary.main",
              },
              "&.inReview": {
                color: "review.main",
              },
            }}
          >
            <Tooltip title="toDo" arrow>
              <StatusIcon
                sx={{
                  fontSize: {
                    xs: showExtraDetail ? "18px" : "16px",
                    sm: showExtraDetail ? "20px" : "16px",
                  },
                }}
              />
            </Tooltip>
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
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu" autoFocusItem>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        // selected={index === selectedIndex}
                        onClick={handleMenuItemClick}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: "12px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            color:
                              option === "in review"
                                ? "review.main"
                                : option === "in progress"
                                ? "secondary.main"
                                : "grey.dark",
                          }}
                        >
                          <StatusIcon
                            sx={{
                              fontSize: "16px",
                            }}
                          />
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
      <TableCell sx={{ pl: "0!important", lineHeight: 1 }}>
        <Box
          className="truncate line-clamp-1"
          sx={{ opacity: showExtraDetail ? 1 : 0.6, lineHeight: 1.2 }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry
        </Box>
      </TableCell>
      <TableCell>
        <Box
          className="urgent"
          sx={{
            display: "flex",
            justifyContent: showExtraDetail ? "start" : "center",
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
            <PriorityIcon
              sx={{
                fontSize: {
                  xs: showExtraDetail ? "18px" : "16px",
                  sm: showExtraDetail ? "20px" : "16px",
                },
              }}
            />
          </Tooltip>
        </Box>
      </TableCell>
      <TableCell
        sx={{
          lineHeight: 1,
          opacity: showExtraDetail ? 1 : 0.6,
        }}
      >
        30/12/2023
      </TableCell>
      {showExtraDetail && (
        <>
          <TableCell>
            <Avatar
              alt="Deep Bhimani"
              src="/static/images/avatar/1.jpg"
              sx={{
                fontSize: "15px",
                height: "28px",
                width: "28px",
              }}
            />
          </TableCell>
          <TableCell>
            <Button
              onClick={() => {
                setIsActive(!isActive);
                handleStart();
              }}
              disableRipple
              sx={{
                minWidth: "unset",
                p: 0,
                bgcolor: "transparent!important",
                display: "flex",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              <StartTimeIcon
                sx={{
                  fontSize: { xs: "18px", sm: "20px" },
                  color: "#008844",
                  display: isActive ? "none" : "block",
                }}
              />
              <StopTimeIcon
                sx={{
                  fontSize: { xs: "18px", sm: "20px" },
                  color: "error.main",
                  display: isActive ? "block" : "none",
                }}
              />
              <Box
                sx={{
                  lineHeight: 1,
                  color: "text.primary",
                  fontWeight: 500,
                  fontSize: { xs: "12px", sm: "14px" },
                }}
              >
                {formatTime(timer)}
              </Box>
            </Button>
          </TableCell>
          <TableCell>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.25, sm: 1.5 },
                opacity: 0.3,
                "& button": {
                  p: 0,
                  minWidth: "auto",
                  color: "black",
                  "&:hover": { color: "primary.main" },
                },
                "& svg": {
                  fontSize: { xs: "20px", sm: "22px" },
                },
              }}
            >
              <Button disableRipple>
                <VisibilityIcon />
              </Button>
            </Box>
          </TableCell>
        </>
      )}
    </TableRow>
  );
};

export default TaskDetail;
