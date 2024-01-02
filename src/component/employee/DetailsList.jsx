import React from "react";
import { Box, Typography } from "@mui/material";

export default function DetailsList(props) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 1,
          opacity: 0.5,
          "& > svg": {
            fontSize: "20px",
          },
        }}
      >
        {props.Icon}
        <Typography
          variant="caption"
          sx={{
            textTransform: "capitalize",
            lineHeight: 1,
            fontWeight: 600,
          }}
        >
          {props.Title}
        </Typography>
      </Box>
      <Typography variant="subtitle2" className="text" sx={{ lineHeight: 1.5 }}>
        {props.Text}
      </Typography>
    </>
  );
}
