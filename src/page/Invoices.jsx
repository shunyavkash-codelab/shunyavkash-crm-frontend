import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Table,
  TableBody,
  TableContainer,
  Paper,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
} from "@mui/material";
import PlusIcon from "@mui/icons-material/Close";
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
import ModalComponent from "../component/ModalComponent.jsx";
import InvoiceListTableRow from "../component/table/InvoiceListTableRow.jsx";
import CustomTableHeader from "../component/table/CustomTableHeader.jsx";

// const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);

export default function Invoices() {
  const [date, setDate] = useState("all");
  const { apiCall, isLoading } = useApi();
  const navigate = useNavigate();
  const { setSnack } = useSnack();
  const [invoiceList, setInvoiceList] = useState([]);
  const { setInvoiceData, resetInvoiceStore } = useInvoiceStore();
  const { searchData, setSearchData } = useSearchData();
  const [params] = useSearchParams();
  const page = +params.get("page") || 1;
  const limit = +params.get("limit") || 10;
  const [totalPage, setTotalPage] = useState(1);
  const [from, setFrom] = useState();
  const [to, setTo] = useState();
  const [sortField, setSortField] = useState();
  const [orderBy, setOrderBy] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectAllClick, setSelectAllClick] = useState(false);
  const [numSelected, setNumSelected] = useState([]);
  const location = useLocation();

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

  const handlePageChange = () => {
    params.set("page", 1);
    navigate({ pathname: location.pathname, search: params.toString() });
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

  const listInvoice = useCallback(
    async (search) => {
      try {
        const res = await apiCall({
          url: APIS.INVOICE.LIST,
          method: "get",
          params: {
            sortField: sortField || "invoiceDate",
            orderBy: orderBy,
            search: search,
            page: page,
            limit: limit,
            from: from,
            to: to,
          },
        });
        if (res.data.success === true) {
          setInvoiceList(res.data.data.data);
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
        page !== 1 ? handlePageChange() : listInvoice(searchData);
        resetInvoiceStore();
      }, 1000);
      return () => {
        clearTimeout(getData);
      };
    } else {
      listInvoice();
      resetInvoiceStore();
    }
  }, [listInvoice, searchData, resetInvoiceStore]);

  useEffect(() => {
    let fromValue, toValue;
    if (date === "CustomRange") {
      fromValue = moment()
        .subtract(1, "days")
        .endOf("day")
        .format("YYYY-MM-DD");
      toValue = moment().format("YYYY-MM-DD");
    } else if (date === "lastweek") {
      fromValue = moment()
        .subtract(1, "weeks")
        .startOf("week")
        .format("YYYY-MM-DD");

      toValue = moment()
        .subtract(1, "weeks")
        .endOf("week")
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

  const createSortHandler = (id) => {
    setSortField(id);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const TABLE_HEADINGS = [
    { id: "checkbox", label: "", sortable: false },
    { id: "projectName", label: "Project Name", sortable: true },
    { id: "client", label: "Client", sortable: false },
    { id: "user", label: "User", sortable: false },
    {
      id: "invoiceNumber",
      label: "Invoice No",
      sortable: true,
    },
    { id: "invoiceDate", label: "Invoice Date", sortable: true },
    {
      id: "invoiceDueDate",
      label: "Due Date",
      sortable: true,
    },
    {
      id: "status",
      label: "Status",
      sortable: true,
    },
    {
      id: "total",
      label: "Total",
      sortable: false,
    },
    {
      id: "actions",
      label: "Actions",
      sortable: false,
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
            <ThemeButton
              Text="Delete Selected"
              error
              onClick={invoiceNumberGenerate}
            />
          )}
        </Box>

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
                <CustomTableHeader
                  createSortHandler={createSortHandler}
                  headings={TABLE_HEADINGS}
                  orderBy={orderBy}
                  sortField={sortField}
                  numSelected={numSelected}
                  selectAllClick={selectAllClick}
                  setSelectAllClick={setSelectAllClick}
                  handleSelectAllChange={handleSelectAllChange}
                  dataList={invoiceList}
                />
                <TableBody>
                  {invoiceList.map((invoice, index) => (
                    <InvoiceListTableRow
                      invoice={invoice}
                      setSelectAllClick={setSelectAllClick}
                      selectAllClick={selectAllClick}
                      setNumSelected={setNumSelected}
                      numSelected={numSelected}
                      index={index}
                      editInvoice={editInvoice}
                      viewInvoice={viewInvoice}
                      setOpenDelete={setOpenDelete}
                      key={invoice._id}
                    />
                  ))}
                </TableBody>
                <ModalComponent
                  open={openDelete}
                  setOpen={setOpenDelete}
                  modelStyle={{ maxWidth: "400px" }}
                >
                  <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                    {"Are you sure delete this invoice?"}
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
              </Table>
            </TableContainer>
          </>
        )}
        {/* pagination */}
        {invoiceList.length > 0 && (
          <ThemePagination totalPage={totalPage} count={invoiceList.length} />
        )}
      </Box>
    </>
  );
}
