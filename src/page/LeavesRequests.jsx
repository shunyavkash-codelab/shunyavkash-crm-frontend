import React, { useCallback, useEffect, useState } from "react";
import { useAuth } from "../hooks/store/useAuth";
import ModalComponent from "../component/ModalComponent";
import {
  Box,
  Button,
  ButtonGroup,
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
import SectionHeader from "../component/SectionHeader";
import NoData from "../component/NoData";
import { useSearchData } from "../hooks/store/useSearchData.js";
import CounterCards from "../component/CounterCards.jsx";
import ThemePagination from "../component/ThemePagination";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomTableHeader from "../component/table/CustomTableHeader.jsx";

export default function LeavesRequests() {
  const [leaveId, setLeaveId] = useState(false);
  const { user } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const [allLeaveList, setAllLeaveList] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [selectedDescription, setSelectedDescription] = useState();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [params] = useSearchParams();
  const page = +params.get("page") || 1;
  const limit = +params.get("limit") || 10;
  const [totalPage, setTotalPage] = useState(1);
  const { searchData, setSearchData } = useSearchData();
  const [sortField, setSortField] = useState();
  const [orderBy, setOrderBy] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectLeaveReq, setSelectLeaveReq] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = () => {
    params.set("page", 1);
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const formik = useFormik({
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required."),
      status: Yup.string().required("Status is required."),
    }),
    enableReinitialize: true,
    initialValues: {
      description: selectedDescription || "",
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
  const deleteLeave = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.LEAVE.DELETE(id),
        method: "delete",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        leaveList();
        setOpenDelete(false);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  const leaveList = useCallback(
    async (search) => {
      try {
        const res = await apiCall({
          url: APIS.LEAVE.ALL,
          method: "get",
          params: {
            search: search,
            page: page,
            limit: limit,
            sortField: sortField,
            orderBy: orderBy,
          },
        });
        if (res.data.success === true) {
          setAllLeaveList(res.data.data.data);
          setTotalPage(res.data.data.pagination.pages);
        }
      } catch (error) {
        console.log(error, setSnack);
      }
    },
    [apiCall, limit, orderBy, page, setSnack, sortField]
  );

  useEffect(() => {
    setSearchData("");
  }, []);

  useEffect(() => {
    if (searchData) {
      const getData = setTimeout(async () => {
        page !== 1 ? handlePageChange() : leaveList(searchData);
      }, 1000);
      return () => {
        clearTimeout(getData);
      };
    } else {
      leaveList();
    }
  }, [leaveList, searchData]);

  useEffect(() => {
    leaveDashboard();
  }, []);

  const createSortHandler = (id) => {
    setSortField(id);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const TABLE_HEADINGS = [
    {
      id: "userName",
      label: "Member",
      sortable: false,
    },
    { id: "leaveType", label: "Type", sortable: true },
    { id: "reason", label: "Reason", sortable: false },
    {
      id: "createdAt",
      label: "Apply Date",
      sortable: true,
    },
    {
      id: "startDate",
      label: "Start Date",
      sortable: true,
    },
    {
      id: "endDate",
      label: "End Date",
      sortable: false,
    },
    {
      id: "status",
      label: "Status",
      sortable: true,
    },
    user.role === 0 && {
      id: "actions",
      label: "Actions",
      sortable: false,
      textAlign: "center",
    },
  ];

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Leaves Requests"
          BreadCrumbPreviousLink="/"
          BreadCrumbPreviousTitle="Dashboard"
          BreadCrumbCurrentTitle="Leaves Requests"
          stackSx={{ mb: 0 }}
        />

        <Grid container spacing={2.5}>
          <Grid item xs={6} md={3} lg={2.4}>
            <CounterCards
              Title="Total Requests"
              Counter={dashboard.total || 0}
            />
          </Grid>
          <Grid item xs={6} md={3} lg={2.4}>
            <CounterCards
              Title="Casual Leaves"
              Counter={dashboard.casual || 0}
            />
          </Grid>
          <Grid item xs={6} md={3} lg={2.4}>
            <CounterCards Title="Sick Leaves" Counter={dashboard.sick || 0} />
          </Grid>
          <Grid item xs={6} md={3} lg={2.4}>
            <CounterCards
              Title="Unpaid Leaves"
              Counter={dashboard.unpaid || 0}
            />
          </Grid>
          <Grid item xs={6} md={3} lg={2.4}>
            <CounterCards Title="Paid Leaves" Counter={dashboard.paid || 0} />
          </Grid>
        </Grid>

        <Typography
          sx={{ textTransform: "capitalize", fontWeight: 600, mt: 4, mb: 2 }}
        >
          Members Leave Requests
        </Typography>

        {isLoading ? (
          <LoadingIcon style={{ height: "50vh" }} />
        ) : allLeaveList.length === 0 ? (
          <NoData />
        ) : (
          <>
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
                <CustomTableHeader
                  createSortHandler={createSortHandler}
                  headings={TABLE_HEADINGS}
                  orderBy={orderBy}
                  sortField={sortField}
                />
                <TableBody>
                  {allLeaveList.map((leaveRequest) => (
                    <TableRow
                      key={leaveRequest._id}
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
                            color: "rgba(248, 174, 0, 100%)",
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
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.75,
                          }}
                        >
                          {moment(leaveRequest.createdAt).format("DD/MM/YYYY")}
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
                            {moment(leaveRequest.startDate).format(
                              "DD/MM/YYYY"
                            )}
                            <Typography
                              sx={{
                                marginTop: "3px",
                                lineHeight: 1,
                                textAlign: "center",
                                fontSize: "12px",
                                color: "darkgray",
                              }}
                            >
                              ({leaveRequest.startDayType})
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.75,
                            marginLeft: !leaveRequest?.endDate && "32px",
                          }}
                        >
                          {leaveRequest.endDate ? (
                            <Box>
                              {moment(leaveRequest.endDate).format(
                                "DD/MM/YYYY"
                              )}
                              <Typography
                                sx={{
                                  marginTop: "3px",
                                  lineHeight: 1,
                                  textAlign: "center",
                                  fontSize: "12px",
                                  color: "darkgray",
                                }}
                              >
                                ({leaveRequest.endDayType})
                              </Typography>
                            </Box>
                          ) : (
                            "-"
                          )}
                        </Box>
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
                                setSelectedDescription(
                                  leaveRequest?.description
                                );
                              }}
                              direction="row"
                              alignItems="center"
                              spacing={0.75}
                              className="statusBtn"
                              sx={{
                                cursor: "pointer",
                                bgcolor: "rgba(74, 210, 146, 15%)",
                                color: "success.main",
                                pointerEvents:
                                  leaveRequest.userRole === 1 && user.role === 1
                                    ? "none"
                                    : "painted",
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
                                setSelectedDescription(
                                  leaveRequest?.description
                                );
                              }}
                              direction="row"
                              alignItems="center"
                              spacing={0.75}
                              className="statusBtn"
                              sx={{
                                cursor: "pointer",
                                bgcolor: "rgba(225, 107, 22, 15%)",
                                color: "review.main",
                                pointerEvents:
                                  leaveRequest.userRole === 1 && user.role === 1
                                    ? "none"
                                    : "painted",
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
                      {user.role === 0 && (
                        <TableCell>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={1.5}
                            sx={{
                              "& button": {
                                p: 0,
                                minWidth: "auto",
                                color: "error.main",
                                transition: "all 0.5s",
                              },
                              "& svg": {
                                fontSize: { xs: "20px", sm: "21px" },
                              },
                            }}
                          >
                            <Button
                              disableRipple
                              onClick={() => {
                                setOpenDelete(true);
                                setSelectLeaveReq(leaveRequest._id);
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Stack>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
                  <ModalComponent
                    open={openDelete}
                    setOpen={setOpenDelete}
                    modelStyle={{ maxWidth: "450px" }}
                  >
                    <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                      {"Are you sure delete this leave request?"}
                      <Box
                        sx={{
                          display: "flex",
                          gap: 2,
                          mt: 2.5,
                          justifyContent: "center",
                        }}
                      >
                        <ThemeButton
                          success
                          Text="Yes"
                          type="submit"
                          onClick={() => deleteLeave(selectLeaveReq)}
                        />
                        <ThemeButton
                          discard
                          Text="No"
                          onClick={() => setOpenDelete(false)}
                        />
                      </Box>
                    </Box>
                  </ModalComponent>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {/* pagination */}
        {allLeaveList.length > 0 && (
          <ThemePagination totalPage={totalPage} count={allLeaveList.length} />
        )}

        <ModalComponent
          open={open}
          setOpen={setOpen}
          modalTitle="Give Reason"
          sx={{ padding: "6px" }}
        >
          <Box component="form" onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              multiline
              rows={4}
              size="normal"
              name="description"
              placeholder="Description"
              autoComplete="off"
              onChange={formik.handleChange}
              value={formik.values.description}
              sx={{
                "&>label,& input,&>div": { fontSize: "14px" },
              }}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />
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
    </>
  );
}
