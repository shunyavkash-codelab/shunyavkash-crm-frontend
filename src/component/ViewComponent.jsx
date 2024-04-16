import React from "react";
import { Grid, Box, Tooltip } from "@mui/material";
import DetailsList from "./employee/DetailsList";
import DateIcon from "@mui/icons-material/DateRangeOutlined";
import TitleIcon from "@mui/icons-material/Grid3x3";
import EmailIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBoxOutlined";
import CollaboratorIcon from "@mui/icons-material/PeopleOutlineOutlined";
import InvoiceTypeIcon from "@mui/icons-material/ReceiptOutlined";
import PaymentIcon from "@mui/icons-material/Payment";
import InvoiceImageIcon from "@mui/icons-material/DescriptionOutlined";
import InvoiceOwnerIcon from "@mui/icons-material/PermIdentityOutlined";

const ViewTransaction = ({ selectedTransaction, acFormattedDate }) => {
  const details = [
    {
      title: "Date",
      text: acFormattedDate || "N/A",
      icon: <DateIcon />,
    },
    {
      title: "Title",
      text: selectedTransaction?.title || "N/A",
      icon: <TitleIcon />,
    },
    {
      title: "Description",
      text: selectedTransaction?.description || "N/A",
      icon: <EmailIcon />,
    },
    {
      title: "Amount",
      text: "₹" + selectedTransaction?.amount || "N/A",
      icon: <AccountBoxIcon />,
    },
    ...(selectedTransaction?.type === "expense"
      ? [
          {
            title: "Expense Type",
            text: selectedTransaction?.expenseType || "N/A",
            icon: <AccountBoxIcon />,
            textStyle: { textTransform: "capitalize" },
          },
        ]
      : []),
    ...(selectedTransaction?.type === "income"
      ? [
          {
            title: "Collaborator",
            text: selectedTransaction?.collaborator || "N/A",
            icon: <CollaboratorIcon />,
            textStyle: { textTransform: "capitalize" },
          },
        ]
      : []),
    {
      title: "Invoice Type",
      text: selectedTransaction?.invoiceType || "N/A",
      icon: <InvoiceTypeIcon />,
      textStyle: { textTransform: "capitalize" },
    },
    {
      title: "Invoice Owner",
      text: selectedTransaction?.invoiceOwner || "N/A",
      icon: <InvoiceOwnerIcon />,
      textStyle: { textTransform: "capitalize" },
    },
    {
      title: "Payment Method",
      text: selectedTransaction?.paymentMethod || "N/A",
      icon: <PaymentIcon />,
      textStyle: { textTransform: "capitalize" },
    },
  ];
  return (
    <Grid container rowSpacing={5} columnSpacing={1.5}>
      {details.map((detail, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <DetailsList
            Title={detail.title}
            Text={detail.text}
            Icon={detail.icon}
            TextStyle={detail.textStyle}
          />
        </Grid>
      ))}
      {selectedTransaction?.invoiceUpload && (
        <Grid item xs={12} sm={6} md={4}>
          <DetailsList
            Title={"Invoice"}
            Icon={<InvoiceImageIcon />}
            TextStyle={{ display: "none" }}
          />
          <Box>
            <Tooltip title="Invoice" arrow>
              <img
                src={selectedTransaction.invoiceUpload}
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
      )}
    </Grid>
  );
};

export default ViewTransaction;
