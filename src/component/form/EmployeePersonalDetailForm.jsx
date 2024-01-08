import React from "react";
import { FormControl, Grid, InputLabel, MenuItem, Select } from "@mui/material";

// Icons
import ThemeInput from "./ThemeInput";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import DateIcon from "@mui/icons-material/DateRangeOutlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import SportsSoccerOutlinedIcon from "@mui/icons-material/SportsSoccerOutlined";

export default function EmployeePersonalDetailForm() {
  return (
    <Grid component={"form"} container rowSpacing={2.5} columnSpacing={2.5}>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ThemeInput
          placeholder={"Full Name"}
          Icon={PermIdentityOutlinedIcon}
          name="fullName"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <FormControl
          fullWidth
          size="normal"
          sx={{
            "&>label": { fontSize: "14px" },
          }}
        >
          <InputLabel
            sx={{ textTransform: "capitalize" }}
            id="demo-simple-select-label"
          >
            gender
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Gender"
            sx={{ fontSize: "14px" }}
          >
            <MenuItem sx={{ textTransform: "capitalize" }} value={"male"}>
              Male
            </MenuItem>
            <MenuItem sx={{ textTransform: "capitalize" }} value={"female"}>
              Female
            </MenuItem>
            <MenuItem
              sx={{ textTransform: "capitalize" }}
              value={"transgender"}
            >
              Transgender
            </MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ThemeInput name={"dob"} Icon={DateIcon} placeholder="Date of Birth" />
        {/* <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            sx={{ fontSize: 14 }}
            startAdornment={
              <InputAdornment position="start">
              </InputAdornment>
            }
          />
        </FormControl> */}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ThemeInput
          name={"hobbies"}
          placeholder="Hobbies"
          Icon={SportsSoccerOutlinedIcon}
        />
        {/* <FormControl fullWidth sx={{ m: 1 }}>
    <OutlinedInput
      placeholder="Hobbies"
      sx={{ fontSize: 14 }}
      startAdornment={
        <InputAdornment position="start">
          <SportsSoccerOutlinedIcon />
        </InputAdornment>
      }
    />
  </FormControl> */}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ThemeInput
          name={"phobia"}
          placeholder="Phobia"
          Icon={SickOutlinedIcon}
        />

        {/* <FormControl fullWidth sx={{ m: 1 }}>
    <OutlinedInput
      placeholder="Phobia"
      sx={{ fontSize: 14 }}
      startAdornment={
        <InputAdornment position="start">
          <SickOutlinedIcon />
        </InputAdornment>
      }
    />
  </FormControl> */}
      </Grid>
    </Grid>
  );
}
