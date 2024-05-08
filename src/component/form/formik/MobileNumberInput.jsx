import { Stack, TextField } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

export default function MobileNumberInput({
  formik,
  mobileCodeId = "mobileCode",
  numberId = "mobileNumber",
  numberPlaceholder = "Mobile Number",
}) {
  const location = useLocation();
  return (
    <Stack
      direction="row"
      sx={{
        "&:hover fieldset": {
          borderColor: "text.primary",
        },
      }}
    >
      <TextField
        fullWidth
        size="small"
        id={mobileCodeId}
        name={mobileCodeId}
        autoComplete="off"
        // defaultValue={defaultMobileCode || "+91"}
        InputProps={{
          readOnly: location.pathname.includes("/view/"),
        }}
        sx={{
          maxWidth: "75px",
          mr: "-1px",
          "& > div.Mui-error": {
            "& fieldset": {
              borderRightWidth: "1px",
            },
            "& input": {
              color: "error.main",
            },
          },
          "&>label,& input,&>div": { fontSize: "14px" },
          "& input": {
            py: 1.5,
            textAlign: "center",
            bgcolor: "#f4f4f4",
            borderRadius: "6px 0 0 6px!important",
          },
          "& fieldset": {
            borderRight: 0,
            borderRadius: "6px 0 0 6px!important",
          },
        }}
        onChange={formik.handleChange}
        value={formik.values[mobileCodeId]}
        error={
          formik.touched[mobileCodeId] && Boolean(formik.errors[mobileCodeId])
        }
        helperText={formik.touched[mobileCodeId] && formik.errors[mobileCodeId]}
      />

      <TextField
        fullWidth
        size="small"
        id={numberId}
        name={numberId}
        placeholder={numberPlaceholder}
        autoComplete="off"
        // defaultValue={defaultNumber}
        InputProps={{
          readOnly: location.pathname.includes("/view/"),
        }}
        sx={{
          "& > div.Mui-error": {
            "& fieldset": {
              borderLeftWidth: "1px",
            },
            "& input::placeholder": {
              color: "error.main",
              opacity: 1,
            },
          },
          "&>label,& input,&>div": { fontSize: "14px" },
          "& input": { py: 1.5 },
          "& fieldset": {
            borderLeft: 0,
            borderRadius: "0 6px 6px 0!important",
          },
        }}
        onChange={formik.handleChange}
        value={formik.values[numberId]}
        error={formik.touched[numberId] && Boolean(formik.errors[numberId])}
        helperText={formik.touched[numberId] && formik.errors[numberId]}
      />
    </Stack>
  );
}
