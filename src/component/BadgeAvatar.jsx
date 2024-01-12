import React from "react";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";

function BadgeAvatar(props) {
  return (
    <>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
        sx={{
          "& .MuiBadge-badge": {
            bgcolor: props.Status === "active" ? "success.main" : "error.main",
            color: props.Status === "active" ? "success.main" : "error.main",
            boxShadow: "0 0 0 2px white",
            ...props.BadgeStyle,
            "&::after": {
              content: '""',
              position: "absolute",
              top: -1,
              left: -1,
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              animation: "ripple 1.2s infinite ease-in-out",
              border: "1px solid currentColor",
            },
          },
          "@keyframes ripple": {
            "0%": {
              transform: "scale(.8)",
              opacity: 1,
            },
            "100%": {
              transform: "scale(2)",
              opacity: 0,
            },
          },
        }}
      >
        <Avatar
          src={props.AvatarSrc}
          alt={props.AvatarAlt || "Images"}
          sx={{ ...props.AvatarStyle }}
        />
      </Badge>
    </>
  );
}

export default BadgeAvatar;
