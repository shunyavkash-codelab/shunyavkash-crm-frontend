import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import CompanyIcon from "@mui/icons-material/BusinessOutlined";
import { useParams } from "react-router-dom";
import AddressIcon from "@mui/icons-material/LocationOnOutlined";

export default function Manager() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { accessToken, user } = useAuth();
  const { setSnack } = useSnack();
  const [managerList, setManagerList] = useState([]);
  const { id } = useParams();

  const viewManagers = async () => {
    try {
      const res = await apiCall({
        url: APIS.MANAGER.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setManagerList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    viewManagers();
  }, []);

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
              Manager
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Link to={"/managers"} style={{ textDecoration: "none" }}>
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
                  Managers /
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                Manager
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
              <Box
                sx={{
                  flexShrink: 0,
                  height: "80px",
                  width: "80px",
                }}
              >
                <img
                  src={
                    managerList.profile_img ||
                    "https://uko-react.vercel.app/static/avatar/001-man.svg"
                  } //"https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "100%",
                    boxShadow: "rgb(0, 0, 0,5%) 0px 0px 6px 6px",
                  }}
                />
              </Box>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  {managerList.name}
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
                  {managerList.email}
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
              {/* <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    lineHeight: 1,
                    opacity: 0.5,
                    textTransform: "capitalize",
                    mb: 1.5,
                  }}
                >
                  manager Name
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  Ravi
                </Typography>
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  sx={{
                    lineHeight: 1,
                    opacity: 0.5,
                    textTransform: "capitalize",
                    mb: 1.5,
                  }}
                >
                  email
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "lowercase",
                  }}
                >
                  ravi.chodvadiya@shunyavkash.com
                </Typography>
              </Box> */}
              {managerList.mobileNumber && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <PhoneIcon />
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {managerList.mobileCode} {managerList.mobileNumber}
                  </Typography>
                </Box>
              )}
              {managerList.gender && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img className="icon" src="/images/gender.svg"></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {managerList.gender}
                  </Typography>
                </Box>
              )}
              {managerList.companyName && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <CompanyIcon />
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {managerList.companyName}
                  </Typography>
                </Box>
              )}

              {managerList?.referenceName && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img className="icon" src="/images/reference.svg"></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      textTransform: "capitalize",
                    }}
                  >
                    {managerList?.referenceName}
                  </Typography>
                </Box>
              )}
              {managerList.websiteURL && (
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <img className="icon" src="/images/website.svg"></img>
                  <Typography
                    variant="body2"
                    sx={{
                      lineHeight: 1,
                      wordBreak: "break-word",
                    }}
                  >
                    {managerList.websiteURL}
                  </Typography>
                </Box>
              )}
              {(managerList.address ||
                managerList.address2 ||
                managerList.landmark ||
                managerList.pincode) && (
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
                    {managerList.address}
                    {managerList.address2}
                    {managerList.landmark}
                    {managerList.pincode}
                  </Typography>
                </Box>
              )}
            </Box>
            {managerList.signature && (
              <Box
                sx={{
                  mt: { xs: 2.75, sm: 3.5 },
                  maxHeight: { xs: "70px", sm: "80px" },
                  maxWidth: { xs: "120px", sm: "135px" },
                  minWidth: "100px",
                }}
              >
                <img
                  src={
                    managerList.signature
                      ? managerList.signature
                      : "/images/signature.png"
                  } //"/images/sign.svg"
                  style={{
                    maxHeight: "inherit",
                    width: "100%",
                    display: "block",
                    borderRadius: "6px",
                  }}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
