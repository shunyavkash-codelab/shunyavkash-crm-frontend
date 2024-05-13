import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

const CustomSelect = ({
  labelId,
  id,
  value,
  label,
  onChange,
  options,
  textSX,
}) => {
  return (
    <FormControl
      size="small"
      sx={{ "&>label": { fontSize: "14px" }, flexGrow: 1 }}
    >
      <InputLabel sx={{ textTransform: "capitalize", ...textSX }} id={labelId}>
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
            <Typography component={"span"} sx={{ ...option.sx }}>
              {option.label}
            </Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;
