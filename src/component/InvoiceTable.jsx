import { TableBody, TableCell, TableRow, TextField } from "@mui/material";
import { Field } from "formik";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CustomFormikField from "./form/CustomFormikField";

export default function InvoiceTable({ formik, values, clientList, name }) {
  const location = useLocation();

  return (
    <>
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
          <TableCell>
            <CustomFormikField name={name + ".name"} />
            {/* <TextField
              component={Field}
              fullWidth
              size="small"
              name={name + ".name"}
              //   id="name"
              // label="Task"
              autoComplete="off"
              placeholder="Enter an item"
              //   defaultValue={clientList?.name}
              // InputLabelProps={{
              //   shrink: true,
              // }}
              sx={{
                "& input,&>div": { fontSize: "12px" },
                "& input,& fieldset": {
                  marginLeft: "-12px",
                },
                "& fieldset": {
                  borderColor: "transparent",
                },
              }}
              InputProps={
                location.pathname.includes("/view/") && {
                  readOnly: true,
                }
              }
            /> */}
          </TableCell>
          <TableCell>
            <CustomFormikField name={name + ".pricePerHours"} />
            {/* <TextField
              component={Field}
              fullWidth
              size="small"
              name={name + ".pricePerHours"}
              id="pricePerHours"
              autoComplete="off"
              // label="Price"
              placeholder="$00.00"
              InputProps={
                location.pathname.includes("/view/") && {
                  readOnly: true,
                }
              }
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                "& input,&>div": { fontSize: "12px" },
                "& input,& fieldset": {
                  marginLeft: "-12px",
                },
                "& fieldset": {
                  borderColor: "transparent",
                },
              }}
              onChange={handleAmountChange}
            /> */}
          </TableCell>
          <TableCell>
            <CustomFormikField name={name + ".number"} />
            {/* <TextField
              component={Field}
              fullWidth
              size="small"
              name={name + ".number"}
              id="number"
              // label="Hours"
              autoComplete="off"
              inputProps={{ min: 1 }}
              defaultValue="1"
              type="number"
              sx={{
                "& input,&>div": { fontSize: "12px" },
                "& input,& fieldset": {
                  marginLeft: "-12px",
                },
                "& fieldset": {
                  borderColor: "transparent",
                },
              }}
              InputProps={
                location.pathname.includes("/view/") && {
                  readOnly: true,
                }
              }
              onChange={handleAmountChange}
            /> */}
          </TableCell>
          <TableCell>${values.number * values.pricePerHours || 0}</TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
