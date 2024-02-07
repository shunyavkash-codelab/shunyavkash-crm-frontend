import { Grid } from "@mui/material";
import React from "react";
import ImageUploder from "./ImageUploder";
import { useAuth } from "../../hooks/store/useAuth";
import { useSnack } from "../../hooks/store/useSnack";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";

export default function EmployeeDocumentDetailForm({ data }) {
  const { userId } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
  // var _URL = window.URL || window.webkitURL;
  const editUserProfile = async (formData, message) => {
    try {
      const res = await apiCall({
        url: APIS.USER.EDIT(userId),
        method: "patch",
        headers: "multipart/form-data",
        data: formData,
      });
      if (res.status === 200) {
        setSnack(`${message}`);
        // setUrl(files.base64);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  const documentUpload = async (data, title) => {
    var file, img;
    if ((file = data && title === "signature")) {
      img = new Image();
      // var objectUrl = _URL.createObjectURL(file);
      img.onload = function () {
        console.log(this.width, this.height, "=========");
        if (this.width > 300) console.log("width");
      };
      // img.src = objectUrl;
    }
    let formData = new FormData();

    formData.append(title, data);
    await editUserProfile(formData, `${title} upload successfully.`);
  };

  const removeDocument = async (data) => {
    let formData = new FormData();
    formData.append(data, "");
    await editUserProfile(formData, `Remove ${data} successfully.`);
  };

  return (
    <Grid container spacing={2.5} component="form">
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="signature"
          title="signature"
          fileTypes={[".png"]}
          doc={data.signature}
          handleFileCallback={(data) => documentUpload(data, "signature")}
          removeDocument={(data) => removeDocument(data)}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="degreeCertification"
          title="Degree Certification"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.degreeCertification}
          handleFileCallback={(data) =>
            documentUpload(data, "degreeCertification")
          }
          removeDocument={(data) => removeDocument(data)}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="adharCard"
          title="Adhar Card"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.adharCard}
          handleFileCallback={(data) => documentUpload(data, "adharCard")}
          removeDocument={(data) => removeDocument(data)}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="addressProof"
          title="Adress Proof"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.addressProof}
          handleFileCallback={(data) => documentUpload(data, "addressProof")}
          removeDocument={(data) => removeDocument(data)}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="propertyTax"
          title="Property tax"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.propertyTax}
          handleFileCallback={(data) => documentUpload(data, "propertyTax")}
          removeDocument={(data) => removeDocument(data)}
        />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ImageUploder
          name="electricityBill"
          title="Electricity bill"
          fileTypes={[".jpeg", ".jpg", "pdf"]}
          doc={data.electricityBill}
          handleFileCallback={(data) => documentUpload(data, "electricityBill")}
          removeDocument={(data) => removeDocument(data)}
        />
      </Grid>
    </Grid>
  );
}
