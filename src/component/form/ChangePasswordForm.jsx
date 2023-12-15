import {
  Box,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";
import { useAuth } from "../../hooks/store/useAuth";
import { useSnack } from "../../hooks/store/useSnack";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function ChangePasswordForm({ profileList }) {
  const { apiCall, isLoading } = useApi();
  const { accessToken, userId } = useAuth();
  const { setSnack } = useSnack();
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfrimPassword, setShowConfrimPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfrimPassword = () =>
    setShowConfrimPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.MANAGER.CHANGEPASSWORD,
          method: "post",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          setSnack(res.data.message);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });
  return (
    <>
      <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
        Password
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <Grid
          container
          rowSpacing={2}
          columnSpacing={2}
          mt={2}
          sx={{
            "& .MuiFormLabel-root, & .MuiInputBase-input": {
              fontSize: "14px",
            },
          }}
        >
          <Grid item xs={12} sm={6}>
            <Box>
              <FormControl
                sx={{ width: "100%", fontSize: "14px" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Old Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="old password"
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Old Password"
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}></Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <FormControl
                sx={{ width: "100%", fontSize: "14px" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-new-password">
                  New Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-new-password"
                  type={showNewPassword ? "text" : "password"}
                  name="password"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="New password"
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="New Password"
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <FormControl
                sx={{ width: "100%", fontSize: "14px" }}
                variant="outlined"
              >
                <InputLabel htmlFor="outlined-adornment-confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-confirm-password"
                  type={showConfrimPassword ? "text" : "password"}
                  name="confirmPassword"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  placeholder="confirm password"
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfrimPassword}
                        onMouseDown={handleMouseDownNewPassword}
                        edge="end"
                      >
                        {showConfrimPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <Button
                disableRipple
                type="submit"
                sx={{
                  maxHeight: "42px",
                  position: "relative",
                  px: 2.5,
                  py: 1.5,
                  bgcolor: "primary.main",
                  border: "1px solid",
                  borderColor: "primary.main",
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
                    color: "primary.main",
                    bgcolor: "primary.main",
                    "&:before": { height: "10rem" },
                  },
                }}
              >
                <span style={{ position: "relative" }}>Save Changes</span>
              </Button>
              <Button
                disableRipple
                sx={{
                  maxHeight: "42px",
                  position: "relative",
                  px: 2.5,
                  py: 1.5,
                  bgcolor: "error.main",
                  border: "1px solid",
                  borderColor: "error.main",
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
                    color: "error.main",
                    bgcolor: "error.main",
                    "&:before": { height: "10rem" },
                  },
                }}
              >
                <span style={{ position: "relative" }}>Cancel</span>
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
