import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import CompanyIcon from "@mui/icons-material/BusinessOutlined";
import { useParams } from "react-router-dom";
import AddressIcon from "@mui/icons-material/LocationOnOutlined";

export default function ViewProject() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { accessToken, user } = useAuth();
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
      <Box sx={{ display: "flex", height: "100vh", ml: { lg: sideBarWidth } }}>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
          }}
        >
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
                  Project /
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: { xs: "column", sm: "row" },
                textAlign: { xs: "center", sm: "start" },
                gap: { xs: 1.5, sm: 2.25 },
              }}
            >
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  Project Name : {projectList.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: { xs: 1.1, sm: 1 },
                    textTransform: "lowercase",
                    opacity: 0.6,
                    mt: 0.75,
                    wordBreak: "break-word",
                  }}
                >
                  Client Name : {projectList.clientName}
                </Typography>
              </Box>
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
              {projectList.status && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <PhoneIcon />
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    Project Status : {projectList.status}
                  </Typography>
                </Box>
              )}
              {projectList.managerName && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img className="icon" src="/images/gender.svg"></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    Manager Name : {projectList.managerName}
                  </Typography>
                </Box>
              )}
              {projectList.startDate && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CompanyIcon />
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    Project Start Date : {MyDate(projectList.startDate)}
                  </Typography>
                </Box>
              )}

              {projectList?.employeeId && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img className="icon" src="/images/reference.svg"></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    Assign Project : Multipale{projectList?.employeeId}
                  </Typography>
                </Box>
              )}
              {projectList.endDate && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img className="icon" src="/images/website.svg"></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      wordBreak: "break-word",
                    }}
                  >
                    Project end date : {MyDate(projectList.endDate)}
                  </Typography>
                </Box>
              )}
              {projectList.description && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    gridColumn: { sm: "span 2" },
                  }}
                >
                  <AddressIcon sx={{ mt: 0.25 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Project Description : {projectList.description}
                  </Typography>
                </Box>
              )}
              {projectList.payPeriod && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    gridColumn: { sm: "span 2" },
                  }}
                >
                  <AddressIcon sx={{ mt: 0.25 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Project pay time period : {projectList.payPeriod}
                  </Typography>
                </Box>
              )}
              {projectList.perHourCharge && (
                <Box
                  sx={{
                    display: "flex",
                    gap: 1.5,
                    gridColumn: { sm: "span 2" },
                  }}
                >
                  <AddressIcon sx={{ mt: 0.25 }} />
                  <Typography
                    variant="body2"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Project per hour charges : {projectList.currency}{" "}
                    {projectList.perHourCharge}
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
