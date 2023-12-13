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
              <Button type="submit" variant="contained">
                Save Changes
              </Button>
              <Button variant="outlined">Cancel</Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
