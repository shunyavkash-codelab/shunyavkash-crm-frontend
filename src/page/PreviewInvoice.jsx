import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
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
  Button,
  Divider,
  Stack,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";
import { usePDF } from "react-to-pdf";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import moment from "moment";
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";

export default function PreviewInvoice() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const { invoiceNumber } = useParams();
  const { toPDF, targetRef } = usePDF({ filename: `${invoiceNumber}.pdf` });
  const { invoiceData } = useInvoiceStore();
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const location = useLocation();
  let view = location.pathname.includes("/view/") ? true : false;
  console.log(invoiceData);
  // add invoice
  const addInvoice = async () => {
    try {
      if (!view) {
        const res = await apiCall({
          url: location.pathname.includes("/edit/")
            ? APIS.INVOICE.EDIT
            : APIS.INVOICE.ADD,
          method: "post",
          data: JSON.stringify(invoiceData, null, 2),
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          toPDF();
          navigate("/invoices");
        }
        if (res.status === 409) {
          let errorMessage = res.data.message;
          setSnack(errorMessage, "warning");
        }
      } else {
        toPDF();
        setSnack("PDF download successfully.");
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  useEffect(() => {
    if (!invoiceData) navigate("/invoices");
  }, [invoiceData]);

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
      {invoiceData && (
        <Box sx={{ ml: { lg: sideBarWidth } }}>
          <Box component="main">
            <SectionHeader
              Title={`${view ? "View" : "Preview"} Invoice`}
              style={{ textAlign: "center" }}
            />

            <Stack
              direction="column"
              justifyContent="space-between"
              spacing={1}
              sx={{
                position: "relative",
                bgcolor: "white",
                borderRadius: 2.5,
                maxWidth: "1280px",
                width: "100%",
                height: "100%",
                mx: "auto",
                p: 6.75,
              }}
              ref={targetRef}
            >
              <Box>
                <Box
                  className="watermark"
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%) rotate(-45deg)",
                    width: "700px",
                    opacity: 0.06,
                    zIndex: 1,
                    display:
                      invoiceData.watermark === "true" ? "inline-flex" : "none",
                  }}
                >
                  <img
                    src="/images/logo.svg"
                    style={{ height: "auto", width: "100%", flexShrink: 0 }}
                    alt=""
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 2,
                  }}
                >
                  <Box sx={{ flexGrow: 1, maxWidth: "390px" }}>
                    <Typography
                      variant="h4"
                      sx={{
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
                          lineHeight: 1.6,
                          display: "block",
                          fontSize: "16px",
                        }}
                      >
                        {invoiceData.from.address}
                        {invoiceData.from.address2}
                        {invoiceData.from.landmark}
                        {invoiceData.from.pincode}
                      </Typography>
                      <Box
                        sx={{
                          mt: 3.5,
                        }}
                      >
                        <Typography
                          variant="subtitle3"
                          sx={{
                            display: "block",
                            fontSize: "16px",
                          }}
                        >
                          {invoiceData.from.mobileCode}{" "}
                          {invoiceData.from.mobileNumber}
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          sx={{
                            mt: 0.75,
                            display: "block",
                            fontSize: "16px",
                          }}
                        >
                          {/* {invoiceData.email} */}
                          {invoiceData.from.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      maxHeight: "140px",
                      maxWidth: "300px",
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
                      alt=""
                    />
                  </Box>
                </Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, my: 6 }}
                >
                  <Divider
                    sx={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      flexGrow: 1,
                    }}
                  />
                  <Typography
                    variant="h3"
                    sx={{
                      flexShrink: 0,
                      letterSpacing: "4px",
                      textTransform: "uppercase",
                    }}
                  >
                    Invoice
                  </Typography>
                  <Divider
                    sx={{
                      border: "1px solid rgba(0,0,0,0.1)",
                      flexGrow: 1,
                    }}
                  />
                </Box>
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 5 }}>
                      <Typography
                        className="bg-style"
                        variant="subtitle3"
                        sx={{
                          display: "block",
                          flexShrink: 0,
                          fontWeight: 600,
                          fontSize: "16px",
                          textTransform: "capitalize",
                        }}
                      >
                        Bill to
                      </Typography>
                      <Box sx={{ mt: -0.5 }}>
                        <Typography
                          variant="h6"
                          sx={{ textTransform: "capitalize", fontSize: "22px" }}
                        >
                          {invoiceData?.to?.name}
                        </Typography>
                        <Typography
                          variant="subtitle3"
                          sx={{
                            maxWidth: "390px",
                            mt: 1.75,
                            lineHeight: 1.6,
                            display: "block",
                            fontSize: "16px",
                          }}
                        >
                          {invoiceData?.to?.address}
                        </Typography>
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        textAlign: "right",
                        alignSelf: "start",
                        "& > *": {
                          display: "flex",
                          gap: 1.25,
                          "&>*": {
                            lineHeight: 1,
                          },
                          "&>*:first-child": {
                            fontSize: "16px",
                            display: "flex",
                            justifyContent: "space-between",
                            textTransform: "capitalize",
                            width: "118px",
                            fontWeight: 600,
                          },
                          "&>*:last-child": {
                            fontSize: "16px",
                          },
                        },
                        "&>*:not(:first-child)": {
                          mt: 1.5,
                        },
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle3">
                          Invoice No. <span>:</span>
                        </Typography>
                        <Typography variant="subtitle3">
                          {invoiceData?.invoiceNumber}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle3">
                          Invoice Date <span>:</span>
                        </Typography>
                        <Typography variant="subtitle3">
                          {moment(invoiceData?.invoiceDate).format(
                            "DD/MM/YYYY"
                          )}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle3">
                          Due Date <span>:</span>
                        </Typography>
                        <Typography variant="subtitle3">
                          {moment(invoiceData?.invoiceDueDate).format(
                            "DD/MM/YYYY"
                          )}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {/* <Box
                sx={{
                  mt: 8.25,
                  display: "flex",
                  gap: 5,
                }}
              >
                <Typography
                  className="bg-style"
                  variant="subtitle3"
                  sx={{
                    flexShrink: 0,
                    fontWeight: 600,
                    fontSize: "16px",
                    textTransform: "capitalize",
                  }}
                >
                  Project
                </Typography>
                <Box sx={{ mt: -0.5 }}>
                  <Typography
                    variant="h6"
                    sx={{ textTransform: "capitalize", fontSize: "22px" }}
                  >
                    Shunyavkash CRM
                  </Typography>
                  <Typography
                    variant="subtitle3"
                    sx={{
                      maxWidth: "390px",
                      mt: 1.75,
                      lineHeight: 1.6,
                      display: "block",
                      fontSize: "16px",
                    }}
                  >
                    In this project we have created design & dynamic.
                  </Typography>
                </Box>
              </Box> */}
                  <TableContainer
                    component={Paper}
                    sx={{
                      mt: 7,
                      mb: 3.5,
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
                          fontSize: "16px",
                          border: 0,
                        },
                      }}
                    >
                      <TableHead>
                        <TableRow
                          sx={{
                            "& th": {
                              lineHeight: 1,
                              fontWeight: 600,
                              p: 0,
                              "& span": {
                                bgcolor: "text.primary",
                                fontWeight: "700",
                                display: "block",
                                color: "white",
                                p: 2,
                              },
                              "&:first-child span": {
                                borderRadius: "10px 0 0 10px",
                              },
                              "&:last-child span": {
                                borderRadius: "0 10px 10px 0",
                              },
                            },
                          }}
                        >
                          <TableCell>
                            <span>description</span>
                          </TableCell>
                          <TableCell sx={{ width: "130px" }}>
                            <span>price/hours</span>
                          </TableCell>
                          <TableCell sx={{ width: "90px" }}>
                            <span>hours</span>
                          </TableCell>
                          <TableCell
                            sx={{
                              width: "108px",
                              borderRadius: "0 10px 10px 0",
                            }}
                          >
                            <span>Amount</span>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody
                        sx={{
                          "&>*": {
                            "&:nth-child(even) span": {
                              bgcolor: "#f3f3f3",
                            },
                            "&:nth-child(odd):last-child": {
                              borderBottom: "1px solid rgba(0,0,0,0.1)",
                            },
                            "&>*": {
                              "&:first-child span": {
                                borderRadius: "10px 0 0 10px",
                              },
                              "&:last-child span": {
                                borderRadius: "0 10px 10px 0",
                              },
                            },
                          },
                        }}
                      >
                        {invoiceData?.tasks.map((task) => (
                          <TableRow
                            sx={{
                              "&>*": {
                                p: "0!important",
                                fontWeight: "500",
                                "&:first-child": {
                                  maxWidth: "400px",
                                  textWrap: "wrap",
                                },
                                "&>span": {
                                  display: "block",
                                  px: "16px",
                                  py: "12px",
                                },
                              },
                            }}
                          >
                            <TableCell>
                              <span>{task.taskName}</span>
                            </TableCell>
                            <TableCell>
                              <span>${task.price_hours}</span>
                            </TableCell>
                            <TableCell>
                              <span>{task.hours}</span>
                            </TableCell>
                            <TableCell>
                              <span>${task.amount}</span>
                            </TableCell>
                          </TableRow>
                        ))}
                        {/* <TableRow
                        sx={{
                          "&>*": {
                            p: "0!important",
                            fontWeight: "500",
                            "&:first-child": {
                              maxWidth: "400px",
                              textWrap: "wrap",
                            },
                            "&>span": {
                              display: "block",
                              px: "16px",
                              py: "14px",
                            },
                          },
                        }}
                      >
                        <TableCell>
                          <span>Recurring Bill (Domain)</span>
                        </TableCell>
                        <TableCell>
                          <span>$239.00</span>
                        </TableCell>
                        <TableCell>
                          <span>3</span>
                        </TableCell>
                        <TableCell>
                          <span>$717.00</span>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&>*": {
                            p: "0!important",
                            fontWeight: "500",
                            "&:first-child": {
                              maxWidth: "400px",
                              textWrap: "wrap",
                            },
                            "&>span": {
                              display: "block",
                              px: "16px",
                              py: "14px",
                            },
                          },
                        }}
                      >
                        <TableCell>
                          <span>Recurring Bill (Domain)</span>
                        </TableCell>
                        <TableCell>
                          <span>$239.00</span>
                        </TableCell>
                        <TableCell>
                          <span>3</span>
                        </TableCell>
                        <TableCell>
                          <span>$717.00</span>
                        </TableCell>
                      </TableRow>
                      <TableRow
                        sx={{
                          "&>*": {
                            p: "0!important",
                            fontWeight: "500",
                            "&:first-child": {
                              maxWidth: "400px",
                              textWrap: "wrap",
                            },
                            "&>span": {
                              display: "block",
                              px: "16px",
                              py: "14px",
                            },
                          },
                        }}
                      >
                        <TableCell>
                          <span>Recurring Bill (Domain)</span>
                        </TableCell>
                        <TableCell>
                          <span>$239.00</span>
                        </TableCell>
                        <TableCell>
                          <span>3</span>
                        </TableCell>
                        <TableCell>
                          <span>$717.00</span>
                        </TableCell>
                      </TableRow> */}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Box
                    sx={{
                      ml: "auto",
                      maxWidth: "fit-content",
                      "&>*": {
                        "&:not(:first-child)": { mt: 1.75 },
                        pl: 1.75,
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8.75,
                        "&>*": {
                          lineHeight: "1!important",
                          "&:first-child": {
                            textTransform: "capitalize",
                            width: "150px",
                          },
                          "&:last-child": {
                            width: "92px",
                            pr: 0.5,
                          },
                        },
                      },
                    }}
                  >
                    <Box>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        subtotal
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        $
                        {invoiceData?.totals.subTotal
                          ? invoiceData.totals.subTotal
                          : "00.00"}
                      </Typography>
                    </Box>
                    {invoiceData?.totals?.discountRS && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "16px", fontWeight: 600 }}
                        >
                          Discount (
                          {invoiceData?.totals.discountPer
                            ? invoiceData.totals.discountPer
                            : "0"}
                          %)
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "16px", fontWeight: 500 }}
                        >
                          $
                          {invoiceData?.totals?.discountRS
                            ? invoiceData.totals.discountRS
                            : "00.00"}
                        </Typography>
                      </Box>
                    )}
                    {invoiceData?.totals?.salesTax && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "16px", fontWeight: 600 }}
                        >
                          tax
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: "16px", fontWeight: 500 }}
                        >
                          $
                          {invoiceData?.totals?.salesTax
                            ? invoiceData.totals.salesTax
                            : "00.00"}
                        </Typography>
                      </Box>
                    )}

                    <Box
                      sx={{
                        py: 1.75,
                        bgcolor: "text.primary",
                        borderRadius: 2.5,
                        color: "white",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: 700, fontSize: "16px" }}
                      >
                        total
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          fontSize: "16px",
                        }}
                      >
                        $
                        {invoiceData?.totals.total
                          ? invoiceData.totals.total
                          : "00.00"}
                      </Typography>
                    </Box>
                  </Box>
                  {/* <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                    gap: 2,
                  }}
                >
                  <Box sx={{ maxWidth: "450px" }}>
                    <Box sx={{ maxWidth: "fit-content" }}>
                      <Box>
                        <Typography
                          variant="h6"
                          className="bg-style"
                          sx={{
                            position: "relative",
                            fontSize: "20px",
                            mb: 1.25,
                            pb: 1.25,
                            display: "inline-block",
                            "&:before": {
                              content: '""',
                              position: "absolute",
                              bottom: 0,
                              left: 0,
                              width: "150px",
                              height: "1px",
                              bgcolor: "rgba(0,0,0,0.2)",
                            },
                          }}
                        >
                          Bank Details
                        </Typography>
                        <Typography>
                          Payment can be transfer via bank transfer to below
                          details.
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          mt: 3.5,
                          "&>*": {
                            display: "flex",
                            gap: 1.25,
                            "&:not(:first-child)": { mt: 1.75 },
                            "&>*": {
                              fontSize: "16px!important",
                              lineHeight: "1!important",
                              textTransform: "capitalize",
                              "&:first-child": {
                                width: "110px",
                                display: "flex",
                                justifyContent: "space-between",
                                fontWeight: 600,
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
                            {invoiceData.bank.bankName}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2">
                            A/c No.<span>:</span>
                          </Typography>
                          <Typography variant="subtitle2">
                            {invoiceData.bank.accountNumber}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2">
                            A/c Name<span>:</span>
                          </Typography>
                          <Typography variant="subtitle2">
                            {invoiceData.bank.holderName}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="subtitle2">
                            IFSC Code<span>:</span>
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            sx={{ textTransform: "uppercase" }}
                          >
                            {invoiceData.bank.IFSC}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {invoiceData.note && (
                      <Box sx={{ mt: 7.25 }}>
                        <Typography
                          variant="h6"
                          sx={{ fontSize: "20px", textTransform: "capitalize" }}
                        >
                          notes
                        </Typography>
                        <Box
                          sx={{
                            mt: 1.75,
                          }}
                        >
                          <Typography
                            variant="subtitle3"
                            sx={{
                              lineHeight: 1.6,
                              display: "block",
                              fontSize: "16px",
                            }}
                          >
                            {invoiceData.note}
                          </Typography>
                        </Box>
                      </Box>
                    )}
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
                      src={invoiceData.signature}
                      style={{
                        maxHeight: "inherit",
                        width: "100%",
                        display: "block",
                      }}
                      alt=""
                    ></img>
                  </Box>
                </Box> */}
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
                <Box sx={{ maxWidth: "450px" }}>
                  <Box sx={{ maxWidth: "fit-content" }}>
                    <Box>
                      <Typography
                        variant="h6"
                        className="bg-style"
                        sx={{
                          position: "relative",
                          fontSize: "20px",
                          mb: 1.25,
                          pb: 1.25,
                          display: "inline-block",
                          "&:before": {
                            content: '""',
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "150px",
                            height: "1px",
                            bgcolor: "rgba(0,0,0,0.2)",
                          },
                        }}
                      >
                        Bank Details
                      </Typography>
                      <Typography>
                        Payment can be transfer via bank transfer to below
                        details.
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        mt: 3.5,
                        "&>*": {
                          display: "flex",
                          gap: 1.25,
                          "&:not(:first-child)": { mt: 1.75 },
                          "&>*": {
                            fontSize: "16px!important",
                            lineHeight: "1!important",
                            textTransform: "capitalize",
                            "&:first-child": {
                              width: "110px",
                              display: "flex",
                              justifyContent: "space-between",
                              fontWeight: 600,
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
                          {invoiceData.bank.bankName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          IFSC Code<span>:</span>
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ textTransform: "uppercase" }}
                        >
                          {invoiceData.bank.IFSC}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          A/c Name<span>:</span>
                        </Typography>
                        <Typography variant="subtitle2">
                          {invoiceData.bank.holderName}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2">
                          A/c No.<span>:</span>
                        </Typography>
                        <Typography variant="subtitle2">
                          {invoiceData.bank.accountNumber}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                  {invoiceData.note && (
                    <Box sx={{ mt: 7.25 }}>
                      <Typography
                        variant="h6"
                        sx={{ fontSize: "20px", textTransform: "capitalize" }}
                      >
                        notes
                      </Typography>
                      <Box
                        sx={{
                          mt: 1.75,
                        }}
                      >
                        <Typography
                          variant="subtitle3"
                          sx={{
                            lineHeight: 1.6,
                            display: "block",
                            fontSize: "16px",
                          }}
                        >
                          {invoiceData.note}
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
                {invoiceData.signature && (
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
                      src={invoiceData.signature}
                      style={{
                        maxHeight: "inherit",
                        width: "100%",
                        display: "block",
                      }}
                      alt="signature"
                    />
                  </Box>
                )}
              </Box>
            </Stack>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                mt: 2.5,
              }}
            >
              <ThemeButton
                success
                Text={view ? "download" : "generate"}
                onClick={() => addInvoice()}
              />
              <ThemeButton
                discard
                Text="back"
                onClick={() => {
                  view
                    ? navigate("/invoices")
                    : navigate(`/invoices/add/${invoiceNumber}`);
                }}
              />
            </Box>
          </Box>
        </Box>
      )}
    </>
  );
}
