import React from "react";
import { Link } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";
import ThemeButton from "./ThemeButton";
import PlusIcon from "@mui/icons-material/Close";

function SectionHeader(props) {
  return (
      <Stack
      direction={{ xs: "column", sm: "row" }}
      alignItems={{ sm: "center" }}
      justifyContent={{ sm: "space-between" }}
      columnGap={2}
      rowGap={2.5}
      sx={{
        mb: 3.25,
        ...props.stackSx,
      }}
    >
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

      {props.createButtonTitle && (
        <Link
          to={props.createLink}
          style={{ display: "inline-flex", textDecoration: "none" }}
        >
          <ThemeButton
            Text={props.createButtonTitle}
            startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
          />
        </Link>
      )}
    </Stack>
  );
}

export default SectionHeader;
