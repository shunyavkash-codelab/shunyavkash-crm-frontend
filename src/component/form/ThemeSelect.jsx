import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import React from "react";

export default function ThemeSelect({ id, options, formik }) {
  const menuItems = options.map((option, index) => (
    <MenuItem
      key={index}
      sx={{ textTransform: "capitalize" }}
      value={option.value}
    >
      {option.name}
    </MenuItem>
  ));
  //   const menuItems = options.map((option, index) => (
  //     <MenuItem
  //       key={index}
  //       sx={{ textTransform: "capitalize" }}
  //       value={value[index]}
  //     >
  //       {option.charAt(0).toUpperCase() + option.slice(1)}
  //     </MenuItem>
  //     <MenuItem
  //       key={index}
  //       sx={{ textTransform: "capitalize" }}
  //       value={value[index]}
  //     >
  //       {option.charAt(0).toUpperCase() + option.slice(1)}
  //     </MenuItem>
  //   ));
  return (
    <FormControl
      fullWidth
      size="normal"
      sx={{
        "&>label": { fontSize: "14px" },
      }}
    >
      <InputLabel
        sx={{ textTransform: "capitalize" }}
        for="demo-simple-select-label"
      >
        {id}
      </InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id={id}
        name={id}
        label="Role"
        sx={{ fontSize: "14px" }}
        onChange={formik?.handleChange}
        value={formik?.values[id]}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
}
