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

export default function FileUploadButton({ formik, id, label }) {
  const [file, setFile] = useState(false);

  return (
    <>
      {file ? (
        <>
          <Box
            sx={{
              border: "1px solid rgba(0,0,0,0.15)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 2,
              py: 0.75,
              borderRadius: 2.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "end",
                height: { xs: "86px", sm: "186px" },
                width: { xs: "86px", sm: "186px" },

                gap: 1,
              }}
            >
              <img
                src={file}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
              <IconButton
                aria-label="close"
                onClick={() => setFile(false)}
                sx={{
                  padding: "4px",
                  "& svg": { fontSize: { xs: "20px", sm: "24px" } },
                }}
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
                  sm: "30px!important",
                },
              }}
            />
          }
          sx={{
            textTransform: "capitalize",
            width: "100%",
            borderRadius: 2.5,
            bgcolor: "transparent",
            border: "1px solid rgba(0,0,0,0.15)",
            boxShadow: "none",
            color: "text.secondary",
            transition: "0s",
            height: { xs: "100px", sm: "200px" },
            fontSize: { xs: "18px", sm: "30px" },
            ":hover": {
              bgcolor: "transparent",
              borderColor: "text.primary",
            },
          }}
        >
          {label}
          <Field
            name="file"
            render={({ field, form }) => (
              <VisuallyHiddenInput
                {...field}
                id="test"
                type="file"
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
        </Button>
      )}
    </>
  );
}
