import {
  Box,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { APIS } from "../api/apiList.js";
import useApi from "../hooks/useApi.js";
import { useSnack } from "../hooks/store/useSnack.js";

function UserPermission({ profileId }) {
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const [userPermission, setUserPermission] = useState(false);
  const getPermission = async () => {
    try {
      const res = await apiCall({
        url: APIS.PERMISSION.GET(profileId),
        method: "get",
      });
      if (res.data.success === true) {
        setUserPermission(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    getPermission();
  }, []);
  return (
    <>
      {userPermission && (
        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            mt: 3,
            pt: 2,
            pb: 2,
          }}
        >
          <Box container sx={{ px: 3 }}>
            <Stack direction={"row"} mb={"10px"}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  width: "150px",
                  fontSize: "14px",
                  color: "#2a4062",
                  opacity: 0.5,
                }}
              >
                members
              </Typography>
              <Stack direction={"row"} gap={"15px"}>
                <FormControlLabel
                  label="Read"
                  sx={{
                    userSelect: "none",
                    gap: 1,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      onClick={(e) => console.log(e.target.checked)}
                      disableRipple
                      checked={userPermission.member.read}
                      sx={{
                        p: 0,
                        position: "relative",
                        borderRadius: "4px",
                        width: "18px",
                        height: "18px",
                        border: "2px solid",
                        borderColor: "text.primary",
                        "& svg": { opacity: 0 },
                        "&:before": {
                          content: "'✓'",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0,
                          transition: "all 0.2s ease-in-out",
                          color: "text.primary",
                          fontSize: "80%",
                        },
                        "&.Mui-checked:before": {
                          opacity: 1,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Write"
                  sx={{
                    userSelect: "none",
                    gap: 1,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      onClick={(e) => console.log(e.target.checked)}
                      disableRipple
                      checked={userPermission.member.write}
                      sx={{
                        p: 0,
                        position: "relative",
                        borderRadius: "4px",
                        width: "18px",
                        height: "18px",
                        border: "2px solid",
                        borderColor: "text.primary",
                        "& svg": { opacity: 0 },
                        "&:before": {
                          content: "'✓'",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0,
                          transition: "all 0.2s ease-in-out",
                          color: "text.primary",
                          fontSize: "80%",
                        },
                        "&.Mui-checked:before": {
                          opacity: 1,
                        },
                      }}
                    />
                  }
                />
              </Stack>
            </Stack>
            <Stack direction={"row"} mb={"10px"}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  width: "150px",
                  fontSize: "14px",
                  color: "#2a4062",
                  opacity: 0.5,
                }}
              >
                clients
              </Typography>
              <Stack direction={"row"} gap={"15px"}>
                <FormControlLabel
                  label="Read"
                  sx={{
                    userSelect: "none",
                    gap: 1,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      onClick={(e) => console.log(e.target.checked)}
                      disableRipple
                      checked={userPermission.client.read}
                      sx={{
                        p: 0,
                        position: "relative",
                        borderRadius: "4px",
                        width: "18px",
                        height: "18px",
                        border: "2px solid",
                        borderColor: "text.primary",
                        "& svg": { opacity: 0 },
                        "&:before": {
                          content: "'✓'",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0,
                          transition: "all 0.2s ease-in-out",
                          color: "text.primary",
                          fontSize: "80%",
                        },
                        "&.Mui-checked:before": {
                          opacity: 1,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Write"
                  sx={{
                    userSelect: "none",
                    gap: 1,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      onClick={(e) => console.log(e.target.checked)}
                      disableRipple
                      checked={userPermission.client.write}
                      sx={{
                        p: 0,
                        position: "relative",
                        borderRadius: "4px",
                        width: "18px",
                        height: "18px",
                        border: "2px solid",
                        borderColor: "text.primary",
                        "& svg": { opacity: 0 },
                        "&:before": {
                          content: "'✓'",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0,
                          transition: "all 0.2s ease-in-out",
                          color: "text.primary",
                          fontSize: "80%",
                        },
                        "&.Mui-checked:before": {
                          opacity: 1,
                        },
                      }}
                    />
                  }
                />
              </Stack>
            </Stack>
            <Stack direction={"row"} mb={"10px"}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  width: "150px",
                  fontSize: "14px",
                  color: "#2a4062",
                  opacity: 0.5,
                }}
              >
                projects
              </Typography>
              <Stack direction={"row"} gap={"15px"}>
                <FormControlLabel
                  label="Read"
                  sx={{
                    userSelect: "none",
                    gap: 1,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      onClick={(e) => console.log(e.target.checked)}
                      disableRipple
                      checked={userPermission.project.read}
                      sx={{
                        p: 0,
                        position: "relative",
                        borderRadius: "4px",
                        width: "18px",
                        height: "18px",
                        border: "2px solid",
                        borderColor: "text.primary",
                        "& svg": { opacity: 0 },
                        "&:before": {
                          content: "'✓'",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0,
                          transition: "all 0.2s ease-in-out",
                          color: "text.primary",
                          fontSize: "80%",
                        },
                        "&.Mui-checked:before": {
                          opacity: 1,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Write"
                  sx={{
                    userSelect: "none",
                    gap: 1,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      onClick={(e) => console.log(e.target.checked)}
                      disableRipple
                      checked={userPermission.project.write}
                      sx={{
                        p: 0,
                        position: "relative",
                        borderRadius: "4px",
                        width: "18px",
                        height: "18px",
                        border: "2px solid",
                        borderColor: "text.primary",
                        "& svg": { opacity: 0 },
                        "&:before": {
                          content: "'✓'",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0,
                          transition: "all 0.2s ease-in-out",
                          color: "text.primary",
                          fontSize: "80%",
                        },
                        "&.Mui-checked:before": {
                          opacity: 1,
                        },
                      }}
                    />
                  }
                />
              </Stack>
            </Stack>
            <Stack direction={"row"}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  width: "150px",
                  fontSize: "14px",
                  color: "#2a4062",
                  opacity: 0.5,
                }}
              >
                leave requests
              </Typography>
              <Stack direction={"row"} gap={"15px"}>
                <FormControlLabel
                  label="Read"
                  sx={{
                    userSelect: "none",
                    gap: 1,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      onClick={(e) => console.log(e.target.checked)}
                      disableRipple
                      checked={userPermission.leaveRequest.read}
                      sx={{
                        p: 0,
                        position: "relative",
                        borderRadius: "4px",
                        width: "18px",
                        height: "18px",
                        border: "2px solid",
                        borderColor: "text.primary",
                        "& svg": { opacity: 0 },
                        "&:before": {
                          content: "'✓'",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0,
                          transition: "all 0.2s ease-in-out",
                          color: "text.primary",
                          fontSize: "80%",
                        },
                        "&.Mui-checked:before": {
                          opacity: 1,
                        },
                      }}
                    />
                  }
                />
                <FormControlLabel
                  label="Write"
                  sx={{
                    userSelect: "none",
                    gap: 1,
                    m: 0,
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  control={
                    <Checkbox
                      onClick={(e) => console.log(e.target.checked)}
                      disableRipple
                      checked={userPermission.leaveRequest.write}
                      sx={{
                        p: 0,
                        position: "relative",
                        borderRadius: "4px",
                        width: "18px",
                        height: "18px",
                        border: "2px solid",
                        borderColor: "text.primary",
                        "& svg": { opacity: 0 },
                        "&:before": {
                          content: "'✓'",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%,-50%)",
                          opacity: 0,
                          transition: "all 0.2s ease-in-out",
                          color: "text.primary",
                          fontSize: "80%",
                        },
                        "&.Mui-checked:before": {
                          opacity: 1,
                        },
                      }}
                    />
                  }
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      )}
    </>
  );
}

export default UserPermission;
