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
import { useFormik } from "formik";
import ThemeButton from "../component/ThemeButton.jsx";
import { useAuth } from "../hooks/store/useAuth.js";

function UserPermission({ profileId, profileUser }) {
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const [userPermission, setUserPermission] = useState(false);
  const [changes, setChanges] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: userPermission && {
      memberRead: userPermission.member.read,
      memberWrite: userPermission.member.write,
      clientRead: userPermission.client.read,
      clientWrite: userPermission.client.write,
      projectRead: userPermission.project.read,
      projectWrite: userPermission.project.write,
      leaveReqRead: userPermission.leaveRequest.read,
      leaveReqWrite: userPermission.leaveRequest.write,
    },

    onSubmit: async (values) => {
      let perObj = {
        member: {
          read: values.memberRead,
          write: values.memberWrite,
        },
        client: {
          read: values.clientRead,
          write: values.clientWrite,
        },
        project: {
          read: values.projectRead,
          write: values.projectWrite,
        },
        leaveRequest: {
          read: values.leaveReqRead,
          write: values.leaveReqWrite,
        },
      };
      try {
        const res = await apiCall({
          url: APIS.PERMISSION.EDIT(userPermission._id),
          method: "patch",
          data: perObj,
        });
        if (res.data.success === true) {
          setSnack(res.data.message);
          setChanges(false);
        }
      } catch (error) {
        console.log(error);
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

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
          <Box
            component="form"
            id="permissionsForm"
            onSubmit={formik.handleSubmit}
            sx={{ px: 3 }}
          >
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
                      onClick={(e) => {
                        formik.setFieldValue("memberRead", e.target.checked);
                        setChanges(true);
                      }}
                      disableRipple
                      checked={formik.values.memberRead ? true : false}
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
                      onClick={(e) => {
                        formik.setFieldValue("memberWrite", e.target.checked);
                        setChanges(true);
                      }}
                      disableRipple
                      checked={formik.values.memberWrite ? true : false}
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
                      onClick={(e) => {
                        formik.setFieldValue("clientRead", e.target.checked);
                        setChanges(true);
                      }}
                      disableRipple
                      checked={formik.values.clientRead ? true : false}
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
                      onClick={(e) => {
                        formik.setFieldValue("clientWrite", e.target.checked);
                        setChanges(true);
                      }}
                      disableRipple
                      checked={formik.values.clientWrite ? true : false}
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
                      onClick={(e) => {
                        formik.setFieldValue("projectRead", e.target.checked);
                        setChanges(true);
                      }}
                      disableRipple
                      checked={formik.values.projectRead ? true : false}
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
                      onClick={(e) => {
                        formik.setFieldValue("projectWrite", e.target.checked);
                        setChanges(true);
                      }}
                      disableRipple
                      checked={formik.values.projectWrite ? true : false}
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
            {profileUser.role !== 2 && (
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
                        onClick={(e) => {
                          formik.setFieldValue(
                            "leaveReqRead",
                            e.target.checked
                          );
                          setChanges(true);
                        }}
                        disableRipple
                        checked={formik.values.leaveReqRead ? true : false}
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
                        onClick={(e) => {
                          formik.setFieldValue(
                            "leaveReqWrite",
                            e.target.checked
                          );
                          setChanges(true);
                        }}
                        disableRipple
                        checked={formik.values.leaveReqWrite ? true : false}
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
            )}
            {changes && (
              <Box sx={{ display: "flex", gap: 2, mt: 2.5 }}>
                <ThemeButton success Text={"Update"} type="submit" />
                <ThemeButton
                  discard
                  Text="discard"
                  onClick={(e) => {
                    formik.resetForm();
                    setChanges(false);
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default UserPermission;
