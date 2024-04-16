import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableFooter,
  Stack,
} from "@mui/material";
import CashIcon from "@mui/icons-material/Payments";
import BankIcon from "@mui/icons-material/AccountBalance";
import CustomTableBody from "./CustomTableBody";
import CustomTableHeader from "./CustomTableHeader";
import ThemePagination from "../ThemePagination";

const TransactionTable = ({
  records,
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
  setOpenDelete,
  setSelectTransaction,
  totalPage,
  handlePageChange,
  rowsPerPage,
  onRowsPerPageChange,
  page,
}) => {
  const TABLE_BODY = records.map((account) => ({
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
                <img src="/images/upi.svg" width={"100%"} alt="upi" />{" "}
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
    <>
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
          <CustomTableHeader
            createSortHandler={createSortHandler}
            headings={TABLE_HEADINGS}
            orderBy={orderBy}
            sortField={sortField}
          />
          <CustomTableBody records={TABLE_BODY} />

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
              <TableCell sx={{ color: "text.primary" }}>
                Total Balance:
              </TableCell>
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
        </Table>
      </TableContainer>
      {/* pagination */}
      {records.length > 0 && (
        <ThemePagination
          totalPage={totalPage}
          onChange={handlePageChange}
          rowsPerPage={rowsPerPage}
          page={page}
          count={records.length}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
    </>
  );
};

export default TransactionTable;
