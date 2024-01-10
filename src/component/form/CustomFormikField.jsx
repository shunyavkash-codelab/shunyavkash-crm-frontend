import { TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";

export default function CustomFormikField({ name, style = {}, ...params }) {
  return (
    <Field
      validateOnBlur
      validateOnChange
      name={name}
      render={({ field, form }) => {
        // console.log(form, field);
        return (
          <>
            <TextField
              error={form.touched[name] && Boolean(form.errors[name])}
              helperText={form.touched[name] && form.errors[name]}
              // onBlur={formikBag.handleBlur}
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
