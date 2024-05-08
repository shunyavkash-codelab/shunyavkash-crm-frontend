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
                  <TableHead>
                    <TableRow
                      sx={{ "& th": { lineHeight: 1, fontWeight: 600 } }}
                    >
                      <TableCell key={"Project Name"}>Project Name</TableCell>
                      <TableCell key={"Client"}>Client</TableCell>
                      <TableCell key={"Manager"}>Manager</TableCell>
                      <TableCell key={"Invoice No."}>Invoice No.</TableCell>
                      <TableCell key={"Invoice Date"}>Invoice Date</TableCell>
                      <TableCell key={"Status"}>Status</TableCell>
                      <TableCell key={"Total"}>Total</TableCell>
                      <TableCell key={"Actions"}>Actions</TableCell>
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
                        <TableCell>{row.projectName}</TableCell>
                        <TableCell>{row.clientName}</TableCell>
                        <TableCell>{row.userName}</TableCell>
                        <TableCell>{row.invoiceNumber}</TableCell>
                        <TableCell>
                          {moment(row.invoiceDate).format("DD/MM/YYYY")}
                        </TableCell>
                        <TableCell>
                          <Box
                            className={`statusBtn ${
                              row.status === "success" ? "success" : "pending"
                            }`}
                            sx={{
                              color: "white",
                              fontSize: "12px",
                              p: 0.5,
                              borderRadius: 1,
                              maxWidth: "fit-content",
                              lineHeight: 1,
                              bgcolor:
                                row.status === "success"
                                  ? "success.main"
                                  : "secondary.main",
                            }}
                          >
                            {row.status}
                          </Box>
                          <Box
                            sx={{
                              fontSize: "12px",
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
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={{ xs: 1.25, sm: 1.5 }}
                            sx={{
                              "& button": {
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                opacity: 0.5,
                                transition: "all 0.5s",
                                "&:hover": {
                                  // color: "primary.main",
                                  opacity: 1,
                                },
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
                            >
                              <CreateIcon sx={{ color: "primary.main" }} />
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
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
