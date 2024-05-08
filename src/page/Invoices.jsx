import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
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
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
// import MarkAsPaidIcon from "@mui/icons-material/CheckCircleOutlined";
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
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ModalComponent from "../component/ModalComponent.jsx";

// const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);

export default function Invoices() {
  const [date, setDate] = useState("all");
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
  const [sortField, setSortField] = useState();
  const [orderBy, setOrderBy] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  // const [selectInvoice, setSelectInvoice] = useState(false);
  const [selectAllClick, setSelectAllClick] = useState(false);
  const [numSelected, setNumSelected] = useState([]);

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

  const handleSelectAllChange = () => {
    if (selectAllClick) {
      setNumSelected([]);
    } else {
      const ids = invoiceList.map((data) => data._id);
      setNumSelected(ids);
    }
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

  const deleteInvoice = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.DELETE,
        method: "delete",
        data: { ids: numSelected },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        listInvoice();
        setOpenDelete(false);
        setNumSelected([]);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const listInvoice = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.LIST,
        method: "get",
        params: {
          sortField: sortField || "invoiceDate",
          orderBy: orderBy,
          search: searchData,
          page: searchData ? 1 : page,
          limit: rowsPerPage,
          from: date === "all" ? undefined : from,
          to: date === "all" ? undefined : to,
        },
      });
      if (res.data.success === true) {
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
    if (searchData !== "") {
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
    } else {
      listInvoice();
    }
  }, [date]);

  const createSortHandler = (id) => {
    setSortField(id);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };
  useEffect(() => {
    if (orderBy) {
      listInvoice();
    }
  }, [orderBy]);

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
            Title="Our Invoices"
            BreadCrumbPreviousLink="/"
            BreadCrumbPreviousTitle="Dashboard"
            BreadCrumbCurrentTitle="Invoices"
            style={{ mb: 0 }}
            stackSx={{ mb: 0 }}
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
                  value={"all"}
                >
                  All
                </MenuItem>
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
          {numSelected.length > 0 && (
            <Button
              disableRipple
              onClick={() => {
                setOpenDelete(true);
              }}
            >
              <DeleteIcon sx={{ color: "error.main" }} />
            </Button>
          )}
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
                <TableHead>
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 600 } }}>
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        sx={{ color: "primary.main" }}
                        indeterminate={
                          numSelected.length > 0 &&
                          numSelected.length < invoiceList.length
                        }
                        checked={numSelected.length === invoiceList.length}
                        onChange={() => {
                          setSelectAllClick(!selectAllClick);
                          handleSelectAllChange();
                        }}
                        inputProps={{
                          "aria-label": "select all desserts",
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "projectName"}
                        direction={orderBy || "asc"}
                        onClick={() => createSortHandler("projectName")}
                      >
                        Project Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>User</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "invoiceNumber"}
                        direction={orderBy || "asc"}
                        onClick={() => createSortHandler("invoiceNumber")}
                      >
                        Invoice No
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "invoiceDate"}
                        direction={orderBy || "asc"}
                        onClick={() => createSortHandler("invoiceDate")}
                      >
                        Invoice Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceList.map((row, index) => {
                    const labelId = `enhanced-table-checkbox-${index}`;
                    return (
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
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            sx={{ color: "primary.main" }}
                            checked={
                              selectAllClick || numSelected.includes(row._id)
                            }
                            inputProps={{
                              "aria-labelledby": labelId,
                            }}
                            onClick={(e) => {
                              if (e.target.checked) {
                                setNumSelected([...numSelected, row._id]);
                              } else {
                                setSelectAllClick(false);
                                let newData = numSelected.filter(
                                  (id) => id !== row._id
                                );
                                setNumSelected(newData);
                              }
                            }}
                          />
                        </TableCell>
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
                        <TableCell>
                          <span style={{ fontFamily: "monospace" }}>$</span>
                          {row.totals.total?.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 1.25, sm: 1.5 },
                              "& button,& a": {
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                opacity: 0.6,
                                transition: "all 0.5s",
                                "&:hover": { opacity: 1 },
                              },
                              "& svg": {
                                fontSize: { xs: "20px", sm: "21px" },
                              },
                            }}
                          >
                            <Button
                              disableRipple
                              onClick={() =>
                                viewInvoice(row.invoiceNumber, row)
                              }
                              disabled={numSelected.length > 0}
                            >
                              <VisibilityIcon
                                sx={{ color: "secondary.main" }}
                              />
                            </Button>
                            {/* <Button disableRipple>
                            <MarkAsPaidIcon />
                          </Button> */}
                            <Button
                              disableRipple
                              onClick={() =>
                                editInvoice(row.invoiceNumber, row)
                              }
                              disabled={numSelected.length > 0}
                            >
                              <CreateIcon sx={{ color: "primary.main" }} />
                            </Button>
                            <Button
                              disableRipple
                              onClick={() => {
                                setOpenDelete(true);
                                // setSelectInvoice(row._id);
                                setNumSelected([row._id]);
                              }}
                              disabled={numSelected.length > 0}
                            >
                              <DeleteIcon sx={{ color: "error.main" }} />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  <ModalComponent
                    open={openDelete}
                    setOpen={setOpenDelete}
                    modelStyle={{ maxWidth: "400px" }}
                  >
                    <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                      {"Are you sure delete this project?"}
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
                          onClick={() => deleteInvoice(numSelected)}
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
        {invoiceList.length > 0 && (
          <ThemePagination
            totalpage={totalPage}
            onChange={handleChangeOnPageChange}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </Box>
    </>
  );
}
