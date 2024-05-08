import React from "react";
import { Box, Button, Stack, TableCell } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { Link } from "react-router-dom";
import moment from "moment";

export default function CustomTableCell({
  value,
  sx,
  type,
  format = "DD/MM/YYYY",
  Icon,
  onOpen,
  onDelete,
  onEdit,
}) {
  if (type === "date") {
    return <TableCell sx={sx}>{moment(value).format(format)}</TableCell>;
  }
  if (type === "box") {
    return (
      <TableCell sx={sx}>
        <Box className="truncate line-clamp-1" sx={{ textWrap: "wrap" }}>
          {value}
        </Box>
      </TableCell>
    );
  }

  if (type === "icon") {
    return (
      <TableCell sx={sx}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Box
            sx={{
              display: "inline-flex",
              "& span": { opacity: "0.5" },
            }}
          >
            <Icon />
          </Box>
          <span>{value}</span>
        </Stack>
      </TableCell>
    );
  }

  if (type === "edit") {
    return (
      <TableCell sx={sx}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={1.5}
          sx={{
            "& button": {
              opacity: 0.6,
              p: 0,
              minWidth: "auto",
              color: "text.primary",
              transition: "all 0.5s",
              "&:hover": {
                opacity: 1,
              },
            },
            "& svg": {
              fontSize: { xs: "20px", sm: "21px" },
            },
          }}
        >
          <Button disableRipple onClick={onOpen}>
            <VisibilityIcon sx={{ color: "secondary.main" }} />
          </Button>
          <Link to={onEdit}>
            <Button disableRipple>
              <CreateIcon sx={{ color: "primary.main" }} />
            </Button>
          </Link>
          <Button disableRipple onClick={onDelete}>
            <DeleteIcon sx={{ color: "error.main" }} />
          </Button>
        </Stack>
      </TableCell>
    );
  }

  return <TableCell sx={sx}>{value}</TableCell>;
}
