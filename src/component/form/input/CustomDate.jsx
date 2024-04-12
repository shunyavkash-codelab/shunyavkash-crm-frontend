import React from "react";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FormHelperText } from "@mui/material";
import dayjs from "dayjs";

const CustomDate = ({
  formik,
  name = "date",
  label = "Date",
  format = "DD/MM/YYYY",
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        fullWidth
        name={name}
        label={label}
        value={dayjs(formik.values.date || new Date())}
        onChange={(e) => formik.setFieldValue(name, e)}
        sx={{
          width: "100%",
          "&>label,& input,&>div": { fontSize: "14px" },
          "&>label": { top: "4px" },
          "& input": { py: 1.5 },
        }}
        format={format}
        error={formik.touched[name] && Boolean(formik.errors[name])}
      />
      {formik.touched[name] && Boolean(formik.errors[name]) && (
        <FormHelperText error={true}>
          {formik.touched[name] && formik.errors[name]}
        </FormHelperText>
      )}
    </LocalizationProvider>
  );
};

export default CustomDate;
