import React, { useState } from "react";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, invoiceTable, setInvoiceTable } = useAuth();

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
          <Box sx={{ mb: 3.25 }}>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              Invoice
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              Invoice
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              p: 6.75,
              borderRadius: 2.5,
              maxWidth: "1280px",
              mx: "auto",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  gap: 2,
                }}
              >
                <Box sx={{ height: "160px" }}>
                  <img
                    src="https://vex.visurel.com/assets/img/logo/logo.svg"
                    style={{ height: "100%", width: "auto" }}
                  />
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                    US Invoice
                  </Typography>
                  <Box
                    sx={{
                      mt: 3.75,
                      "&>*:not(:first-child)": {
                        mt: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 3.75,
                      }}
                    >
                      <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                        Invoice no:
                      </Typography>
                      <Typography variant="subtitle3">001</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 3.75,
                      }}
                    >
                      <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                        Invoice Date:
                      </Typography>
                      <Typography variant="subtitle3">
                        Dec 13th, 2023
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 3.75,
                      }}
                    >
                      <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                        Due:
                      </Typography>
                      <Typography variant="subtitle3">
                        Jan 13th, 2023
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 6,
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    From
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ textTransform: "capitalize", lineHeight: 1, mt: 1 }}
                  >
                    Saldo apps
                  </Typography>
                  <Box
                    sx={{
                      mt: 2.25,
                      "&>*": {
                        display: "block",
                        "&:not(:first-child)": { mt: 1 },
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle3"
                      sx={{ textTransform: "capitalize" }}
                    >
                      John Smith
                    </Typography>
                    <Typography
                      variant="subtitle3"
                      sx={{ textTransform: "lowercase" }}
                    >
                      wiz@saladoapps.com
                    </Typography>
                    <Typography variant="subtitle3">0123456789</Typography>
                    <Typography
                      variant="subtitle3"
                      sx={{ textTransform: "lowercase" }}
                    >
                      Saladoapps.com
                    </Typography>
                    <Typography variant="subtitle3">
                      First str.,28-32,chicago, USA
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    Bill to
                  </Typography>
                  <Typography variant="h6" sx={{ lineHeight: 1, mt: 1 }}>
                    Shepard corp.
                  </Typography>
                  <Box
                    sx={{
                      mt: 2.25,
                      "&>*": {
                        display: "block",
                        "&:not(:first-child)": { mt: 1 },
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle3"
                      sx={{ textTransform: "lowercase" }}
                    >
                      shepard@mail.com
                    </Typography>
                    <Typography variant="subtitle3">0123456789</Typography>
                    <Typography variant="subtitle3">
                      North str.,32,chicago, USA
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  mt: 3,
                  gap: 2,
                  textAlign: "right",
                }}
              >
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    Ship to
                  </Typography>
                  <Box
                    sx={{
                      mt: 2.25,
                      "&>*": {
                        display: "block",
                        "&:not(:first-child)": { mt: 1 },
                      },
                    }}
                  >
                    <Typography variant="subtitle3">
                      North str.,32,chicago, USA
                    </Typography>
                    <Typography variant="subtitle3">
                      Track #: ROB5641564356
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                borderRadius: 5,
                mx: { xs: "-10px", sm: 0 },
                mt: 10,
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
                  "& th,& td": {
                    borderBottom: 0,
                  },
                  "& tbody tr,& tfoot tr": {
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  },
                  "& tbody tr td:first-child": {
                    maxWidth: "400px",
                    textWrap: "wrap",
                  },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "& th": {
                        lineHeight: 1,
                        fontWeight: 600,
                        bgcolor: "primary.main",
                        color: "white",
                      },
                    }}
                  >
                    <TableCell>description</TableCell>
                    <TableCell>price per</TableCell>
                    <TableCell>unit</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&>*": {
                        p: 1.5,
                        "&:first-child": { fontWeight: "600" },
                      },
                    }}
                  >
                    <TableCell>Recurring Bill (Hosting)</TableCell>
                    <TableCell>$652.87</TableCell>
                    <TableCell>Hour</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>$1,958.61</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&>*": {
                        p: 1.5,
                        "&:first-child": { fontWeight: "600" },
                      },
                    }}
                  >
                    <TableCell>Recurring Bill (Domain)</TableCell>
                    <TableCell>$239.00</TableCell>
                    <TableCell>Hour</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>$717.00</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&>*": {
                        p: 1.5,
                        "&:first-child": { fontWeight: "600" },
                      },
                    }}
                  >
                    <TableCell>Web design</TableCell>
                    <TableCell>$958.00</TableCell>
                    <TableCell>Hour</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>$958.00</TableCell>
                  </TableRow>
                </TableBody>
                <TableFooter>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&>*": {
                        p: 1.5,
                        "&:first-child": { fontWeight: "600" },
                      },
                      bgcolor: "primary.light",
                    }}
                  >
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell sx={{ fontWeight: "700" }}>3633.61</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
            <Box
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, lineHeight: 1 }}
                >
                  Payment instruction
                </Typography>
                <Box
                  sx={{
                    mt: 2.25,
                    "&>*": {
                      display: "block",
                      "&:not(:first-child)": { mt: 1 },
                    },
                  }}
                >
                  <Typography variant="subtitle3">Paypal email</Typography>
                  <Typography variant="subtitle3">wiz@saldoapps.com</Typography>
                </Box>
                <Box
                  sx={{
                    mt: 2.25,
                    "&>*": {
                      display: "block",
                      "&:not(:first-child)": { mt: 1 },
                    },
                  }}
                >
                  <Typography variant="subtitle3">
                    Make checks payable to
                  </Typography>
                  <Typography
                    variant="subtitle3"
                    sx={{ textTransform: "capitalize" }}
                  >
                    John Smith
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 2.25,
                    "&>*": {
                      display: "block",
                      "&:not(:first-child)": { mt: 1 },
                    },
                  }}
                >
                  <Typography variant="subtitle3">Bank Transfer</Typography>
                  <Typography variant="subtitle3">
                    Rounting (ABA): 4564545146
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  ml: "auto",
                  flexShrink: 0,
                  "&>*": { "&:not(:first-child)": { mt: 1.75 }, px: 1.75 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                      fontWeight: "700!important",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    subtotal:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $3633.61
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Discount (20%):
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    shipping cost:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    sales tax:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $450.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    total:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $4083.61
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    amount paid:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    py: 1.75,
                    bgcolor: "primary.light",
                    borderRadius: 2.5,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                      fontWeight: 700,
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    balance due:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $4083.61
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 6,
              }}
            >
              <Box sx={{ maxWidth: "400px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, lineHeight: 1 }}
                >
                  Notes
                </Typography>
                <Box
                  sx={{
                    mt: 2.25,
                    "&>*": {
                      display: "block",
                      lineHeight: 1.5,
                    },
                  }}
                >
                  <Typography variant="subtitle3">
                    ptototype-based programming is a style of object-oriented
                    programming in which behaviour.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ height: "100px" }}>
                <img
                  src="/images/sign.svg"
                  style={{ height: "100%", width: "auto" }}
                ></img>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
