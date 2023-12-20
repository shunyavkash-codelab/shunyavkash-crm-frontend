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

export default function Manager() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, user } = useAuth();

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
                  src="https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: "100%",
                    boxShadow: "0 0 6px 6px rgba(226, 226, 226,1)",
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
                  Ravi
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
                  ravi.chodvadiya@shunyavkash.com
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
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* <Typography
                  variant="subtitle2"
                  sx={{
                    lineHeight: 1,
                    opacity: 0.5,
                    textTransform: "capitalize",
                    mb: 1.5,
                  }}
                >
                  mobile number
                </Typography> */}
                <PhoneIcon />
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  +919876567892
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* <Typography
                  variant="subtitle2"
                  sx={{
                    lineHeight: 1,
                    opacity: 0.5,
                    textTransform: "capitalize",
                    mb: 1.5,
                  }}
                >
                  Gender
                </Typography> */}
                <img className="icon" src="/images/gender.svg"></img>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  male
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* <Typography
                  variant="subtitle2"
                  sx={{
                    lineHeight: 1,
                    opacity: 0.5,
                    textTransform: "capitalize",
                    mb: 1.5,
                  }}
                >
                  company name
                </Typography> */}
                <CompanyIcon />
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  shunyavkash
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* <Typography
                  variant="subtitle2"
                  sx={{
                    lineHeight: 1,
                    opacity: 0.5,
                    textTransform: "capitalize",
                    mb: 1.5,
                  }}
                >
                  reference
                </Typography> */}
                <img className="icon" src="/images/reference.svg"></img>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    textTransform: "capitalize",
                  }}
                >
                  hirenbhai
                </Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                {/* <Typography
                  variant="subtitle2"
                  sx={{
                    lineHeight: 1,
                    opacity: 0.5,
                    textTransform: "capitalize",
                    mb: 1.5,
                  }}
                >
                  reference
                </Typography> */}
                <img className="icon" src="/images/website.svg"></img>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    wordBreak: "break-word",
                  }}
                >
                  www.google.com
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                mt: { xs: 2.75, sm: 3.5 },
                maxHeight: { xs: "70px", sm: "80px" },
                maxWidth: { xs: "120px", sm: "135px" },
                minWidth: "100px",
              }}
            >
              <img
                src="/images/sign.svg"
                style={{
                  maxHeight: "inherit",
                  width: "100%",
                  display: "block",
                  borderRadius: "6px",
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
