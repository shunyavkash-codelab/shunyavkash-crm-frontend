import React from "react";
import {
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  Grid,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  Chip,
} from "@mui/material";

import ThemeButton from "../../component/ThemeButton.jsx";

import dayjs from "dayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import NumbersIcon from "@mui/icons-material/Numbers";
import RedeemIcon from "@mui/icons-material/Redeem";
import BadgeAvatar from "../BadgeAvatar.jsx";

export default function AddSalaryForm({ formikSalary, userList }) {
  return (
    <Box component="form" onSubmit={formikSalary.handleSubmit}>
      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <MobileDatePicker
              label="Date"
              name="date"
              format="DD/MM/YYYY"
              value={dayjs(formikSalary.values.date)}
              onChange={(e) => formikSalary.setFieldValue("date", e)}
              sx={{
                minWidth: "100% !important",
                "&>div,&>label": { fontSize: "14px" },
              }}
              error={
                formikSalary.touched.date && Boolean(formikSalary.errors.date)
              }
            />
            {formikSalary.touched.date && Boolean(formikSalary.errors.date) && (
              <FormHelperText error={true}>
                {formikSalary.touched.date && formikSalary.errors.date}
              </FormHelperText>
            )}
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            sx={{
              "&>label": { fontSize: "14px" },
            }}
          >
            <InputLabel
              sx={{ textTransform: "capitalize" }}
              id="demo-simple-select-label"
            >
              Status
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Status"
              name="status"
              value={formikSalary.values.status}
              onChange={(e) =>
                formikSalary.setFieldValue("status", e.target.value)
              }
              sx={{ fontSize: "14px" }}
              error={
                formikSalary.touched.status &&
                Boolean(formikSalary.errors.status)
              }
            >
              <MenuItem value={"paid"}>
                <Box
                  sx={{
                    textTransform: "capitalize",
                    color: "white",
                    fontSize: "12px",
                    p: 0.5,
                    borderRadius: 1,
                    maxWidth: "fit-content",
                    lineHeight: 1,
                    bgcolor: "success.main",
                  }}
                >
                  Paid
                </Box>
              </MenuItem>
              <MenuItem value={"unpaid"}>
                <Box
                  sx={{
                    textTransform: "capitalize",
                    color: "white",
                    fontSize: "12px",
                    p: 0.5,
                    borderRadius: 1,
                    maxWidth: "fit-content",
                    lineHeight: 1,
                    bgcolor: "review.main",
                  }}
                >
                  unpaid
                </Box>
              </MenuItem>
            </Select>
            {formikSalary.touched.status &&
              Boolean(formikSalary.errors.status) && (
                <FormHelperText error={true}>
                  {formikSalary.touched.status && formikSalary.errors.status}
                </FormHelperText>
              )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            sx={{
              "&>label": { fontSize: "14px" },
            }}
          >
            <InputLabel
              sx={{ textTransform: "capitalize" }}
              id="demo-simple-select-label"
            >
              Member Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Member Name"
              name="employee"
              value={formikSalary.values.employee}
              onChange={(e) =>
                formikSalary.setFieldValue("employee", e.target.value)
              }
              sx={{ fontSize: "14px" }}
              error={
                formikSalary.touched.employee &&
                Boolean(formikSalary.errors.employee)
              }
              renderValue={(selected) => (
                // <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                <Chip
                  key={selected}
                  label={userList.find((item) => item._id === selected).name}
                  // variant="light"
                  sx={{
                    fontSize: "unset",
                    backgroundColor: "unset",
                    borderRadius: "unset",
                    textTransform: "capitalize",
                    height: "unset",
                  }}
                  size="normal"
                />
                // </Box>
              )}
            >
              {userList.map((member) => (
                <MenuItem value={member._id}>
                  <BadgeAvatar
                    // Member nu status check karavu & Status ma active or inactive nakhavu
                    Status={member.isActive == true ? "active" : "inactive"}
                    AvatarSrc={member.profile_img || ""}
                    AvatarStyle={{ width: "36px", height: "36px" }}
                  />
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "14px",
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: "fit-content",
                      lineHeight: 1,
                    }}
                  >
                    {member.name}
                  </Box>
                </MenuItem>
              ))}
            </Select>
            {formikSalary.touched.employee &&
              Boolean(formikSalary.errors.employee) && (
                <FormHelperText error={true}>
                  {formikSalary.touched.employee &&
                    formikSalary.errors.employee}
                </FormHelperText>
              )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <OutlinedInput
              placeholder="Amount"
              name="amount"
              onChange={formikSalary.handleChange}
              value={formikSalary.values.amount}
              sx={{ fontSize: 14 }}
              startAdornment={
                <InputAdornment position="start">
                  <NumbersIcon />
                </InputAdornment>
              }
              error={
                formikSalary.touched.amount &&
                Boolean(formikSalary.errors.amount)
              }
            />
            {formikSalary.touched.amount &&
              Boolean(formikSalary.errors.amount) && (
                <FormHelperText error={true}>
                  {formikSalary.touched.amount && formikSalary.errors.amount}
                </FormHelperText>
              )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <OutlinedInput
              placeholder="Incentive"
              name="incentive"
              onChange={formikSalary.handleChange}
              value={formikSalary.values.incentive}
              sx={{ fontSize: 14 }}
              startAdornment={
                <InputAdornment position="start">
                  <RedeemIcon />
                </InputAdornment>
              }
              error={
                formikSalary.touched.incentive &&
                Boolean(formikSalary.errors.incentive)
              }
            />
            {formikSalary.touched.incentive &&
              Boolean(formikSalary.errors.incentive) && (
                <FormHelperText error={true}>
                  {formikSalary.touched.incentive &&
                    formikSalary.errors.incentive}
                </FormHelperText>
              )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <ThemeButton success Text="Add salary" type="submit" />
        </Grid>
      </Grid>
    </Box>
  );
}
