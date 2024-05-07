import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

function SectionHeader(props) {
  return (
    <>
      <Box sx={{ textTransform: "capitalize", mb: 3.25, ...props.style }}>
        <Typography variant="h5">{props.Title}</Typography>
        {props.BreadCrumbPreviousTitle && props.BreadCrumbCurrentTitle && (
          <Stack
            direction="row"
            spacing={0.5}
            sx={{
              mt: 0.75,
              ...props.BreadCrumbStyle,
            }}
          >
            <Link
              to={props.BreadCrumbPreviousLink || "javascript:void(0)"}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  color: "primary.main",
                  transition: "all 0.4s ease-in-out",
                  ":not(:hover)": {
                    opacity: 0.7,
                  },
                }}
              >
                {props.BreadCrumbPreviousTitle}
              </Typography>
            </Link>
            <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
              / {props.BreadCrumbCurrentTitle}
            </Typography>
          </Stack>
        )}
      </Box>
    </>
  );
}

export default SectionHeader;
