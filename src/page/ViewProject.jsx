import React, { useEffect, useState } from "react";
import { Box, Typography, Chip, Grid } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import { useNavigate, useParams } from "react-router-dom";
import ClientNameIcon from "@mui/icons-material/PersonOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import DetailsList from "../component/employee/DetailsList.jsx";
import DateStartIcon from "../component/icons/DateStartIcon";
import DateEndIcon from "../component/icons/DateEndIcon";
import HorlyRateIcon from "../component/icons/HorlyRateIcon";
import TimePeriodIcon from "../component/icons/TimePeriodIcon";
import StatusIcon from "../component/icons/StatusIcon";
import ProjectsIcon from "../component/icons/ProjectsIcon";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";
import SectionHeader from "../component/SectionHeader.jsx";

export default function ViewProject() {
  const { apiCall, isLoading } = useApi();
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const [projectList, setProjectList] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const viewProject = async () => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
        if (Object.keys(res.data.data).length === 0) {
          return navigate("/projects");
        }
        setProjectList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    viewProject();
  }, []);

  // date formatted change
  const MyDate = (date) => {
    const newDate = new Date(date);
    const formattedDate = `${newDate.getDate().toString().padStart(2, "0")}/${(
      newDate.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}/${newDate.getFullYear()}`;
    return formattedDate;
  };

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Project"
          BreadCrumbPreviousLink="/Projects"
          BreadCrumbPreviousTitle="Projects"
          BreadCrumbCurrentTitle={projectList.name}
        />
        {isLoading ? (
          <LoadingIcon style={{ height: "50vh" }} />
        ) : (
          <>
            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 4,
                overflow: "hidden",
                p: 3,
                // display: "flex",
                // alignItems: "center",
                // gap: 2,
                // "& .avatar": {
                //   flexShrink: 0,
                //   width: { xs: "80px", sm: "100px" },
                //   height: { xs: "80px", sm: "100px" },
                //   borderRadius: "100%",
                //   bgcolor: "grey.light",
                //   boxShadow: "0 0 0 4px white",
                // },
              }}
            >
              {/* <Avatar
              className="avatar"
              // src={
              //   clientList.profile_img
              //     ? clientList.profile_img
              //     : "https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
              // }
              alt="avatar"
            /> */}
              {/* <Box> */}
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: "22px", sm: "26px" },
                  color: "black",
                  fontWeight: 500,
                  textTransform: "capitalize",
                }}
              >
                {projectList.name}
              </Typography>
              {/* <Typography
                variant="body2"
                sx={{
                  fontSize: { sm: "16px" },
                  lineHeight: 1,
                  mt: { xs: 0.75, sm: 1.25 },
                  opacity: 0.5,
                  wordBreak: "break-all",
                  textTransform: "capitalize",
                }}
              >
                {projectList.clientName}
              </Typography> */}
              {/* </Box> */}
            </Box>

            <Box
              sx={{
                bgcolor: "white",
                borderRadius: 4,
                mt: 3,
                pt: 2,
                pb: 3,
              }}
            >
              <Typography
                sx={{
                  textTransform: "capitalize",
                  fontWeight: 600,
                  px: 3,
                  pb: 2,
                  mb: 3,
                  borderBottom: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                Details
              </Typography>
              <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Icon={<ClientNameIcon />}
                    Title={"Client Name"}
                    Text={projectList.userName || "N/A"}
                    TextStyle={{ textTransform: "capitalize" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Icon={<DateStartIcon />}
                    Title={"start date"}
                    Text={MyDate(projectList.startDate) || "N/A"}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Icon={<DateEndIcon />}
                    Title={"end date"}
                    Text={MyDate(projectList.endDate) || "N/A"}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Icon={<HorlyRateIcon />}
                    Title={"Per Hour charge"}
                    Text={
                      projectList.currency + projectList.perHourCharge || "N/A"
                    }
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Icon={<TimePeriodIcon />}
                    Title={"Pay Period"}
                    Text={projectList.payPeriod || "N/A"}
                    TextStyle={{ textTransform: "capitalize" }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Icon={<StatusIcon />}
                    Title={"status"}
                    Text={projectList.status || "To Do"}
                    TextStyle={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: "fit-content",
                      lineHeight: 1,
                      color: "white",
                      bgcolor:
                        projectList.status === "completed"
                          ? "success.main"
                          : projectList.status === "inReview"
                          ? "review.main"
                          : projectList.status === "inProgress"
                          ? "secondary.main"
                          : "grey.dark",
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DetailsList
                    Icon={<DescriptionIcon />}
                    Title={"description"}
                    Text={
                      projectList?.description
                        ?.split("\n")
                        .map((line, index) => (
                          <React.Fragment key={index}>
                            {line}
                            {index <
                              projectList.description.split("\n").length -
                                1 && <br />}
                          </React.Fragment>
                        )) || "N/A"
                    }
                  />
                </Grid>
                <Grid item xs={12} xl={8}>
                  <DetailsList
                    Icon={<ProjectsIcon />}
                    Title={"tasks"}
                    Text={
                      !projectList?.employeeId?.length ? (
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.75,
                            flexWrap: "wrap",
                          }}
                        >
                          <Chip
                            sx={{
                              height: "unset",
                              minHeight: "26px",
                              "& span": { py: "3px", whiteSpace: "pre-wrap" },
                            }}
                            label="multiple"
                          />
                        </Box>
                      ) : (
                        "N/A"
                      )
                    }
                  />
                </Grid>
              </Grid>
            </Box>
          </>
        )}
      </Box>
    </>
  );
}
