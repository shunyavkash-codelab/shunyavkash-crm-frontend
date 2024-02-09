import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  TableSortLabel,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import moment from "moment";
import SectionHeader from "../component/SectionHeader";
import NoData from "../component/NoData.jsx";
import { useSearchData } from "../hooks/store/useSearchData.js";
import ThemePagination from "../component/ThemePagination";
import ThemeButton from "../component/ThemeButton.jsx";
import PlusIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import * as Yup from "yup";
import ModalComponent from "../component/ModalComponent.jsx";
import AddLeaveForm from "../component/form/AddLeaveForm.jsx";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";

export default function Leaves() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [approveList, setApproveList] = useState([]);
  const { accessToken, user } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const { searchData } = useSearchData();
  const [open, setOpen] = useState(false);
  const [sortField, setSortField] = useState();
  const [orderBy, setOrderBy] = useState();

  // pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

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
      startDate: moment().format("DD/MM/YYYY"),
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
          setOpen(false);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  const approveLeaveList = async () => {
    try {
      const res = await apiCall({
        url: APIS.LEAVE.APPROVELIST,
        method: "get",
        params: {
          search: searchData,
          page: searchData ? 1 : page,
          limit: rowsPerPage,
          date: moment().format(),
          sortField: sortField,
          orderBy: orderBy,
        },
      });
      if (res.data.success === true) {
        setApproveList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    approveLeaveList();
  }, [page, rowsPerPage]);
  useEffect(() => {
    if (searchData !== undefined) {
      const getData = setTimeout(async () => {
        approveLeaveList();
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [searchData]);

  const createSortHandler = (id) => {
    setSortField(id);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    if (orderBy) {
      approveLeaveList();
    }
  }, [orderBy]);
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent={{ sm: "space-between" }}
            columnGap={2}
            rowGap={2.5}
          >
            <SectionHeader
              Title="Members Leaves"
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="Leaves"
            />
            {user.role !== 0 && (
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
                onClick={() => setOpen(true)}
              />
            )}
          </Stack>
          {isLoading ? (
            <LoadingIcon style={{ height: "50vh" }} />
          ) : approveList.length === 0 ? (
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
                    "& th,& td": { borderBottom: 0 },
                    "& tbody tr": {
                      borderTop: "1px solid rgba(224, 224, 224, 1)",
                    },
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow
                      sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}
                    >
                      <TableCell>
                        <TableSortLabel
                          active={sortField === "userName"}
                          direction={orderBy || "asc"}
                          onClick={() => createSortHandler("userName")}
                        >
                          Member
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortField === "leaveType"}
                          direction={orderBy || "asc"}
                          onClick={() => createSortHandler("leaveType")}
                        >
                          Type
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>Reason</TableCell>
                      <TableCell>Start Date</TableCell>
                      <TableCell>End Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {approveList.map((leaveRequest) => (
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
                              leaveRequest.leaveType === "casual"
                                ? "casual"
                                : leaveRequest.leaveType === "sick"
                                ? "sick"
                                : leaveRequest.leaveType === "unpaid"
                                ? "unpaid"
                                : "paid"
                            }`}
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
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
          {/* pagination */}
          {approveList.length && (
            <ThemePagination
              totalpage={totalPage}
              onChange={handleChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
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
