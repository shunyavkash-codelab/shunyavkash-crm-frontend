import React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Chip,
  Stack,
  TableCell,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import moment from "moment";
import CustomSelect from "../form/input/CustomSelect";
import { Link } from "react-router-dom";

export default function CustomTableCell({
  value,
  sx,
  type,
  format = "DD/MM/YYYY",
  Icon,
  onOpen,
  onDelete,
  deleteIcon,
  editIcon,
  onEdit,
  id,
  name,
  label,
  options,
  handleSelectChange,
  textSX,
  checked,
  labelId,
  handleCheck,
}) {
  if (type === "date") {
    return <TableCell sx={sx}>{moment(value).format(format)}</TableCell>;
  }
  if (type === "box") {
    return (
      <TableCell sx={sx}>
        <Box
          className="truncate line-clamp-1"
          sx={{ textWrap: "wrap", ...textSX }}
        >
          {value}
        </Box>
      </TableCell>
    );
  }

  if (type === "multi-items") {
    return (
      <TableCell sx={sx}>
        {value.map((pro) => (
          <Chip label={pro} sx={{ maxWidth: "fit-content" }} key={pro} />
        ))}
      </TableCell>
    );
  }

  if (type === "avatar+name") {
    return (
      <TableCell sx={sx}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.75,
          }}
        >
          {["projects", "invoices", "my-salary"].includes(value.type) ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Box
                sx={{
                  display: "inline-flex",
                  "& span": { opacity: "0.5" },
                }}
              >
                <Icon />
              </Box>
              <span>{Icon}</span>
            </Stack>
          ) : (
            <Avatar
              sx={{
                width: "36px",
                height: "36px",
              }}
              alt={value.name}
              src={value.profile_img}
            />
          )}
          <Box>
            {value.name && (
              <Typography
                sx={{
                  mb: 0.75,
                  lineHeight: 1,
                  fontWeight: 500,
                  fontSize: { xs: "14px", sm: "16px" },
                }}
              >
                {value.name}
              </Typography>
            )}
            {value.email && (
              <Typography
                sx={{
                  lineHeight: 1,
                  textTransform: "lowercase",
                  fontSize: { xs: "12px", sm: "14px" },
                }}
              >
                <Link
                  to={value.href}
                  style={{
                    fontWeight: 900,
                    textTransform: "capitalize",
                    color: "#002a4d",
                    textDecoration: "none",
                  }}
                >
                  {value.textname}
                </Link>
                {value.email}
                <span
                  style={{
                    lineHeight: 1,
                    fontSize: { xs: "12px", sm: "14px" },
                    color: "#808080ab",
                    marginLeft: "5px",
                  }}
                >
                  {value.date}
                </span>
              </Typography>
            )}
          </Box>
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
          // justifyContent="center"
          spacing={1.5}
          sx={{
            "& button": {
              // opacity: 0.6,
              p: 0,
              minWidth: "auto",
              color: "text.primary",
              transition: "all 0.5s",
              // "&:hover": {
              //   opacity: 1,
              // },
            },
            "& svg": {
              fontSize: { xs: "20px", sm: "21px" },
            },
          }}
        >
          <Button disableRipple onClick={onOpen}>
            <VisibilityIcon sx={{ color: "secondary.main" }} />
          </Button>
          {editIcon && (
            <Button disableRipple onClick={onEdit}>
              <CreateIcon sx={{ color: "primary.main" }} />
            </Button>
          )}
          {deleteIcon && (
            <Button disableRipple onClick={onDelete}>
              <DeleteIcon sx={{ color: "error.main" }} />
            </Button>
          )}
        </Stack>
      </TableCell>
    );
  }

  if (type === "select") {
    return (
      <TableCell>
        <CustomSelect
          name={name}
          labelId={labelId}
          label={label}
          options={options}
          onChange={handleSelectChange}
          value={value}
          id={id}
          textSX={textSX}
        />
      </TableCell>
    );
  }

  if (type === "checkbox") {
    return (
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          sx={{ color: "primary.main" }}
          checked={checked}
          inputProps={{
            "aria-labelledby": labelId,
          }}
          onClick={handleCheck}
        />
      </TableCell>
    );
  }

  return <TableCell sx={sx}>{value}</TableCell>;
}
