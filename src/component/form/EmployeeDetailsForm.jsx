import { Button, Grid } from "@mui/material";
import React from "react";
import ThemeInput from "./ThemeInput";

// Icons
import DateIcon from "@mui/icons-material/DateRangeOutlined";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";

export default function EmployeeDetailsForm() {
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
          placeholder="Date Of Joining"
          Icon={DateIcon}
          name="joinDate"
        />
        {/* <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            sx={{ fontSize: 14 }}
            startAdornment={
              <InputAdornment position="start">
                <DateIcon />
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
          placeholder="Employee Id"
          Icon={Grid3x3Icon}
          name={"employeeId"}
        />
        {/* <FormControl fullWidth sx={{ m: 1 }}>
          <OutlinedInput
            sx={{ fontSize: 14 }}
            startAdornment={
              <InputAdornment position="start">
                <Grid3x3Icon />
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
        {/* <FormControl fullWidth sx={{ m: 1 }}> */}
        <ThemeInput
          placeholder={"Email"}
          Icon={EmailOutlinedIcon}
          name="email"
          type="email"
        />
        {/* <OutlinedInput
                          placeholder="Work Email"
                          sx={{ fontSize: 14 }}
                          startAdornment={
                            <InputAdornment position="start">
                              <EmailOutlinedIcon />
                            </InputAdornment>
                          }
                        /> */}
        {/* </FormControl> */}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        {/* <FormControl fullWidth sx={{ m: 1 }}> */}
        <ThemeInput
          placeholder={"Designation"}
          Icon={AccountBoxOutlinedIcon}
          name="designation"
        />
        {/* <OutlinedInput
                          placeholder="Designation"
                          sx={{ fontSize: 14 }}
                          startAdornment={
                            <InputAdornment position="start">
                              <AccountBoxOutlinedIcon />
                            </InputAdornment>
                          }
                        /> */}
        {/* </FormControl> */}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        {/* <FormControl fullWidth sx={{ m: 1 }}> */}
        <ThemeInput
          placeholder={"Role"}
          Icon={PermIdentityOutlinedIcon}
          name="role"
        />
        {/* <OutlinedInput
                          placeholder="Role"
                          sx={{ fontSize: 14 }}
                          startAdornment={
                            <InputAdornment position="start">
                              <PermIdentityOutlinedIcon />
                            </InputAdornment>
                          }
                        /> */}
        {/* </FormControl> */}
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <Button
          disableRipple
          sx={{
            maxHeight: "42px",
            position: "relative",
            px: 2.5,
            py: 1.5,
            bgcolor: "success.main",
            border: "1px solid",
            borderColor: "success.main",
            color: "white",
            lineHeight: 1,
            borderRadius: 2.5,
            overflow: "hidden",
            "&:before": {
              content: "''",
              height: 0,
              width: "10rem",
              position: "absolute",
              top: "50%",
              left: "50%",
              zIndex: "0",
              bgcolor: "white",
              transform: "rotate(-45deg) translate(-50%, -50%)",
              transformOrigin: "0% 0%",
              transition: "all 0.4s ease-in-out",
            },
            "&:hover": {
              color: "success.main",
              bgcolor: "success.main",
              "&:before": { height: "10rem" },
            },
          }}
        >
          <span style={{ position: "relative" }}>Save</span>
        </Button>
      </Grid>
    </Grid>
  );
}
