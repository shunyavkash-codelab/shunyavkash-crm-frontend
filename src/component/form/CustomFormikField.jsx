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
              sx={{
                maxWidth: "300px",
                "&>label,& input,&>div": {
                  fontSize: "12px!important",
                },
                "& input": {
                  p: 0,
                },
                "&>div": {
                  py: "8.5px",
                  px: 1.75,
                },
                // "& input,& fieldset": {
                //   marginLeft: "-12px",
                // },
                // "& fieldset": {
                //   borderColor: "transparent",
                // },
              }}
              InputLabelProps={{
                shrink: true,
              }}
              helperText={
                form.errors.firstName &&
                form.touched.firstName &&
                String(form.errors.firstName)
              }
              {...params}
              {...field}
            />
          </>
        );
      }}
    />
  );
}
