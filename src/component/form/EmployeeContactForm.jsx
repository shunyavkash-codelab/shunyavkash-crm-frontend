import { FormControl, Grid } from "@mui/material";
import React from "react";
import ThemeInput from "./ThemeInput";

// Icons
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function EmployeeContactForm() {
  return (
    <Grid component={"form"} container rowSpacing={2.5} columnSpacing={2.5}>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Phone Number"}
            Icon={PhoneOutlinedIcon}
            name="phoneNumber"
            type="tel"
          />
          {/* <OutlinedInput
                      placeholder="Phone Number"
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
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"WhatsApp Number"}
            Icon={PhoneOutlinedIcon}
            name="whatsappNumber"
            type="tel"
          />
          {/* <OutlinedInput
                      placeholder="WhatsApp Number"
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
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Personal Email"}
            Icon={EmailOutlinedIcon}
            name="personal email"
          />
          {/* <OutlinedInput
                      placeholder="Personal Email"
                      type="email"
                      sx={{ fontSize: 14 }}
                      startAdornment={
                        <InputAdornment position="start">
                          <EmailOutlinedIcon />
                        </InputAdornment>
                      }
                    /> */}
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl fullWidth sx={{ m: 1 }}>
          <ThemeInput
            placeholder={"Address"}
            Icon={() => <HomeOutlinedIcon sx={{ mt: 2.25, mr: 1.25 }} />}
            name="address"
            multiline
            rows={4}
            sx={{ fontSize: 14, alignItems: "start" }}
          />
          {/* <OutlinedInput
                      placeholder="Address"
                      sx={{ fontSize: 14, alignItems: "start" }}
                      multiline
                      rows={4}
                      startAdornment={
                        <InputAdornment>
                          <HomeOutlinedIcon sx={{ mt: 2.25, mr: 1.25 }} />
                        </InputAdornment>
                      }
                    /> */}
        </FormControl>
      </Grid>
    </Grid>
  );
}
