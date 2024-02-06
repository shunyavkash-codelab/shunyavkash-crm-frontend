import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../component/SideBar";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
import SectionHeader from "../component/SectionHeader";
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
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from "@mui/material";
import ModalComponent from "../component/ModalComponent";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
// import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CashIcon from "@mui/icons-material/Payments";
import BankIcon from "@mui/icons-material/AccountBalance";
import DetailsList from "../component/employee/DetailsList";
import DateIcon from "@mui/icons-material/DateRangeOutlined";
import InvoiceOwnerIcon from "@mui/icons-material/PermIdentityOutlined";
import TitleIcon from "@mui/icons-material/Grid3x3";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBoxOutlined";
import CollaboratorIcon from "@mui/icons-material/PeopleOutlineOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import InvoiceTypeIcon from "@mui/icons-material/ReceiptOutlined";
import PlusIcon from "@mui/icons-material/Close";
import ThemeButton from "../component/ThemeButton";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import moment from "moment";
import InvoiceImageIcon from "@mui/icons-material/DescriptionOutlined";
import NoData from "../component/NoData";
import { useSearchData } from "../hooks/store/useSearchData.js";
import CounterCards from "../component/CounterCards.jsx";
import ThemePagination from "../component/ThemePagination";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";

function AccountManage() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [dashboard, setDashboard] = useState();
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [selectedTransaction, setSelectedTransaction] = useState();
  const { searchData } = useSearchData();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [date, setDate] = useState("");
  const [filter, setFilter] = useState("all");
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  // pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };
  const viewAllTransaction = async () => {
    try {
      const res = await apiCall({
        url: APIS.ACCOUNTMANAGE.LIST,
        method: "get",
        params: {
          sortField: "date",
          search: searchData,
          page: searchData ? 1 : page,
          limit: rowsPerPage,
          from: from,
          to: to,
          filter: filter === "all" ? undefined : filter,
        },
      });
      if (res.data.success === true) {
        setTransactionList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
        let total = 0,
          totalExp = 0,
          totalInc = 0;
        for (var trans of res.data.data.data) {
          if (trans.type === "expense") {
            total = total - trans.amount;
            totalExp = totalExp - trans.amount;
          } else {
            total = total + trans.amount;
            totalInc = totalInc + trans.amount;
          }
        }
        setTotalExpense(totalExp);
        setTotalIncome(totalInc);
        setTotalAmount(total);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  const transactionDashboard = async () => {
    try {
      const res = await apiCall({
        url: APIS.ACCOUNTMANAGE.DASHBOARD,
        method: "get",
      });
      if (res.data.success === true) {
        setDashboard(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    transactionDashboard();
    viewAllTransaction();
  }, [page, rowsPerPage]);
  useEffect(() => {
    if (searchData !== undefined) {
      const getData = setTimeout(async () => {
        viewAllTransaction();
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [searchData]);
  useEffect(() => {
    if ((to && from) || filter) {
      viewAllTransaction();
    }
  }, [to, from, filter]);
  useEffect(() => {
    if (date === "CustomRange") {
      setFrom(moment().subtract(1, "days").endOf("day").format("YYYY-MM-DD"));
      setTo(moment().format("YYYY-MM-DD"));
    } else if (date === "lastweek") {
      setFrom(
        moment().subtract(1, "weeks").startOf("week").format("YYYY-MM-DD")
      );
      setTo(moment().subtract(1, "weeks").endOf("week").format("YYYY-MM-DD"));
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
  let acFormattedDate;
  if (selectedTransaction?.date) {
    let originalDate = moment(selectedTransaction?.date);
    acFormattedDate = originalDate.format("DD/MM/YYYY");
  }

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
            sx={{
              mb: 3.25,
            }}
          >
            <SectionHeader
              Title="A/c Management"
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="Account"
              style={{ mb: 0 }}
            />
            <Link
              to="./add"
              style={{ display: "inline-flex", textDecoration: "none" }}
            >
              <ThemeButton
                Text="Add Entry"
                startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
              />
            </Link>
          </Stack>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                Title="Total Sales"
                Counter={`₹${dashboard?.totalSales || 0}`}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                Title="Total Income"
                Counter={`₹${dashboard?.totalIncome || 0}`}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                Title="Total Expense"
                Counter={`₹${Math.abs(dashboard?.totalExpense) || 0}`}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                Title="Total Balance"
                Counter={`₹${
                  dashboard?.totalIncome - dashboard?.totalExpense || 0
                }`}
                counterStyle={{
                  color:
                    dashboard?.totalIncome - dashboard?.totalExpense > 0
                      ? "success.main"
                      : "review.main",
                }}
              />
            </Grid>
          </Grid>
          <Box
            sx={{
              marginTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
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
                  onChange={handleDateChange}
                  className="selectInput"
                  style={{ height: "auto" }}
                  sx={{
                    fontSize: "14px",
                    "&": {
                      bgcolor: "white",
                    },
                  }}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"lastweek"}
                  >
                    Last Week
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"lastmonth"}
                  >
                    Last Month
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
            <Box
              noValidate
              autoComplete="off"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                "& fieldset": { borderRadius: "6px" },
                maxWidth: "200px",
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
                  Filter
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={filter}
                  label="Filter"
                  onChange={handleFilterChange}
                  className="selectInput"
                  style={{ height: "auto" }}
                  sx={{
                    fontSize: "14px",
                    "&": {
                      bgcolor: "white",
                    },
                  }}
                  defaultValue={"all"}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"all"}
                  >
                    All
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"income"}
                  >
                    Income
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"expense"}
                  >
                    Expense
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>

          <Box sx={{ mt: 4 }}>
            {isLoading ? (
              <LoadingIcon style={{ height: "50vh" }} />
            ) : transactionList.length === 0 ? (
              <NoData />
            ) : (
              <>
                <TableContainer
                  component={Paper}
                  sx={{
                    mx: { xs: "-10px", sm: 0 },
                    width: { xs: "auto", sm: "auto" },
                    borderRadius: 2.5,
                  }}
                >
                  <Table
                    className="projectTable"
                    sx={{
                      textTransform: "capitalize",
                      textWrap: "nowrap",
                      "& th,& td": {
                        border: 0,
                        padding: "14px",
                        borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        "&:not(:last-child)": {
                          // borderBottom: "1px solid rgba(224, 224, 224, 1)",
                        },
                      },
                      "& tbody tr,& tfoot tr": {
                        borderRight: "1px solid rgba(224, 224, 224, 1)",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow
                        sx={{
                          "& th": {
                            lineHeight: 1,
                            fontWeight: 700,
                            padding: "14px",
                          },
                        }}
                      >
                        <TableCell sx={{ width: "110px" }}>Date</TableCell>
                        <TableCell sx={{ width: "184px" }}>Title</TableCell>
                        <TableCell sx={{ width: "370px" }}>
                          Description
                        </TableCell>
                        <TableCell sx={{ width: "154px" }}>method</TableCell>
                        <TableCell sx={{ width: "120px" }}>
                          Invoice Type
                        </TableCell>
                        <TableCell sx={{ width: "120px" }}>
                          Invoice Owner
                        </TableCell>
                        <TableCell sx={{ width: "120px" }}>
                          Collaborator
                        </TableCell>
                        <TableCell sx={{ width: "120px" }}>
                          Expense Type
                        </TableCell>
                        {filter !== "expense" && (
                          <TableCell
                            sx={{ width: "140px", textAlign: "center" }}
                          >
                            Income (₹)
                          </TableCell>
                        )}
                        {filter !== "income" && (
                          <TableCell
                            sx={{ width: "140px", textAlign: "center" }}
                          >
                            Expense (₹)
                          </TableCell>
                        )}

                        <TableCell sx={{ width: "100px", textAlign: "center" }}>
                          actions
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactionList.map((account) => (
                        <TableRow
                          key={account.key}
                          sx={{
                            "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                          }}
                        >
                          <TableCell>
                            {moment(account.date).format("DD/MM/YYYY")}
                          </TableCell>

                          <TableCell>
                            <Box
                              className="truncate line-clamp-1"
                              sx={{ textWrap: "wrap" }}
                            >
                              {account.title}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box
                              className="truncate line-clamp-2"
                              sx={{ textWrap: "wrap" }}
                            >
                              {account.description}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={1}
                            >
                              <Box
                                sx={{
                                  display: "inline-flex",
                                  "& span": { opacity: "0.5" },
                                }}
                              >
                                {account.paymentMethod === "cash" ? (
                                  <CashIcon sx={{ color: "#43991e" }} />
                                ) : account.paymentMethod === "bankTransfer" ? (
                                  <BankIcon sx={{ color: "#3a85ff" }} />
                                ) : (
                                  <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    sx={{
                                      height: "24px",
                                      width: "24px",
                                    }}
                                  >
                                    <img
                                      src="/images/upi.svg"
                                      style={{
                                        width: "100%",
                                        height: "100%",
                                      }}
                                      alt="upi"
                                    />
                                  </Stack>
                                )}
                              </Box>
                              <span style={{ display: "inline-block" }}>
                                {account.paymentMethod}
                              </span>
                            </Stack>
                          </TableCell>
                          <TableCell>
                            <Box
                              className="truncate line-clamp-2"
                              sx={{ textWrap: "wrap" }}
                            >
                              {account.invoiceType}
                            </Box>
                          </TableCell>
                          <TableCell>{account.invoiceOwner}</TableCell>
                          <TableCell>
                            {account.collaborator ? account.collaborator : "-"}
                          </TableCell>
                          <TableCell>
                            {account.expenseType ? account.expenseType : "-"}
                          </TableCell>
                          {filter !== "expense" && (
                            <TableCell
                              sx={{
                                textAlign: "center",
                                color: "success.main",
                              }}
                            >
                              {account.type === "income"
                                ? "$" + account.amount
                                : "-"}
                            </TableCell>
                          )}
                          {filter !== "income" && (
                            <TableCell
                              sx={{
                                textAlign: "center",
                                color: "review.main",
                              }}
                            >
                              {account.type === "expense"
                                ? "$" + account.amount
                                : "-"}
                            </TableCell>
                          )}
                          <TableCell>
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              spacing={1.5}
                              sx={{
                                "& button": {
                                  opacity: 0.5,
                                  p: 0,
                                  minWidth: "auto",
                                  color: "text.primary",
                                  "&:hover": { color: "primary.main" },
                                },
                                "& svg": {
                                  fontSize: { xs: "20px", sm: "21px" },
                                },
                              }}
                            >
                              <Button
                                disableRipple
                                onClick={() => {
                                  handleOpen();
                                  setSelectedTransaction(account);
                                }}
                              >
                                <VisibilityIcon />
                              </Button>
                              <Link to={`./edit/${account._id}`}>
                                <Button disableRipple>
                                  <CreateIcon />
                                </Button>
                              </Link>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    <TableFooter>
                      <TableRow
                        sx={{
                          "&>td": {
                            fontWeight: 700,
                            fontSize: "16px",
                          },
                        }}
                      >
                        <TableCell colSpan={7}></TableCell>
                        <TableCell sx={{ color: "text.primary" }}>
                          Total Balance:
                        </TableCell>
                        <TableCell
                          sx={{
                            color:
                              totalAmount < 0 ? "review.main" : "success.main",
                            textAlign: "center",
                          }}
                        >
                          ${Math.abs(totalAmount)}
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableFooter>
                    <TableFooter>
                      <TableRow
                        sx={{
                          "&>td": {
                            fontWeight: 700,
                            fontSize: "16px",
                          },
                        }}
                      >
                        <TableCell colSpan={7}></TableCell>
                        <TableCell sx={{ color: "text.primary" }}>
                          Total:
                        </TableCell>
                        {filter !== "expense" && (
                          <TableCell
                            sx={{
                              color: "success.main",
                              textAlign: "center",
                            }}
                          >
                            ${Math.abs(totalIncome)}
                          </TableCell>
                        )}
                        {filter !== "income" && (
                          <TableCell
                            sx={{
                              color: "review.main",
                              textAlign: "center",
                            }}
                          >
                            ${Math.abs(totalExpense)}
                          </TableCell>
                        )}
                        <TableCell></TableCell>
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
                {/* pagination */}
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

      <ModalComponent
        open={open}
        setOpen={setOpen}
        // todo = show only one Entry type
        modalTitle={selectedTransaction?.type}
        size="large"
      >
        <Grid container rowSpacing={5} columnSpacing={1.5}>
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Date"}
              Text={acFormattedDate || "N/A"}
              Icon={<DateIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Title"}
              Text={selectedTransaction?.title || "N/A"}
              Icon={<TitleIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Description"}
              Text={selectedTransaction?.description || "N/A"}
              Icon={<EmailIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Amount"}
              Text={"₹" + selectedTransaction?.amount || "N/A"}
              Icon={<AccountBoxIcon />}
            />
          </Grid>
          {/* todo = show only in Expance */}
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Expense Type"}
              Text={selectedTransaction?.expenseType || "N/A"}
              Icon={<AccountBoxIcon />}
              TextStyle={{ textTransform: "capitalize" }}
            />
          </Grid>
          {/* todo = show only in Income */}
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Collaborator"}
              Text={selectedTransaction?.collaborator || "N/A"}
              Icon={<CollaboratorIcon />}
              TextStyle={{ textTransform: "capitalize" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Invoice Type"}
              Text={selectedTransaction?.invoiceType || "N/A"}
              Icon={<InvoiceTypeIcon />}
              TextStyle={{ textTransform: "capitalize" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Invoice Owner"}
              Text={selectedTransaction?.invoiceOwner || "N/A"}
              Icon={<InvoiceOwnerIcon />}
              TextStyle={{ textTransform: "capitalize" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <DetailsList
              Title={"Payment Method"}
              Text={selectedTransaction?.paymentMethod || "N/A"}
              Icon={<PaymentIcon />}
              TextStyle={{ textTransform: "capitalize" }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            {/* <ImageUploder
                title="invoice"
                doc={selectedTransaction?.invoiceUpload}
              /> */}
            <DetailsList
              Title={"invoice"}
              Icon={<InvoiceImageIcon />}
              TextStyle={{ display: "none" }}
            />
            <Box>
              <Tooltip title="Invoice" arrow>
                <img
                  src="https://res.cloudinary.com/dbffq11b0/image/upload/v1705492192/y61sc77i0ree7itjma1s.avif"
                  style={{
                    height: "200px",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "6px",
                    display: "block",
                  }}
                  alt="Invoice"
                />
              </Tooltip>
            </Box>
          </Grid>
        </Grid>
      </ModalComponent>
    </>
  );
}

export default AccountManage;
