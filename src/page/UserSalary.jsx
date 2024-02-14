import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
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
  FormHelperText,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../component/ModalComponent.jsx";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import DetailsList from "../component/employee/DetailsList";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AccountHolderIcon from "@mui/icons-material/PermIdentityOutlined";
import BankNameIcon from "@mui/icons-material/AccountBalance";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import EditIcon from "@mui/icons-material/CreateOutlined";
import ConfirmNumber from "@mui/icons-material/ThumbUpAlt";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { APIS } from "../api/apiList.js";
import useApi from "../hooks/useApi.js";
import { useSnack } from "../hooks/store/useSnack.js";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import moment from "moment";
import ThemeButton from "../component/ThemeButton";
import PlusIcon from "@mui/icons-material/Close";
import { useAuth } from "../hooks/store/useAuth.js";
import NoData from "../component/NoData.jsx";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import ThemePagination from "../component/ThemePagination.jsx";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";
import AddSalaryForm from "../component/form/AddSalaryForm.jsx";

export default function UserSalary({ userId, userBank, setUserBank }) {
  const [openBank, setOpenBank] = useState(false);
  const [openSalary, setOpenSalary] = useState(false);
  const [salaryList, setSalaryList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const handleOpenBank = () => setOpenBank(true);
  const handleOpenSalary = () => {
    if (userBank) {
      setOpenSalary(true);
    } else {
      setSnack(
        "You can't add salary because employee bank not available.",
        "warning"
      );
    }
  };
  const [date, setDate] = useState("");
  const { user } = useAuth();
  const { id } = useParams();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  // add and edit bank
  const formikBank = useFormik({
    validationSchema: Yup.object({
      accountNumber: Yup.number().required("A/c number is required."),
      confirmAccountNumber: Yup.number()
        .required("Confirm a/c number is required.")
        .oneOf([Yup.ref("accountNumber"), null], "A/c number must match"),
      IFSC: Yup.string().required("IFSC is required.").length(11),
      // .matches(
      //   /^[a-zA-Z]{4}[0][a-zA-Z0-9]{6}$/,
      //   "First 4 characters must be alphabets, 5th is '0' and last 6 characters any alphabets or numbers."
      // ),
      bankName: Yup.string().required("Bank Name is required."),
      holderName: Yup.string().required("A/c holder name is required."),
    }),
    enableReinitialize: true,
    initialValues: {
      holderName: userBank?.holderName || "",
      bankName: userBank?.bankName || "",
      accountNumber: userBank?.accountNumber || "",
      confirmAccountNumber: userBank?.confirmAccountNumber || "",
      IFSC: userBank?.IFSC || "",
      userId: userId,
    },

    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: userBank ? APIS.BANK.EDIT(userBank._id) : APIS.BANK.ADD,
          method: userBank ? "patch" : "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          setUserBank(res.data.data);
          setOpenBank(false);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });
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
      date: dayjs().format("MM/DD/YYYY"),
      status: "",
      employee: userId,
      amount: "",
      incentive: "",
    },

    onSubmit: async (values) => {
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

  // const salaries = [
  //   {
  //     id: 1,
  //     date: "01/01/2023",
  //     memberName: "Deep Bhimani",
  //     status: "paid",
  //     amount: "₹10000",
  //     incentive: "₹6000",
  //   },
  //   {
  //     id: 2,
  //     date: "03/01/2023",
  //     memberName: "sujit hirapara",
  //     status: "unpaid",
  //     amount: "₹20000",
  //     incentive: "₹7000",
  //   },
  //   {
  //     id: 3,
  //     date: "15/01/2023",
  //     memberName: "prince suhagiya",
  //     status: "paid",
  //     amount: "₹30000",
  //     incentive: "₹8000",
  //   },
  //   {
  //     id: 4,
  //     date: "28/01/2023",
  //     memberName: "ravi chodvadiya",
  //     status: "unpaid",
  //     amount: "₹40000",
  //     incentive: "₹9000",
  //   },
  // ];

  const viewUserSalary = async (userId) => {
    try {
      const res = await apiCall({
        url: APIS.SALARY.GET(userId),
        method: "get",
        params: {
          sortField: "date",
          page: page,
          limit: rowsPerPage,
          from: from,
          to: to,
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
    viewUserSalary(id || userId);
    fetchUsers();
  }, []);

  useEffect(() => {
    if (to && from) {
      viewUserSalary(userId);
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

  return (
    <>
      {!userBank && (
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            p: 4,
          }}
        >
          <Button
            onClick={handleOpenBank}
            disableRipple
            sx={{
              display: "block",
              mx: "auto",
              color: "text.primary",
              height: "100%",
              bgcolor: "rgb(22 119 255/ 6%)",
              border: "2px dashed rgba(0,0,0,1)",
              borderRadius: 2,
              p: 3,
              transition: "all 0.3s ease-in-out",
              "&:hover": {
                bgcolor: "#f5f5f5",
                border: "2px dashed rgba(0,0,0,0.2)",
              },
            }}
          >
            <AddIcon sx={{ display: "block", mx: "auto", mb: 1 }} />
            <span style={{ display: "inline-block" }}>Add Bank Details</span>
          </Button>
        </Box>
      )}

      {userBank && (
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            mt: 3,
            pt: 2,
            pb: 3,
          }}
        >
          <Box
            sx={{
              px: 3,
              pb: 2,
              mb: 3,
              borderBottom: "1px solid rgba(0,0,0,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
              Add Bank Details
            </Typography>
            <ThemeButton
              transparent
              smallRounded
              Text="edit"
              startIcon={<EditIcon sx={{ fontSize: "16px!important" }} />}
              onClick={handleOpenBank}
            />
          </Box>
          <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
            <Grid item xs={12} md={6} xl={4}>
              <DetailsList
                Title={"Bank Name"}
                Text={userBank.bankName}
                Icon={<BankNameIcon />}
                TextStyle={{ textTransform: "capitalize" }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <DetailsList
                Title={"A/c Holder Name"}
                Text={userBank.holderName}
                Icon={<AccountHolderIcon />}
                TextStyle={{ textTransform: "capitalize" }}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <DetailsList
                Title={"A/c Number"}
                Text={userBank.accountNumber}
                Icon={<EmailOutlinedIcon />}
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <DetailsList
                Title={"IFSC"}
                Text={userBank.IFSC}
                Icon={<AccountHolderIcon />}
                TextStyle={{ textTransform: "uppercase" }}
              />
            </Grid>
          </Grid>
        </Box>
      )}

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
        <Box sx={{ px: 0 }}>
          {isLoading ? (
            <LoadingIcon style={{ height: "50vh" }} />
          ) : salaryList.length === 0 ? (
            <Box p={2.5}>
              <NoData />
            </Box>
          ) : (
            <>
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
                              "& button, & a": {
                                p: 0,
                                opacity: 0.5,
                                minWidth: "auto",
                                color: "black",
                                transition: "all 0.5s",
                                "&:hover": {
                                  // color: "primary.main",
                                  opacity: 1,
                                },
                              },
                              "& svg": { fontSize: { xs: "20px", sm: "21px" } },
                            }}
                          >
                            <a href={salary.pdf} target="_blank">
                              <VisibilityIcon
                                sx={{ color: "secondary.main" }}
                              />
                            </a>
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
        open={openBank}
        setOpen={setOpenBank}
        modalTitle={userBank ? "Edit Bank Details" : "Add Bank Details"}
      >
        <Box component="form" onSubmit={formikBank.handleSubmit}>
          <Grid container spacing={2.5}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <OutlinedInput
                  name="bankName"
                  placeholder="Bank Name"
                  sx={{ fontSize: 14 }}
                  onChange={formikBank.handleChange}
                  value={formikBank.values.bankName}
                  startAdornment={
                    <InputAdornment position="start">
                      <BankNameIcon />
                    </InputAdornment>
                  }
                  error={
                    formikBank.touched.bankName &&
                    Boolean(formikBank.errors.bankName)
                  }
                />
                {formikBank.touched.bankName &&
                  Boolean(formikBank.errors.bankName) && (
                    <FormHelperText error={true}>
                      {formikBank.touched.bankName &&
                        formikBank.errors.bankName}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <OutlinedInput
                  name="holderName"
                  placeholder="A/c Holder Name"
                  sx={{ fontSize: 14 }}
                  onChange={formikBank.handleChange}
                  value={formikBank.values.holderName}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountHolderIcon />
                    </InputAdornment>
                  }
                  error={
                    formikBank.touched.holderName &&
                    Boolean(formikBank.errors.holderName)
                  }
                />
                {formikBank.touched.holderName &&
                  Boolean(formikBank.errors.holderName) && (
                    <FormHelperText error={true}>
                      {formikBank.touched.holderName &&
                        formikBank.errors.holderName}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <OutlinedInput
                  name="accountNumber"
                  inputProps={{ maxLength: 14 }}
                  placeholder="A/c Number"
                  type="text"
                  sx={{ fontSize: 14 }}
                  onChange={formikBank.handleChange}
                  value={formikBank.values.accountNumber}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonPinIcon />
                    </InputAdornment>
                  }
                  error={
                    formikBank.touched.accountNumber &&
                    Boolean(formikBank.errors.accountNumber)
                  }
                />
                {formikBank.touched.accountNumber &&
                  Boolean(formikBank.errors.accountNumber) && (
                    <FormHelperText error={true}>
                      {formikBank.touched.accountNumber &&
                        formikBank.errors.accountNumber}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12} lg={6}>
              <FormControl fullWidth>
                <OutlinedInput
                  name="confirmAccountNumber"
                  inputProps={{ maxLength: 14 }}
                  placeholder="Confirm A/c Number"
                  type="text"
                  sx={{ fontSize: 14 }}
                  onChange={formikBank.handleChange}
                  value={formikBank.values.confirmAccountNumber}
                  startAdornment={
                    <InputAdornment position="start">
                      <ConfirmNumber />
                    </InputAdornment>
                  }
                  error={
                    formikBank.touched.confirmAccountNumber &&
                    Boolean(formikBank.errors.confirmAccountNumber)
                  }
                />
                {formikBank.touched.confirmAccountNumber &&
                  Boolean(formikBank.errors.confirmAccountNumber) && (
                    <FormHelperText error={true}>
                      {formikBank.touched.confirmAccountNumber &&
                        formikBank.errors.confirmAccountNumber}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <OutlinedInput
                  name="IFSC"
                  inputProps={{ maxLength: 11 }}
                  placeholder="IFSC"
                  sx={{
                    fontSize: 14,
                    "& input": {
                      textTransform: "uppercase",
                    },
                  }}
                  onChange={formikBank.handleChange}
                  value={formikBank.values.IFSC}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountBoxOutlinedIcon />
                    </InputAdornment>
                  }
                  error={
                    formikBank.touched.IFSC && Boolean(formikBank.errors.IFSC)
                  }
                />
                {formikBank.touched.IFSC && Boolean(formikBank.errors.IFSC) && (
                  <FormHelperText error={true}>
                    {formikBank.touched.IFSC && formikBank.errors.IFSC}
                  </FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <ThemeButton success Text="add bank" type="submit" />
            </Grid>
          </Grid>
        </Box>
      </ModalComponent>

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
