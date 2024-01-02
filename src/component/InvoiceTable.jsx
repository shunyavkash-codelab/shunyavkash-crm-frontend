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
          py: 1,
          "&:first-child": { fontWeight: "600" },
        },
      }}
    >
      <TableCell
        sx={{
          "& > *": {
            maxWidth: "unset",
            ml: -1,
          },
          "& fieldset": {
            borderColor: "transparent",
          },
          "& input": {
            px: 1,
          },
        }}
      >
        <CustomFormikField
          name={name + ".name"}
          multiline
          placeholder="Enter an items"
        />
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
      <TableCell
        sx={{
          "& > *": {
            ml: -1,
          },
          "& fieldset": {
            borderColor: "transparent",
          },
          "& input": {
            px: 1,
          },
        }}
      >
        <CustomFormikField
          name={name + ".pricePerHours"}
          placeholder="00.00"
          inputProps={{ min: 1 }}
          type="number"
        />
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
      <TableCell
        sx={{
          "& > *": {
            ml: -1,
          },
          "& fieldset": {
            borderColor: "transparent",
          },
          "& input": {
            px: 1,
          },
        }}
      >
        <CustomFormikField
          name={name + ".number"}
          placeholder="00"
          inputProps={{ min: 1 }}
          type="number"
        />
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
  );
}
