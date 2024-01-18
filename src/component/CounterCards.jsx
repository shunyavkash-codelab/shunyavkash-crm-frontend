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
          bgcolor: props.CardBgcolor,
          color: "text.primary",
          borderRadius: 2.5,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box sx={{ mb: 3.75 }}>
          <Typography
            variant="h6"
            sx={{
              textTransform: "capitalize",
              fontWeight: 600,
            }}
          >
            {props.Title}
          </Typography>
          {props.Text && (
            <Typography variant="body2" sx={{ lineHeight: 1.1, mt: 0.75 }}>
              {props.Text}
            </Typography>
          )}
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
          {props.Counter}
          {props.Link && (
            <Link to={props.Link}>
              <Box
                sx={{
                  display: "inline-flex",
                  p: 1,
                  bgcolor: props.ArrowBgColor,
                  borderRadius: "10px",
                  color: "white",
                }}
              >
                <ArrowIcon />
              </Box>
            </Link>
          )}
        </Typography>
      </Box>
    </>
  );
}
