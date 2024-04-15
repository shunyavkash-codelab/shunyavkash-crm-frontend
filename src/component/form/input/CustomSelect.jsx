import React from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelect = ({ labelId, id, value, label, onChange, options }) => {
  return (
    <FormControl
      size="small"
      sx={{ "&>label": { fontSize: "14px" }, flexGrow: 1 }}
    >
      <InputLabel sx={{ textTransform: "capitalize" }} id={labelId}>
        {label}
      </InputLabel>
      <Select
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={onChange}
        className="selectInput"
        style={{ height: "auto" }}
        sx={{
          fontSize: "14px",
          "&": {
            bgcolor: "white",
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            sx={{ textTransform: "capitalize", fontSize: "14px" }}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
