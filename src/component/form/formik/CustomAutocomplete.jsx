import React from "react";
import { Autocomplete, Box, TextField } from "@mui/material";

const CustomAutocomplete = ({ formik, name, label, options }) => {
  return (
    <Autocomplete
      id={`${name}-autocomplete`}
      freeSolo
      options={options.map((option) => option)}
      sx={{
        fontSize: "14px!important",
        "& .MuiAutocomplete-clearIndicator": {
          display: "none",
        },
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          sx={{
            "&": {
              fontSize: "14px",
              textTransform: "capitalize",
            },
          }}
          {...props}
        >
          {option}
        </Box>
      )}
      value={formik.values[name]}
      onChange={(event, newValue) => {
        formik.setFieldValue(name, newValue); // Update Formik field value
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          onKeyUp={(e) => {
            let value = e.target.value;
            formik.setFieldValue(name, value);
          }}
          sx={{
            "& input,&>div,&>label": { fontSize: "14px" },
            "&>label": { lineHeight: 1 },
            "&>div": { height: "44px", pl: "12px!important" },
            "& input": {
              textTransform: "capitalize",
              p: "0!important",
            },
          }}
          label={label}
        />
      )}
    />
  );
};

export default CustomAutocomplete;
