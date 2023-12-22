import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
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
  Button,
  Divider,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";
import { usePDF } from "react-to-pdf";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, invoiceTable, setInvoiceTable } = useAuth();
  const { invoiceNumber } = useParams();
  const { toPDF, targetRef } = usePDF({ filename: `${invoiceNumber}.pdf` });
  const { invoiceData } = useInvoiceStore();
  console.log(invoiceData, "--------------------30");

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
            pb: 5,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box sx={{ mb: 3.25 }}>
            <Typography
              variant="h5"
              sx={{ textTransform: "capitalize", textAlign: "center" }}
            >
              Preview Invoice
            </Typography>
          </Box>
          <Box
            sx={{
              position: "relative",
              bgcolor: "white",
              borderRadius: 2.5,
              maxWidth: "1280px",
              width: "100%",
              mx: "auto",
            }}
            ref={targetRef}
          >
            {/* <Box
              className="water-mark"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%) rotate(-45deg)",
                fontSize: "120px",
                fontWeight: 700,
                opacity: 0.04,
                zIndex: 1,
              }}
            >
              shunyavkash
            </Box> */}
            {/* <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                height: "550px",
                opacity: 0.04,
                zIndex: 1,
              }}
            >
              <img
                src="/images/logo-2.svg"
                style={{ height: "100%", width: "auto" }}
              />
            </Box> */}
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                height: "890px",
                opacity: 0.04,
                zIndex: 1,
              }}
            >
              <img
                src="/images/Logo-with-text.svg"
                style={{ height: "100%", width: "auto" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                p: 6.75,
                bgcolor: "rgba(74, 210, 146, 10%)",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: "24px",
                    textTransform: "capitalize",
                  }}
                >
                  Shunyavkash PVT. LTD
                </Typography>
                <Box
                  sx={{
                    mt: 1,
                  }}
                >
                  <Typography
                    variant="subtitle3"
                    sx={{
                      lineHeight: 1.5,
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    {invoiceData.address} {invoiceData.address2}
                  </Typography>
                  <Box
                    sx={{
                      mt: 2.5,
                    }}
                  >
                    <Typography
                      variant="subtitle3"
                      sx={{
                        display: "block",
                        fontSize: "16px",
                      }}
                    >
                      {invoiceData.mobileCode.phone} {invoiceData.mobileNumber}
                      {/* +91 8155926380 */}
                    </Typography>
                    <Typography
                      variant="subtitle3"
                      sx={{
                        mt: 0.75,
                        display: "block",
                        fontSize: "16px",
                      }}
                    >
                      {invoiceData.email}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  maxHeight: "140px",
                  maxWidth: "230px",
                  minWidth: "80px",
                  flexShrink: 0,
                }}
              >
                <img
                  src="/images/logo.svg"
                  style={{
                    maxHeight: "inherit",
                    width: "100%",
                    display: "block",
                  }}
                />
              </Box>
            </Box>
            {/* <Divider
              sx={{ borderWidth: "2px", borderColor: "#ededed", my: 3.5 }}
            /> */}
            <Box sx={{ p: 6.75, pt: 3.5 }}>
              <Typography
                variant="h4"
                sx={{ textAlign: "right", color: "success.main" }}
              >
                Invoice
              </Typography>
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
                    className="bg-style"
                    variant="subtitle3"
                    sx={{ fontWeight: 600, fontSize: "15px" }}
                  >
                    Bill to
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 1.25 }}>
                    Hiren Polara
                  </Typography>
                  <Typography
                    variant="subtitle3"
                    sx={{
                      mt: 1,
                      display: "block",
                      lineHeight: "1.5",
                      fontSize: "16px",
                    }}
                  >
                    311, Ambika Pinnacle, Lajamni chowk,
                    <br /> Mota varachha, Surat- 395006
                  </Typography>
                </Box>
                <Box
                  sx={{
                    textAlign: "right",
                    alignSelf: "start",
                    "& > *": {
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 3.75,
                      "&>*": {
                        lineHeight: 1,
                        display: "block",
                      },
                      "& > *:first-child": {
                        opacity: "0.50",
                      },
                    },
                    "&>*:not(:first-child)": {
                      mt: 1.5,
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="subtitle3"
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      Invoice No:
                    </Typography>
                    <Typography
                      variant="subtitle3"
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      001
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle3"
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      Invoice Date:
                    </Typography>
                    <Typography
                      variant="subtitle3"
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      13/12/2023
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      variant="subtitle3"
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      invoice Due:
                    </Typography>
                    <Typography
                      variant="subtitle3"
                      sx={{
                        fontSize: "16px",
                      }}
                    >
                      13/1/2023
                    </Typography>
                  </Box>
                </Box>
              </Box>
              {/* <Box
              sx={{
                mt: 6,
              }}
            >
              <Typography
                variant="subtitle3"
                sx={{ fontWeight: 700, display: "block" }}
              >
                Project
              </Typography>
              <Typography variant="h6" sx={{ mt: 1.25 }}>
                Shunyavkash CRM
              </Typography>
              <Typography variant="subtitle3" sx={{ mt: 1, display: "block",line-height:1.5 }}>
                In this project we have created design & dynamic.
              </Typography>
            </Box> */}
              <TableContainer
                component={Paper}
                sx={{
                  my: 7,
                  borderRadius: 2.5,
                  border: "2px solid rgba(74, 210, 146, 50%)",
                  boxShadow: "none",
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
                      fontSize: "16px",
                    },
                    "& tbody tr td:first-child": {
                      maxWidth: "400px",
                      textWrap: "wrap",
                    },
                  }}
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        bgcolor: "success.main",
                        "& th": {
                          lineHeight: 1,
                          fontWeight: 600,
                          color: "white",
                        },
                      }}
                    >
                      <TableCell>description</TableCell>
                      <TableCell sx={{ width: "130px" }}>price/hours</TableCell>
                      <TableCell sx={{ width: "90px" }}>hours</TableCell>
                      <TableCell sx={{ width: "108px" }}>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody
                    sx={{
                      "&>*:nth-child(odd)": {
                        bgcolor: "rgba(74, 210, 146, 10%)",
                      },
                    }}
                  >
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>*": {
                          py: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Recurring Bill (Hosting)</TableCell>
                      <TableCell>$652.87</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>$1,958.61</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>*": {
                          py: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Recurring Bill (Domain)</TableCell>
                      <TableCell>$239.00</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>$717.00</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>*": {
                          py: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Web design</TableCell>
                      <TableCell>$958.00</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>$958.00</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>*": {
                          py: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{ fontWeight: "600", color: "black" }}>
                        Total:
                      </TableCell>
                      <TableCell sx={{ fontWeight: "600", color: "black" }}>
                        $3633.61
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
              <Box
                sx={{
                  ml: "auto",
                  maxWidth: "fit-content",
                  "&>*": { px: 1.75, "&:not(:first-child)": { mt: 1.75 } },
                  "& > *": {
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "& > *": {
                      lineHeight: "1!important",
                      textTransform: "capitalize",
                    },
                  },
                }}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, fontSize: "16px" }}
                  >
                    subtotal:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, fontSize: "16px" }}
                  >
                    $3633.61
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    Discount (20%):
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    $0.00
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    shipping cost:
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    $0.00
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    sales tax:
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    $450.00
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    total:
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    $4083.61
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    amount paid:
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontSize: "16px" }}>
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    py: 1.75,
                    bgcolor: "rgba(74, 210, 146, 10%)",
                    borderRadius: 2.5,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, fontSize: "16px" }}
                  >
                    balance due:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "success.main",
                    }}
                  >
                    $4083.61
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  gap: 2,
                }}
              >
                <Box>
                  <Box sx={{ maxWidth: "fit-content" }}>
                    <Typography variant="h6" className="bg-style">
                      Bank Details
                    </Typography>
                    <Box
                      sx={{
                        mt: 2.25,
                        "&>*": {
                          display: "flex",
                          gap: 1.25,
                          "&:not(:first-child)": { mt: 1.75 },
                          "&>*": {
                            lineHeight: "1!important",
                            textTransform: "capitalize",
                            fontSize: "16px!important",
                            "&:first-child": {
                              opacity: 0.5,
                              width: "145px",
                              display: "flex",
                              justifyContent: "space-between",
                            },
                          },
                        },
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2">
                          Bank Name<span>:</span>
                        </Typography>
                        <Typography variant="subtitle2">
                          Bank of baroda
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          IFSC Code<span>:</span>
                        </Typography>
                        <Typography variant="subtitle2">BOBN0005943</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          A/c Holder Name<span>:</span>
                        </Typography>
                        <Typography variant="subtitle2">XYZ</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          A/c No.<span>:</span>
                        </Typography>
                        <Typography variant="subtitle2">9510132728</Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* <Box sx={{ maxWidth: "500px", mt: 6 }}>
                  <Typography variant="h6">Notes</Typography>
                  <Box
                    sx={{
                      mt: 1,
                    }}
                  >
                    <Typography
                      variant="subtitle3"
                      sx={{
                        mt: 1,
                        lineHeight: 1.5,
                        display: "block",
                        fontSize: "16px",
                      }}
                    >
                      ptototype-based programming is a style of object-oriented
                      <br /> programming in which behaviour.
                    </Typography>
                  </Box>
                </Box> */}
                </Box>
                <Box
                  sx={{
                    mt: 8.5,
                    mr: 6,
                    maxHeight: "80px",
                    maxWidth: "200px",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src="/images/sign.svg"
                    style={{
                      maxHeight: "inherit",
                      width: "100%",
                      display: "block",
                    }}
                  ></img>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2.5 }}
          >
            <Button
              disableRipple
              sx={{
                maxHeight: "42px",
                position: "relative",
                px: 2.5,
                py: 1.5,
                bgcolor: "success.main",
                border: "1px solid",
                borderColor: "success.main",
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
                  color: "success.main",
                  bgcolor: "success.main",
                  "&:before": { height: "10rem" },
                },
              }}
              onClick={() => toPDF()}
            >
              <span style={{ position: "relative" }}>generate</span>
            </Button>
            <Link to="/invoices/add">
              <Button
                disableRipple
                sx={{
                  maxHeight: "42px",
                  position: "relative",
                  px: 2.5,
                  py: 1.5,
                  color: "text.primary",
                  bgcolor: "#e4e4e4",
                  border: "1px solid",
                  borderColor: "#e4e4e4",
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
                    bgcolor: "#e4e4e4",
                    "&:before": { height: "10rem" },
                  },
                }}
              >
                <span style={{ position: "relative" }}>discard</span>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
