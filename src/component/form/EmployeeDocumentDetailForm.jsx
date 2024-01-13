import { Grid } from "@mui/material";
import React from "react";
import ImageUploder from "./ImageUploder";

export default function EmployeeDocumentDetailForm({ data }) {
  console.log(data, "data");
  return (
    <Grid
      container
      rowSpacing={2.5}
      columnSpacing={2.5}
      mt={3}
      component={"form"}
    >
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="signature"
          title="signature"
          fileTypes={[".png"]}
          doc={data.signature}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="degreeCertification"
          title="Degree Certification"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.degreeCertification}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="adharCard"
          title="Adhar Card"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.adharCard}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="addressProof"
          title="Adress Proof"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.addressProof}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="propertyTax"
          title="Property tax"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.propertyTax}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="electricityBill"
          title="Electricity bill"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.electricityBill}
        />
      </Grid>
    </Grid>
  );
}
