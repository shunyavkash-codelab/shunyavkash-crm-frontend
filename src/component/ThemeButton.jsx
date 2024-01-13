import React from "react";
import { Button } from "@mui/material";

function ThemeButton(props) {
  return (
    <>
      <Button
        onClick={props.onClick}
        disableRipple
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        type={props.type}
        sx={{
          maxHeight: "42px",
          position: "relative",
          px: props.smallRounded ? 1.5 : 2.5,
          py: props.smallRounded ? 0.75 : 1.5,
          border: "1px solid",
          lineHeight: 1,
          borderRadius: props.smallRounded ? "50px" : 2.5,
          overflow: "hidden",
          color: props.transparent
            ? props.btnColor
            : props.discard
            ? "text.primary"
            : "white",
          borderColor: props.success
            ? "success.main"
            : props.error
            ? "error.main"
            : props.discard
            ? "#e4e4e4"
            : props.btnColor || "primary.main",
          bgcolor: !props.transparent
            ? props.success
              ? "success.main"
              : props.error
              ? "error.main"
              : props.discard
              ? "#e4e4e4"
              : props.btnColor || "primary.main"
            : "",
          "&:before": {
            content: "''",
            height: 0,
            width: "10rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: "0",
            transform: "rotate(-45deg) translate(-50%, -50%)",
            transformOrigin: "0% 0%",
            transition: "all 0.4s ease-in-out",
            bgcolor: props.transparent
              ? props.btnColor || "primary.main"
              : "white",
          },
          "&:hover": {
            color: props.transparent
              ? "white"
              : props.success
              ? "success.main"
              : props.error
              ? "error.main"
              : props.discard
              ? "text.primary"
              : props.btnColor || "primary.main",
            bgcolor: !props.transparent
              ? props.success
                ? "success.main"
                : props.error
                ? "error.main"
                : props.discard
                ? "#e4e4e4"
                : props.btnColor || "primary.main"
              : "",
            "&:before": { height: "10rem" },
          },
          "& span": { position: "relative" },
          ...props.buttonStyle,
        }}
      >
        <span>{props.Text}</span>
      </Button>
      {/* <Button
        onClick={props.onClick}
        disableRipple
        startIcon={props.startIcon}
        endIcon={props.endIcon}
        type={props.type}
        sx={{
          maxHeight: "42px",
          position: "relative",
          px: props.smallRounded ? 1.5 : 2.5,
          py: props.smallRounded ? 0.75 : 1.5,
          border: "1px solid",
          lineHeight: 1,
          borderRadius: props.smallRounded ? "50px" : 2.5,
          overflow: "hidden",
          color: props.transparent ? props.btnColor : "white",
          borderColor: props.btnColor || "primary.main",
          bgcolor: !props.transparent ? props.btnColor || "primary.main" : "",
          "&:before": {
            content: "''",
            height: 0,
            width: "10rem",
            position: "absolute",
            top: "50%",
            left: "50%",
            zIndex: "0",
            transform: "rotate(-45deg) translate(-50%, -50%)",
            transformOrigin: "0% 0%",
            transition: "all 0.4s ease-in-out",
            bgcolor: props.transparent
              ? props.btnColor || "primary.main"
              : "white",
          },
          "&:hover": {
            color: props.transparent
              ? "white"
              : props.btnColor || "primary.main",
            bgcolor: !props.transparent ? props.btnColor || "primary.main" : "",
            "&:before": { height: "10rem" },
          },
          ...props.buttonStyle,
        }}
      >
        <span>{props.Text}</span>
      </Button> */}
    </>
  );
}

export default ThemeButton;
