import React, { useState } from "react";
import CustomTableCell from "./CustomTableCell";
import { TableRow } from "@mui/material";
import { APIS } from "../../api/apiList";
import useApi from "../../hooks/useApi";
import { useSnack } from "../../hooks/store/useSnack";

const statusList = [
  { label: "Paid", value: "paid" },
  { label: "Unpaid", value: "unpaid" },
  { label: "Pending", value: "pending" },
];

export default function InvoiceListTableRow({
  invoice,
  setSelectAllClick,
  selectAllClick,
  setNumSelected,
  numSelected,
  index,
  editInvoice,
  viewInvoice,
  setOpenDelete,
}) {
  const [status, setStatus] = useState(invoice.status);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const handleSelectChange = (event) => {
    setStatus(event.target.value);
    statusChangeInvoice(event.target.value);
  };

  const statusChangeInvoice = async (value) => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.EDIT,
        method: "post",
        data: { invoiceNumber: invoice.invoiceNumber, status: value },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setNumSelected([]);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const tableRow = {
    key: invoice._id,
    row: [
      {
        type: "checkbox",
        checked: selectAllClick || numSelected.includes(invoice._id),
        labelId: `enhanced-table-checkbox-${index}`,
        handleCheck: (e) => {
          if (e.target.checked) {
            setNumSelected([...numSelected, invoice._id]);
          } else {
            setSelectAllClick(false);
            let newData = numSelected.filter((id) => id !== invoice._id);
            setNumSelected(newData);
          }
        },
      },
      { type: "box", value: invoice.projectName },
      { type: "box", value: invoice.clientName },
      { type: "box", value: invoice.userName },
      { type: "box", value: invoice.invoiceNumber },
      { type: "date", value: invoice.invoiceDate },
      { type: "date", value: invoice.invoiceDueDate },
      {
        type: "select",
        name: "status",
        label: "Status",
        options: statusList,
        value: status,
        handleSelectChange: (e) => {
          handleSelectChange(e);
        },
        labelId: `enhanced-table-select-${index}`,
      },
      { type: "box", value: "$" + invoice.totals.total?.toLocaleString() },
      {
        type: "edit",
        value: invoice.type,
        onEdit: () => editInvoice(invoice.invoiceNumber, invoice),
        onOpen: () => {
          viewInvoice(invoice.invoiceNumber, invoice);
        },
        onDelete: () => {
          setOpenDelete(true);
          setNumSelected([invoice._id]);
        },
        disabled: numSelected.length > 0 ? true : false,
      },
    ],
  };
  return (
    <>
      <TableRow>
        {tableRow.row.map((cell) => (
          <CustomTableCell {...cell} key={tableRow.key} />
        ))}
      </TableRow>
    </>
  );
}
