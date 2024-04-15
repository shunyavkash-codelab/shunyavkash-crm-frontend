import React from "react";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const CustomRadioButton = ({ formik, radioOptions, name }) => {
  // Array of objects for radio buttons

  return (
    <RadioGroup
      aria-labelledby="demo-radio-buttons-group-label"
      name={name}
      sx={{
        width: "80%",
        flexDirection: "row",
        justifyContent: "center",
        "& span": {
          py: 0,
          fontSize: "14px",
          bgcolor: "transparent!important",
        },
      }}
      onChange={formik.handleChange}
      value={formik.values[name]}
    >
      {radioOptions.map((option) => (
        <FormControlLabel
          key={option.value}
          value={option.value}
          control={<Radio />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

export default CustomRadioButton;
