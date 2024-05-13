import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  Stack,
  Grid,
} from "@mui/material";
import CounterCards from "../component/CounterCards";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import PlusIcon from "@mui/icons-material/Close";
import moment from "moment";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import NoData from "../component/NoData";
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";
import LoadingIcon from "../component/icons/LoadingIcon";
import CustomTableHeader from "../component/table/CustomTableHeader";
import InvoiceListTableRow from "../component/table/InvoiceListTableRow";

export default function Home() {
  const [dashboardData, setDashboardData] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [invoiceList, setInvoiceList] = useState([]);
  const { setInvoiceData } = useInvoiceStore();

  const fetchDashboardData = async () => {
    try {
      const res = await apiCall({
        url: APIS.DASHBOARD.DATA,
        method: "get",
      });
      if (res.data.success === true) {
        setDashboardData(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
      // handleApiError(error, setSnack);
    }
  };

  const viewInvoice = async (invoiceNumber, row) => {
    setInvoiceData(row);
    navigate(`/invoices/view/${invoiceNumber}`);
  };

  const listInvoice = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.LIST,
        method: "get",
        params: { limit: 10 },
      });
      if (res.data.success === true) {
        setInvoiceList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    listInvoice();
  }, []);

  //edit invoice
  const editInvoice = async (invoiceNumber, row) => {
    setInvoiceData(row);
    navigate(`/invoices/edit/${invoiceNumber}`);
  };

  const invoiceNumberGenerate = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.GENERATENUM,
        method: "get",
      });
      if (res.data.success === true) {
        navigate(`/invoices/add/${res.data.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const TABLE_HEADINGS = [
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
      {user.role === 0 ? (
        <Box component="main">
          <SectionHeader Title="dashboard" stackSx={{ mb: 0 }} />

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                CardBgcolor={"rgba(74, 210, 146, 10%)"}
                Title={"Clients"}
                Counter={dashboardData.totalClient || 0}
                Text={"lorem ipsum sit amet."}
                Link={"/clients"}
                ArrowBgColor={"rgba(74, 210, 146, 60%)"}
                titleStyle={{
                  opacity: "100%",
                }}
                counterStyle={{
                  fontSize: "30px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                CardBgcolor={"rgb(153 143 66 / 10%)"}
                Title={"projects"}
                Counter={dashboardData.totalProject || 0}
                Text={"lorem ipsum sit amet."}
                Link={"/projects"}
                ArrowBgColor={"rgb(153 143 66 / 60%)"}
                titleStyle={{
                  opacity: "100%",
                }}
                counterStyle={{
                  fontSize: "30px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                CardBgcolor={"rgb(53 113 51 / 10%)"}
                Title={"invoices"}
                Counter={dashboardData.totalInvoice || 0}
                Text={"lorem ipsum sit amet."}
                Link={"/invoices"}
                ArrowBgColor={"rgb(53 113 51 / 60%)"}
                titleStyle={{
                  opacity: "100%",
                }}
                counterStyle={{
                  fontSize: "30px",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <CounterCards
                CardBgcolor={"rgb(33 63 177 / 10%)"}
                Title={"employees"}
                Counter={dashboardData.totalEmployee || 0}
                Text={"lorem ipsum sit amet."}
                Link={"/employees"}
                ArrowBgColor={"rgb(33 63 177 / 60%)"}
                titleStyle={{
                  opacity: "100%",
                }}
                counterStyle={{
                  fontSize: "30px",
                }}
              />
            </Grid>
          </Grid>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent={{ sm: "space-between" }}
            flexWrap="wrap"
            columnGap={2}
            rowGap={2.5}
            sx={{ mb: 3.25, mt: 8 }}
          >
            <SectionHeader Title="Our Recent invoices" style={{ mb: 0 }} />
            <Stack direction="row" spacing={1}>
              <ThemeButton
                secondary
                Text="Create Invoice"
                startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
                onClick={invoiceNumberGenerate}
              />
              <Link
                to="./invoices"
                style={{ display: "inline-flex", textDecoration: "none" }}
              >
                <ThemeButton Text="View all" />
              </Link>
            </Stack>
          </Stack>

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
                    "& th,& td": { borderBottom: 0, p: 2 },
                    "& tbody tr": {
                      borderTop: "1px solid rgba(224, 224, 224, 1)",
                    },
                  }}
                  aria-label="simple table"
                >
                  <CustomTableHeader
                    headings={TABLE_HEADINGS}
                    dataList={invoiceList}
                  />
                  <TableBody>
                    {invoiceList.map((invoice, index) => (
                      <InvoiceListTableRow
                        invoice={invoice}
                        index={index}
                        editInvoice={editInvoice}
                        viewInvoice={viewInvoice}
                        key={invoice._id}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
      ) : (
        navigate("/employee-dashboard")
      )}
    </>
  );
}
