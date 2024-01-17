import { Box, Button, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactFileReader from "react-file-reader";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import CloseIcon from "@mui/icons-material/Close";

function ImageUploder({
  title,
  fileTypes,
  name,
  doc,
  style,
  formik,
  handleFileCallback,
  removeDocument,
}) {
  const [url, setUrl] = useState(doc);
  const handleFiles = async (files) => {
    setUrl(files?.base64);
    if (typeof handleFileCallback === "function") {
      handleFileCallback(files.fileList[0]);
    } else {
      formik.setFieldValue(name, files.fileList[0]);
    }
  };

  useEffect(() => {
    if (doc) {
      setUrl(doc);
    }
  }, [doc]);
  const removeDoc = async () => {
    setUrl(false);
    removeDocument(name);
    // let formData = new FormData();
    // formData.append(name, "");
    // await editUserProfile(formData, `Remove ${title} successfully.`);
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
          display: "inline-flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderRadius: 1,
          overflow: "hidden",
          p: 1,
          pl: 1.75,
          ...style,
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
