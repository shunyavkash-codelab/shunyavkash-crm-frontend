import { TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { Field } from "formik";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomFormikField from "./form/CustomFormikField";

export default function InvoiceTable({ formik, values, clientList, name }) {
  const location = useLocation();

  return (
    <TableRow
      sx={{
        "&>*": {
          "&:first-child": { fontWeight: "600" },
          "&:last-child": {
            px: 2,
          },
          "& > *": {
            maxWidth: "unset",
            "& input": {
              p: 1,
            },
            "& fieldset": {
              borderColor: "transparent",
            },
          },
        },
      }}
    >
      <TableCell
        sx={{
          "&>div>div": {
            p: 1,
          },
        }}
      >
        <CustomFormikField
          name={name + ".name"}
          multiline
          placeholder="Enter an items"
        />
      </TableCell>
      <TableCell>
        <CustomFormikField
          name={name + ".pricePerHours"}
          placeholder="00.00"
          inputProps={{ min: 1 }}
          type="number"
        />
      </TableCell>
      <TableCell>
        <CustomFormikField
          name={name + ".number"}
          placeholder="00"
          inputProps={{ min: 1 }}
          type="number"
        />
      </TableCell>
      <TableCell>${values.number * values.pricePerHours || 0}</TableCell>
    </TableRow>
  );
}
