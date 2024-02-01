import { TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";

export default function CustomFormikField({
  name,
  style = {},
  serverError = false,
  serverErrorMessage = false,
  ...params
}) {
  return (
    <Field
      validateOnBlur
      validateOnChange
      name={name}
      render={({ field, form }) => {
        return (
          <>
            <TextField
              error={
                (form.touched[name] && Boolean(form.errors[name])) ||
                serverError
              }
              helperText={
                serverErrorMessage || (form.touched[name] && form.errors[name])
              }
              fullWidth
              size="small"
              sx={{
                maxWidth: "300px",
                "&>label,& input,&>div": {
                  fontSize: "14px!important",
                },
                ...style,
              }}
              {...field}
              {...params}
            />
          </>
        );
      }}
    />
  );
}
