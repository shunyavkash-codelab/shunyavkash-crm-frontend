import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../component/SideBar";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
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
  Typography,
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
import CollaboratorIcon from "@mui/icons-material/PeopleAlt";
import PaymentIcon from "@mui/icons-material/Payment";
import InvoiceTypeIcon from "@mui/icons-material/Receipt";
import PlusIcon from "@mui/icons-material/Close";
import ThemeButton from "../component/ThemeButton";

function AccountManage() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const accounts = [
    {
      date: "01/01/2024",
      title: "system",
      descrption: "sit amet lorem ipsum sit amet.",
      paymentMethod: "UPI",
      amount: "+$1000",
      invoiceType: "Inbound",
      invoiceOwner: "Shunyavkash",
      collaborator: "Pixel",
      expanceType: "-",
    },
    {
      date: "12/11/2023",
      title: "Chair",
      descrption: "lorem ipsum lorem ipsum sit amet.",
      paymentMethod: "Cash",
      invoiceType: "Outbound",
      invoiceOwner: "Shunyavkash",
      expanceType: "Miscellaneous",
    },
    {
      date: "26/05/2023",
      title: "tomb raider",
      descrption: "dolor sit lorem ipsum sit amet.",
      paymentMethod: "Bank",
      amount: "+$1000",
      invoiceType: "Outbound",
      invoiceOwner: "Shunyavkash",
      collaborator: "Simpliigence",
    },
    {
      date: "03/02/2023",
      title: "packets of foods",
      descrption: "lorem ipsum sit amet.",
      paymentMethod: "Cash",
      amount: "-$2000",
      invoiceType: "Inbound",
      invoiceOwner: "Shunyavkash",
      expanceType: "Asset Purchase",
    },
  ];

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
          <Box
            sx={{
              display: "flex",
              alignItems: { sm: "center" },
              justifyContent: { sm: "space-between" },
              flexDirection: { xs: "column", sm: "row" },
              columnGap: 2,
              rowGap: 2.5,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ mb: 0.75, textTransform: "capitalize" }}
              >
                Account Management
              </Typography>
              <Stack direction="row" spacing={0.5}>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textTransform: "capitalize",
                      color: "primary.main",
                      transition: "all 0.4s ease-in-out",
                      ":not(:hover)": {
                        opacity: 0.7,
                      },
                    }}
                  >
                    Dashboard /
                  </Typography>
                </Link>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.4, textTransform: "capitalize" }}
                >
                  Account
                </Typography>
              </Stack>
            </Box>
            <Link
              to="./add"
              style={{ display: "inline-flex", textDecoration: "none" }}
            >
              <ThemeButton
                Text="Add Entry"
                startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
              />
            </Link>
          </Box>

          <Grid
            container
            rowSpacing={2.5}
            columnSpacing={2.5}
            sx={{ mt: 0.75 }}
          >
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
                  ₹1,50,000
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Expance
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹80,000
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
                  ₹50,000
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
                  ₹565000
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
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
                    <TableCell sx={{ width: "120px" }}>Invoice Type</TableCell>
                    <TableCell sx={{ width: "120px" }}>Invoice Owner</TableCell>
                    <TableCell sx={{ width: "120px" }}>Collaborator</TableCell>
                    <TableCell sx={{ width: "120px" }}>Expance Type</TableCell>
                    <TableCell sx={{ width: "140px", textAlign: "center" }}>
                      Amount
                    </TableCell>
                    <TableCell sx={{ width: "100px", textAlign: "center" }}>
                      actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={
                    {
                      // "&>*:nth-of-type(even)": {
                      //   bgcolor: "rgb(22 119 255/ 6%)",
                      // },
                    }
                  }
                >
                  {accounts.map((account) => (
                    <TableRow
                      key={account.key}
                      sx={{
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      }}
                    >
                      <TableCell>{account.date}</TableCell>
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
                          {account.descrption}
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box sx={{ display: "inline-flex", opacity: "0.5" }}>
                            {account.paymentMethod === "Cash" ? (
                              <CashIcon />
                            ) : account.paymentMethod === "Bank" ? (
                              <BankIcon />
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
                        {account.expanceType ? account.expanceType : "-"}
                      </TableCell>
                      <TableCell
                        sx={{
                          textAlign: "center",
                          color: !account.amount
                            ? "text.primary"
                            : account.collaborator
                            ? "success.main"
                            : account.expanceType
                            ? "review.main"
                            : "",
                        }}
                      >
                        {account.amount ? account.amount : "-"}
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
                          <Button disableRipple onClick={handleOpen}>
                            <VisibilityIcon />
                          </Button>
                          <Link to="./add">
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
                    <TableCell sx={{ color: "text.primary" }}>Total:</TableCell>
                    <TableCell
                      sx={{
                        // bgcolor: "rgba(74, 210, 146, 15%)",
                        color: "success.main",
                        textAlign: "center",
                      }}
                    >
                      $10000
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      <ModalComponent
        open={open}
        setOpen={setOpen}
        modalTitle="Add Accounting"
        size="large"
      >
        <Box>
          <Typography className="cardTitle" variant="h5" sx={{ mb: 4 }}>
            Income
          </Typography>
          <Grid container rowSpacing={3.5} sx={{ px: 0 }}>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Date"}
                Text={"01/12/2022"}
                Icon={<DateIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Title"}
                Text={"System"}
                Icon={<TitleIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Account Type"}
                Text={"Income"}
                Icon={<TitleIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Amount"}
                Text={"1000$"}
                Icon={<AccountBoxIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Invoice Type"}
                Text={"Inbound"}
                Icon={<InvoiceTypeIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Invoice Owner"}
                Text={"Abc"}
                Icon={<InvoiceOwnerIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Payment Method"}
                Text={"bank Transfer"}
                Icon={<PaymentIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Collaborator"}
                Text={"Pixel"}
                Icon={<CollaboratorIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Description"}
                Text={"Sit Amet Lorem Ipsum Sit Amet."}
                Icon={<EmailIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <Link
                href="#javascript:void(0);"
                target="_blank"
                sx={{
                  textDecoration: "none",
                  color: "#2a4062",
                  opacity: "0.8",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: 1,
                  padding: "5px 10px",
                  display: "inline-block",
                  "& > div": {
                    mb: 0,
                  },
                }}
              >
                <DetailsList
                  Title={"Invoice Upload"}
                  Icon={<FileDownloadIcon2 />}
                />
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 4 }}>
          <Typography className="cardTitle" variant="h5" sx={{ mb: 4 }}>
            Expance
          </Typography>
          <Grid container rowSpacing={3.5} sx={{ px: 0 }}>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Date"}
                Text={"01/12/2022"}
                Icon={<DateIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Title"}
                Text={"System"}
                Icon={<TitleIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Description"}
                Text={"Sit Amet Lorem Ipsum Sit Amet."}
                Icon={<EmailIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Amount"}
                Text={"1000$"}
                Icon={<AccountBoxIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Expance Type"}
                Text={"Salary"}
                Icon={<AccountBoxIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Invoice Type"}
                Text={"Outbound"}
                Icon={<InvoiceTypeIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Invoice Owner"}
                Text={"XYZ"}
                Icon={<InvoiceOwnerIcon />}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <DetailsList
                Title={"Payment Method"}
                Text={"ABC"}
                Icon={<PaymentIcon />}
              />
            </Grid>
            <Grid item xs={12}>
              <Link
                href="#javascript:void(0);"
                target="_blank"
                sx={{
                  textDecoration: "none",
                  color: "#2a4062",
                  opacity: "0.8",
                  backgroundColor: "rgba(0,0,0,0.1)",
                  borderRadius: 1,
                  padding: "5px 10px",
                  display: "inline-block",
                  "& > div": {
                    mb: 0,
                  },
                }}
              >
                <DetailsList
                  Title={"Invoice Upload"}
                  Icon={<FileDownloadIcon2 />}
                />
              </Link>
            </Grid>
          </Grid>
        </Box>
      </ModalComponent>
    </>
  );
}

export default AccountManage;
