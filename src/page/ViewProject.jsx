import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Chip } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import { useParams } from "react-router-dom";
import ManagerIcon from "@mui/icons-material/PersonOutlined";
import DescriptionIcon from "@mui/icons-material/DescriptionOutlined";

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
        setSnack(res.data.message);
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
          <Box sx={{ mb: 3.25 }}>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              Project
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Link to={"/projects"} style={{ textDecoration: "none" }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    textTransform: "capitalize",
                    color: "primary.main",
                    transition: "all 0.4s ease-in-out",
                    ":not(:hover)": {
                      opacity: 0.7,
                    },
                  }}
                >
                  Projects /
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                Project
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              p: { xs: 2, sm: 3.25 },
              backgroundColor: "white",
              borderRadius: 2.5,
              maxWidth: "650px",
            }}
          >
            <Box sx={{ textTransform: "capitalize" }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: { xs: "20px", sm: "22px" },
                }}
              >
                {projectList.name}
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: "15px", sm: "16px" },
                  lineHeight: 1,
                  opacity: 0.6,
                  mt: 1,
                }}
              >
                {projectList.clientName}
              </Typography>
            </Box>
            <Box sx={{ mt: { xs: 3.75, sm: 5 }, mb: { xs: 2.5, sm: 3.5 } }}>
              <Typography
                variant="h6"
                sx={{
                  textTransform: "capitalize",
                }}
              >
                Information
              </Typography>
            </Box>
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
              {projectList.managerName && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <ManagerIcon />
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {projectList.managerName}
                  </Typography>
                </Box>
              )}
              {projectList?.employeeId && (
                /*<Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.5,
                    gridColumn: { sm: "span 2" },
                  }}
                >
                  <ManagerIcon sx={{ mt: 0.25 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    Assign Project : Multipale{projectList?.employeeId}
                  </Typography>
                </Box>*/
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
          </Box>
        </Box>
      </Box>
    </>
  );
}
