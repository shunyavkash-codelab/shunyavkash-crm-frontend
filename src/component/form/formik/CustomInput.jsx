import React from "react";
import { TextField } from "@mui/material";

const CustomInput = ({ formik, name, label, type = "text", ...otherProps }) => {
  return (
    <TextField
      fullWidth
      id={name}
      name={name}
      label={label}
      type={type}
      value={formik.values[name]}
      onChange={formik.handleChange}
      size="small"
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      sx={{
        "&>label,& input,&>div": { fontSize: "14px" },
        "&>label": { top: "4px" },
      }}
      {...otherProps}
    />
  );
};

export default CustomInput;
