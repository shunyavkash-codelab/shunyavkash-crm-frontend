import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";
import { useAuth } from "../../hooks/store/useAuth";
import { useSnack } from "../../hooks/store/useSnack";
import CloseIcon from "@mui/icons-material/Close";

function ImageUploder({ title, fileTypes, name, doc }) {
  const [url, setUrl] = useState(doc);
  const { userId } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
  // var _URL = window.URL || window.webkitURL;

  const editUserProfile = async (formData, message) => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.EDIT(userId),
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

  const handleFiles = async (files) => {
    console.log(files);
    setUrl(files?.base64);
    var file, img;
    if (
      files.fileList.length &&
      (file = files.fileList[0] && title === "signature")
    ) {
      img = new Image();
      // var objectUrl = _URL.createObjectURL(file);
      img.onload = function () {
        console.log(this.width, this.height, "=========");
        if (this.width > 300) console.log("width");
      };
      // img.src = objectUrl;
    }
    let formData = new FormData();

    formData.append(name, files.fileList[0]);
    await editUserProfile(formData, `${title} upload successfully.`);
    // try {
    //   const res = await apiCall({
    //     url: APIS.MANAGER.EDIT(userId),
    //     method: "patch",
    //     headers: "multipart/form-data",
    //     data: formData,
    //   });
    //   if (res.status === 200) {
    //     setSnack(`${title} upload successfully.`);
    //     // setUrl(files.base64);
    //   }
    // } catch (error) {
    //   let errorMessage = error.response.data.message;
    //   setSnack(errorMessage, "warning");
    // }
  };

  const removeDoc = async () => {
    let formData = new FormData();

    formData.append(name, "");
    await editUserProfile(formData, `Remove ${title} successfully.`);
  };
  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          height: "100%",
        }}
      > */}
      {/* {url && (
          <Typography sx={{ fontSize: "14px", marginBottom: 0.75 }}>
            {title}
          </Typography>
        )} */}
      <Button
        disableRipple
        sx={{
          width: "100%",
          backgroundColor: "rgba(0,0,0,0.1)!important",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 1,
          overflow: "hidden",
          p: 1,
          pl: 1.75,
        }}
      >
        <Box
          sx={{
            fontSize: "14px",
            color: "text.primary",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 2,
            position: "relative",
          }}
        >
          {url ? (
            <>
              <Tooltip arrow title={title}>
                <img
                  src={url}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    maxHeight: "36px",
                  }}
                  alt="image"
                />
              </Tooltip>
              <Button
                onClick={removeDoc}
                sx={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  padding: 0,
                  lineHeight: 1,
                  minWidth: "auto",
                  bgcolor: "#fff",
                  color: "#000",
                  "&:hover": {
                    bgcolor: "#fff",
                  },
                }}
              >
                <CloseIcon sx={{ fontSize: "14px" }} />
              </Button>
            </>
          ) : (
            <>{title}</>
          )}
        </Box>
        <ReactFileReader
          name={name}
          fileTypes={fileTypes}
          base64={true}
          handleFiles={handleFiles}
        >
          <Box
            sx={{
              display: "inline-flex",
              backgroundColor: "rgba(0,0,0,0.2)",
              py: 0.75,
              px: 2.5,
              color: "text.primary",
            }}
          >
            <UploadOutlinedIcon />
          </Box>
        </ReactFileReader>
      </Button>
      {/* </Box> */}
    </>
  );
}

export default ImageUploder;
