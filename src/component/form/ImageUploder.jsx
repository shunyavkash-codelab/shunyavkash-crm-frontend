import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ReactFileReader from "react-file-reader";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";

function ImageUploder(props) {
  const [url, setUrl] = useState();
  const handleFiles = (files) => {
    console.log(files);
    setUrl(files.base64);
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
              {props.title}
            </Box>
          )}
        </Box>
        <Box>
          <ReactFileReader
            fileTypes={[".png", ".jpg"]}
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
