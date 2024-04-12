import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";

const CustomSelect = ({ formik, name, label, options, ...otherProps }) => {
  return (
    <FormControl
      fullWidth
      size="small"
      error={formik.touched[name] && Boolean(formik.errors[name])}
      sx={{
        "&>label": { fontSize: "14px", top: "4px" },
        "&>div>div": { py: 1.5 },
      }}
    >
      <InputLabel
        sx={{ textTransform: "capitalize", background: "#ffffff" }}
        id={`${name}-label`}
      >
        {label}
      </InputLabel>
      <Select
        labelId={`${name}-label`}
        id={name}
        name={name}
        value={formik.values[name]}
        onChange={formik.handleChange}
        sx={{ fontSize: "14px" }}
        {...otherProps}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{ textTransform: "capitalize" }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {formik.touched[name] && formik.errors[name] && (
        <FormHelperText error={true}>{formik.errors[name]}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
