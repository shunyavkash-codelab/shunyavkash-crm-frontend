import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  TablePagination,
  Pagination,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import MarkAsPaidIcon from "@mui/icons-material/CheckCircleOutlined";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import moment from "moment";
import NoData from "../component/NoData";
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";
import { useSearchData } from "../hooks/store/useSearchData.js";
import ThemePagination from "../component/ThemePagination";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";

// const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const [date, setDate] = useState("");
  const { apiCall, isLoading } = useApi();
  const navigate = useNavigate();
  const { setSnack } = useSnack();
  const [invoiceList, setInvoiceList] = useState([]);
  const { setInvoiceData, resetInvoiceStore } = useInvoiceStore();
  const { searchData } = useSearchData();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();

  // pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChangeOnPageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const invoiceNumberGenerate = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.GENERATENUM,
        method: "get",
      });
      if (res.data.success === true) {
        navigate(`./add/${res.data.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //view invoice
  const viewInvoice = async (invoiceNumber, row) => {
    setInvoiceData(row);
    navigate(`/invoices/view/${invoiceNumber}`);
  };

  //edit invoice
  const editInvoice = async (invoiceNumber, row) => {
    setInvoiceData(row);
    navigate(`/invoices/edit/${invoiceNumber}`);
  };

  const listInvoice = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.LIST,
        method: "get",
        params: {
          sortField: "invoiceDate",
          search: searchData,
          page: searchData ? 1 : page,
          limit: rowsPerPage,
          from: from,
          to: to,
        },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setInvoiceList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    listInvoice();
    resetInvoiceStore();
  }, [page, rowsPerPage]);
  useEffect(() => {
    if (searchData !== undefined) {
      const getData = setTimeout(async () => {
        listInvoice();
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [searchData]);
  useEffect(() => {
    if (to && from) {
      listInvoice();
    }
  }, [to, from]);
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
              Title="Our Invoices"
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="Invoices"
              style={{ mb: 0 }}
            />
            <ThemeButton
              Text="Create Invoice"
              startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
              onClick={invoiceNumberGenerate}
            />
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
            {/* <Box
              sx={{
                "& > button": {
                  height: "40px",
                  width: "40px",
                  minWidth: "unset",
                  borderRadius: 0,
                },
              }}
            >
              <Button
                onClick={() => {
                  setShowTable(false);
                  setInvoiceTable(false);
                }}
                sx={{
                  // bgcolor: showTable ? "#dcdcdc" : "primary.main",
                  // color: showTable ? "primary.main" : "white",
                  ":hover,&": {
                    bgcolor: showTable ? "#dcdcdc" : "primary.main",
                    color: showTable ? "primary.main" : "white",
                  },
                }}
              >
                <CreditCardOutlinedIcon />
              </Button>
              <Button
                onClick={() => {
                  setShowTable(true);
                  setInvoiceTable(true);
                }}
                sx={{
                  // bgcolor: showTable ? "primary.main" : "#dcdcdc",
                  // color: showTable ? "white" : "primary.main",
                  ":hover,&": {
                    bgcolor: showTable ? "primary.main" : "#dcdcdc",
                    color: showTable ? "white" : "primary.main",
                  },
                }}
              >
                <ListOutlinedIcon />
              </Button>
            </Box> */}
          </Box>

          {/* <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.6,
              lineHeight: 1,
              mb: 1.75,
            }}
          >
            {invoiceList.length} Invoices found
          </Typography> */}

          {isLoading ? (
            <LoadingIcon style={{ height: "50vh" }} />
          ) : invoiceList.length === 0 ? (
            <NoData />
          ) : (
            // <Box sx={{ display: showTable ? "block" : "none" }}>
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
                      <TableCell>Project Name</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>User</TableCell>
                      <TableCell>Invoice No.</TableCell>
                      <TableCell>Invoice Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoiceList.map((row) => (
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
                        <TableCell value={row.projectId}>
                          {row.projectName}
                        </TableCell>
                        <TableCell>{row.clientName}</TableCell>
                        <TableCell>{row.userName}</TableCell>
                        <TableCell>{row.invoiceNumber}</TableCell>
                        <TableCell>
                          {moment(row.invoiceDate).format("DD/MM/YYYY")}
                        </TableCell>
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
                            "& .pending": {
                              bgcolor: "secondary.main",
                            },
                            "& .success": {
                              bgcolor: "success.main",
                            },
                          }}
                        >
                          <Box
                            className={`statusBtn ${
                              row.status === "success" ? "success" : "pending"
                            }`}
                          >
                            {row.status}
                          </Box>
                          <Box
                            sx={{
                              fontSize: "13px",
                              lineHeight: 1,
                              textWrap: "nowrap",
                              mt: 0.75,
                            }}
                          >
                            {moment(row.invoiceDueDate).format("DD/MM/YYYY")}
                          </Box>
                        </TableCell>
                        <TableCell>${row.totals.total}</TableCell>
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
                              "& svg": { fontSize: { xs: "20px", sm: "21px" } },
                            }}
                          >
                            <Button
                              disableRipple
                              onClick={() =>
                                viewInvoice(row.invoiceNumber, row)
                              }
                            >
                              <VisibilityIcon />
                            </Button>
                            {/* <Button disableRipple>
                            <MarkAsPaidIcon />
                          </Button> */}
                            <Button
                              disableRipple
                              onClick={() =>
                                editInvoice(row.invoiceNumber, row)
                              }
                            >
                              <CreateIcon />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* pagination */}
              <ThemePagination
                totalpage={totalPage}
                onChange={handleChangeOnPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </>
            // </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
