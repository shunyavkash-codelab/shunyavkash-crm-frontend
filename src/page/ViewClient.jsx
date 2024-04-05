import React, { useEffect, useState } from "react";
import { Box, Typography, Chip, Avatar, Grid } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import CompanyIcon from "@mui/icons-material/BusinessOutlined";
import AddressIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate, useParams } from "react-router-dom";
import DetailsList from "../component/employee/DetailsList.jsx";
// import GenderIcon from "@mui/icons-material/WcOutlined";
import WebsiteIcon from "@mui/icons-material/LanguageOutlined";
import ProjectsIcon from "../component/icons/ProjectsIcon.jsx";
import SectionHeader from "../component/SectionHeader.jsx";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";

export default function ViewClient() {
  const { accessToken } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [clientList, setClientList] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const viewClient = async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
        if (Object.keys(res.data.data).length === 0) {
          return navigate("/clients");
        }
        setClientList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    viewClient();
  }, []);

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Client"
          BreadCrumbPreviousLink="/clients"
          BreadCrumbPreviousTitle="clients"
          BreadCrumbCurrentTitle={clientList.name}
        />

        <Box
          sx={{
            bgcolor: "white",
            borderRadius: 4,
            overflow: "hidden",
            p: 3,
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
                  clientList.mobileCode + " " + clientList.mobileNumber || "N/A"
                }
              />
            </Grid>
            <Grid item xs={12} md={6} xl={4}>
              <DetailsList
                Icon={<CompanyIcon />}
                Title={"company name"}
                Text={clientList.companyName || "N/A"}
                TextStyle={{ textTransform: "capitalize" }}
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
            <Grid item xs={12} xl={8}>
              <DetailsList
                Icon={<ProjectsIcon />}
                Title={"project Name"}
                Text={
                  clientList?.projectName?.length
                    ? clientList.projectName.map((project) => (
                        <Box
                          sx={{
                            display: "flex",
                            gap: 0.75,
                            flexWrap: "wrap",
                          }}
                        >
                          <Chip
                            key={project}
                            sx={{
                              height: "unset",
                              minHeight: "26px",
                              "& span": {
                                py: "3px",
                                whiteSpace: "pre-wrap",
                              },
                            }}
                            label={project}
                          />
                        </Box>
                      ))
                    : "N/A"
                }
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}
