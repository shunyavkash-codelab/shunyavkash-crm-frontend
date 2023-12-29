import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Button,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import CounterCards from "../component/CounterCards";
import ManagerIcon from "@mui/icons-material/PermIdentityOutlined";
import ClientsIcon from "@mui/icons-material/PeopleAltOutlined";
import ProjectsIcon from "@mui/icons-material/FileCopyOutlined";
import InvoicesIcon from "@mui/icons-material/ReceiptOutlined";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import MarkAsPaidIcon from "@mui/icons-material/CheckCircleOutlined";
import PlusIcon from "@mui/icons-material/Close";
import moment from "moment";

export default function Home() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [dashboardData, setDashboardData] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { accessToken, invoiceTable } = useAuth();
  const [showTable] = useState(invoiceTable);
  const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);
  const navigate = useNavigate();
  const [invoiceList, setInvoiceList] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const res = await apiCall({
        url: APIS.DASHBOARD.DATA,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setDashboardData(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
      // handleApiError(error, setSnack);
    }
  };

  const listInvoice = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
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
      <Box sx={{ display: "flex", height: "100vh", ml: { lg: sideBarWidth } }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box>
            <Box sx={{ mb: 3.25 }}>
              <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                DashBoard
              </Typography>
              {/* <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize", mt: 0.75 }}
              >
                DashBoard
              </Typography> */}
            </Box>
            <Grid container rowSpacing={2.5} columnSpacing={2.5}>
              <Grid item xs={12} sm={6} xl={3} sx={{ height: "100%" }}>
                <CounterCards
                  Title={"Clients"}
                  Counter={dashboardData.totalClient || 0}
                  icon={
                    <ClientsIcon
                      sx={{
                        fontSize: { xs: "28px", sm: "32px" },
                        color: "rgb(255, 198, 117, 100%)",
                      }}
                    />
                  }
                ></CounterCards>
              </Grid>
              <Grid item xs={12} sm={6} xl={3} sx={{ height: "100%" }}>
                <CounterCards
                  Title={"projects"}
                  Counter={dashboardData.totalProject || 0}
                  icon={
                    <ProjectsIcon
                      sx={{
                        fontSize: { xs: "28px", sm: "32px" },
                        color: "rgb(74, 210, 146, 100%)",
                      }}
                    />
                  }
                ></CounterCards>
              </Grid>
              <Grid item xs={12} sm={6} xl={3} sx={{ height: "100%" }}>
                <CounterCards
                  Title={"invoices"}
                  Counter={dashboardData.totalInvoice || 0}
                  icon={
                    <InvoicesIcon
                      sx={{
                        fontSize: { xs: "28px", sm: "32px" },
                        color: "rgb(255, 0, 67, 100%)",
                      }}
                    />
                  }
                ></CounterCards>
              </Grid>
              <Grid item xs={12} sm={6} xl={3} sx={{ height: "100%" }}>
                <CounterCards
                  Title={"members"}
                  Counter={dashboardData.totalManager || 0}
                  icon={
                    <ManagerIcon
                      sx={{
                        fontSize: { xs: "28px", sm: "32px" },
                        color: "rgb(22, 108, 255, 100%)",
                      }}
                    />
                  }
                ></CounterCards>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 8 }}>
            <Box
              sx={{
                mb: 3.25,
                display: "flex",
                alignItems: { sm: "center" },
                justifyContent: { sm: "space-between" },
                flexDirection: { xs: "column", sm: "row" },
                flexWrap: "wrap",
                columnGap: 2,
                rowGap: 2.5,
              }}
            >
              <Box>
                <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                  Our Recent invoices
                </Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1 }}>
                <Button
                  disableRipple
                  startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
                  sx={{
                    maxHeight: "42px",
                    position: "relative",
                    px: 2.5,
                    py: 1.5,
                    border: "1px solid",
                    borderColor: "primary.main",
                    color: "primary.main",
                    lineHeight: 1,
                    borderRadius: 2.5,
                    overflow: "hidden",
                    "&:before": {
                      content: "''",
                      height: 0,
                      width: "10rem",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      zIndex: "0",
                      bgcolor: "primary.main",
                      transform: "rotate(-45deg) translate(-50%, -50%)",
                      transformOrigin: "0% 0%",
                      transition: "all 0.4s ease-in-out",
                    },
                    "&:hover": {
                      color: "white",
                      "&:before": { height: "10rem" },
                    },
                  }}
                  onClick={invoiceNumberGenerate}
                >
                  <span style={{ position: "relative" }}>New Invoice</span>
                </Button>
                <Link
                  to="./invoices"
                  style={{ display: "inline-flex", textDecoration: "none" }}
                >
                  <Button
                    disableRipple
                    sx={{
                      maxHeight: "42px",
                      position: "relative",
                      px: 2.5,
                      py: 1.5,
                      bgcolor: "primary.main",
                      border: "1px solid",
                      borderColor: "primary.main",
                      color: "white",
                      lineHeight: 1,
                      borderRadius: 2.5,
                      overflow: "hidden",
                      "&:before": {
                        content: "''",
                        height: 0,
                        width: "10rem",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        zIndex: "0",
                        bgcolor: "white",
                        transform: "rotate(-45deg) translate(-50%, -50%)",
                        transformOrigin: "0% 0%",
                        transition: "all 0.4s ease-in-out",
                      },
                      "&:hover": {
                        color: "primary.main",
                        bgcolor: "primary.main",
                        "&:before": { height: "10rem" },
                      },
                    }}
                  >
                    <span style={{ position: "relative" }}>View all</span>
                  </Button>
                </Link>
              </Box>
            </Box>
            {/* <Box>
              <Grid container rowSpacing={2.5} columnSpacing={2.5}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  xxl={4}
                  sx={{
                    "& .statusBtn": {
                      color: "white",
                      fontSize: "10px",
                      px: 0.75,
                      py: 0.5,
                      bgcolor: "grey.dark",
                      borderRadius: 1,
                    },
                    "& .pending": { bgcolor: "secondary.main" },
                    "& .Done": { bgcolor: "success.main" },
                  }}
                >
                  <Box
                    sx={{
                      boxShadow: "0 0 10px rgba(0,0,0,0.05)",
                      bgcolor: "white",
                      textTransform: "capitalize",
                      p: { xs: 2.5, lg: 3 },
                      borderRadius: 2.5,
                      position: "relative",
                      height: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: { xs: "18px", lg: "22px" },
                        right: "15px",
                      }}
                    >
                      <Box className="statusBtn intial">Initial</Box>
                    </Box>
                    <Typography
                      variant="h6"
                      sx={{
                        pr: "40px",
                        fontSize: { xs: "16px", lg: "18px" },
                      }}
                    >
                      Shunyavkash CRM Design
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: 2.5,
                        gap: 1.25,
                      }}
                    >
                      <Avatar
                        sx={{ height: "34px", width: "34px" }}
                        alt="Cindy Baker"
                        src="https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
                      />
                      <Typography
                        sx={{
                          color: "rgba(123, 119, 120, 1)",
                          textTransform: "capitalize",
                        }}
                      >
                        Joel Male
                      </Typography>
                    </Box>
                    <Typography
                      className="truncate line-clamp-1"
                      variant="subtitle3"
                      sx={{
                        mt: 2.5,
                        mb: 3,
                        lineHeight: 1.5,
                        fontSize: { sm: "14px" },
                      }}
                    >
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry.Lorem Ipsum is simply dummy text of
                      the printing and typesetting industry.Lorem Ipsum is
                      simply dummy text of the printing and typesetting
                      industry.
                    </Typography>
                    <Box
                      sx={{
                        "&>*:not(:first-child)": { mt: 1 },
                        "& *": {
                          fontSize: { sm: "14px!important" },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2.5,
                        }}
                      >
                        <Typography variant="subtitle3" sx={{ opacity: "50%" }}>
                          Hour charge
                        </Typography>
                        <Typography variant="subtitle3">$50</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2.5,
                        }}
                      >
                        <Typography variant="subtitle3" sx={{ opacity: "50%" }}>
                          Pay Period
                        </Typography>
                        <Typography variant="subtitle3">4 Weeks</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2.5,
                        }}
                      >
                        <Typography variant="subtitle3" sx={{ opacity: "50%" }}>
                          Invoice No
                        </Typography>
                        <Typography variant="subtitle3">SHU090984</Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2.5,
                        }}
                      >
                        <Typography variant="subtitle3" sx={{ opacity: "50%" }}>
                          Start Date
                        </Typography>
                        <Typography variant="subtitle3">
                          Oct 15th 2023
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          gap: 2.5,
                        }}
                      >
                        <Typography variant="subtitle3" sx={{ opacity: "50%" }}>
                          End Date
                        </Typography>
                        <Typography variant="subtitle3">
                          Nov 15th 2023
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box> */}
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                borderRadius: 5,
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
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Manager</TableCell>
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
                        "&:first-child td": {
                          maxWidth: "250px",
                          textWrap: "wrap",
                        },
                      }}
                    >
                      <TableCell>{row.projectName}</TableCell>
                      <TableCell>{row.clientName}</TableCell>
                      <TableCell>{row.managerName}</TableCell>
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
                            row.status == "success" ? "success" : "pending"
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
                            "& svg": { fontSize: { xs: "20px", sm: "22px" } },
                          }}
                        >
                          <Button disableRipple>
                            <VisibilityIcon />
                          </Button>
                          <Button disableRipple>
                            <MarkAsPaidIcon />
                          </Button>
                          <Button disableRipple>
                            <CreateIcon />
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}
