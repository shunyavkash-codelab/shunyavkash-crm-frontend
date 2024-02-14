import React, { useState } from "react";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList.js";
import { useSnack } from "../hooks/store/useSnack";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TableCell,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/CheckOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import BadgeAvatar from "../component/BadgeAvatar";

export default function EmployeeListRaw({
  row,
  uniqId,
  setEmployeesList,
  dataList,
  type,
  user,
}) {
  const [role, setRole] = useState();
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  const handleNavigate = (id) => {
    navigate(`/my-profile/${id}`);
  };

  // edit employee and user
  const editRole = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.USER.EDIT(id),
        method: "patch",
        data: { role: role === "SuperAdmin" ? 0 : role === "Manager" ? 1 : 2 },
      });
      if (res.status === 200) {
        setSnack(res.data.message);
        setRole(null);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  // delete employee and user
  const deleteEmpandman = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.USER.DELETE(id),
        method: "delete",
      });
      if (res.status === 200) {
        setSnack(res.data.message);
        updateEmployeeList(id);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  const updateEmployeeList = (id) => {
    setEmployeesList(dataList.filter((employee) => employee._id !== id));
  };

  return (
    <>
      <TableRow
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          "&>td": { fontSize: { xs: "12px", sm: "14px" } },
        }}
      >
        {/* <FormikProvider value={formik}> */}
        {/* <form> */}
        <TableCell component="th" scope="row">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.75,
            }}
          >
            <BadgeAvatar
              // Member nu status check karavu & Status ma active or inactive nakhavu
              Status={row.isActive == true ? "active" : "inactive"}
              AvatarSrc={row.profile_img || ""}
              AvatarStyle={{ width: "36px", height: "36px" }}
            />
            <Box>
              <Typography
                sx={{
                  mb: 0.75,
                  lineHeight: 1,
                  fontWeight: 600,
                  fontSize: { xs: "14px", sm: "16px" },
                  cursor: user.role === 0 && "pointer",
                }}
                onClick={() => user.role === 0 && handleNavigate(row._id)}
              >
                {row.name}
              </Typography>
              <Typography
                sx={{
                  lineHeight: 1,
                  textTransform: "lowercase",
                  fontSize: { xs: "12px", sm: "14px" },
                }}
              >
                {row.email}
              </Typography>
            </Box>
          </Box>
        </TableCell>
        <TableCell>{row.mobileNumber || "N/A"}</TableCell>
        <TableCell>
          <FormControl
            fullWidth
            size="small"
            sx={{
              "&>label": { fontSize: "14px" },
            }}
            disabled={user.role !== 0}
          >
            <InputLabel
              sx={{ textTransform: "capitalize" }}
              id="demo-simple-select-label"
            >
              Role
            </InputLabel>
            <Select
              id="role"
              label="Role"
              sx={{ fontSize: "14px", "& > div": { py: "7px" } }}
              defaultValue={
                row?.role === 0
                  ? "SuperAdmin"
                  : row?.role === 1
                  ? "Manager"
                  : "Employee"
              }
              onChange={(event) => setRole(event.target.value)}
            >
              <MenuItem
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                }}
                value={"Manager"}
              >
                manager
              </MenuItem>
              <MenuItem
                sx={{
                  textTransform: "capitalize",
                  fontSize: "14px",
                }}
                value={"Employee"}
              >
                employee
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell
          sx={{
            "& .statusBtn": {
              color: "white",
              fontSize: "12px",
              p: 0.5,
              borderRadius: 1,
              maxWidth: "fit-content",
              lineHeight: 1,
            },
            "& .notAccepted": {
              bgcolor: "secondary.main",
            },
            "& .accepted": {
              bgcolor: "success.main",
            },
          }}
        >
          <Box
            className={`statusBtn ${
              row.invitationStatus === 0 ? "notAccepted" : "accepted"
            }`}
          >
            {row.invitationStatus === 0 ? "Not accepted" : "Accepted"}
          </Box>
        </TableCell>
        {user.role === 0 && (
          <TableCell>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: 1.25, sm: 1.5 },
                "& button": {
                  p: 0,
                  minWidth: "unset",
                  color: "error.main",
                  opacity: 0.5,
                  transition: "all 0.5s",
                  "&:hover": { opacity: 1 },
                },
                "& svg": {
                  fontSize: { xs: "20px", sm: "22px" },
                },
              }}
            >
              {role && (
                <Tooltip title="Save" arrow>
                  <Button
                    type="submit"
                    disableRipple
                    disableElevation
                    disabled={!role}
                    sx={{
                      transition: "all 0.4s ease-in-out",
                      "&:hover": {
                        bgcolor: "transparent",
                      },
                      "&:not(:hover)": { opacity: 0.2 },
                    }}
                    onClick={() => editRole(uniqId)}
                  >
                    <SaveIcon disableRipple />
                  </Button>
                </Tooltip>
              )}

              <Tooltip title="Delete" arrow>
                <Button
                  disableRipple
                  sx={{
                    transition: "all 0.4s ease-in-out",
                    "&:not(:hover)": { opacity: 0.2 },
                  }}
                  onClick={() => deleteEmpandman(uniqId)}
                >
                  <DeleteIcon />
                </Button>
              </Tooltip>
            </Box>
          </TableCell>
        )}
        {/* </form> */}
        {/* </FormikProvider> */}
      </TableRow>
    </>
  );
}
