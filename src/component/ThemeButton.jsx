import React from "react";
import { Button, CircularProgress } from "@mui/material";

function ThemeButton(props) {
  const color = props.transparent
    ? "primary.main"
    : props.discard
    ? "text.primary"
    : "white";
  return (
    <>
      <Button
        onClick={props.onClick}
        disableRipple
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        type={props.type}
        disabled={props.isLoading}
        sx={{
          maxHeight: "42px",
          position: "relative",
          px: props.smallRounded ? 1.5 : 2,
          py: props.smallRounded ? 0.75 : 1.5,
          border: "1px solid",
          lineHeight: 1,
          borderRadius: props.smallRounded ? "50px" : 5,
          overflow: "hidden",
          textTransform: "capitalize",
          fontWeight: "400",
          color: props.transparent
            ? "primary.main"
            : props.discard
            ? "text.primary"
            : "white",
          borderColor: props.success
            ? "success.main"
            : props.error
            ? "error.main"
            : props.discard
            ? "#e4e4e4"
            : props.secondary
            ? "secondary.main"
            : props.btnColor || "primary.main",
          bgcolor: !props.transparent
            ? props.success
              ? "success.main"
              : props.error
              ? "error.main"
              : props.discard
              ? "#e4e4e4"
              : props.secondary
              ? "secondary.main"
              : props.btnColor || "primary.main"
            : "",
          // "&:before": {
          //   content: "''",
          //   height: 0,
          //   width: "10rem",
          //   position: "absolute",
          //   top: "50%",
          //   left: "50%",
          //   zIndex: "0",
          //   transform: "rotate(-45deg) translate(-50%, -50%)",
          //   transformOrigin: "0% 0%",
          //   transition: "all 0.4s ease-in-out",
          //   bgcolor: props.transparent
          //     ? props.btnColor || "primary.main"
          //     : "white",
          // },
          "&:hover": {
            color: props.transparent
              ? "secondary.main"
              : props.success
              ? "primary.main"
              : props.error
              ? "error.main"
              : props.discard
              ? "text.primary"
              : props.secondary
              ? "text.white"
              : props.btnColor || "text.white",
            bgcolor: !props.transparent
              ? props.success
                ? "success.light"
                : props.error
                ? "error.main"
                : props.discard
                ? "#e4e4e4"
                : props.secondary
                ? "primary.main"
                : props.btnColor || "secondary.main"
              : "",
            borderColor: props.transparent
              ? "secondary.main"
              : !props.transparent
              ? props.success
                ? "success.main"
                : props.error
                ? "error.main"
                : props.discard
                ? "#e4e4e4"
                : props.secondary
                ? "primary.main"
                : props.btnColor || "secondary.main"
              : "",
            "&:before": { height: "10rem" },
          },
          "& span": { position: "relative" },
          ...props.buttonStyle,
        }}
      >
        {props.isLoading ? (
          <CircularProgress size={20} sx={{ color: color }} />
        ) : (
          <span>{props.Text}</span>
        )}
      </Button>
    </>
  );
}

export default ThemeButton;
