import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";
import { useAuth } from "../../hooks/store/useAuth";
import { useSnack } from "../../hooks/store/useSnack";
import * as Yup from "yup";
import ThemeButton from "../ThemeButton";

export default function AddressForm({ profileList }) {
  const { apiCall } = useApi();
  const { userId } = useAuth();
  const { setSnack } = useSnack();

  // yup data validator schhema
  const schema = Yup.object({
    address: Yup.string().required("Address is required.").trim(),
    landmark: Yup.string().required("landmark is required.").trim(),
    pincode: Yup.string()
      .required("pincode is required.")
      .matches(/^[0-9]+$/, "Pincode must contain only numbers.")
      .trim(),
  });

  const formik = useFormik({
    validationSchema: schema,
    initialValues: {
      address: profileList.address,
      address2: profileList.address2,
      landmark: profileList.landmark,
      pincode: profileList.pincode,
    },
    onSubmit: async (values) => {
      try {
        const res = await apiCall({
          url: APIS.USER.EDIT(userId),
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
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
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
                error={
                  formik.touched.landmark && Boolean(formik.errors.landmark)
                }
                helperText={formik.touched.landmark && formik.errors.landmark}
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
                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                helperText={formik.touched.pincode && formik.errors.pincode}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" spacing={2}>
              <ThemeButton success Text="Save" type="submit" />
              <ThemeButton discard Text="discard" />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
