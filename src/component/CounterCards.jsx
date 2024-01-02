import React from "react";
import { Box, Typography } from "@mui/material";
import ArrowIcon from "@mui/icons-material/ArrowOutward";
import { Link } from "react-router-dom";

export default function CounterCards(props) {
  return (
    <>
      <Box
        sx={{
          p: { xs: 3, sm: 2.5 },
          bgcolor: "white",
          boxShadow: "0 0 14px 0px rgb(42, 64, 98, 10%)",
          color: "text.primary",
          borderRadius: 2.5,
        }}
      >
        <Box sx={{ mb: 3.75 }}>
          <Typography
            variant="h6"
            sx={{
              textTransform: "capitalize",
              fontSize: "16px",
              mb: 0.75,
              fontWeight: 600,
            }}
          >
            {props.Title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.1 }}>
            {props.Text}
          </Typography>
        </Box>
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            fontSize: { xs: "32px", sm: "36px" },
          }}
        >
          {/* {props.Icon} */}
          {props.Counter}
          <Link to={props.Link}>
            <Box
              sx={{
                display: "inline-flex",
                p: 1,
                bgcolor: "text.primary",
                borderRadius: "10px",
                color: "white",
              }}
            >
              <ArrowIcon />
            </Box>
          </Link>
        </Typography>
      </Box>
    </>
  );
}
