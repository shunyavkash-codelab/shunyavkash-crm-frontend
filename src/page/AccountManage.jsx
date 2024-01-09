import React, { useState } from "react";
import SideBar from "../component/SideBar";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
import {
  Box,
  Button,
  Grid,
  Link,
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
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CashIcon from "@mui/icons-material/Payments";
import BankIcon from "@mui/icons-material/AccountBalance";
import UpiIcon from "@mui/icons-material/Payment";
import DetailsList from "../component/employee/DetailsList";
import DateIcon from "@mui/icons-material/DateRangeOutlined";
import InvoiceOwnerIcon from "@mui/icons-material/PermIdentityOutlined";
import TitleIcon from "@mui/icons-material/Grid3x3";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBoxOutlined";
import FileDownloadIcon2 from "@mui/icons-material/FileDownloadOutlined";
import CollabaratorIcon from "@mui/icons-material/PeopleAlt";
import PaymentIcon from "@mui/icons-material/Payment";
import InvoiceTypeIcon from "@mui/icons-material/Receipt";

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
      income: "-",
      expance: "15000",
    },
    {
      date: "12/11/2023",
      title: "Chair",
      descrption: "lorem ipsum lorem ipsum sit amet.",
      paymentMethod: "Cash",
      income: "-",
      expance: "1650",
    },
    {
      date: "26/05/2023",
      title: "tomb raider",
      descrption: "dolor sit lorem ipsum sit amet.",
      paymentMethod: "Bank",
      income: "10000",
      expance: "-",
      invoice: "google.com1",
    },
    {
      date: "03/02/2023",
      title: "packets of foods",
      descrption: "lorem ipsum sit amet.",
      paymentMethod: "Cash",
      income: "-",
      expance: "700",
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
          <Box>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                Account Management
              </Typography>
              <Link
                to="/account-add"
                style={{ display: "inline-flex", textDecoration: "none" }}
              >
                <Button
                  disableRipple
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
                >
                  <span style={{ position: "relative" }}>new account</span>
                </Button>
              </Link>
            </Stack>
            <Box sx={{ display: "flex", gap: 0.5 }}>
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
            </Box>
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

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ mt: 4 }}
          >
            <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
              Accounting items
            </Typography>
            <Box maxWidth={150} width={"100%"}></Box>
          </Stack>

          <Box mt={2}>
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
                  textTransform: "capitalize",
                  textWrap: "nowrap",
                  "& th,& td": {
                    border: 0,
                    "&:not(:last-child)": {
                      borderRight: "1px solid rgba(224, 224, 224, 1)",
                    },
                  },
                  "& tbody tr,& tfoot tr": {
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  },
                }}
              >
                <TableHead>
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}>
                    <TableCell sx={{ width: "110px" }}>Date</TableCell>
                    <TableCell sx={{ width: "184px" }}>Title</TableCell>
                    <TableCell sx={{ width: "350px" }}>Description</TableCell>
                    <TableCell sx={{ width: "154px" }}>
                      payment method
                    </TableCell>
                    <TableCell sx={{ width: "120px", textAlign: "center" }}>
                      actions
                    </TableCell>
                    <TableCell sx={{ width: "120px", textAlign: "center" }}>
                      Income
                    </TableCell>
                    <TableCell sx={{ width: "120px", textAlign: "center" }}>
                      Expance
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody
                  sx={{
                    "&>*:nth-of-type(odd)": {
                      bgcolor: "#f5f5f5",
                    },
                  }}
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
                              <UpiIcon />
                            )}
                          </Box>
                          <span style={{ display: "inline-block" }}>
                            {account.paymentMethod}
                          </span>
                        </Stack>
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
                          <Link to="/account-add">
                            <Button disableRipple>
                              <CreateIcon />
                            </Button>
                          </Link>
                          {account.invoice ? (
                            <Link to={account.invoice}>
                              <Button disableRipple>
                                <FileDownloadIcon />
                              </Button>
                            </Link>
                          ) : (
                            ""
                          )}
                        </Stack>
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {account.income}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>
                        {account.expance}
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
                        color: "text.primary",
                        textAlign: "center",
                      },
                    }}
                  >
                    <TableCell colSpan={4}></TableCell>
                    <TableCell>Total:</TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#f3f3f3",
                      }}
                    >
                      10000
                    </TableCell>
                    <TableCell
                      sx={{
                        bgcolor: "#e6e6e6",
                      }}
                    >
                      17350
                    </TableCell>
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
                Icon={<CollabaratorIcon />}
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
