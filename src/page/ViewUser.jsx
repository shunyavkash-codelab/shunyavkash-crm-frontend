import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import SideBar from "../component/SideBar.jsx";
import Header from "../component/Header.jsx";
import useApi from "../hooks/useApi.js";
import { useSnack } from "../hooks/store/useSnack.js";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import CompanyIcon from "@mui/icons-material/BusinessOutlined";
import { useParams } from "react-router-dom";
import AddressIcon from "@mui/icons-material/LocationOnOutlined";
import SectionHeader from "../component/SectionHeader.jsx";

export default function ViewUser() {
  const { apiCall } = useApi();
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const [userList, setUserList] = useState([]);
  const { id } = useParams();

  const viewUsers = async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.VIEW(id),
        method: "get",
      });
      if (res.data.success === true) {
        setUserList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    viewUsers();
  }, []);
  // });

  return (
    <>
      <SectionHeader
        Title="Manager"
        BreadCrumbPreviousLink="/members"
        BreadCrumbPreviousTitle="Members"
        BreadCrumbCurrentTitle="User"
      />

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
                userList.profile_img ||
                "https://uko-react.vercel.app/static/avatar/001-man.svg"
              } //"https://plm-staging.s3.amazonaws.com/profiles/65264e33d2ac619310e6687a?v=27"
              alt=""
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
              {userList.name}
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
              {userList.email}
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
                  user Name
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
          {userList.mobileNumber && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <PhoneIcon />
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1,
                  textTransform: "capitalize",
                }}
              >
                {userList.mobileCode} {userList.mobileNumber}
              </Typography>
            </Box>
          )}
          {userList.gender && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <img className="icon" src="/images/gender.svg" alt=""></img>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1,
                  textTransform: "capitalize",
                }}
              >
                {userList.gender}
              </Typography>
            </Box>
          )}
          {userList.companyName && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <CompanyIcon />
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1,
                  textTransform: "capitalize",
                }}
              >
                {userList.companyName}
              </Typography>
            </Box>
          )}

          {userList?.reference && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <img className="icon" src="/images/reference.svg" alt=""></img>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1,
                  textTransform: "capitalize",
                }}
              >
                {userList?.reference}
              </Typography>
            </Box>
          )}
          {userList.websiteURL && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <img className="icon" src="/images/website.svg" alt=""></img>
              <Typography
                variant="body2"
                sx={{
                  lineHeight: 1,
                  wordBreak: "break-word",
                }}
              >
                {userList.websiteURL}
              </Typography>
            </Box>
          )}
          {(userList.address ||
            userList.address2 ||
            userList.landmark ||
            userList.pincode) && (
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
                {userList.address}
                {userList.address2}
                {userList.landmark}
                {userList.pincode}
              </Typography>
            </Box>
          )}
        </Box>
        {userList.signature && (
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
                userList.signature
                  ? userList.signature
                  : "/images/signature.png"
              } //"/images/sign.svg"
              alt=""
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
    </>
  );
}
