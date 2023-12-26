import { TextField } from "@mui/material";
import { Field } from "formik";
import React from "react";

export default function CustomFormikField({ name, ...params }) {
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
              error={Boolean(form.errors.firstName && form.touched.firstName)}
              // onChange={formikBag.handleChange}
              // onBlur={formikBag.handleBlur}
              fullWidth
              size="small"
              sx={{
                maxWidth: "300px",
                "&>label,& input,&>div": {
                  fontSize: "12px!important",
                },
                // "& input,& fieldset": {
                //   marginLeft: "-12px",
                // },
                // "& fieldset": {
                //   borderColor: "transparent",
                // },
              }}
              helperText={
                form.errors.firstName &&
                form.touched.firstName &&
                String(form.errors.firstName)
              }
              {...field}
              {...params}
            />
          </>
        );
      }}
    />
  );
}
