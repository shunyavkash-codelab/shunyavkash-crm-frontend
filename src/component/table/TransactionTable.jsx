import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  TableFooter,
  Box,
  Stack,
  Button,
} from "@mui/material";
import moment from "moment";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import CashIcon from "@mui/icons-material/Payments";
import BankIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";

function CustomTableCell({
  value,
  sx,
  type,
  format = "DD/MM/YYYY",
  Icon,
  onOpen,
  onDelete,
  onEdit,
}) {
  if (type === "date") {
    return <TableCell sx={sx}>{moment(value).format(format)}</TableCell>;
  }
  if (type === "box") {
    return (
      <TableCell sx={sx}>
        <Box className="truncate line-clamp-1" sx={{ textWrap: "wrap" }}>
          {value}
        </Box>
      </TableCell>
    );
  }

  if (type === "icon") {
    return (
      <TableCell sx={sx}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              display: "inline-flex",
              "& span": { opacity: "0.5" },
            }}
          >
            {Icon}
          </Box>
          <span>{value}</span>
        </Stack>
      </TableCell>
    );
  }

  if (type === "edit") {
    return (
      <TableCell sx={sx}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1.5}
          sx={{
            "& button": {
              opacity: 0.6,
              p: 0,
              minWidth: "auto",
              color: "text.primary",
              transition: "all 0.5s",
              "&:hover": {
                // color: "primary.main",
                opacity: 1,
              },
            },
            "& svg": {
              fontSize: { xs: "20px", sm: "21px" },
            },
          }}
        >
          <Button disableRipple onClick={onOpen}>
            <VisibilityIcon sx={{ color: "secondary.main" }} />
          </Button>
          <Link to={onEdit}>
            <Button disableRipple>
              <CreateIcon sx={{ color: "primary.main" }} />
            </Button>
          </Link>
          <Button disableRipple onClick={onDelete}>
            <DeleteIcon sx={{ color: "error.main" }} />
          </Button>
        </Stack>
      </TableCell>
    );
  }

  return <TableCell sx={sx}>{value}</TableCell>;
}

const TransactionTable = ({
  transactionList,
  TABLE_HEADINGS,
  sortField,
  orderBy,
  createSortHandler,
  filter,
  totalAmount,
  totalIncome,
  totalExpense,
  handleOpen,
  setSelectedTransaction,
  openDelete,
  setOpenDelete,
  deleteTransaction,
  selectTransaction,
  setSelectTransaction,
}) => {
  const TABLE_BODY = transactionList.map((account) => ({
    key: account._id,
    row: [
      { type: "date", value: account.date },
      { type: "box", value: account.title },
      { type: "box", value: account.description },
      {
        type: "icon",
        value: account.paymentMethod,
        Icon: () => {
          if (account.paymentMethod === "cash") {
            return <CashIcon sx={{ color: "#43991e" }} />;
          }
          if (account.paymentMethod === "bankTransfer") {
            return <BankIcon sx={{ color: "#3a85ff" }} />;
          }
          if (account.paymentMethod === "upi") {
            return (
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
                sx={{
                  height: "24px",
                  width: "24px",
                }}
              >
                {" "}
                <img src="/images/upi.svg" alt="upi" />{" "}
              </Stack>
            );
          }
        },
      },
      { type: "box", value: account.invoiceType },
      { value: account.invoiceOwner || "-" },
      { value: account.collaborator || "-" },
      { value: account.expenseType || "-" },
      {
        sx: {
          display: filter !== "expense" ? "table-cell" : "none",
          textAlign: "center",
          color: "success.main",
        },
        value:
          account.type === "income"
            ? "₹" + account.amount.toLocaleString()
            : "-",
      },
      {
        sx: {
          display: filter !== "income" ? "table-cell" : "none",
          textAlign: "center",
          color: "review.main",
        },
        value:
          account.type === "expense"
            ? "₹" + account.amount.toLocaleString()
            : "-",
      },

      {
        type: "edit",
        value: account.type,
        onEdit: `./edit/${account._id}`,
        onOpen: () => {
          handleOpen();
          setSelectedTransaction(account);
        },
        onDelete: () => {
          setOpenDelete(true);
          setSelectTransaction(account._id);
        },
      },
    ],
  }));

  return (
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
          "& thead > tr > th": {
            backgroundColor: "#F8F9FA",
          },
          "& th,& td": {
            border: 0,
            padding: "14px",
            borderBottom: "1px solid rgba(224, 224, 224, 1)",
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
                fontWeight: 600,
                padding: "14px",
              },
            }}
          >
            {TABLE_HEADINGS.map((heading) => (
              <TableCell
                key={heading.id}
                sx={{
                  width: heading.width,
                  display:
                    heading.condition || heading.condition === undefined
                      ? "table-cell"
                      : "none",
                }}
              >
                {heading.sortable ? (
                  <TableSortLabel
                    active={sortField === heading.id}
                    direction={orderBy || "asc"}
                    onClick={() => createSortHandler(heading.id)}
                  >
                    {heading.label}
                  </TableSortLabel>
                ) : (
                  heading.label
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {TABLE_BODY.map((row) => (
            <TableRow key={row.key}>
              {row.row.map((cell, index) => (
                <CustomTableCell {...cell} key={index} />
              ))}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow
            sx={{
              "&>td": {
                fontWeight: 500,
                fontSize: "16px",
              },
            }}
          >
            <TableCell colSpan={7}></TableCell>
            <TableCell sx={{ color: "text.primary" }}>Total Balance:</TableCell>
            <TableCell
              sx={{
                color: totalAmount < 0 ? "review.main" : "success.main",
                textAlign: "center",
              }}
            >
              ₹{Math.abs(totalAmount).toLocaleString()}
            </TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>

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
            {filter !== "expense" && (
              <TableCell
                sx={{
                  color: "success.main",
                  textAlign: "center",
                }}
              >
                ₹{Math.abs(totalIncome).toLocaleString()}
              </TableCell>
            )}
            {filter !== "income" && (
              <TableCell
                sx={{
                  color: "review.main",
                  textAlign: "center",
                }}
              >
                ₹{Math.abs(totalExpense).toLocaleString()}
              </TableCell>
            )}
            <TableCell></TableCell>
          </TableRow>
        </TableFooter>
        {/* TableHead, TableBody, and TableFooter components go here */}
        {/* Make sure to adjust the JSX to use the props passed to TransactionTable */}
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
