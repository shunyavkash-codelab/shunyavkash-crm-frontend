import React, { useState } from "react";

import { Box, IconButton, Button, styled } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Field } from "formik";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function FileUploadButton({ formik, id, label, value, view }) {
  const [file, setFile] = useState(value);
  return (
    <>
      {file ? (
        <>
          <Box
            sx={{
              height: { xs: "100px", sm: "170px" },
              border: "1px solid rgba(0,0,0,0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 2,
              py: 1,
              borderRadius: 1.5,
              "&:hover": {
                borderColor: "text.primary",
              },
            }}
          >
            <Box
              sx={{
                position: "relative",
                height: "100%",
                maxWidth: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={file}
                style={{
                  minWidth: "100px",
                  maxWidth: "500px",
                  maxHeight: "100%",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
                alt="images"
              />
              <IconButton
                aria-label="close"
                onClick={() => setFile(false)}
                sx={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  borderRadius: "100%",
                  bgcolor: "white",
                  padding: "4px",
                  boxShadow: "0 0 10px rgba(0,0,0,0.15)",
                  "& svg": { fontSize: { xs: "20px", sm: "24px" } },
                  "&:hover": {
                    bgcolor: "white",
                  },
                }}
                disabled={view === true}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>
        </>
      ) : (
        <Button
          disableRipple
          disableElevation
          component="label"
          variant="contained"
          id={id}
          startIcon={
            <CloudUploadIcon
              sx={{
                fontSize: {
                  xs: "18px!important",
                  sm: "28px!important",
                },
              }}
            />
          }
          sx={{
            textTransform: "capitalize",
            width: "100%",
            borderRadius: 1.5,
            bgcolor: "transparent",
            border: "1px solid rgba(0,0,0,0.15)",
            boxShadow: "none",
            color: "text.secondary",
            transition: "0s",
            height: { xs: "100px", sm: "170px" },
            fontSize: { xs: "18px", sm: "24px" },
            ":hover": {
              bgcolor: "transparent",
              borderColor: "text.primary",
            },
          }}
        >
          {label}
          {/* {view === false && ( */}
          <Field
            name="file"
            fileTypes={[".png", ".jpg"]}
            render={({ field, form }) => (
              <VisuallyHiddenInput
                {...field}
                id="test"
                type="file"
                accept="image/*"
                onChange={(event) => {
                  //   console.log(
                  //     event.target.files,
                  //     form.setFieldValue(id, event.target.files[0]),
                  //     "================"
                  //   );
                  form.setFieldValue(id, event.target.files[0]);
                  setFile(URL.createObjectURL(event.target.files[0]));
                }}
              />
            )}
          />
          {/* )} */}
        </Button>
      )}
    </>
  );
}
