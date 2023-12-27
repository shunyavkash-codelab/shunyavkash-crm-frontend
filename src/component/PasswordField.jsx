import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function PasswordField({ id, label, formik }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      <TextField
        required
        fullWidth
        size="small"
        id={id}
        label={label}
        autoComplete="off"
        type={showPassword ? "text" : "password"}
        sx={{
          "&>label,& input": { fontSize: "14px" },
          "& input": { pr: 5 },
        }}
        onChange={formik.handleChange}
        value={formik.values[id]}
        error={formik.touched[id] && Boolean(formik.errors[id])}
        helperText={formik.touched[id] && formik.errors[id]}
      />
      <Box
        onClick={handleClickShowPassword}
        onMouseDown={handleMouseDownPassword}
        id
        sx={{
          position: "absolute",
          top: "9px",
          right: "16px",
          opacity: "50%",
          cursor: "pointer",
          display: "inline-flex",
          "& svg": { fontSize: "20px" },
        }}
      >
        {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
      </Box>
    </>
  );
}
