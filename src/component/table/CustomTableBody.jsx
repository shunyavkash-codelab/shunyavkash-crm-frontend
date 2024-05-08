import { TableBody, TableRow } from "@mui/material";
import React from "react";
import CustomTableCell from "./CustomTableCell";

export default function CustomTableBody({ records }) {
  return (
    <TableBody>
      {records.map((row) => (
        <TableRow key={row.key}>
          {row.row.map((cell, index) => (
            <CustomTableCell {...cell} key={index} />
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
