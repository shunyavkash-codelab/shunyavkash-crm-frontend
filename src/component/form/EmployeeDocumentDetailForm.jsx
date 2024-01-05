import { Grid } from "@mui/material";
import React from "react";
import ImageUploder from "./ImageUploder";

export default function EmployeeDocumentDetailForm() {
  return (
    <Grid container rowSpacing={2.5} columnSpacing={2.5} mt={3}>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder title="signature"></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder title="Degree Certification"></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder title="Adhar Card"></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder title="Adress Proof"></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder title="Property tax"></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder title="Electricity bill"></ImageUploder>
      </Grid>
    </Grid>
  );
}
