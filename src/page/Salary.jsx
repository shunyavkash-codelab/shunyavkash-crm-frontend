import React, { useEffect, useState } from "react";
import {
  Box,
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
  Button,
  TextField,
  TableSortLabel,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
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
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";

export default function MyProfile() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, userId, user } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [date, setDate] = useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [openSalary, setOpenSalary] = useState(false);
  const [selectSalary, setSelectSalary] = useState(false);
  const [employeeId, setEmployeeId] = useState(false);
  const [salaryList, setSalaryList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userBank, setUserBank] = useState();
  const { searchData } = useSearchData();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [sortField, setSortField] = useState();
  const [orderBy, setOrderBy] = useState();

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

  const handleOpenSalary = (salary) => {
    setOpenSalary(true);
    if (salary) setSelectSalary(salary);
  };

  const fetchUsers = async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.ALLUSER,
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

  useEffect(() => {
    if (selectSalary.employee) {
      let employeeName = userList.find(
        (user) => user.name === selectSalary.employee
      );
      setEmployeeId(employeeName._id);
    }
  }, [selectSalary]);

  const deleteSalary = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.SALARY.DELETE(id),
        method: "delete",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        viewAllSalary();
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const viewAllSalary = async () => {
    try {
      const res = await apiCall({
        url: APIS.SALARY.ALL,
        method: "get",
        params: {
          sortField: sortField || "date",
          orderBy: orderBy,
          page: page,
          limit: rowsPerPage,
          from: date === "all" ? undefined : from,
          to: date === "all" ? undefined : to,
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
    } else {
      viewAllSalary();
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
      _id: selectSalary._id || undefined,
      date: selectSalary.date || dayjs().format("DD/MM/YYYY"),
      status: selectSalary.status || "",
      employee: employeeId || userId,
      amount: selectSalary.amount?.toString() || "",
      incentive: selectSalary.incentive?.toString() || "",
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
          if (values._id) {
            let oldSalary = salaryList.findIndex(
              (item) => item._id === values._id
            );
            salaryList[oldSalary] = res.data.data;
          } else {
            setSalaryList([res.data.data, ...salaryList]);
          }
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

  const createSortHandler = (id) => {
    setSortField(id);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    if (orderBy) {
      viewAllSalary();
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
              Title={"Salary"}
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="Salary"
            />
            {/* Todos : This button visable only admin */}
            {user.role === 0 && (
              <ThemeButton
                Text="Add Salary"
                secondary
                startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
                onClick={handleOpenSalary}
              />
            )}
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2.5,
              mb: 3.25,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                "& fieldset": { borderRadius: "6px" },
                maxWidth: "320px",
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
                  id="demo-simple-select-label"
                >
                  Date
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
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
                    value={"all"}
                  >
                    All
                  </MenuItem>
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
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"CustomRange"}
                  >
                    Custom Range
                  </MenuItem>
                </Select>
              </FormControl>
              {date === "CustomRange" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    "& > *": { maxWidth: { xs: "100%", sm: "50%" } },
                    gap: 2.5,
                    flexShrink: 0,
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="from"
                    label="From"
                    autoComplete="off"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="mm/dd/yyyy"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "&": {
                        bgcolor: "white",
                        borderRadius: 1.5,
                      },
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="to"
                    label="To"
                    autoComplete="off"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="mm/dd/yyyy"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      "&": {
                        bgcolor: "white",
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
          </Box>

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
                      sx={{ "& th": { lineHeight: 1, fontWeight: 600 } }}
                    >
                      <TableCell>
                        <TableSortLabel
                          active={sortField === "date"}
                          direction={orderBy || "asc"}
                          onClick={() => createSortHandler("date")}
                        >
                          Date
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortField === "employee"}
                          direction={orderBy || "asc"}
                          onClick={() => createSortHandler("employee")}
                        >
                          Member Name
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortField === "status"}
                          direction={orderBy || "asc"}
                          onClick={() => createSortHandler("status")}
                        >
                          Status
                        </TableSortLabel>
                      </TableCell>
                      <TableCell>
                        <TableSortLabel
                          active={sortField === "amount"}
                          direction={orderBy || "asc"}
                          onClick={() => createSortHandler("amount")}
                        >
                          Salary Amount
                        </TableSortLabel>
                      </TableCell>
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
                        <TableCell>₹{salary.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          ₹{salary.incentive?.toLocaleString() || 0}
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
                                fontSize: { xs: "20px", sm: "21px" },
                              },
                            }}
                          >
                            <a
                              href={salary.pdf}
                              target="_blank"
                              style={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <VisibilityIcon />
                            </a>
                            <Button
                              disableRipple
                              onClick={() => handleOpenSalary(salary)}
                            >
                              <CreateIcon />
                            </Button>
                            <Button
                              disableRipple
                              onClick={() => deleteSalary(salary._id)}
                            >
                              <DeleteIcon />
                            </Button>
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
          {salaryList.length > 0 && (
            <ThemePagination
              totalpage={totalPage}
              onChange={handlePageChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
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
