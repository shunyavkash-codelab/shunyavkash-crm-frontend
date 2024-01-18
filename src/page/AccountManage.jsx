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
  Typography,
  TablePagination,
  Pagination,
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
import FileDownloadIcon2 from "@mui/icons-material/FileDownloadOutlined";
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
import ImageUploder from "../component/form/ImageUploder";
import { useSearchData } from "../hooks/store/useSearchData.js";

function AccountManage() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [transactionList, setTransactionList] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dashboard, setDashboard] = useState();
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const [selectedTransaction, setSelectedTransaction] = useState();
  const { searchData } = useSearchData();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  // pagination
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const handleChange = (event, newPage) => {
    setPage(newPage);
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
        },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setTransactionList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
        let total = 0;
        for (var trans of res.data.data.data) {
          if (trans.type === "expense") {
            total = total - trans.amount;
          } else {
            total = total + trans.amount;
          }
        }
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
        setSnack(res.data.message);
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
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Sales
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹{dashboard?.totalSales || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Income
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹{dashboard?.totalIncome || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Expense
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹{Math.abs(dashboard?.totalExpense) || 0}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Balance
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹{dashboard?.totalBalance || 0}
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            {transactionList.length > 0 ? (
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
                      <TableCell sx={{ width: "370px" }}>Description</TableCell>
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
                      <TableCell sx={{ width: "140px", textAlign: "center" }}>
                        Amount (₹)
                      </TableCell>
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
                              {account.paymentMethod === "Cash" ? (
                                <CashIcon sx={{ color: "#43991e" }} />
                              ) : account.paymentMethod === "Bank" ? (
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
                                    style={{ width: "100%", height: "100%" }}
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
                        <TableCell
                          sx={{
                            textAlign: "center",
                            color:
                              account.type == "expense"
                                ? "review.main"
                                : "success.main",
                          }}
                        >
                          ${account.amount ? account.amount : "-"}
                        </TableCell>
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
                              "& svg": { fontSize: { xs: "20px", sm: "21px" } },
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
                            {/* {account.invoice ? (
                            <Link to={account.invoice}>
                              <Button disableRipple>
                                <FileDownloadIcon />
                              </Button>
                            </Link>
                          ) : (
                            ""
                          )} */}
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
                        Total:
                      </TableCell>
                      <TableCell
                        sx={{
                          // bgcolor: "rgba(74, 210, 146, 15%)",
                          color:
                            totalAmount < 0 ? "review.main" : "success.main",
                          textAlign: "center",
                        }}
                      >
                        ${Math.abs(totalAmount)}
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            ) : (
              <NoData />
            )}
            {/* pagination */}
            <TablePagination
              component="div"
              count={10}
              page={page}
              onPageChange={handleChange}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                "&>div": {
                  p: 0,
                  minHeight: "24px",
                  "& .MuiTablePagination-selectLabel": {
                    lineHeight: 1,
                    fontWeight: 600,
                  },
                  "& .MuiTablePagination-input": {
                    mr: 0,
                    "&>div": {
                      p: "0 24px 0 0",
                    },
                  },
                  "& .MuiTablePagination-displayedRows,& .MuiTablePagination-actions":
                    {
                      display: "none",
                    },
                },
              }}
            />
            <Stack spacing={2}>
              {/* <Typography>Page: {page}</Typography> */}
              <Pagination
                count={totalPage}
                page={page}
                onChange={handleChange}
              />
            </Stack>
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
