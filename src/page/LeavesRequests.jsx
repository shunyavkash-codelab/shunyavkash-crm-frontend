import React, { useEffect, useState } from "react";
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
import ThemeButton from "../component/ThemeButton";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import moment from "moment";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function LeavesRequests() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [leaveId, setLeaveId] = useState(false);
  const { accessToken } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [allLeaveList, setAllLeaveList] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();

  const formik = useFormik({
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required."),
      status: Yup.string().required("Status is required."),
    }),
    enableReinitialize: true,
    initialValues: {
      description: "",
      status: "",
    },

    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.LEAVE.EDIT(leaveId),
          method: "patch",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          setOpen(false);
          leaveList();
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  const leaveDashboard = async () => {
    try {
      const res = await apiCall({
        url: APIS.LEAVE.DASHBOARD,
        method: "get",
      });
      if (res.data.success === true) {
        setDashboard(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const leaveList = async () => {
    try {
      const res = await apiCall({
        url: APIS.LEAVE.ALL,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setAllLeaveList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    leaveDashboard();
    leaveList();
  }, []);

  // const leavesRequests = [
  //   {
  //     id: 1,
  //     username: "Deep Bhimani",
  //     type: "casual",
  //     reason: "Marriage Function",
  //     startDate: "15/01/2023",
  //     endDate: "17/01/2023",
  //     status: "approve",
  //     statusReason: "Lorem ipsum dolor sit amet 1",
  //   },
  //   {
  //     id: 2,
  //     username: "Deep Bhimani",
  //     type: "sick",
  //     reason: "Medical",
  //     startDate: "25/02/2023",
  //     endDate: "27/02/2023",
  //     status: "approve",
  //     statusReason: "Lorem ipsum dolor sit amet 2",
  //   },
  //   {
  //     id: 3,
  //     username: "Deep Bhimani",
  //     type: "paid",
  //     reason: "Going to Village",
  //     startDate: "31/04/2023",
  //     endDate: "2/05/2023",
  //     status: "unapprove",
  //     statusReason: "ipsum dolor sit amet lorem 3",
  //   },
  //   {
  //     id: 4,
  //     username: "Deep Bhimani",
  //     type: "unpaid",
  //     reason: "Going to Friend's Birthday Party",
  //     startDate: "25/04/2023",
  //     endDate: "25/04/2023",
  //     status: "unapprove",
  //     statusReason: "Lorem dolor sit ipsum amet 4",
  //   },
  //   {
  //     id: 5,
  //     username: "Dipali Gediya",
  //     type: "unpaid",
  //     reason: "Going to Friend's Birthday Party",
  //     startDate: "25/04/2023",
  //     endDate: "25/04/2023",
  //     status: "",
  //     statusReason: "Lorem dolor sit ipsum amet 4",
  //   },
  // ];

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
            <Grid item xs={6} md={3} lg={2.4}>
              <Box
                p={3}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Leaves Requests
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  {dashboard.total || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={2.4}>
              <Box
                p={3}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Casual Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  {dashboard.casual || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={2.4}>
              <Box
                p={3}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Sick Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  {dashboard.sick || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={2.4}>
              <Box
                p={3}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Unpaid Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  {dashboard.unpaid || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={2.4}>
              <Box
                p={3}
                sx={{
                  backgroundColor: "white",
                  height: "100%",
                  borderRadius: 3,
                }}
              >
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Paid Leaves
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  {dashboard.paid}
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
                {allLeaveList.length > 0 && (
                  <TableBody>
                    {allLeaveList.map((leaveRequest) => (
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
                        <TableCell>{leaveRequest.userName}</TableCell>
                        <TableCell
                          sx={{
                            "& .casual": {
                              bgcolor: "rgba(94, 115, 141, 15%)",
                              color: "grey.dark",
                            },
                            "& .sick": {
                              bgcolor: "rgba(248, 174, 0, 15%)",
                              color: "secondary.main",
                            },
                            "& .unpaid": {
                              bgcolor: "rgb(255 0 0 / 15%)",
                              color: "error.main",
                            },
                            "& .paid": {
                              bgcolor: "rgba(74, 210, 146, 15%)",
                              color: "success.main",
                            },
                          }}
                        >
                          <Box
                            className={
                              leaveRequest.leaveType === "casual"
                                ? "casual"
                                : leaveRequest.leaveType === "sick"
                                ? "sick"
                                : leaveRequest.leaveType === "unpaid"
                                ? "unpaid"
                                : "paid"
                            }
                            sx={{
                              color: "white",
                              fontSize: "12px",
                              p: 0.5,
                              borderRadius: 1,
                              maxWidth: "fit-content",
                              lineHeight: 1,
                            }}
                          >
                            {leaveRequest.leaveType}
                          </Box>
                        </TableCell>
                        <TableCell>{leaveRequest.reason}</TableCell>
                        <TableCell>
                          {moment(leaveRequest.startDate).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          {moment(leaveRequest.endDate).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell
                          sx={{
                            "& .statusBtn": {
                              fontSize: { xs: "12px", sm: "14px" },
                              px: 2,
                              py: 1,
                              maxWidth: "fit-content",
                              lineHeight: 1,
                              minHeight: "36px",
                              "& svg": {
                                fontSize: "20px",
                              },
                            },
                          }}
                        >
                          <ButtonGroup sx={{ overflow: "hidden" }}>
                            {!leaveRequest.status ||
                            leaveRequest.status === "pending" ||
                            leaveRequest.status === "approve" ? (
                              <Stack
                                onClick={() => {
                                  handleOpen();
                                  setLeaveId(leaveRequest._id);
                                }}
                                direction="row"
                                alignItems="center"
                                spacing={0.75}
                                className="statusBtn"
                                sx={{
                                  cursor: "pointer",
                                  bgcolor: "rgba(74, 210, 146, 15%)",
                                  color: "success.main",
                                  // padding: "6px 16px 6px 16px !important",
                                }}
                              >
                                <span style={{ display: "inline-block" }}>
                                  approve
                                </span>
                                {leaveRequest.status === "approve" && (
                                  <Tooltip title={leaveRequest.description}>
                                    <InfoIcon />
                                  </Tooltip>
                                )}
                              </Stack>
                            ) : (
                              ""
                            )}
                            {!leaveRequest.status ||
                            leaveRequest.status === "pending" ||
                            leaveRequest.status === "unapprove" ? (
                              <Stack
                                onClick={() => {
                                  handleOpen();
                                  setLeaveId(leaveRequest._id);
                                }}
                                direction="row"
                                alignItems="center"
                                spacing={0.75}
                                className="statusBtn"
                                sx={{
                                  cursor: "pointer",
                                  bgcolor: "rgba(225, 107, 22, 15%)",
                                  color: "review.main",
                                  // py: 0.75,
                                  // padding: "6px 16px 6px 16px !important",
                                }}
                              >
                                <span style={{ display: "inline-block" }}>
                                  unapprove
                                </span>
                                {leaveRequest.status === "unapprove" && (
                                  <Tooltip title={leaveRequest.description}>
                                    <InfoIcon />
                                  </Tooltip>
                                )}
                              </Stack>
                            ) : (
                              ""
                            )}
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Box>

          <ModalComponent
            open={open}
            setOpen={setOpen}
            modalTitle="Give Reason"
            sx={{ padding: "6px" }}
          >
            <Box component="form" onSubmit={formik.handleSubmit}>
              <Grid container rowSpacing={2.5} columnSpacing={2.5}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      fullWidth
                      multiline
                      rows={4}
                      size="normal"
                      name="description"
                      placeholder="Description"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      sx={{
                        "&>label,& input,&>div": { fontSize: "14px" },
                      }}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
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
                <ThemeButton
                  success
                  Text="approve"
                  onClick={() => formik.setFieldValue("status", "approve")}
                  type="submit"
                />
                <ThemeButton
                  error
                  Text="unapprove"
                  onClick={() => formik.setFieldValue("status", "unapprove")}
                  type="submit"
                />
              </Stack>
            </Box>
          </ModalComponent>
        </Box>
      </Box>
    </>
  );
}
