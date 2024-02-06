import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stack,
  FormControl,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useParams, useNavigate } from "react-router-dom";
import { APIS } from "../api/apiList.js";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import moment from "moment";
import ThemeButton from "../component/ThemeButton.jsx";
import SectionHeader from "../component/SectionHeader.jsx";
import PlusIcon from "@mui/icons-material/Close";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";
import NoData from "../component/NoData.jsx";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import ThemePagination from "../component/ThemePagination.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import ModalComponent from "../component/ModalComponent.jsx";
import AddSalaryForm from "../component/form/AddSalaryForm.jsx";
import { useSearchData } from "../hooks/store/useSearchData.js";

export default function MyProfile() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, userId, user } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [date, setDate] = useState("");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [openSalary, setOpenSalary] = useState(false);
  const [salaryList, setSalaryList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userBank, setUserBank] = useState();
  const { searchData } = useSearchData();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  const handleChange = (event) => {
    setDate(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleOpenSalary = () => {
    setOpenSalary(true);
  };

  const fetchUsers = async () => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.ALLUSER,
        method: "get",
      });
      if (res.data.success === true) {
        setUserList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchUsers();
    viewAllSalary();
  }, []);

  const viewAllSalary = async () => {
    try {
      const res = await apiCall({
        url: APIS.SALARY.ALL,
        method: "get",
        params: {
          sortField: "date",
          page: page,
          limit: rowsPerPage,
          from: from,
          to: to,
          search: searchData,
        },
      });
      if (res.data.success === true) {
        setSalaryList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    if (to && from) {
      viewAllSalary();
    }
  }, [to, from]);
  useEffect(() => {
    if (date === "lastquarter") {
      setFrom(
        moment().subtract(4, "months").startOf("month").format("YYYY-MM-DD")
      );
      setTo(moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD"));
    } else if (date === "lastmonth") {
      setFrom(
        moment().subtract(1, "months").startOf("month").format("YYYY-MM-DD")
      );
      setTo(moment().subtract(1, "months").endOf("month").format("YYYY-MM-DD"));
    } else if (date === "lastyear") {
      setFrom(
        moment().subtract(1, "years").startOf("year").format("YYYY-MM-DD")
      );
      setTo(moment().subtract(1, "years").endOf("year").format("YYYY-MM-DD"));
    }
  }, [date]);

  useEffect(() => {
    if (searchData !== undefined) {
      const getData = setTimeout(async () => {
        viewAllSalary();
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [searchData]);

  const formikSalary = useFormik({
    validationSchema: Yup.object({
      date: Yup.date().required("Date is required."),
      status: Yup.string().required("Status is required."),
      employee: Yup.string().required("Member name is required."),
      amount: Yup.number().required("Amount is required."),
      incentive: Yup.number(),
    }),
    enableReinitialize: true,
    initialValues: {
      date: dayjs().format("DD/MM/YYYY"),
      status: "",
      employee: userId,
      amount: "",
      incentive: "",
    },

    onSubmit: async (values) => {
      if (!userBank) {
        return setSnack(
          "You can't add salary because employee bank not available.",
          "warning"
        );
      }
      try {
        const res = await apiCall({
          url: APIS.SALARY.ADD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          let newSalaryUser = userList.filter(
            (user) => user._id.toString() === res.data.data.employee.toString()
          );
          res.data.data.employee = newSalaryUser[0].name;
          setSalaryList([res.data.data, ...salaryList]);
          setOpenSalary(false);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  const viewUserBank = async (userId) => {
    try {
      const res = await apiCall({
        url: APIS.BANK.USERBANK(userId),
        method: "get",
      });
      if (res.data.success === true) {
        setUserBank(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    if (formikSalary.values.employee) {
      viewUserBank(formikSalary.values.employee);
    }
  }, [formikSalary.values.employee]);

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
          <SectionHeader
            Title={"Salary"}
            BreadCrumbPreviousLink="/"
            BreadCrumbPreviousTitle="Dashboard"
            BreadCrumbCurrentTitle="Salary"
          />

          <Box sx={{ bgcolor: "white", borderRadius: 4, mt: 3, pt: 2, pb: 3 }}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                px: 2,
                mb: 3,
                pb: 2,
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
                Salary Details
              </Typography>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Box
                  component="form"
                  noValidate
                  autoComplete="off"
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "end",
                    gap: 2.5,
                    "& fieldset": { borderRadius: "6px" },
                    minWidth: "140px",
                  }}
                >
                  <FormControl
                    size="small"
                    sx={{
                      "&>label": { fontSize: "14px" },
                      flexGrow: 1,
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="date-wise-select-label"
                    >
                      Date
                    </InputLabel>
                    <Select
                      labelId="date-wise-select-label"
                      id="demo-simple-select"
                      value={date}
                      label="Date"
                      onChange={handleChange}
                      sx={{
                        fontSize: "14px",
                        "&": {
                          bgcolor: "white",
                        },
                      }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize", fontSize: "14px" }}
                        value={"lastmonth"}
                      >
                        Last Month
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize", fontSize: "14px" }}
                        value={"lastquarter"}
                      >
                        Last Quarter
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize", fontSize: "14px" }}
                        value={"lastyear"}
                      >
                        Last Year
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                {/* Todos : This button visable only admin */}
                {user.role === 0 && (
                  <ThemeButton
                    transparent
                    smallRounded
                    Text="Add Salary"
                    startIcon={
                      <PlusIcon
                        sx={{
                          fontSize: "16px!important",
                          transform: "rotate(45deg)",
                        }}
                      />
                    }
                    onClick={handleOpenSalary}
                  />
                )}
              </Stack>
            </Stack>
            <Box sx={{ px: 3 }}>
              {isLoading ? (
                <LoadingIcon style={{ height: "50vh" }} />
              ) : salaryList.length === 0 ? (
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
                          <TableCell>Date</TableCell>
                          <TableCell>Member Name</TableCell>
                          <TableCell>Salary Amount</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Incentive</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {salaryList.map((salary) => (
                          <TableRow
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
                              {moment(salary.date).format("DD/MM/YYYY")}
                            </TableCell>
                            <TableCell>{salary.employee}</TableCell>
                            <TableCell>
                              <Box
                                sx={{
                                  color: "white",
                                  fontSize: "12px",
                                  p: 0.5,
                                  borderRadius: 1,
                                  maxWidth: "fit-content",
                                  lineHeight: 1,
                                  bgcolor:
                                    salary.status === "paid"
                                      ? "success.main"
                                      : "review.main",
                                }}
                              >
                                {salary.status}
                              </Box>
                            </TableCell>
                            <TableCell>₹{salary.amount}</TableCell>
                            <TableCell>₹{salary.incentive || 0}</TableCell>
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
                                    fontSize: { xs: "20px", sm: "21px" },
                                  },
                                }}
                              >
                                <a href={salary.pdf} target="_blank">
                                  <VisibilityIcon />
                                </a>
                              </Box>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <ThemePagination
                    totalpage={totalPage}
                    onChange={handlePageChange}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <ModalComponent
        open={openSalary}
        setOpen={setOpenSalary}
        modalTitle="Add Salary"
      >
        <AddSalaryForm formikSalary={formikSalary} userList={userList} />
      </ModalComponent>
    </>
  );
}
