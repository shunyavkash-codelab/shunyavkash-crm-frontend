import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";
import { useAuth } from "../../hooks/store/useAuth";
import { useSnack } from "../../hooks/store/useSnack";

function ImageUploder({ title, fileTypes, name }) {
  const [url, setUrl] = useState();
  const { userId } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall, isLoading } = useApi();
  var _URL = window.URL || window.webkitURL;
  const handleFiles = async (files) => {
    console.log(files, "ImageUploder");
    setUrl(files.base64);
    var file, img;
    if ((file = files.fileList[0] && title === "signature")) {
      img = new Image();
      var objectUrl = _URL.createObjectURL(file);
      img.onload = function () {
        console.log(this.width, this.height, "=========");
        if (this.width > 300) console.log("width");
      };
      img.src = objectUrl;
    }
    let formData = new FormData();

    formData.append(name, files.fileList[0]);
    try {
      const res = await apiCall({
        url: APIS.MANAGER.EDIT(userId),
        method: "patch",
        headers: "multipart/form-data",
        data: formData,
      });
      if (res.status === 200) {
        setSnack(`${title} upload successfully.`);
        // setUrl(files.base64);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };
  return (
    <>
      {/* <Typography
        variant="h5"
        sx={{
          fontSize: 14,
          color: "black",
          fontWeight: "400",
          mb: 1.5,
          textTransform: "capitalize",
        }}
      >
        {props.title}
      </Typography> */}
      <Stack
        direction={"row"}
        sx={{
          backgroundColor: "rgba(0,0,0,0.1)",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 1,
          overflow: "hidden",
          pr: 1,
        }}
      >
        <Box
          sx={{
            width: 150,
            height: 50,
            fontSize: 14,
            color: "black",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            // justifyContent: "center",
          }}
        >
          {url ? (
            <img
              src={url}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              alt=""
            />
          ) : (
            <Box textAlign={"left"} px={1} textTransform={"capitalize"}>
              {title}
            </Box>
          )}
        </Box>
        <Box>
          <ReactFileReader
            name={name}
            fileTypes={fileTypes}
            base64={true}
            handleFiles={handleFiles}
          >
            <Button sx={{ backgroundColor: "rgba(0,0,0,0.2)" }}>
              <UploadOutlinedIcon sx={{ color: "black" }} />
            </Button>
          </ReactFileReader>
        </Box>
      </Stack>
    </>
  );
}

export default ImageUploder;
