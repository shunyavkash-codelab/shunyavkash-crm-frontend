import React, { useEffect, useState } from "react";
import { Box, Typography, Chip, Grid } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import { useParams } from "react-router-dom";
import ClientNameIcon from "@mui/icons-material/PersonOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";
import DetailsList from "../component/employee/DetailsList.jsx";
import DateStartIcon from "../component/icons/DateStartIcon";
import DateEndIcon from "../component/icons/DateEndIcon";
import HorlyRateIcon from "../component/icons/HorlyRateIcon";
import TimePeriodIcon from "../component/icons/TimePeriodIcon";
import StatusIcon from "../component/icons/StatusIcon";
import ProjectsIcon from "../component/icons/ProjectsIcon";
import SectionHeader from "../component/SectionHeader.jsx";

export default function ViewProject() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { apiCall } = useApi();
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const [projectList, setProjectList] = useState([]);
  const { id } = useParams();

  const viewProject = async () => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
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
      <SideBar
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        accessToken={accessToken}
      />
      <Header
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Box sx={{ ml: { lg: sideBarWidth } }}>
        <Box component="main">
          <SectionHeader
            Title="Project"
            BreadCrumbPreviousLink="/Projects"
            BreadCrumbPreviousTitle="Projects"
            BreadCrumbCurrentTitle={projectList.name}
          />

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
                    projectList?.description?.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index <
                          projectList.description.split("\n").length - 1 && (
                          <br />
                        )}
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
                        sx={{ display: "flex", gap: 0.75, flexWrap: "wrap" }}
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

          {/* <Box
            sx={{
              mt: 3,
              p: { xs: 2, sm: 3.25 },
              backgroundColor: "white",
              borderRadius: 2.5,
              maxWidth: "650px",
            }}
          >
            <Box
              sx={{
                maxWidth: "750px",
                display: "grid",
                gridTemplateColumns: {
                  xs: "repeat(1, 1fr)",
                  sm: "repeat(2, 1fr)",
                },
                gap: { xs: 2.75, sm: 3.5 },
                "& img.icon,& svg": {
                  height: "18px",
                  width: "18px",
                },
              }}
            >
              {projectList.userName && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <UserIcon />
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {projectList.userName}
                  </Typography>
                </Box>
              )}
              {projectList?.employeeId && (
                <Box
                  sx={{
                    display: "flex",
                    gridColumn: { sm: "span 2" },
                    gap: 1.5,
                  }}
                >
                  <img
                    className="icon"
                    src="/images/projects.svg"
                    alt=""
                    style={{ marginTop: "3px" }}
                  ></img>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.75,
                      "& span": {
                        fontSize: "13px",
                        py: 0.75,
                        px: 1,
                        lineHeight: 1,
                      },
                    }}
                  >
                    <Chip sx={{ height: "auto" }} label="multiple" />
                  </Box>
                </Box>
              )}
              {projectList.description && (
                <Box
                  sx={{
                    display: "flex",
                    gridColumn: { sm: "span 2" },
                    gap: 1.5,
                  }}
                >
                  <DescriptionIcon sx={{ mt: 0.25 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {projectList.description}
                  </Typography>
                </Box>
              )}
              {projectList.startDate && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img
                    className="icon"
                    src="/images/date-start.svg"
                    alt=""
                  ></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {MyDate(projectList.startDate)}
                  </Typography>
                </Box>
              )}
              {projectList.endDate && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img className="icon" src="/images/date-end.svg" alt=""></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      wordBreak: "break-word",
                    }}
                  >
                    {MyDate(projectList.endDate)}
                  </Typography>
                </Box>
              )}
              {projectList.payPeriod && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img
                    className="icon"
                    src="/images/time-period.svg"
                    alt=""
                  ></img>
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {projectList.payPeriod}
                  </Typography>
                </Box>
              )}
              {projectList.perHourCharge && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img
                    className="icon"
                    src="/images/hourly-rate.svg"
                    alt=""
                  ></img>
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    {projectList.currency}
                    {projectList.perHourCharge}/hour
                  </Typography>
                </Box>
              )}
              {projectList.status && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img className="icon" src="/images/status.svg" alt=""></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {projectList.status}
                  </Typography>
                </Box>
              )}
            </Box>
          </Box> */}
        </Box>
      </Box>
    </>
  );
}
