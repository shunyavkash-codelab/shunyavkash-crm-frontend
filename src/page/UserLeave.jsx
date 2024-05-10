import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ModalComponent from "../component/ModalComponent";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import ThemeButton from "../component/ThemeButton";
import PlusIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { APIS } from "../api/apiList.js";
import * as Yup from "yup";
import useApi from "../hooks/useApi.js";
import { useSnack } from "../hooks/store/useSnack.js";
import moment from "moment";
import { useAuth } from "../hooks/store/useAuth.js";
import NoData from "../component/NoData.jsx";
import CounterCards from "../component/CounterCards.jsx";
import AddLeaveForm from "../component/form/AddLeaveForm.jsx";
import dayjs from "dayjs";
import CustomTableHeader from "../component/table/CustomTableHeader.jsx";

function UserLeave({ profileId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();

  const [dashboard, setDashboard] = useState([]);
  const [leaveList, setLeaveList] = useState([]);
  const { userId } = useAuth();
  const formik = useFormik({
    validationSchema: Yup.object({
      leaveType: Yup.string().required("Leave type is required."),
      startDate: Yup.date().required("Start date is required."),
      startDayType: Yup.string().required("Start day type is required."),
      endDate: Yup.date().test(
        "End date",
        "End date is a required.",
        function (value) {
          if (this.parent.moreDay) {
            return value !== undefined;
          } else return true;
        }
      ),
      endDayType: Yup.string().test(
        "End day type",
        "End day type is a required.",
        function (value) {
          if (this.parent.moreDay) {
            return value !== undefined;
          } else return true;
        }
      ),
      reason: Yup.string().required("Reason is required."),
    }),
    enableReinitialize: true,
    initialValues: {
      leaveType: "",
      startDate: dayjs().format("MM/DD/YYYY"),
      startDayType: "full day",
      endDate: undefined,
      endDayType: undefined,
      reason: "",
      moreDay: false,
    },

    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.LEAVE.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          setLeaveList([res.data.data, ...leaveList]);
          formik.resetForm();
          setOpen(false);
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
        params: { userId: profileId },
      });
      if (res.data.success === true) {
        setDashboard(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const viewUserLeave = async (userId) => {
    try {
      const res = await apiCall({
        url: APIS.LEAVE.LIST(userId),
        method: "get",
      });
      if (res.data.success === true) {
        setLeaveList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    leaveDashboard();
    viewUserLeave(profileId);
  }, []);

  const TABLE_HEADINGS = [
    { id: "leaveType", label: "Type", sortable: false },
    { id: "reason", label: "Reason", sortable: false },
    {
      id: "createdAt",
      label: "Apply Date",
      sortable: false,
    },
    {
      id: "startDate",
      label: "Start Date",
      sortable: false,
    },
    {
      id: "endDate",
      label: "End Date",
      sortable: false,
    },
    {
      id: "status",
      label: "Status",
      sortable: false,
    },
  ];

  return (
    <>
      <Grid container spacing={2.5}>
        <Grid item xs={6} md={3} lg={2.4}>
          <CounterCards Title="Total Leaves" Counter={dashboard.total || 0} />
        </Grid>
        <Grid item xs={6} md={3} lg={2.4}>
          <CounterCards Title="Casual Leaves" Counter={dashboard.casual || 0} />
        </Grid>
        <Grid item xs={6} md={3} lg={2.4}>
          <CounterCards Title="Sick Leaves" Counter={dashboard.sick || 0} />
        </Grid>
        <Grid item xs={6} md={3} lg={2.4}>
          <CounterCards Title="Unpaid Leaves" Counter={dashboard.unpaid || 0} />
        </Grid>
        <Grid item xs={6} md={3} lg={2.4}>
          <CounterCards Title="Paid Leaves" Counter={dashboard.paid || 0} />
        </Grid>
      </Grid>

      <Box sx={{ bgcolor: "white", borderRadius: 4, mt: 3, pt: 2, pb: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            mb: 0,
            pb: 2,
            // borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
            My Leaves
          </Typography>
          {userId == profileId && (
            <ThemeButton
              transparent
              smallRounded
              Text="apply Leave"
              startIcon={
                <PlusIcon
                  sx={{
                    fontSize: "16px!important",
                    transform: "rotate(45deg)",
                  }}
                />
              }
              onClick={handleOpen}
            />
          )}
        </Stack>
        <Box sx={{ px: 0 }}>
          {leaveList.length > 0 ? (
            <TableContainer
              component={Paper}
              sx={{
                borderTop: "1px solid rgba(224, 224, 224, 1)",
                borderBottom: "1px solid rgba(224, 224, 224, 1)",
                mx: { xs: "-10px", sm: 0 },
                width: { xs: "auto", sm: "auto" },
                borderRadius: 0,
                boxShadow: 0,
              }}
            >
              <Table
                className="projectTable"
                sx={{
                  minWidth: 650,
                  textTransform: "capitalize",
                  textWrap: "nowrap",
                  "& thead > tr > th": {
                    backgroundColor: "#F8F9FA",
                  },
                  "& th,& td": { borderBottom: 0 },
                  "& tbody tr": {
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  },
                }}
                aria-label="simple table"
              >
                <CustomTableHeader headings={TABLE_HEADINGS} />
                <TableBody>
                  {leaveList.map((leave) => (
                    <TableRow
                      key={leave.key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&:first-of-type td": {
                          maxWidth: "250px",
                          textWrap: "wrap",
                        },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{
                            fontSize: "12px",
                            p: 0.5,
                            borderRadius: 1,
                            maxWidth: "fit-content",
                            lineHeight: 1,
                            bgcolor:
                              leave.leaveType === "casual"
                                ? "rgba(94, 115, 141, 15%)"
                                : leave.leaveType === "sick"
                                ? "rgba(248, 174, 0, 15%)"
                                : leave.leaveType === "unpaid"
                                ? "rgba(225, 107, 22, 15%)"
                                : "rgba(74, 210, 146, 15%)",
                            color:
                              leave.leaveType === "casual"
                                ? "grey.dark"
                                : leave.leaveType === "sick"
                                ? "#f8ae00"
                                : leave.leaveType === "unpaid"
                                ? "review.main"
                                : "success.main",
                          }}
                        >
                          {leave.leaveType}
                        </Box>
                      </TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.75,
                          }}
                        >
                          {moment(leave.createdAt).format("DD/MM/YYYY")}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.75,
                          }}
                        >
                          <Box>
                            {moment(leave.startDate).format("DD/MM/YYYY")}
                            <Typography
                              sx={{
                                marginTop: "3px",
                                lineHeight: 1,
                                textAlign: "center",
                                fontSize: "12px",
                                color: "darkgray",
                              }}
                            >
                              ({leave.startDayType})
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            marginLeft: !leave?.endDate && "32px",
                            gap: 1.75,
                          }}
                        >
                          {leave.endDate ? (
                            <Box>
                              {moment(leave.endDate).format("DD/MM/YYYY")}
                              <Typography
                                sx={{
                                  marginTop: "3px",
                                  lineHeight: 1,
                                  textAlign: "center",
                                  fontSize: "12px",
                                  color: "darkgray",
                                }}
                              >
                                ({leave.endDayType})
                              </Typography>
                            </Box>
                          ) : (
                            "-"
                          )}
                        </Box>
                      </TableCell>
                      {/* Admin ni status ni row na aave */}
                      <TableCell>
                        <Tooltip title={leave.description} arrow>
                          <Button
                            disableRipple
                            sx={{
                              textTransform: "capitalize",
                              color: "white",
                              fontSize: "12px",
                              fontWeight: "500",
                              py: 0.5,
                              px: 1,
                              borderRadius: 1,
                              maxWidth: "fit-content",
                              lineHeight: 1,
                              bgcolor:
                                leave.status === "unapprove"
                                  ? "review.main"
                                  : leave.status === "pending"
                                  ? "warning.light"
                                  : "success.main",
                              "&:hover": {
                                bgcolor:
                                  leave.status === "unapprove"
                                    ? "review.main"
                                    : leave.status === "pending"
                                    ? "warning.light"
                                    : "success.main",
                              },
                              "& .MuiButton-endIcon": {
                                ml: "3px",
                                mr: 0,
                              },
                            }}
                            endIcon={
                              leave.status !== "pending" && (
                                <InfoIcon sx={{ fontSize: "18px!important" }} />
                              )
                            }
                          >
                            <span style={{ display: "inline-block" }}>
                              {leave.status}
                            </span>
                          </Button>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <Box p={2.5}>
              <NoData />
            </Box>
          )}
        </Box>
      </Box>

      <ModalComponent
        open={open}
        setOpen={setOpen}
        modalTitle="Add Leave"
        sx={{ padding: "6px" }}
      >
        <AddLeaveForm formik={formik} />
      </ModalComponent>
    </>
  );
}

export default UserLeave;
