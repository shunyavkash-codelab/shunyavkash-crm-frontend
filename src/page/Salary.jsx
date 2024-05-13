import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableContainer,
  Paper,
  Stack,
  FormControl,
  TextField,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import { APIS } from "../api/apiList.js";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import moment from "moment";
import ThemeButton from "../component/ThemeButton.jsx";
import SectionHeader from "../component/SectionHeader.jsx";
import PlusIcon from "@mui/icons-material/Close";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";
import NoData from "../component/NoData.jsx";
import ThemePagination from "../component/ThemePagination.jsx";
import { useFormik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import ModalComponent from "../component/ModalComponent.jsx";
import AddSalaryForm from "../component/form/AddSalaryForm.jsx";
import { useSearchData } from "../hooks/store/useSearchData.js";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import CustomTableHeader from "../component/table/CustomTableHeader.jsx";
import CustomTableBody from "../component/table/CustomTableBody.jsx";

export default function MyProfile() {
  const { userId, user } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [date, setDate] = useState("all");
  const [params] = useSearchParams();
  const page = +params.get("page") || 1;
  const limit = +params.get("limit") || 10;
  const [totalPage, setTotalPage] = useState(1);
  const [openSalary, setOpenSalary] = useState(false);
  const [selectSalary, setSelectSalary] = useState(false);
  const [employeeId, setEmployeeId] = useState(false);
  const [salaryList, setSalaryList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [userBank, setUserBank] = useState();
  const { searchData, setSearchData } = useSearchData();
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [sortField, setSortField] = useState();
  const [orderBy, setOrderBy] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = () => {
    params.set("page", 1);
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const handleChange = (event) => {
    setDate(event.target.value);
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
        setOpenDelete(false);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const viewAllSalary = useCallback(
    async (search) => {
      try {
        const res = await apiCall({
          url: APIS.SALARY.ALL,
          method: "get",
          params: {
            sortField: sortField || "date",
            orderBy: orderBy,
            page: page,
            limit: limit,
            from: from,
            to: to,
            search: search,
          },
        });
        if (res.data.success === true) {
          setSalaryList(res.data.data.data);
          setTotalPage(res.data.data.pagination.pages);
        }
      } catch (error) {
        console.log(error, setSnack);
      }
    },
    [apiCall, from, limit, orderBy, page, setSnack, sortField, to]
  );

  useEffect(() => {
    setSearchData("");
  }, []);

  useEffect(() => {
    if (searchData) {
      const getData = setTimeout(async () => {
        page !== 1 ? handlePageChange() : viewAllSalary(searchData);
      }, 1000);
      return () => {
        clearTimeout(getData);
      };
    } else {
      viewAllSalary();
    }
  }, [searchData, viewAllSalary]);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    let fromValue, toValue;
    if (date === "CustomRange") {
      fromValue = moment()
        .subtract(1, "days")
        .endOf("day")
        .format("YYYY-MM-DD");
      toValue = moment().format("YYYY-MM-DD");
    } else if (date === "lastquarter") {
      fromValue = moment()
        .subtract(4, "months")
        .startOf("month")
        .format("YYYY-MM-DD");
      toValue = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD");
    } else if (date === "lastmonth") {
      fromValue = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD");
      toValue = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD");
    } else if (date === "lastyear") {
      fromValue = moment()
        .subtract(1, "years")
        .startOf("year")
        .format("YYYY-MM-DD");

      toValue = moment()
        .subtract(1, "years")
        .endOf("year")
        .format("YYYY-MM-DD");
    } else if (date === "all") {
      handlePageChange();
    }
    setFrom(fromValue);
    setTo(toValue);
  }, [date]);

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

  const TABLE_HEADINGS = [
    {
      id: "date",
      label: "Date",
      sortable: true,
    },
    { id: "employee", label: "Member Name", sortable: true },
    {
      id: "status",
      label: "Status",
      sortable: true,
    },
    {
      id: "amount",
      label: "Salary Amount",
      sortable: true,
    },
    {
      id: "incentive",
      label: "Incentive",
      sortable: false,
    },
    {
      id: "actions",
      label: "Actions",
      sortable: false,
      textAlign: "center",
    },
  ];

  const TABLE_BODY = salaryList.map((salary) => ({
    key: salary._id,
    row: [
      { type: "date", value: salary.date },
      { type: "box", value: salary.employee },
      {
        type: "box",
        value: salary.status,
        textSX: {
          color: "white",
          fontSize: "12px",
          p: 0.5,
          borderRadius: 1,
          maxWidth: "fit-content",
          lineHeight: 1,
          bgcolor: salary.status === "paid" ? "success.main" : "review.main",
        },
      },
      { type: "box", value: "₹" + salary.amount.toLocaleString() },
      { type: "box", value: "₹" + (salary.incentive?.toLocaleString() || 0) },
      user.role === 0 && {
        type: "edit",
        value: salary.type,
        onEdit: () => {
          handleOpenSalary(salary);
          // setOpenSalary(true);
          // setSelectSalary(salary);
        },
        onOpen: () => {
          navigate(salary.pdf);
        },
        deleteIcon: true,
        onDelete: () => {
          setOpenDelete(true);
          setSelectSalary(salary._id);
        },
      },
    ],
  }));

  return (
    <>
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
            stackSx={{ mb: 0 }}
          />
          {/* Todos : This button visable only admin */}
          {user.role === 0 && (
            <ThemeButton
              Text="Add Salary"
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
                <CustomTableBody records={TABLE_BODY} />
                <ModalComponent
                  open={openDelete}
                  setOpen={setOpenDelete}
                  modelStyle={{ maxWidth: "400px" }}
                >
                  <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                    {"Are you sure delete this salary?"}
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
                        onClick={() => deleteSalary(selectSalary)}
                      />
                      <ThemeButton
                        discard
                        Text="No"
                        onClick={() => setOpenDelete(false)}
                      />
                    </Box>
                  </Box>
                </ModalComponent>
              </Table>
            </TableContainer>
          </>
        )}
        {/* pagination */}
        {salaryList.length > 0 && (
          <ThemePagination totalPage={totalPage} count={salaryList.length} />
        )}
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
