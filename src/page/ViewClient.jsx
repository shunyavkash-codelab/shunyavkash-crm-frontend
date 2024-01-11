import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Chip, Avatar, Stack, Grid } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import CompanyIcon from "@mui/icons-material/BusinessOutlined";
import AddressIcon from "@mui/icons-material/LocationOnOutlined";
import { useParams } from "react-router-dom";
import DetailsList from "../component/employee/DetailsList.jsx";
import GenderIcon from "@mui/icons-material/WcOutlined";
import WebsiteIcon from "@mui/icons-material/LanguageOutlined";

export default function Manager() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const [clientList, setClientList] = useState([]);
  const { id } = useParams();

  const viewClient = async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setClientList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    viewClient();
  }, []);
  // });

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
              Client
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Link to={"/clients"} style={{ textDecoration: "none" }}>
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
                  clients /
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                Raghav Juyal
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: "white",
              borderRadius: 4,
              overflow: "hidden",
              p: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 2,
                "& .avatar, & .logo": {
                  flexShrink: 0,
                  width: { xs: "80px", sm: "100px" },
                  height: { xs: "80px", sm: "100px" },
                  borderRadius: "100%",
                  bgcolor: "grey.light",
                  boxShadow: "0 0 0 4px white",
                },
              }}
            >
              <Avatar
                className="avatar"
                sx={{
                  order: 1,
                }}
                src={
                  clientList.profile_img
                    ? clientList.profile_img
                    : "https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
                }
                alt="avatar"
              />
              <Box
                sx={{
                  order: { xs: 3, sm: 2 },
                  width: { xs: "100%", sm: "auto" },
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: { xs: "22px", sm: "26px" },
                    color: "black",
                    fontWeight: 500,
                    textTransform: "capitalize",
                  }}
                >
                  {clientList.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: { sm: "16px" },
                    lineHeight: 1,
                    mt: { xs: 0.75, sm: 1.25 },
                    opacity: 0.5,
                    wordBreak: "break-all",
                  }}
                >
                  {clientList.email}
                </Typography>
              </Box>
              <Avatar
                className="logo"
                sx={{
                  order: { xs: 2, sm: 3 },
                  ml: { sm: "auto" },
                }}
                src={
                  clientList?.companyLogo
                    ? clientList?.companyLogo
                    : "/images/logo-2.svg"
                }
                alt="Company Logo"
              />
            </Box>
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
                  Icon={<PhoneIcon />}
                  Title={"mobile number"}
                  Text={
                    clientList.mobileCode + " " + clientList.mobileNumber ||
                    "N/A"
                  }
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <DetailsList
                  Icon={<GenderIcon />}
                  Title={"gender"}
                  Text={clientList.gender || "N/A"}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <DetailsList
                  Icon={<CompanyIcon />}
                  Title={"company name"}
                  Text={clientList.companyName || "N/A"}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <DetailsList
                  Icon={<WebsiteIcon />}
                  Title={"website URL"}
                  Text={clientList.websiteURL || "N/A"}
                  TextStyle={{ wordBreak: "break-all" }}
                />
              </Grid>
              <Grid item xs={12} md={6} xl={4}>
                <DetailsList
                  Icon={<AddressIcon />}
                  Title={"address"}
                  Text={
                    clientList?.address?.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < clientList.address.split("\n").length - 1 && (
                          <br />
                        )}
                      </React.Fragment>
                    )) || "N/A"
                  }
                />
              </Grid>
              <Grid
                item
                xs={12}
                md={clientList.projectName?.length > 0 ? 12 : 6}
                xl={clientList.projectName?.length > 0 ? 12 : 4}
              >
                <DetailsList
                  Icon={<AddressIcon />}
                  Title={"project Name"}
                  Text={
                    clientList?.projectName?.length
                      ? clientList.projectName.map((project) => (
                          <Chip
                            key={project}
                            sx={{ height: "26px" }}
                            label={project}
                          />
                        ))
                      : "N/A"
                  }
                />
              </Grid>
            </Grid>
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
            {/* {clientList.mobileNumber && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <PhoneIcon />
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {clientList.mobileCode}
                  {clientList.mobileNumber}
                </Typography>
              </Box>
            )} */}
            {/* {clientList.gender && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <img className="icon" src="/images/gender.svg" alt=""></img>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {clientList.gender}
                </Typography>
              </Box>
            )} */}
            {/* {clientList.companyName && (
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <CompanyIcon />
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {clientList.companyName}
                </Typography>
              </Box>
            )} */}
            {/* {clientList.websiteURL && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  gridColumn: { sm: "span 2" },
                }}
              >
                <img className="icon" src="/images/website.svg" alt=""></img>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    wordBreak: "break-word",
                  }}
                >
                  {clientList.websiteURL}
                </Typography>
              </Box>
            )} */}
            {/* {clientList.projectName?.length > 0 && (
              <Box
                sx={{
                  display: "flex",
                  gap: 1.5,
                  gridColumn: { sm: "span 2" },
                }}
              >
                <img className="icon" src="/images/projects.svg" />
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
                  {clientList.projectName &&
                    clientList.projectName.map((project) => (
                      <Chip
                        key={project}
                        sx={{ height: "auto" }}
                        label={project}
                      />
                    ))}
                </Box>
              </Box>
            )} */}
            {/* {clientList.address && (
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
                  dangerouslySetInnerHTML={{
                    __html: clientList.address.replace(/\r\n/g, "<br />"),
                  }}
                ></Typography>
              </Box>
            )} */}
          </Box>
        </Box>
      </Box>
    </>
  );
}
