import { FormControl, InputAdornment, OutlinedInput } from "@mui/material";
import { Formik } from "formik";
import React from "react";

export default function ThemeInput({
  placeholder,
  name,
  Icon,
  type = "text",
  multiline = false,
  rows,
  sx = {},
  formik,
}) {
  return (
    <FormControl fullWidth sx={{ m: 1 }}>
      <OutlinedInput
        placeholder={placeholder}
        sx={{ fontSize: 14, ...sx }}
        rows={rows}
        name={name}
        type={type}
        value={formik?.values[name]}
        onChange={formik?.handleChange}
        startAdornment={
          <InputAdornment position="start">
            <Icon />
          </InputAdornment>
        }
        multiline={multiline}
      />
    </FormControl>
  );
}
