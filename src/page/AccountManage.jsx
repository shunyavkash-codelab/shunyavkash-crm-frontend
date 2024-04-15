import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  TableSortLabel,
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
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CustomSelect from "../component/form/input/CustomSelect";
import CustomInput from "../component/form/input/CustomInput.jsx";
import TransactionTable from "../component/table/TransactionTable.jsx";

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "income", label: "Income" },
  { value: "expense", label: "Expense" },
];

function AccountManage() {
  const [transactionList, setTransactionList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [dashboard, setDashboard] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [selectedTransaction, setSelectedTransaction] = useState();
  const { searchData } = useSearchData();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [date, setDate] = useState("all");
  const [filter, setFilter] = useState("all");
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [sortField, setSortField] = useState();
  const [orderBy, setOrderBy] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectTransaction, setSelectTransaction] = useState(false);
  // pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handlePageChange = (_, newPage) => {
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
  const deleteTransaction = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.ACCOUNTMANAGE.DELETE(id),
        method: "delete",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        viewAllTransaction();
        setOpenDelete(false);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  const viewAllTransaction = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.ACCOUNTMANAGE.LIST,
        method: "get",
        params: {
          sortField: sortField || "date",
          orderBy: orderBy,
          search: searchData,
          page: searchData ? 1 : page,
          limit: rowsPerPage,
          from: date === "all" ? undefined : from,
          to: date === "all" ? undefined : to,
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
  }, [
    apiCall,
    date,
    filter,
    from,
    orderBy,
    page,
    rowsPerPage,
    searchData,
    setSnack,
    sortField,
    to,
  ]);
  const transactionDashboard = useCallback(async () => {
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
  }, [apiCall, setSnack]);
  useEffect(() => {
    transactionDashboard();
    viewAllTransaction();
  }, [page, rowsPerPage, transactionDashboard, viewAllTransaction]);
  useEffect(() => {
    if (searchData !== undefined) {
      const getData = setTimeout(async () => {
        viewAllTransaction();
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [searchData, viewAllTransaction]);
  useEffect(() => {
    if ((to && from) || filter) {
      viewAllTransaction();
    }
  }, [to, from, filter, viewAllTransaction]);
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
    } else {
      viewAllTransaction();
    }
  }, [date, viewAllTransaction]);
  let acFormattedDate;
  if (selectedTransaction?.date) {
    let originalDate = moment(selectedTransaction?.date);
    acFormattedDate = originalDate.format("DD/MM/YYYY");
  }

  const createSortHandler = (id) => {
    setSortField(id);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    if (orderBy) {
      viewAllTransaction();
    }
  }, [orderBy, viewAllTransaction]);

  const CARDS = [
    {
      title: "Total Sales",
      symbol: "₹",
      counter: dashboard?.totalSales,
    },
    {
      title: "Total Income",
      symbol: "₹",
      counter: dashboard?.totalIncome,
    },
    {
      title: "Total Expense",
      symbol: "₹",
      counter: dashboard?.totalExpense,
    },
    {
      title: "Total Balance",
      symbol: "₹",
      counter: dashboard?.totalIncome - dashboard?.totalExpense,
      counterStyle: {
        color:
          dashboard?.totalIncome - dashboard?.totalExpense > 0
            ? "success.main"
            : "error.main",
      },
    },
  ];

  const TABLE_HEADINGS = [
    { id: "date", label: "Date", sortable: true, width: "110px" },
    { id: "title", label: "Title", sortable: false, width: "184px" },
    {
      id: "description",
      label: "Description",
      sortable: false,
      width: "370px",
    },
    { id: "paymentMethod", label: "Method", sortable: true, width: "154px" },
    {
      id: "invoiceType",
      label: "Invoice Type",
      sortable: false,
      width: "120px",
    },
    {
      id: "invoiceOwner",
      label: "Invoice Owner",
      sortable: false,
      width: "120px",
    },
    {
      id: "collaborator",
      label: "Collaborator",
      sortable: false,
      width: "120px",
    },
    {
      id: "expenseType",
      label: "Expense Type",
      sortable: false,
      width: "120px",
    },
    {
      id: "income",
      label: "Income (₹)",
      sortable: true,
      width: "140px",
      condition: filter !== "expense",
    },
    {
      id: "expense",
      label: "Expense (₹)",
      sortable: true,
      width: "140px",
      condition: filter !== "income",
    },
    {
      id: "actions",
      label: "Actions",
      sortable: false,
      width: "100px",
      textAlign: "center",
    },
  ];

  return (
    <>
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

        <ModalComponent
          open={openDelete}
          setOpen={setOpenDelete}
          modelStyle={{ maxWidth: "400px" }}
        >
          <Box sx={{ textAlign: "center", fontSize: "20px" }}>
            {"Are you sure delete this transaction?"}
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
                onClick={() => deleteTransaction(selectTransaction)}
              />
              <ThemeButton
                discard
                Text="No"
                onClick={() => setOpenDelete(false)}
              />
            </Box>
          </Box>
        </ModalComponent>
        <Grid container spacing={2.5}>
          {CARDS.map((card) => (
            <Grid item xs={12} sm={6} xl={3} key={card.title}>
              <CounterCards
                Title={card.title}
                Symbol={card.symbol}
                Counter={card.counter || "---"}
                counterStyle={card.counterStyle || {}}
              />
            </Grid>
          ))}
        </Grid>
        <Box
          sx={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
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
            <CustomSelect
              label="Date"
              name="date"
              options={[
                { value: "all", label: "All" },
                { value: "lastweek", label: "Last Week" },
                { value: "lastmonth", label: "Last Month" },
                { value: "lastyear", label: "Last Year" },
                { value: "CustomRange", label: "Custom Range" },
              ]}
              value={date}
              onChange={handleDateChange}
            />
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
                <CustomInput
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  label="From"
                  id="from"
                  type="date"
                  placeholder="mm/dd/yyyy"
                />
                <CustomInput
                  id="to"
                  label="To"
                  type="date"
                  placeholder="mm/dd/yyyy"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
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
            <CustomSelect
              options={FILTER_OPTIONS}
              onChange={handleFilterChange}
              label="Filter"
              value={filter}
              name="filter"
              id="filter"
            />
          </Box>
        </Box>
        <Box sx={{ mt: 4 }}>
          {isLoading ? (
            <LoadingIcon style={{ height: "50vh" }} />
          ) : transactionList.length === 0 ? (
            <NoData />
          ) : (
            <>
              <TransactionTable
                transactionList={transactionList}
                TABLE_HEADINGS={TABLE_HEADINGS}
                sortField={sortField}
                orderBy={orderBy}
                createSortHandler={createSortHandler}
                filter={filter}
                totalAmount={totalAmount}
                totalIncome={totalIncome}
                totalExpense={totalExpense}
                handleOpen={handleOpen}
                setSelectedTransaction={setSelectedTransaction}
                openDelete={openDelete}
                setOpenDelete={setOpenDelete}
                deleteTransaction={deleteTransaction}
                selectTransaction={selectTransaction}
                setSelectTransaction={setSelectTransaction}
              />
            </>
          )}
          {/* pagination */}
          {transactionList.length > 0 && (
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
          {selectedTransaction?.invoiceUpload && (
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"invoice"}
                Icon={<InvoiceImageIcon />}
                TextStyle={{ display: "none" }}
              />
              <Box>
                <Tooltip title="Invoice" arrow>
                  <img
                    src={selectedTransaction.invoiceUpload}
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
          )}
        </Grid>
      </ModalComponent>
    </>
  );
}

export default AccountManage;
