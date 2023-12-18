import React, { useState } from "react";
import { Link } from "react-router-dom";
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
                  gap: 2,
                }}
              >
                <Box sx={{ textAlign: "right", alignSelf: "end" }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontSize: "28px",
                      textTransform: "capitalize",
                      lineHeight: 1.5,
                    }}
                  >
                    Shunyavkash PVT. LTD
                  </Typography>
                  <Box>
                    <Box
                      sx={{
                        mt: 0.25,
                        "&>*:not(:first-child)": {
                          mt: 3,
                        },
                        textAlign: "left",
                      }}
                    >
                      {/* <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                        Invoice no:
                      </Typography> */}
                      <Typography
                        variant="subtitle3"
                        sx={{ lineHeight: 1.6, fontSize: "13px" }}
                      >
                        311, Ambika Pinnacle, Lajamni chowk,
                        <br /> Mota varachha, Surat- 395006
                      </Typography>

                      <Box
                        sx={{
                          mt: 0.25,
                          "&>*:not(:first-child)": {
                            mt: 0,
                          },
                          textAlign: "left",
                        }}
                      >
                        <Typography
                          variant="subtitle3"
                          sx={{
                            lineHeight: 1.6,
                            display: "block",
                            fontSize: "13px",
                          }}
                        >
                          +91 8155926380
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          sx={{
                            lineHeight: 1.6,
                            display: "block",
                            fontSize: "13px",
                          }}
                        >
                          hiren.polra@shunyavkash.com
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    maxHeight: "140px",
                    maxWidth: "200px",
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

              <Box sx={{ my: 4 }}>
                <Divider sx={{ bgcolor: "divider", height: 3 }} />
              </Box>

              <Box sx={{ textAlign: "right", alignSelf: "end" }}>
                <Typography variant="h4">Invoice</Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mt: 6,
                    gap: 2,
                  }}
                >
                  <Box sx={{ textAlign: "left" }}>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, lineHeight: 1 }}
                    >
                      Bill to
                    </Typography>
                    <Typography variant="h6" sx={{ mt: 1.25 }}>
                      Hiren Polara
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
                        sx={{ lineHeight: 1.6, fontSize: "13px" }}
                      >
                        311, Ambika Pinnacle, Lajamni chowk,
                        <br /> Mota varachha, Surat- 395006
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ textAlign: "right", alignSelf: "start", mt: 0 }}>
                    <Box
                      sx={{
                        mt: 1,
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
                        <Typography
                          variant="subtitle3"
                          sx={{ opacity: "0.50", fontSize: "13px" }}
                        >
                          Invoice No:
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          sx={{ fontSize: "13px" }}
                        >
                          001
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 3.75,
                        }}
                      >
                        <Typography
                          variant="subtitle3"
                          sx={{ opacity: "0.50", fontSize: "13px" }}
                        >
                          Invoice Date:
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          sx={{ fontSize: "13px" }}
                        >
                          Dec 13th,2023
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 3.75,
                        }}
                      >
                        <Typography
                          variant="subtitle3"
                          sx={{ opacity: "0.50", fontSize: "13px" }}
                        >
                          Due:
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          sx={{ fontSize: "13px" }}
                        >
                          Jan 13th,2023
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                      Invoice no:
                    </Typography>
                    <Typography variant="subtitle3">
                      311, Ambika Pinnacle, Lajamni chowk,
                    </Typography>
                  </Box>

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
                        sx={{ lineHeight: 1.6, fontSize: "13px" }}
                      >
                        John Smith <br /> wiz@saladoapps.com <br /> 0123456789
                        <br /> First str.,28-32,chicago, USA
                      </Typography>
                    </Box>
                  </Box> */}
                </Box>

                {/* <Typography
                  variant="h4"
                  sx={{
                    textTransform: "capitalize",
                    pb: 4,
                    textAlign: "right",
                    alignSelf: "end",
                  }}
                >
                  Xyz
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 1,
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Bill To
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Hiren Polara
                      <Box>
                        <Box
                          sx={{
                            mt: 1,
                            "&>*:not(:first-child)": {
                              mt: 1,
                            },
                          }}
                        >
                          <Box
                            sx={{
                              gap: 1,
                            }}
                          >
                            <Typography variant="subtitle3">
                              311, Ambika Pinnacle, Lajamni chowk,
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              gap: 1,
                            }}
                          >
                            <Typography variant="subtitle3">
                              Mota varachha, Surat- 395006
                            </Typography>
                          </Box>
                        </Box>
                      </Box>
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: "right", alignSelf: "start", mt: 0 }}>
                    <Box
                      sx={{
                        mt: 1,
                        "&>*:not(:first-child)": {
                          mt: 1,
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                          Invoice no:
                        </Typography>
                        <Typography variant="subtitle3">
                          311, Ambika Pinnacle, Lajamni chowk,
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
                          Invoice Date:
                        </Typography>
                        <Typography variant="subtitle3">
                          Mota varachha, Surat- 395006
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box> */}
              </Box>
            </Box>

            <Box
              sx={{
                mt: 6,
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, lineHeight: 1 }}
                >
                  Project
                </Typography>
                <Typography variant="h6" sx={{ lineHeight: 1, mt: 1 }}>
                  Shunyavkash CRM
                </Typography>
                <Box
                  sx={{
                    mt: 2.25,
                    maxWidth: "500px",
                    "&>*": {
                      display: "block",
                      "&:not(:first-child)": { mt: 1 },
                    },
                  }}
                >
                  <Typography
                    variant="subtitle3"
                    sx={{ lineHeight: 1.6, fontSize: "13px" }}
                  >
                    In this project we have created design & dynamic.
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box sx={{ mt: 10 }}>
              <TableContainer
                component={Paper}
                sx={{
                  mt: 2,
                  borderRadius: 2.5,
                }}
              >
                <Table
                  className="projectTable"
                  sx={{
                    minWidth: 650,
                    textTransform: "capitalize",
                    textWrap: "nowrap",
                    boxShadow: "0 0 10px rgba(0,0,0,1)",
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
                          bgcolor: "rgb(22 119 255/ 6%)",
                          color: "black",
                        },
                      }}
                    >
                      <TableCell>description</TableCell>
                      <TableCell>price per hours</TableCell>
                      <TableCell>hours</TableCell>
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
                        bgcolor: "rgba(243 ,243 ,243 ,1)",
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
            </Box>
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
                  Bank Details
                </Typography>
                {/* <Box
                  sx={{
                    mt: 1,
                    "&>*": {
                      // display: "block",
                      "&:not(:first-child)": { mt: 1 },
                    },
                  }}
                >
                  <Typography
                    variant="subtitle3"
                    sx={{ fontSize: "13px" }}
                  ></Typography>
                  <Typography
                    variant="subtitle3"
                    sx={{ fontSize: "13px" }}
                  ></Typography>
                </Box>
                <Box
                  sx={{
                    mt: 1,
                    "&>*": {
                      // display: "block",
                      "&:not(:first-child)": { mt: 1 },
                    },
                  }}
                >
                  <Typography
                    variant="subtitle3"
                    sx={{ fontSize: "13px" }}
                  ></Typography>
                  <Typography
                    variant="subtitle3"
                    sx={{ fontSize: "13px" }}
                  ></Typography>
                </Box>
                <Box
                  sx={{
                    mt: 1,
                    "&>*": {
                      // display: "block",
                      "&:not(:first-child)": { mt: 1 },
                    },
                  }}
                >
                  <Typography
                    variant="subtitle3"
                    sx={{ fontSize: "13px" }}
                  ></Typography>
                  <Typography
                    variant="subtitle3"
                    sx={{ fontSize: "13px" }}
                  ></Typography>
                </Box> */}

                <Box
                  sx={{
                    ml: "auto",
                    mt: 1.75,
                    flexShrink: 0,
                    "&>*": { "&:not(:first-child)": { mt: 1.75 } },
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
                      },
                    }}
                  >
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: "capitalize", opacity: 0.5 }}
                    >
                      Bank Name :
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Bank of baroda
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
                      sx={{ textTransform: "capitalize", opacity: 0.5 }}
                    >
                      IFSC Code :
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      BOBN0005943
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
                      sx={{ textTransform: "capitalize", opacity: 0.5 }}
                    >
                      Account Holder Name :
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      XYZ
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
                      sx={{ textTransform: "capitalize", opacity: 0.5 }}
                    >
                      Account No :
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      sx={{ textTransform: "capitalize" }}
                    >
                      9510132728
                    </Typography>
                  </Box>
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
                  <Typography variant="subtitle3" sx={{ fontSize: "13px" }}>
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
                  bgcolor: "error.main",
                  border: "1px solid",
                  borderColor: "error.main",
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
                    color: "error.main",
                    bgcolor: "error.main",
                    "&:before": { height: "10rem" },
                  },
                }}
              >
                <span style={{ position: "relative" }}>Cancel</span>
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </>
  );
}
