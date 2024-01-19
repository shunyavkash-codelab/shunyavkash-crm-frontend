import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/store/useAuth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { usePDF } from "react-to-pdf";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import moment from "moment";
import { Box } from "@mui/material";
import ThemeButton from "../component/ThemeButton";

export default function InvoicePDF() {
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
    <div>
      <table
        style={{
          width: "100%",
          fontFamily: '"Open Sans",sans-serif',
          backgroundColor: "#F3F4F9",
          color: "#2A4062",
          padding: "40px",
        }}
        ref={targetRef}
        cellSpacing={0}
      >
        <tbody>
          <tr>
            <td>
              <table
                style={{
                  width: "1600px",
                  marginLeft: "auto",
                  marginRight: "auto",
                  background: "white",
                  padding: "48px",
                  borderRadius: "10px",
                }}
                cellSpacing={0}
              >
                <tbody>
                  <tr>
                    <td>
                      <table style={{ width: "100%" }} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td>
                              <table style={{ width: "100%" }} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <h4
                                        style={{
                                          fontSize: "32px",
                                          fontWeight: 700,
                                          lineHeight: 1,
                                        }}
                                      >
                                        Shunyavkash PVT. LTD
                                      </h4>
                                    </td>
                                    <td align="right">
                                      <div
                                        style={{
                                          maxHeight: "140px",
                                          maxWidth: "300px",
                                          minWidth: "300px",
                                        }}
                                      >
                                        <img
                                          src="/images/logo.svg"
                                          style={{
                                            maxHeight: "inherit",
                                            width: "100%",
                                            display: "block",
                                          }}
                                          alt="logo"
                                        />
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table style={{ width: 390 }} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <p
                                        style={{
                                          lineHeight: "1.5",
                                          display: "block",
                                          fontSize: "16px",
                                          fontWeight: 500,
                                        }}
                                      >
                                        {invoiceData.from.address}
                                        {invoiceData.from.address2}
                                        {invoiceData.from.landmark}
                                        {invoiceData.from.pincode}
                                      </p>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div
                                        style={{
                                          fontWeight: 500,
                                          lineHeight: 1,
                                          display: "block",
                                          fontSize: "16px",
                                          marginTop: "28px",
                                        }}
                                      >
                                        {invoiceData.from.mobileCode}{" "}
                                        {invoiceData.from.mobileNumber}
                                      </div>
                                      <div
                                        style={{
                                          fontWeight: 500,
                                          lineHeight: 1,
                                          marginTop: "6px",
                                          display: "block",
                                          fontSize: "16px",
                                        }}
                                      >
                                        {invoiceData.from.email}
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{ width: "100%", margin: "48px 0" }}
                        cellSpacing={0}
                      >
                        <tbody>
                          <tr>
                            <td>
                              <hr style={{ border: "1px solid #E6E8F0" }} />
                            </td>
                            <td style={{ width: 176 }}>
                              <h3
                                style={{
                                  fontSize: "36px",
                                  fontWeight: 700,
                                  lineHeight: 1,
                                  letterSpacing: 4,
                                  textTransform: "uppercase",
                                  padding: "0 16px",
                                }}
                              >
                                invoice
                              </h3>
                            </td>
                            <td>
                              <hr style={{ border: "1px solid #E6E8F0" }} />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table style={{ width: "100%" }} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td style={{ verticalAlign: "top", width: "88px" }}>
                              <div
                                style={{
                                  fontWeight: 600,
                                  fontSize: "16px",
                                  textTransform: "capitalize",
                                  lineHeight: "1.1",
                                  display: "block",
                                  marginTop: "6px",
                                  marginRight: "40px",
                                }}
                              >
                                bill to
                              </div>
                            </td>
                            <td style={{ width: "390px" }}>
                              <div>
                                <h6
                                  style={{
                                    fontWeight: 700,
                                    lineHeight: "1.1",
                                    textTransform: "capitalize",
                                    fontSize: "22px",
                                  }}
                                >
                                  {invoiceData?.to?.name}
                                </h6>
                                <p
                                  style={{
                                    marginTop: "14px",
                                    lineHeight: "1.5",
                                    display: "block",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                  }}
                                >
                                  {invoiceData?.to?.address}
                                </p>
                              </div>
                            </td>
                            <td align="right" style={{ verticalAlign: "top" }}>
                              <table cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div
                                        style={{
                                          fontSize: "16px",
                                          textTransform: "capitalize",
                                          minWidth: "118px",
                                          paddingRight: "10px",
                                          fontWeight: 600,
                                          lineHeight: 1,
                                        }}
                                      >
                                        Invoice No.
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{
                                          lineHeight: 1,
                                          marginRight: "10px",
                                        }}
                                      >
                                        :
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: 500,
                                          lineHeight: 1,
                                        }}
                                      >
                                        {invoiceData?.invoiceNumber}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div
                                        style={{
                                          fontSize: "16px",
                                          textTransform: "capitalize",
                                          minWidth: "118px",
                                          paddingRight: "10px",
                                          fontWeight: 600,
                                          lineHeight: 1,
                                          marginTop: "12px",
                                        }}
                                      >
                                        Invoice Date
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{
                                          lineHeight: 1,
                                          marginTop: "12px",
                                          marginRight: "10px",
                                        }}
                                      >
                                        :
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: 500,
                                          lineHeight: 1,
                                          marginTop: "12px",
                                        }}
                                      >
                                        {moment(
                                          invoiceData?.invoiceDate
                                        ).format("DD/MM/YYYY")}
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <div
                                        style={{
                                          fontSize: "16px",
                                          textTransform: "capitalize",
                                          minWidth: "118px",
                                          paddingRight: "10px",
                                          fontWeight: 600,
                                          lineHeight: 1,
                                          marginTop: "12px",
                                        }}
                                      >
                                        Due Date
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{
                                          lineHeight: 1,
                                          marginTop: "12px",
                                          marginRight: "10px",
                                        }}
                                      >
                                        :
                                      </div>
                                    </td>
                                    <td>
                                      <div
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: 500,
                                          lineHeight: 1,
                                          marginTop: "12px",
                                        }}
                                      >
                                        {moment(
                                          invoiceData?.invoiceDueDate
                                        ).format("DD/MM/YYYY")}
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{
                          width: "100%",
                          marginTop: "56px",
                          marginBottom: "28px",
                        }}
                        cellSpacing={0}
                      >
                        <thead>
                          <tr align="left">
                            <th>
                              <div
                                style={{
                                  fontSize: 16,
                                  backgroundColor: "#2A4062",
                                  fontWeight: 700,
                                  display: "block",
                                  color: "white",
                                  padding: 16,
                                  borderRadius: "10px 0 0 10px",
                                  textTransform: "capitalize",
                                  lineHeight: 1,
                                }}
                              >
                                description
                              </div>
                            </th>
                            <th style={{ width: 130 }}>
                              <div
                                style={{
                                  fontSize: 16,
                                  backgroundColor: "#2A4062",
                                  fontWeight: 700,
                                  display: "block",
                                  color: "white",
                                  padding: 16,
                                  textTransform: "capitalize",
                                  lineHeight: 1,
                                }}
                              >
                                price/hours
                              </div>
                            </th>
                            <th style={{ width: 90 }}>
                              <div
                                style={{
                                  fontSize: 16,
                                  backgroundColor: "#2A4062",
                                  fontWeight: 700,
                                  display: "block",
                                  color: "white",
                                  padding: 16,
                                  textTransform: "capitalize",
                                  lineHeight: 1,
                                }}
                              >
                                hours
                              </div>
                            </th>
                            <th style={{ width: 108 }}>
                              <div
                                style={{
                                  fontSize: 16,
                                  backgroundColor: "#2A4062",
                                  fontWeight: 700,
                                  display: "block",
                                  color: "white",
                                  padding: 16,
                                  borderRadius: "0 10px 10px 0",
                                  textTransform: "capitalize",
                                  lineHeight: 1,
                                }}
                              >
                                Amount
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {invoiceData?.tasks.map((task) => (
                            <tr>
                              <td>
                                <div
                                  style={{
                                    fontSize: 16,
                                    display: "block",
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    paddingTop: 12,
                                    paddingBottom: 12,
                                    borderRadius: "10px 0 0 10px",
                                    lineHeight: "1.5",
                                  }}
                                >
                                  {task.taskName}
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{
                                    fontSize: 16,
                                    display: "block",
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    paddingTop: 12,
                                    paddingBottom: 12,
                                  }}
                                >
                                  ${task.price_hours}
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{
                                    fontSize: 16,
                                    display: "block",
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    paddingTop: 12,
                                    paddingBottom: 12,
                                  }}
                                >
                                  {task.hours}
                                </div>
                              </td>
                              <td>
                                <div
                                  style={{
                                    fontSize: 16,
                                    display: "block",
                                    paddingLeft: 16,
                                    paddingRight: 16,
                                    paddingTop: 12,
                                    paddingBottom: 12,
                                    borderRadius: "0 10px 10px 0",
                                  }}
                                >
                                  ${task.amount}
                                </div>
                              </td>
                            </tr>
                          ))}
                          {/* <tr>
                            <td>
                              <div
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  borderRadius: "10px 0 0 10px",
                                  lineHeight: "1.5",
                                  backgroundColor: "#f3f3f3",
                                }}
                              >
                                ascadscv
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  backgroundColor: "#f3f3f3",
                                }}
                              >
                                $41
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  backgroundColor: "#f3f3f3",
                                }}
                              >
                                1
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  borderRadius: "0 10px 10px 0",
                                  backgroundColor: "#f3f3f3",
                                }}
                              >
                                $41
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <div
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                                  lineHeight: "1.5",
                                }}
                              >
                                ascadscv
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                                }}
                              >
                                $41
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                                }}
                              >
                                1
                              </div>
                            </td>
                            <td>
                              <div
                                style={{
                                  fontSize: 16,
                                  display: "block",
                                  paddingLeft: 16,
                                  paddingRight: 16,
                                  paddingTop: 12,
                                  paddingBottom: 12,
                                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                                }}
                              >
                                $41
                              </div>
                            </td>
                          </tr> */}
                        </tbody>
                      </table>
                      <table style={{ width: "100%" }} cellSpacing={0}>
                        <tbody>
                          <tr>
                            <td>
                              <table align="right" cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td style={{ width: 234 }}>
                                      <h6
                                        style={{
                                          textTransform: "capitalize",
                                          fontWeight: 700,
                                          fontSize: 16,
                                          lineHeight: 1,
                                          paddingRight: 25,
                                          paddingLeft: 14,
                                        }}
                                      >
                                        subtotal
                                      </h6>
                                    </td>
                                    <td style={{ width: 92 }}>
                                      <h6
                                        style={{
                                          fontWeight: 700,
                                          fontSize: 16,
                                          lineHeight: 1,
                                        }}
                                      >
                                        $
                                        {invoiceData?.totals.subTotal
                                          ? invoiceData.totals.subTotal
                                          : "00.00"}
                                      </h6>
                                    </td>
                                  </tr>
                                  {invoiceData?.totals?.discountRS && (
                                    <tr>
                                      <td style={{ width: 234 }}>
                                        <h6
                                          style={{
                                            textTransform: "capitalize",
                                            fontWeight: 500,
                                            fontSize: 16,
                                            lineHeight: 1,
                                            paddingRight: 25,
                                            marginTop: 14,
                                            paddingLeft: 14,
                                          }}
                                        >
                                          Discount (
                                          {invoiceData?.totals.discountPer
                                            ? invoiceData.totals.discountPer
                                            : "0"}
                                          %)
                                        </h6>
                                      </td>
                                      <td style={{ width: 92 }}>
                                        <h6
                                          style={{
                                            fontWeight: 500,
                                            fontSize: 16,
                                            lineHeight: 1,
                                            marginTop: 14,
                                          }}
                                        >
                                          $
                                          {invoiceData?.totals?.discountRS
                                            ? invoiceData.totals.discountRS
                                            : "00.00"}
                                        </h6>
                                      </td>
                                    </tr>
                                  )}

                                  {invoiceData?.totals?.salesTax && (
                                    <tr>
                                      <td style={{ width: 234 }}>
                                        <h6
                                          style={{
                                            textTransform: "capitalize",
                                            fontWeight: 500,
                                            fontSize: 16,
                                            lineHeight: 1,
                                            paddingRight: 25,
                                            marginTop: 14,
                                            paddingLeft: 14,
                                          }}
                                        >
                                          tax
                                        </h6>
                                      </td>
                                      <td style={{ width: 92 }}>
                                        <h6
                                          style={{
                                            fontWeight: 500,
                                            fontSize: 16,
                                            lineHeight: 1,
                                            marginTop: 14,
                                          }}
                                        >
                                          $
                                          {invoiceData?.totals?.salesTax
                                            ? invoiceData.totals.salesTax
                                            : "00.00"}
                                        </h6>
                                      </td>
                                    </tr>
                                  )}
                                  <tr>
                                    <td style={{ width: 234 }}>
                                      <h6
                                        style={{
                                          textTransform: "capitalize",
                                          fontWeight: 700,
                                          fontSize: 16,
                                          lineHeight: 1,
                                          paddingRight: 25,
                                          marginTop: 14,
                                          paddingLeft: 14,
                                          paddingTop: 14,
                                          paddingBottom: 14,
                                          backgroundColor: "#2A4062",
                                          borderRadius: "10px 0 0 10px",
                                          color: "white",
                                        }}
                                      >
                                        total
                                      </h6>
                                    </td>
                                    <td style={{ width: 92 }}>
                                      <h6
                                        style={{
                                          fontWeight: 700,
                                          fontSize: 16,
                                          lineHeight: 1,
                                          marginTop: 14,
                                          paddingRight: 14,
                                          paddingTop: 14,
                                          paddingBottom: 14,
                                          backgroundColor: "#2A4062",
                                          borderRadius: "0 10px 10px 0",
                                          color: "white",
                                        }}
                                      >
                                        $
                                        {invoiceData?.totals.total
                                          ? invoiceData.totals.total
                                          : "00.00"}
                                      </h6>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <table
                        style={{ width: "100%", marginTop: 10 }}
                        cellSpacing={0}
                      >
                        <tbody>
                          <tr>
                            <td>
                              <table style={{ width: 500 }} cellSpacing={0}>
                                <tbody>
                                  <tr>
                                    <td>
                                      <table
                                        style={{ width: "100%" }}
                                        cellSpacing={0}
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <h6
                                                style={{
                                                  fontSize: 20,
                                                  fontWeight: 700,
                                                  lineHeight: "1.1",
                                                }}
                                              >
                                                Bank Details
                                              </h6>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <hr
                                                style={{
                                                  border:
                                                    "1px solid rgba(0,0,0,0.2)",
                                                  margin: "10px 0",
                                                  width: 150,
                                                }}
                                              />
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <p
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 400,
                                                  lineHeight: "1.5",
                                                }}
                                              >
                                                Payment can be transfer via bank
                                                transfer to below details.
                                              </p>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>
                                      <table
                                        style={{ margin: "28px 0 58px" }}
                                        cellSpacing={0}
                                      >
                                        <tbody>
                                          <tr>
                                            <td>
                                              <div
                                                style={{
                                                  fontSize: 16,
                                                  textTransform: "capitalize",
                                                  minWidth: 118,
                                                  paddingRight: 10,
                                                  fontWeight: 600,
                                                  lineHeight: 1,
                                                }}
                                              >
                                                Bank Name
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                style={{
                                                  lineHeight: 1,
                                                  marginRight: 10,
                                                }}
                                              >
                                                :
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  lineHeight: 1,
                                                }}
                                              >
                                                {invoiceData.bank.bankName}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <div
                                                style={{
                                                  fontSize: 16,
                                                  textTransform: "capitalize",
                                                  minWidth: 118,
                                                  paddingRight: 10,
                                                  fontWeight: 600,
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                }}
                                              >
                                                IFSC Code
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                style={{
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                  marginRight: 10,
                                                }}
                                              >
                                                :
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                }}
                                              >
                                                {invoiceData.bank.IFSC}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <div
                                                style={{
                                                  fontSize: 16,
                                                  textTransform: "capitalize",
                                                  minWidth: 118,
                                                  paddingRight: 10,
                                                  fontWeight: 600,
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                }}
                                              >
                                                A/C Name
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                style={{
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                  marginRight: 10,
                                                }}
                                              >
                                                :
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                }}
                                              >
                                                {invoiceData.bank.holderName}
                                              </div>
                                            </td>
                                          </tr>
                                          <tr>
                                            <td>
                                              <div
                                                style={{
                                                  fontSize: 16,
                                                  textTransform: "capitalize",
                                                  minWidth: 118,
                                                  paddingRight: 10,
                                                  fontWeight: 600,
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                }}
                                              >
                                                A/C No.
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                style={{
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                  marginRight: 10,
                                                }}
                                              >
                                                :
                                              </div>
                                            </td>
                                            <td>
                                              <div
                                                style={{
                                                  fontSize: 16,
                                                  fontWeight: 500,
                                                  lineHeight: 1,
                                                  marginTop: 14,
                                                }}
                                              >
                                                {invoiceData.bank.accountNumber}
                                              </div>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                  {invoiceData.note && (
                                    <tr>
                                      <td>
                                        <table
                                          style={{ width: "100%" }}
                                          cellSpacing={0}
                                        >
                                          <tbody>
                                            <tr>
                                              <td>
                                                <h6
                                                  style={{
                                                    fontWeight: 700,
                                                    lineHeight: "1.1",
                                                    fontSize: 20,
                                                    textTransform: "capitalize",
                                                  }}
                                                >
                                                  notes
                                                </h6>
                                              </td>
                                            </tr>
                                            <tr>
                                              <td>
                                                <p
                                                  style={{
                                                    lineHeight: "1.5",
                                                    display: "block",
                                                    fontSize: 16,
                                                    fontWeight: 500,
                                                    marginTop: 14,
                                                  }}
                                                >
                                                  {invoiceData.note}
                                                </p>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </td>

                            {invoiceData.signature && (
                              <td style={{ verticalAlign: "bottom" }}>
                                <table align="right" cellSpacing={0}>
                                  <tbody>
                                    <tr>
                                      <td>
                                        <div
                                          style={{
                                            maxHeight: 80,
                                            maxWidth: 200,
                                            minWidth: 200,
                                            margin: "68px 48px 0 0",
                                          }}
                                        >
                                          <img
                                            src={invoiceData.signature}
                                            style={{
                                              maxHeight: "inherit",
                                              width: "100%",
                                              display: "block",
                                            }}
                                            alt="Sign"
                                          />
                                        </div>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            )}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
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
    </div>
  );
}
