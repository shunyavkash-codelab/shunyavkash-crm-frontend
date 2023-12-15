import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";
import { useAuth } from "../../hooks/store/useAuth";
import { useSnack } from "../../hooks/store/useSnack";

export default function AddressForm({ profileList }) {
  const { apiCall, isLoading } = useApi();
  const { accessToken, userId } = useAuth();
  const { setSnack } = useSnack();
  const formik = useFormik({
    initialValues: {
      address: profileList.address,
      address2: profileList.address2,
      landmark: profileList.landmark,
      pincode: profileList.pincode,
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
        Address
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
              <TextField
                id="outlined-basic"
                label="Address"
                variant="outlined"
                sx={{ width: "100%", fontSize: "14px" }}
                name="address"
                defaultValue={profileList.address}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Address"
                onChange={formik.handleChange}
                // value={formik.values.address}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Address Line 2"
                variant="outlined"
                sx={{ width: "100%", fontSize: "14px" }}
                name="address2"
                defaultValue={profileList.address2}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Address"
                onChange={formik.handleChange}
                // value={formik.values.address2}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Landmark"
                variant="outlined"
                sx={{ width: "100%", fontSize: "14px" }}
                name="landmark"
                defaultValue={profileList.landmark}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Address"
                onChange={formik.handleChange}
                // value={formik.values.landmark}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box>
              <TextField
                id="outlined-basic"
                label="Pincode"
                variant="outlined"
                sx={{ width: "100%", fontSize: "14px" }}
                name="pincode"
                defaultValue={profileList.pincode}
                InputLabelProps={{
                  shrink: true,
                }}
                placeholder="Address"
                onChange={formik.handleChange}
                // value={formik.values.pincode}
              />
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
