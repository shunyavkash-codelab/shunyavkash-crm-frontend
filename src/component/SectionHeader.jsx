import React from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

function SectionHeader(props) {
  return (
    <>
      <Box sx={{ ...props.SectionHeaderStyle }}>
        <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
          {props.Title}
        </Typography>
        {props.BreadCrumbPreviousTitle && props.BreadCrumbCurrentTitle && (
          <Box
            sx={{
              display: "flex",
              gap: 0.5,
              mt: 0.75,
              ...props.BreadCrumbStyle,
            }}
          >
            <Link
              to={props.BreadCrumbPreviousLink || "javascript:void(0);"}
              style={{ textDecoration: "none" }}
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textTransform: "capitalize",
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
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              / {props.BreadCrumbCurrentTitle}
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
}

export default SectionHeader;
