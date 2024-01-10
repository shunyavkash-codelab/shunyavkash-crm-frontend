import { Box, Typography } from "@mui/material";
import React from "react";

export default function NoData() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "block",
          padding: "25px 16px",
          backgroundColor: "primary.light",
          textAlign: "center",
          borderRadius: 2.5,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            // mb: 1.5,
            fontSize: "20px",
            color: "#1677FF",
            fontWeight: "500",
            letterSpacing: "0.5px",
            textTransform: "capitalize",
          }}
        >
          No data available
        </Typography>
        {/* <Typography
                variant="h6"
                sx={{ fontSize: 14, color: "#848484", fontWeight: "400" }}
              >
                Currently there no data available!
              </Typography> */}
      </Box>
    </>
  );
}
