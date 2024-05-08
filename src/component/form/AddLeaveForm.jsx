import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import React from "react";
import ThemeButton from "../ThemeButton";

export default function AddLeaveForm({ formik }) {
  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            size="normal"
            sx={{
              textTransform: "capitalize",
              "&>label": { fontSize: "14px" },
            }}
          >
            <InputLabel
              sx={{ textTransform: "capitalize" }}
              id="demo-simple-select-label"
            >
              Leave Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="leaveType"
              value={formik.values.leaveType}
              onChange={(e) =>
                formik.setFieldValue("leaveType", e.target.value)
              }
              label="Leave Type"
              sx={{ fontSize: "14px" }}
              error={
                formik.touched.leaveType && Boolean(formik.errors.leaveType)
              }
            >
              <MenuItem value={"casual"}>
                <Box
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    p: 0.5,
                    borderRadius: 1,
                    maxWidth: "fit-content",
                    lineHeight: 1,
                    bgcolor: "rgba(94, 115, 141, 15%)",
                    color: "grey.dark",
                  }}
                >
                  Casual
                </Box>
              </MenuItem>
              <MenuItem value={"sick"}>
                <Box
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    p: 0.5,
                    borderRadius: 1,
                    maxWidth: "fit-content",
                    lineHeight: 1,
                    bgcolor: "rgba(248, 174, 0, 15%)",
                    color: "secondary.main",
                  }}
                >
                  Sick
                </Box>
              </MenuItem>
              <MenuItem value={"paid"}>
                <Box
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    p: 0.5,
                    borderRadius: 1,
                    maxWidth: "fit-content",
                    lineHeight: 1,
                    bgcolor: "rgba(74, 210, 146, 15%)",
                    color: "success.main",
                  }}
                >
                  Paid
                </Box>
              </MenuItem>
              <MenuItem value={"unpaid"}>
                <Box
                  sx={{
                    textTransform: "capitalize",
                    fontSize: "12px",
                    p: 0.5,
                    borderRadius: 1,
                    maxWidth: "fit-content",
                    lineHeight: 1,
                    bgcolor: "rgba(225, 107, 22, 15%)",
                    color: "review.main",
                  }}
                >
                  Unpaid
                </Box>
              </MenuItem>
            </Select>
            {formik.touched.leaveType && Boolean(formik.errors.leaveType) && (
              <FormHelperText error={true}>
                {formik.touched.leaveType && formik.errors.leaveType}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            style={{
              width: "100%",
              maxWidth: "100%",
            }}
          >
            <MobileDatePicker
              fullWidth
              label="Start Date"
              name="startDate"
              format="DD/MM/YYYY"
              value={dayjs(formik.values.startDate)}
              onChange={(e) => formik.setFieldValue("startDate", e)}
              sx={{
                minWidth: "100% !important",
                fontSize: "14px !important",
                "&>div": { fontSize: "14px" },
                "&>label": { fontSize: "14px" },
              }}
              error={
                formik.touched.startDate && Boolean(formik.errors.startDate)
              }
            />
            {formik.touched.startDate && Boolean(formik.errors.startDate) && (
              <FormHelperText error={true}>
                {formik.touched.startDate && formik.errors.startDate}
              </FormHelperText>
            )}
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            size="normal"
            sx={{
              textTransform: "capitalize",
              "&>label": { fontSize: "14px" },
            }}
          >
            <InputLabel
              sx={{ textTransform: "capitalize" }}
              id="demo-simple-select-label"
            >
              Day type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="startDayType"
              value={formik.values.startDayType}
              onChange={(e) =>
                formik.setFieldValue("startDayType", e.target.value)
              }
              label="Day type"
              sx={{ fontSize: "14px" }}
              error={
                formik.touched.startDayType &&
                Boolean(formik.errors.startDayType)
              }
            >
              <MenuItem
                sx={{ textTransform: "capitalize" }}
                value={"first half"}
              >
                frist half
              </MenuItem>
              <MenuItem
                sx={{ textTransform: "capitalize" }}
                value={"second half"}
              >
                seconad half
              </MenuItem>
              <MenuItem sx={{ textTransform: "capitalize" }} value={"full day"}>
                full day
              </MenuItem>
            </Select>
            {formik.touched.startDayType &&
              Boolean(formik.errors.startDayType) && (
                <FormHelperText error={true}>
                  {formik.touched.startDayType && formik.errors.startDayType}
                </FormHelperText>
              )}
          </FormControl>
        </Grid>

        {formik.values.moreDay && (
          <>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                style={{
                  width: "100%",
                  maxWidth: "100%",
                }}
              >
                <MobileDatePicker
                  label="End Date"
                  name="endDate"
                  format="DD/MM/YYYY"
                  minDate={dayjs(formik.values.startDate).add(1, "day")}
                  value={formik.values.endDate}
                  onChange={(e) => formik.setFieldValue("endDate", e)}
                  sx={{
                    minWidth: "100% !important",
                    "&>div": { fontSize: "14px" },
                    "&>label": { fontSize: "14px" },
                  }}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                />
                {formik.touched.endDate && Boolean(formik.errors.endDate) && (
                  <FormHelperText error={true}>
                    {formik.touched.endDate && formik.errors.endDate}
                  </FormHelperText>
                )}
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl
                fullWidth
                size="normal"
                sx={{
                  textTransform: "capitalize",
                  "&>label": { fontSize: "14px" },
                }}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                >
                  Day type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="endDayType"
                  value={formik.values.endDayType}
                  onChange={(e) =>
                    formik.setFieldValue("endDayType", e.target.value)
                  }
                  label="Day type"
                  sx={{ fontSize: "14px" }}
                  error={
                    formik.touched.endDayType &&
                    Boolean(formik.errors.endDayType)
                  }
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"first half"}
                  >
                    frist half
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"second half"}
                  >
                    seconad half
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize" }}
                    value={"full day"}
                  >
                    full day
                  </MenuItem>
                </Select>
                {formik.touched.endDayType &&
                  Boolean(formik.errors.endDayType) && (
                    <FormHelperText error={true}>
                      {formik.touched.endDayType && formik.errors.endDayType}
                    </FormHelperText>
                  )}
              </FormControl>
            </Grid>
          </>
        )}
        <Grid item xs={12} sx={{ pb: "8px" }}>
          <FormControlLabel
            label="Take more day leave"
            sx={{
              userSelect: "none",
              gap: 1,
              m: 0,
              "& .MuiFormControlLabel-label": {
                fontSize: "14px",
              },
            }}
            control={
              <Checkbox
                onClick={(e) =>
                  formik.setFieldValue("moreDay", e.target.checked)
                }
                disableRipple
                sx={{
                  p: 0,
                  position: "relative",
                  borderRadius: "4px",
                  width: "18px",
                  height: "18px",
                  border: "2px solid",
                  borderColor: "text.primary",
                  "& svg": { opacity: 0 },
                  "&:before": {
                    content: "'✓'",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    opacity: 0,
                    transition: "all 0.2s ease-in-out",
                    color: "text.primary",
                    fontSize: "80%",
                  },
                  "&.Mui-checked:before": {
                    opacity: 1,
                  },
                }}
              />
            }
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth sx={{ "&>div": { fontSize: "14px" } }}>
            <OutlinedInput
              placeholder="Leave Reason"
              name="reason"
              onChange={formik.handleChange}
              startAdornment={
                <InputAdornment position="start"></InputAdornment>
              }
              error={formik.touched.reason && Boolean(formik.errors.reason)}
            />
            {formik.touched.reason && Boolean(formik.errors.reason) && (
              <FormHelperText error={true}>
                {formik.touched.reason && formik.errors.reason}
              </FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <ThemeButton success Text="apply Leave" type="submit" />
        </Grid>
      </Grid>
    </Box>
  );
}
