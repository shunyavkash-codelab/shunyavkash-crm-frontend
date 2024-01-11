import { Grid } from "@mui/material";
import React from "react";
import ImageUploder from "./ImageUploder";

export default function EmployeeDocumentDetailForm() {
  return (
    <Grid
      container
      rowSpacing={2.5}
      columnSpacing={2.5}
      mt={3}
      component={"form"}
    >
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder
          name="signature"
          title="signature"
          fileTypes={[".png"]}
        ></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder
          name="degreeCertification"
          title="Degree Certification"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
        ></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder
          name="adharCard"
          title="Adhar Card"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
        ></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder
          name="addressProof"
          title="Adress Proof"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
        ></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder
          name="propertyTax"
          title="Property tax"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
        ></ImageUploder>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        lg={6}
        sx={{ "> .MuiFormControl-root": { margin: 0 } }}
      >
        <ImageUploder
          name="electricityBill"
          title="Electricity bill"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
        ></ImageUploder>
      </Grid>
    </Grid>
  );
}
