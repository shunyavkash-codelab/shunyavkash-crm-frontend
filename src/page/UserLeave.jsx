import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
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
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModalComponent from "../component/ModalComponent";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import AccountHolderIcon from "@mui/icons-material/PermIdentityOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ThemeButton from "../component/ThemeButton";
import PlusIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import { APIS } from "../api/apiList.js";
import * as Yup from "yup";
import useApi from "../hooks/useApi.js";
import { useSnack } from "../hooks/store/useSnack.js";
import { useParams } from "react-router-dom";
import moment from "moment";
import { logDOM } from "@testing-library/react";

function UserLeave({ userId }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();

  const [leaveList, setLeaveList] = useState([]);
  const { id } = useParams();

  const formik = useFormik({
    validationSchema: Yup.object({
      leaveType: Yup.string().required("Leave type is required."),
      startDate: Yup.date().required("Start date is required."),
      startDayType: Yup.string().required("Start day type is required."),
      endDate: Yup.date().required("End date is required."),
      endDayType: Yup.string().required("End day type is required."),
      reason: Yup.string().required("Reason is required."),
    }),
    enableReinitialize: true,
    initialValues: {
      leaveType: "",
      startDate: "",
      startDayType: "",
      endDate: "",
      endDayType: "",
      reason: "",
    },

    onSubmit: async (values) => {
      console.log(values, "--------------60");
      try {
        const res = await apiCall({
          url: APIS.LEAVE.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          console.log(res.data.data, "-------------------69");
          setSnack(res.data.message);
          setLeaveList([res.data.data, ...leaveList]);
          setOpen(false);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

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
    viewUserLeave(id || userId);
  }, []);
  return (
    <>
      <Grid container rowSpacing={2.5} columnSpacing={2.5} mt={0}>
        <Grid item xs={6} md={3} lg={2.4}>
          <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
            <Typography
              sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
            >
              Total Leaves
            </Typography>
            <Typography
              sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
            >
              15
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={2.4}>
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
        <Grid item xs={6} md={3} lg={2.4}>
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
        <Grid item xs={6} md={3} lg={2.4}>
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
        <Grid item xs={6} md={3} lg={2.4}>
          <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
            <Typography
              sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
            >
              Paid Leaves
            </Typography>
            <Typography
              sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
            >
              0
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Box
          className="cardHeader"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
            My Leaves
          </Typography>
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
        </Box>
        <Box>
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
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>day type</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>day type</TableCell>
                  {/* Admin ni status ni row na aave */}
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
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
                              ? "secondary.main"
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
                      {moment(leave.startDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{leave.startDayType}</TableCell>
                    <TableCell>
                      {moment(leave.endDate).format("DD/MM/YYYY")}
                    </TableCell>
                    <TableCell>{leave.endDayType}</TableCell>
                    {/* Admin ni status ni row na aave */}
                    <TableCell>
                      <Tooltip title={leave.description} arrow>
                        <Button
                          disableRipple
                          sx={{
                            textTransform: "capitalize",
                            color: "white",
                            fontSize: "12px",
                            p: 0.5,
                            borderRadius: 1,
                            maxWidth: "fit-content",
                            lineHeight: 1,
                            bgcolor:
                              leave.status === "unapprove"
                                ? "review.main"
                                : leave.status === "pending"
                                ? "#f4a736"
                                : "success.main",
                            "&:hover": {
                              bgcolor:
                                leave.status === "unapprove"
                                  ? "review.main"
                                  : leave.status === "pending"
                                  ? "#f0bb6e"
                                  : "success.main",
                            },
                            "& .MuiButton-endIcon": {
                              ml: "3px",
                              mr: 0,
                            },
                          }}
                          endIcon={
                            !leave.status === "panding" ? (
                              <InfoIcon sx={{ fontSize: "18px!important" }} />
                            ) : (
                              ""
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
        </Box>
      </Box>

      <ModalComponent
        open={open}
        setOpen={setOpen}
        modalTitle="Add Leave"
        sx={{ padding: "6px" }}
      >
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid container rowSpacing={2.5} columnSpacing={2.5}>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                size="normal"
                sx={{
                  textTransform: "capitalize",
                  "&>label": { fontSize: "14px" },
                }}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                >
                  Leave Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="leaveType"
                  value={formik.values.leaveType}
                  onChange={(e) =>
                    formik.setFieldValue("leaveType", e.target.value)
                  }
                  label="Leave Type"
                  sx={{ fontSize: "14px" }}
                  error={
                    formik.touched.leaveType && Boolean(formik.errors.leaveType)
                  }
                >
                  <MenuItem value={"casual"}>
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "12px",
                        p: 0.5,
                        borderRadius: 1,
                        maxWidth: "fit-content",
                        lineHeight: 1,
                        bgcolor: "rgba(94, 115, 141, 15%)",
                        color: "grey.dark",
                      }}
                    >
                      Casual
                    </Box>
                  </MenuItem>
                  <MenuItem value={"sick"}>
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "12px",
                        p: 0.5,
                        borderRadius: 1,
                        maxWidth: "fit-content",
                        lineHeight: 1,
                        bgcolor: "rgba(248, 174, 0, 15%)",
                        color: "secondary.main",
                      }}
                    >
                      Sick
                    </Box>
                  </MenuItem>
                  <MenuItem value={"paid"}>
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "12px",
                        p: 0.5,
                        borderRadius: 1,
                        maxWidth: "fit-content",
                        lineHeight: 1,
                        bgcolor: "rgba(74, 210, 146, 15%)",
                        color: "success.main",
                      }}
                    >
                      Paid
                    </Box>
                  </MenuItem>
                  <MenuItem value={"unpaid"}>
                    <Box
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "12px",
                        p: 0.5,
                        borderRadius: 1,
                        maxWidth: "fit-content",
                        lineHeight: 1,
                        bgcolor: "rgba(225, 107, 22, 15%)",
                        color: "review.main",
                      }}
                    >
                      Unpaid
                    </Box>
                  </MenuItem>
                </Select>
                {formik.touched.leaveType &&
                  Boolean(formik.errors.leaveType) && (
                    <FormHelperText error={true}>
                      {formik.touched.leaveType && formik.errors.leaveType}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <MobileDatePicker
                  fullWidth
                  label="Start Date"
                  name="startDate"
                  value={dayjs(formik.values.startDate || new Date())}
                  onChange={(e) => formik.setFieldValue("startDate", e)}
                  sx={{
                    minWidth: "100% !important",
                    fontSize: "14px !important",
                    "&>div": { fontSize: "14px" },
                    "&>label": { fontSize: "14px" },
                  }}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                />
                {formik.touched.startDate &&
                  Boolean(formik.errors.startDate) && (
                    <FormHelperText error={true}>
                      {formik.touched.startDate && formik.errors.startDate}
                    </FormHelperText>
                  )}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                size="normal"
                sx={{
                  textTransform: "capitalize",
                  "&>label": { fontSize: "14px" },
                }}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                >
                  Day type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="startDayType"
                  value={formik.values.startDayType}
                  onChange={(e) =>
                    formik.setFieldValue("startDayType", e.target.value)
                  }
                  label="Day type"
                  sx={{ fontSize: "14px" }}
                  error={
                    formik.touched.startDayType &&
                    Boolean(formik.errors.startDayType)
                  }
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"first half"}
                  >
                    frist half
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"second half"}
                  >
                    seconad half
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"full day"}
                  >
                    full day
                  </MenuItem>
                </Select>
                {formik.touched.startDayType &&
                  Boolean(formik.errors.startDayType) && (
                    <FormHelperText error={true}>
                      {formik.touched.startDayType &&
                        formik.errors.startDayType}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <MobileDatePicker
                  label="End Date"
                  name="endDate"
                  value={dayjs(formik.values.endDate || new Date())}
                  onChange={(e) => formik.setFieldValue("endDate", e)}
                  sx={{
                    minWidth: "100% !important",
                    "&>div": { fontSize: "14px" },
                    "&>label": { fontSize: "14px" },
                  }}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                />
                {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                  <FormHelperText error={true}>
                    {formik.touched.endDate && formik.errors.endDate}
                  </FormHelperText>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                size="normal"
                sx={{
                  textTransform: "capitalize",
                  "&>label": { fontSize: "14px" },
                }}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                >
                  Day type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="endDayType"
                  value={formik.values.endDayType}
                  onChange={(e) =>
                    formik.setFieldValue("endDayType", e.target.value)
                  }
                  label="Day type"
                  sx={{ fontSize: "14px" }}
                  error={
                    formik.touched.endDayType &&
                    Boolean(formik.errors.endDayType)
                  }
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"first half"}
                  >
                    frist half
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"second half"}
                  >
                    seconad half
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"full day"}
                  >
                    full day
                  </MenuItem>
                </Select>
                {formik.touched.endDayType &&
                  Boolean(formik.errors.endDayType) && (
                    <FormHelperText error={true}>
                      {formik.touched.endDayType && formik.errors.endDayType}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ "&>div": { fontSize: "14px" } }}>
                <OutlinedInput
                  placeholder="Leave Title"
                  name="reason"
                  onChange={formik.handleChange}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountHolderIcon />
                    </InputAdornment>
                  }
                  error={formik.touched.reason && Boolean(formik.errors.reason)}
                />
                {formik.touched.reason && Boolean(formik.errors.reason) && (
                  <FormHelperText error={true}>
                    {formik.touched.reason && formik.errors.reason}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <ThemeButton success Text="apply Leave" type="submit" />
            </Grid>
          </Grid>
        </Box>
      </ModalComponent>
    </>
  );
}

export default UserLeave;
