import { TextField } from "@mui/material";
import React from "react";

export default function CustomInput({
  value,
  onChange,
  label,
  id,
  type,
  placeholder,
  rest = {},
  fullWidth = true,
}) {
  return (
    <TextField
      fullWidth={fullWidth}
      size="small"
      id={id}
      label={label}
      autoComplete="off"
      type={type}
      InputLabelProps={{
        shrink: true,
      }}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      sx={{
        "&>label,& input,&>div": { fontSize: "14px" },
        "&": {
          bgcolor: "white",
          borderRadius: 1.5,
        },
      }}
      {...rest}
    />
  );
}
