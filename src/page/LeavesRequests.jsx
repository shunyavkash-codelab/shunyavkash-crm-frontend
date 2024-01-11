import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import ModalComponent from "../component/ModalComponent";
import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  // InputLabel,
  // MenuItem,
  Paper,
  // Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
// import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";

export default function LeavesRequests() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const leavesRequests = [
    {
      id: 1,
      username: "Deep Bhimani",
      type: "casual",
      reason: "Marriage Function",
      startDate: "15/01/2023",
      endDate: "17/01/2023",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet 1",
    },
    {
      id: 2,
      username: "Deep Bhimani",
      type: "sick",
      reason: "Medical",
      startDate: "25/02/2023",
      endDate: "27/02/2023",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet 2",
    },
    {
      id: 3,
      username: "Deep Bhimani",
      type: "paid",
      reason: "Going to Village",
      startDate: "31/04/2023",
      endDate: "2/05/2023",
      status: "unapprove",
      statusReason: "ipsum dolor sit amet lorem 3",
    },
    {
      id: 4,
      username: "Deep Bhimani",
      type: "unpaid",
      reason: "Going to Friend's Birthday Party",
      startDate: "25/04/2023",
      endDate: "25/04/2023",
      status: "unapprove",
      statusReason: "Lorem dolor sit ipsum amet 4",
    },
    {
      id: 5,
      username: "Dipali Gediya",
      type: "unpaid",
      reason: "Going to Friend's Birthday Party",
      startDate: "25/04/2023",
      endDate: "25/04/2023",
      status: "unanswered",
      statusReason: "Lorem dolor sit ipsum amet 4",
    },
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
      <Box sx={{ ml: { lg: sideBarWidth } }}>
        <Box component="main">
          <Box>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              leaves requests
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "capitalize",
                    color: "primary.main",
                    transition: "all 0.4s ease-in-out",
                    ":not(:hover)": {
                      opacity: 0.7,
                    },
                  }}
                >
                  Dashboard /
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                leaves Requests
              </Typography>
            </Box>
          </Box>

          <Grid
            container
            rowSpacing={2.5}
            columnSpacing={2.5}
            mt={0}
            sx={{ mt: 0.75 }}
          >
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Leaves Requests
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  15
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Casual Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  5
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Sick Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  5
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Unpaid Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  N/A
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
              Members Leave Requests
            </Typography>
          </Box>

          <Box sx={{ mt: 2 }}>
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                mx: { xs: "-10px", sm: 0 },
                width: { xs: "auto", sm: "auto" },
                borderRadius: 2.5,
              }}
            >
              <Table
                className="projectTable"
                sx={{
                  minWidth: 650,
                  textTransform: "capitalize",
                  textWrap: "nowrap",
                  "& th,& td": { borderBottom: 0 },
                  "& tbody tr": {
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}>
                    <TableCell>Member</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leavesRequests.map((leaveRequest) => (
                    <TableRow
                      key={leaveRequest.key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&:first-of-type td": {
                          maxWidth: "250px",
                          textWrap: "wrap",
                        },
                      }}
                    >
                      <TableCell>{leaveRequest.username}</TableCell>
                      <TableCell
                        sx={{
                          "& .statusBtn": {
                            color: "white",
                            fontSize: "12px",
                            p: 0.5,
                            borderRadius: 1,
                            maxWidth: "fit-content",
                            lineHeight: 1,
                          },
                          "& .casual": {
                            bgcolor: "rgba(94, 115, 141, 15%)",
                            color: "grey.dark",
                          },
                          "& .sick": {
                            bgcolor: "rgba(248, 174, 0, 15%)",
                            color: "secondary.main",
                          },
                          "& .unpaid": {
                            bgcolor: "rgba(225, 107, 22, 15%)",
                            color: "review.main",
                          },
                          "& .paid": {
                            bgcolor: "rgba(74, 210, 146, 15%)",
                            color: "success.main",
                          },
                        }}
                      >
                        <Box
                          className={`statusBtn ${
                            leaveRequest.type === "casual"
                              ? "casual"
                              : leaveRequest.type === "sick"
                              ? "sick"
                              : leaveRequest.type === "unpaid"
                              ? "unpaid"
                              : "paid"
                          }`}
                        >
                          {leaveRequest.type}
                        </Box>
                      </TableCell>
                      <TableCell>{leaveRequest.reason}</TableCell>
                      <TableCell>{leaveRequest.startDate}</TableCell>
                      <TableCell>{leaveRequest.endDate}</TableCell>
                      <TableCell
                        sx={{
                          "& .statusBtn": {
                            fontSize: { xs: "12px", sm: "14px" },
                            py: { xs: 0.75, sm: 1.25 },
                            px: { xs: 1, sm: 2 },
                            maxWidth: "fit-content",
                            lineHeight: 1,
                          },
                          "& .unapprove": {
                            color:
                              leaveRequest.status === "unapprove"
                                ? "secondary.main"
                                : "#a5a5a5",
                            bgcolor:
                              leaveRequest.status === "unapprove"
                                ? "rgba(248, 174, 0, 15%)"
                                : "#ececec",
                            pointerEvents:
                              leaveRequest.status === "unapprove" ? "" : "none",
                            display:
                              leaveRequest.status === "unapprove" ? "" : "none",
                          },
                          "& .approve": {
                            color:
                              leaveRequest.status === "approve"
                                ? "success.main"
                                : "#a5a5a5",
                            bgcolor:
                              leaveRequest.status === "approve"
                                ? "rgba(74, 210, 146, 15%)"
                                : "#ececec",
                            pointerEvents:
                              leaveRequest.status === "approve" ? "" : "none",
                            display:
                              leaveRequest.status === "approve" ? "" : "none",
                          },
                          "& .unanswered": {
                            color:
                              leaveRequest.status === "unanswered"
                                ? "#a5a5a5"
                                : "#a5a5a5",
                            bgcolor:
                              leaveRequest.status === "unanswered"
                                ? "#ececec"
                                : "#ececec",
                            // pointerEvents:
                            //   leaveRequest.status === "unanswered"
                            //     ? ""
                            //     : "block",
                            // display:
                            //   leaveRequest.status === "unanswered"
                            //     ? ""
                            //     : "show",
                          },
                        }}
                      >
                        <Stack direction="row" spacing={1}>
                          <ButtonGroup sx={{ overflow: "hidden" }}>
                            <Stack
                              onClick={handleOpen}
                              direction="row"
                              alignItems="center"
                              spacing={0.75}
                              className="statusBtn approve"
                              sx={{ cursor: "pointer" }}
                            >
                              <span style={{ display: "inline-block" }}>
                                approve
                              </span>
                              {leaveRequest.status === "approve" && (
                                <Tooltip title={leaveRequest.statusReason}>
                                  <InfoIcon />
                                </Tooltip>
                              )}
                            </Stack>
                            <Stack
                              onClick={handleOpen}
                              direction="row"
                              alignItems="center"
                              spacing={0.75}
                              className="statusBtn unapprove"
                              sx={{ cursor: "pointer" }}
                            >
                              <span style={{ display: "inline-block" }}>
                                unapprove
                              </span>
                              {leaveRequest.status === "unapprove" && (
                                <Tooltip title={leaveRequest.statusReason}>
                                  <InfoIcon />
                                </Tooltip>
                              )}
                            </Stack>
                            <Stack
                              onClick={handleOpen}
                              direction="row"
                              alignItems="center"
                              spacing={0.75}
                              className="statusBtn unanswered"
                              sx={{ cursor: "pointer" }}
                            >
                              <span style={{ display: "inline-block" }}>
                                unanswer
                              </span>
                              {leaveRequest.status === "unanswered" && (
                                <Tooltip title={leaveRequest.statusReason}>
                                  <InfoIcon />
                                </Tooltip>
                              )}
                            </Stack>
                          </ButtonGroup>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>

          <ModalComponent
            open={open}
            setOpen={setOpen}
            modalTitle="Give Reason"
            sx={{ padding: "6px" }}
          >
            <Grid container rowSpacing={2.5} columnSpacing={2.5}>
              <Grid
                item
                xs={12}
                sx={{ "> .MuiFormControl-root": { margin: 0 } }}
              >
                <FormControl fullWidth sx={{ m: 1 }}>
                  <TextField
                    required
                    fullWidth
                    multiline
                    rows={4}
                    size="normal"
                    id="name"
                    placeholder="Description"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={2}
              sx={{ mt: 2 }}
            >
              <Button
                disableRipple
                type="submit"
                sx={{
                  maxHeight: "42px",
                  position: "relative",
                  px: 2.5,
                  py: 1.5,
                  bgcolor: "success.main",
                  border: "1px solid",
                  borderColor: "success.main",
                  color: "white",
                  lineHeight: 1,
                  borderRadius: 2.5,
                  overflow: "hidden",
                  "&:before": {
                    content: "''",
                    height: 0,
                    width: "10rem",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    zIndex: "0",
                    bgcolor: "white",
                    transform: "rotate(-45deg) translate(-50%, -50%)",
                    transformOrigin: "0% 0%",
                    transition: "all 0.4s ease-in-out",
                  },
                  "&:hover": {
                    color: "success.main",
                    bgcolor: "success.main",
                    "&:before": { height: "10rem" },
                  },
                }}
              >
                <span style={{ position: "relative" }}>approve</span>
              </Button>
              <Button
                disableRipple
                type="submit"
                sx={{
                  maxHeight: "42px",
                  position: "relative",
                  px: 2.5,
                  py: 1.5,
                  bgcolor: "error.main",
                  border: "1px solid",
                  borderColor: "error.main",
                  color: "white",
                  lineHeight: 1,
                  borderRadius: 2.5,
                  overflow: "hidden",
                  "&:before": {
                    content: "''",
                    height: 0,
                    width: "10rem",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    zIndex: "0",
                    bgcolor: "white",
                    transform: "rotate(-45deg) translate(-50%, -50%)",
                    transformOrigin: "0% 0%",
                    transition: "all 0.4s ease-in-out",
                  },
                  "&:hover": {
                    color: "error.main",
                    bgcolor: "error.main",
                    "&:before": { height: "10rem" },
                  },
                }}
              >
                <span style={{ position: "relative" }}>unapprove</span>
              </Button>
            </Stack>
          </ModalComponent>
        </Box>
      </Box>
    </>
  );
}
