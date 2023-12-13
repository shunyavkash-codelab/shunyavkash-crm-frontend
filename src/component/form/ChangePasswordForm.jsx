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
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseDownNewPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues: {
      name: profileList.name,
      companyName: profileList.companyName,
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.MANAGER.EDIT(userId),
          method: "patch",
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
      <Box component="form">
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
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
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
                  type={showNewPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        onMouseDown={handleMouseDownNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
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
              <Button variant="contained">Save Changes</Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
