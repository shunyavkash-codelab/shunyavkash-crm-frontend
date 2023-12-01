import React from "react";
import { Box, Typography } from "@mui/material";

export default function CounterCards(props) {
  return (
    <>
      <Box
        sx={{
          py: { xs: 3, sm: 3.25 },
          px: { xs: 3, sm: 2.5 },
          bgcolor: props.BgColor,
          color: "text.primary",
          borderRadius: 2.5,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textTransform: "capitalize",
            mb: { xs: 3.5, sm: 4.5 },
            fontSize: { xs: "16px", sm: "18px" },
          }}
        >
          {props.Title}
        </Typography>
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.75,
            fontSize: { xs: "32px", sm: "36px" },
          }}
        >
          {props.icon}
          {props.Counter}
        </Typography>
      </Box>
    </>
  );
}
