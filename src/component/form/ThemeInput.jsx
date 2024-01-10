import {
  FormControl,
  FormHelperText,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
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
  console.log(formik.errors[name]);
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
        error={formik.touched[name] && Boolean(formik.errors[name])}
      />
      {formik.touched[name] && Boolean(formik.errors[name]) && (
        <FormHelperText error={true}>{formik.errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
}
