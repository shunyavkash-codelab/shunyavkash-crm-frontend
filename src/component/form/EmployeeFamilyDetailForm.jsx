import { FormControl, Grid } from "@mui/material";
import React from "react";
import ThemeInput from "./ThemeInput";

// Icons
import Man2OutlinedIcon from "@mui/icons-material/Man2Outlined";
import Woman2OutlinedIcon from "@mui/icons-material/Woman2Outlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";

export default function EmployeeFamilyDetailForm() {
  return (
    <Grid container rowSpacing={2.5} columnSpacing={2.5} component={"form"}>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Father's Name"}
            Icon={Man2OutlinedIcon}
            name="fatherName"
          />
          {/* <OutlinedInput
          placeholder="Father's Name"
          sx={{ fontSize: 14 }}
          startAdornment={
            <InputAdornment position="start">
              <Man2OutlinedIcon />
            </InputAdornment>
          }
        /> */}
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Mother's Name"}
            Icon={Woman2OutlinedIcon}
            name="motherName"
          />
          {/* <OutlinedInput
          placeholder="Mother's Name"
          sx={{ fontSize: 14 }}
          startAdornment={
            <InputAdornment position="start">
              <Woman2OutlinedIcon />
            </InputAdornment>
          }
        /> */}
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Father's Number"}
            Icon={PhoneOutlinedIcon}
            name="fatherNumber"
            type="tel"
          />
          {/* <OutlinedInput
          placeholder="Father's Number"
          type="tel"
          sx={{ fontSize: 14 }}
          startAdornment={
            <InputAdornment position="start">
              <PhoneOutlinedIcon />
            </InputAdornment>
          }
        /> */}
        </FormControl>
      </Grid>
    </Grid>
  );
}
