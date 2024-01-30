import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/store/useAuth";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import moment from "moment";
import { Box } from "@mui/material";
import ThemeButton from "../component/ThemeButton";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import SectionHeader from "../component/SectionHeader";
import html2pdf from "html2pdf.js";

export default function InvoicePDF() {
  useEffect(() => {
    document.getElementsByTagName("body")[0].style.fontSize = "12px";
  }, []);
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [base64Sign, setBase64Sign] = useState(false);
  const { accessToken } = useAuth();
  const { invoiceNumber } = useParams();
  // const { toPDF, targetRef } = usePDF({ filename: `${invoiceNumber}.pdf` });
  const { invoiceData } = useInvoiceStore();
  const navigate = useNavigate();
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const location = useLocation();
  let view = location.pathname.includes("/view/") ? true : false;
  // add invoice
  const addInvoice = async () => {
    try {
      let node = document.getElementById("pdf-reports");

      let component_element = node.innerHTML;

      var opt = {
        filename: `${invoiceNumber}.pdf`,
        margin: [0.3, 0],
        image: { type: "jpeg", quality: 0.98 },
        enableLinks: true,
        html2canvas: { scale: 3, bottom: 20, letterRendering: true },
        jsPDF: { unit: "mm", format: "A4", orientation: "portrait" },
      };
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
          html2pdf()
            .set(opt)
            .from(component_element)
            .toContainer()
            .toCanvas()
            .toImg()
            .toPdf()
            .save();

          setSnack("PDF download successfully.");
          navigate("/invoices");
        }
        if (res.status === 409) {
          let errorMessage = res.data.message;
          setSnack(errorMessage, "warning");
        }
      } else {
        html2pdf()
          .set(opt)
          .from(component_element)
          .toContainer()
          .toCanvas()
          .toImg()
          .toPdf()
          .save();
        setSnack("PDF download successfully.");
      }
    } catch (error) {
      let errorMessage =
        error.response?.data?.message || error || "Something went wrong.";
      setSnack(errorMessage, "warning");
    }
  };
  function imageUrlToBase64(imageUrl) {
    return fetch(imageUrl)
      .then((response) => response.blob())
      .then(
        (blob) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => setBase64Sign(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          })
      );
  }
  useEffect(() => {
    if (!invoiceData) navigate("/invoices");
    imageUrlToBase64(invoiceData?.signature);
  }, [invoiceData]);

  return (
    <>
      {" "}
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
          <SectionHeader
            Title={`${view ? "View" : "Preview"} Invoice`}
            style={{ textAlign: "center" }}
          />
          <table
            id="pdf-reports"
            style={{
              width: "100%",
              fontFamily: '"Open Sans",sans-serif',
              fontSize: "12px",
              backgroundColor: "#F3F4F9",
              color: "#2A4062",
            }}
            cellSpacing={0}
          >
            <tbody>
              <tr>
                <td>
                  <table
                    style={{
                      width: "760px",
                      marginLeft: "auto",
                      marginRight: "auto",
                      background: "white",
                      padding: "20px",
                      borderRadius: "10px",
                      backgroundImage: invoiceData.watermark
                        ? "url(/images/watermark-bg.png)"
                        : "",
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
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
                                  <table
                                    style={{ width: "100%" }}
                                    cellSpacing={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td>
                                          <h4
                                            style={{
                                              fontSize: "22px",
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
                                              maxHeight: "40px",
                                              maxWidth: "250px",
                                              minWidth: "250px",
                                            }}
                                          >
                                            <img
                                              src="/images/logo.svg"
                                              style={{
                                                maxHeight: "inherit",
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
                                  <table
                                    style={{ width: "100%" }}
                                    cellSpacing={0}
                                  >
                                    <tbody>
                                      <tr>
                                        <td>
                                          <p
                                            style={{
                                              lineHeight: "1.4",
                                              display: "block",
                                              fontWeight: 500,
                                              width: "324px",
                                            }}
                                          >
                                            <div>
                                              {invoiceData.from.address}
                                            </div>{" "}
                                            <div>
                                              {invoiceData.from.address2}
                                            </div>
                                            <div>
                                              {invoiceData.from.landmark}
                                            </div>{" "}
                                            <div>
                                              {invoiceData.from.pincode}
                                            </div>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div style={{ marginTop: "18px" }}>
                                            <div
                                              style={{
                                                fontWeight: 500,
                                                lineHeight: 1,
                                                display: "block",
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
                                              }}
                                            >
                                              {invoiceData.from.email}
                                            </div>
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
                            style={{ width: "100%", margin: "30px 0" }}
                            cellSpacing={0}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <hr style={{ border: "1px solid #E6E8F0" }} />
                                </td>
                                <td style={{ width: "176px" }}>
                                  <h3
                                    style={{
                                      fontSize: "30px",
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
                                <td
                                  style={{
                                    verticalAlign: "top",
                                    width: "70px",
                                  }}
                                >
                                  <div
                                    style={{
                                      fontWeight: 600,
                                      textTransform: "capitalize",
                                      lineHeight: "1.1",
                                      display: "block",
                                      marginTop: "4px",
                                      marginRight: "20px",
                                    }}
                                  >
                                    bill to
                                  </div>
                                </td>
                                <td style={{ width: "324px" }}>
                                  <div>
                                    <h6
                                      style={{
                                        fontWeight: 700,
                                        lineHeight: "1.1",
                                        textTransform: "capitalize",
                                        fontSize: "16px",
                                      }}
                                    >
                                      {invoiceData?.to?.name}
                                    </h6>
                                    <p
                                      style={{
                                        marginTop: "12px",
                                        lineHeight: "1.4",
                                        display: "block",
                                        fontWeight: 500,
                                      }}
                                    >
                                      {invoiceData?.to?.address
                                        .split("\n")
                                        .map((line, index) => (
                                          <div key={index}>{line}</div>
                                        ))}
                                    </p>
                                  </div>
                                </td>
                                <td
                                  align="right"
                                  style={{ verticalAlign: "top" }}
                                >
                                  <table cellSpacing={0}>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div
                                            style={{
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
                                              textTransform: "capitalize",
                                              minWidth: "118px",
                                              paddingRight: "10px",
                                              fontWeight: 600,
                                              lineHeight: 1,
                                              marginTop: "10px",
                                            }}
                                          >
                                            Invoice Date
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            style={{
                                              lineHeight: 1,
                                              marginTop: "10px",
                                              marginRight: "10px",
                                            }}
                                          >
                                            :
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            style={{
                                              fontWeight: 500,
                                              lineHeight: 1,
                                              marginTop: "10px",
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
                                              textTransform: "capitalize",
                                              minWidth: "118px",
                                              paddingRight: "10px",
                                              fontWeight: 600,
                                              lineHeight: 1,
                                              marginTop: "10px",
                                            }}
                                          >
                                            Due Date
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            style={{
                                              lineHeight: 1,
                                              marginTop: "10px",
                                              marginRight: "10px",
                                            }}
                                          >
                                            :
                                          </div>
                                        </td>
                                        <td>
                                          <div
                                            style={{
                                              fontWeight: 500,
                                              lineHeight: 1,
                                              marginTop: "10px",
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
                              marginTop: "36px",
                              marginBottom: "10px",
                            }}
                            cellSpacing={0}
                          >
                            <thead>
                              <tr align="left">
                                <th>
                                  <div
                                    style={{
                                      backgroundColor: "#2A4062",
                                      fontWeight: 700,
                                      display: "block",
                                      color: "white",
                                      padding: "14px",
                                      borderRadius: "10px 0 0 10px",
                                      textTransform: "capitalize",
                                      lineHeight: 1,
                                    }}
                                  >
                                    description
                                  </div>
                                </th>
                                <th style={{ width: "112px" }}>
                                  <div
                                    style={{
                                      backgroundColor: "#2A4062",
                                      fontWeight: 700,
                                      display: "block",
                                      color: "white",
                                      padding: "14px",
                                      textTransform: "capitalize",
                                      lineHeight: 1,
                                    }}
                                  >
                                    price/hours
                                  </div>
                                </th>
                                <th style={{ width: "70px" }}>
                                  <div
                                    style={{
                                      backgroundColor: "#2A4062",
                                      fontWeight: 700,
                                      display: "block",
                                      color: "white",
                                      padding: "14px",
                                      textTransform: "capitalize",
                                      lineHeight: 1,
                                    }}
                                  >
                                    hours
                                  </div>
                                </th>
                                <th style={{ width: "96px" }}>
                                  <div
                                    style={{
                                      backgroundColor: "#2A4062",
                                      fontWeight: 700,
                                      display: "block",
                                      color: "white",
                                      padding: "14px",
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
                            <tbody
                              style={{
                                "&>*": {
                                  "&:nth-child(even) td": {
                                    bgcolor: "#f3f3f3",
                                  },
                                  "&:nth-child(odd):last-child": {
                                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                                  },
                                  "&>*": {
                                    "&:first-child td": {
                                      borderRadius: "10px 0 0 10px",
                                    },
                                    "&:last-child td": {
                                      borderRadius: "0 10px 10px 0",
                                    },
                                  },
                                },
                              }}
                            >
                              {invoiceData?.tasks.map((task, index) => (
                                <tr
                                  style={{
                                    backgroundColor:
                                      index % 2 !== 0 &&
                                      "rgb(243 243 243 / 50%)",
                                  }}
                                >
                                  <td>
                                    <div
                                      style={{
                                        display: "block",
                                        paddingLeft: "16px",
                                        padding: "6px",
                                        borderRadius: "10px 0 0 10px",
                                        lineHeight: "1.4",
                                      }}
                                    >
                                      {task.taskName}
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      style={{
                                        display: "block",
                                        paddingLeft: "16px",
                                        padding: "6px",
                                      }}
                                    >
                                      ${task.price_hours}
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      style={{
                                        display: "block",
                                        paddingLeft: "16px",
                                        padding: "6px",
                                      }}
                                    >
                                      {task.hours}
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      style={{
                                        display: "block",
                                        paddingLeft: "16px",
                                        padding: "6px",
                                        borderRadius: "0 10px 10px 0",
                                      }}
                                    >
                                      ${task.amount}
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          <table
                            style={{ width: "100%", paddingRight: "8px" }}
                            cellSpacing={0}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <table align="right" cellSpacing={0}>
                                    <tbody>
                                      <tr>
                                        <td style={{ width: "195px" }}>
                                          <div
                                            style={{
                                              textTransform: "capitalize",
                                              fontWeight: 700,
                                              lineHeight: 1,
                                              paddingRight: "25px",
                                              paddingLeft: "14px",
                                            }}
                                          >
                                            subtotal
                                          </div>
                                        </td>
                                        <td style={{ width: "82px" }}>
                                          <div
                                            style={{
                                              fontWeight: 700,
                                              lineHeight: 1,
                                            }}
                                          >
                                            $
                                            {invoiceData?.totals.subTotal
                                              ? invoiceData.totals.subTotal
                                              : "00.00"}
                                          </div>
                                        </td>
                                      </tr>

                                      {invoiceData?.totals?.discountRS && (
                                        <tr>
                                          <td style={{ width: "195px" }}>
                                            <div
                                              style={{
                                                textTransform: "capitalize",
                                                fontWeight: 500,
                                                lineHeight: 1,
                                                paddingRight: "25px",
                                                marginTop: "14px",
                                                paddingLeft: "14px",
                                              }}
                                            >
                                              Discount (
                                              {invoiceData?.totals.discountPer
                                                ? invoiceData.totals.discountPer
                                                : "0"}
                                              %)
                                            </div>
                                          </td>
                                          <td style={{ width: "82px" }}>
                                            <div
                                              style={{
                                                fontWeight: 500,
                                                lineHeight: 1,
                                                marginTop: "14px",
                                              }}
                                            >
                                              $
                                              {invoiceData?.totals?.discountRS
                                                ? invoiceData.totals.discountRS
                                                : "00.00"}
                                            </div>
                                          </td>
                                        </tr>
                                      )}

                                      {invoiceData?.totals?.salesTax && (
                                        <tr>
                                          <td style={{ width: "195px" }}>
                                            <div
                                              style={{
                                                textTransform: "capitalize",
                                                fontWeight: 500,
                                                lineHeight: 1,
                                                paddingRight: "25px",
                                                marginTop: "14px",
                                                paddingLeft: "14px",
                                              }}
                                            >
                                              tax
                                            </div>
                                          </td>
                                          <td style={{ width: "82px" }}>
                                            <div
                                              style={{
                                                fontWeight: 500,
                                                lineHeight: 1,
                                                marginTop: "14px",
                                              }}
                                            >
                                              $
                                              {invoiceData?.totals?.salesTax
                                                ? invoiceData.totals.salesTax
                                                : "00.00"}
                                            </div>
                                          </td>
                                        </tr>
                                      )}
                                      <tr>
                                        <td style={{ width: "195px" }}>
                                          <div
                                            style={{
                                              textTransform: "capitalize",
                                              fontWeight: 700,
                                              lineHeight: 1,
                                              paddingRight: 25,
                                              marginTop: "14px",
                                              paddingLeft: "14px",
                                              paddingTop: "14px",
                                              paddingBottom: "14px",
                                              backgroundColor: "#2A4062",
                                              borderRadius: "10px 0 0 10px",
                                              color: "white",
                                            }}
                                          >
                                            total
                                          </div>
                                        </td>
                                        <td style={{ width: "82px" }}>
                                          <div
                                            style={{
                                              fontWeight: 700,
                                              lineHeight: 1,
                                              marginTop: "14px",
                                              paddingRight: "14px",
                                              paddingTop: "14px",
                                              paddingBottom: "14px",
                                              backgroundColor: "#2A4062",
                                              borderRadius: "0 10px 10px 0",
                                              color: "white",
                                            }}
                                          >
                                            $
                                            {invoiceData?.totals.total
                                              ? invoiceData.totals.total
                                              : "00.00"}
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          {invoiceData.tasks.length > 7 && (
                            <div style={{ pageBreakBefore: "always" }}>
                              &nbsp;
                            </div>
                          )}

                          <table
                            style={{
                              width: "100%",
                              marginTop: "10px",
                            }}
                            cellSpacing={0}
                          >
                            <tbody>
                              <tr>
                                <td>
                                  <table
                                    style={{ width: "410px" }}
                                    cellSpacing={0}
                                  >
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
                                                      fontSize: "16px",
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
                                                      width: "150px",
                                                    }}
                                                  />
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <p
                                                    style={{
                                                      fontWeight: 400,
                                                      lineHeight: "1.4",
                                                    }}
                                                  >
                                                    Payment can be transfer via
                                                    bank transfer to below
                                                    details.
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
                                            style={{ margin: "24px 0 36px" }}
                                            cellSpacing={0}
                                          >
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <div
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                      minWidth: "118px",
                                                      paddingRight: "10px",
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
                                                      marginRight: "10px",
                                                    }}
                                                  >
                                                    :
                                                  </div>
                                                </td>
                                                <td>
                                                  <div
                                                    style={{
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
                                                      textTransform:
                                                        "capitalize",
                                                      minWidth: "118px",
                                                      paddingRight: "10px",
                                                      fontWeight: 600,
                                                      lineHeight: 1,
                                                      marginTop: "12px",
                                                    }}
                                                  >
                                                    IFSC Code
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
                                                      fontWeight: 500,
                                                      lineHeight: 1,
                                                      marginTop: "12px",
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
                                                      textTransform:
                                                        "capitalize",
                                                      minWidth: "118px",
                                                      paddingRight: "10px",
                                                      fontWeight: 600,
                                                      lineHeight: 1,
                                                      marginTop: "12px",
                                                    }}
                                                  >
                                                    A/C Name
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
                                                      fontWeight: 500,
                                                      lineHeight: 1,
                                                      marginTop: "12px",
                                                    }}
                                                  >
                                                    {
                                                      invoiceData.bank
                                                        .holderName
                                                    }
                                                  </div>
                                                </td>
                                              </tr>
                                              <tr>
                                                <td>
                                                  <div
                                                    style={{
                                                      textTransform:
                                                        "capitalize",
                                                      minWidth: "118px",
                                                      paddingRight: "10px",
                                                      fontWeight: 600,
                                                      lineHeight: 1,
                                                      marginTop: "12px",
                                                    }}
                                                  >
                                                    A/C No.
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
                                                      fontWeight: 500,
                                                      lineHeight: 1,
                                                      marginTop: "12px",
                                                    }}
                                                  >
                                                    {
                                                      invoiceData.bank
                                                        .accountNumber
                                                    }
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
                                                        fontSize: "16px",
                                                        textTransform:
                                                          "capitalize",
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
                                                        lineHeight: "1.4",
                                                        display: "block",
                                                        fontWeight: 500,
                                                        marginTop: "14px",
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
                                                maxHeight: "50px",
                                                maxWidth: "150px",
                                                minWidth: "100px",
                                                margin: "20px 25px 0 0",
                                              }}
                                            >
                                              <img
                                                src={base64Sign}
                                                style={{
                                                  maxHeight: "inherit",
                                                  display: "block",
                                                  marginLeft: "auto",
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
                  : navigate(
                      `/invoices/${
                        location.pathname.includes("/edit/") ? "edit" : "add"
                      }/${invoiceNumber}`
                    );
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
