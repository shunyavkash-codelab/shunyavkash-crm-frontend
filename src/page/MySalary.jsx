import React, { useEffect, useState } from "react";
import UserSalary from "./UserSalary";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import SectionHeader from "../component/SectionHeader";
import { Box, Stack } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";

export default function MySalary() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [userBank, setUserBank] = useState(false);
  const { accessToken, userId } = useAuth();
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();

  const viewUserBank = async (userId) => {
    try {
      const res = await apiCall({
        url: APIS.BANK.USERBANK(userId),
        method: "get",
      });
      if (res.data.success === true) {
        setUserBank(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    viewUserBank(userId);
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
          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignItems={{ sm: "center" }}
            justifyContent={{ sm: "space-between" }}
            columnGap={2}
            rowGap={2.5}
            sx={{
              mb: 3.25,
            }}
          >
            <SectionHeader
              Title="My Salary"
              BreadCrumbPreviousLink="/"
              BreadCrumbPreviousTitle="Dashboard"
              BreadCrumbCurrentTitle="My Salary"
              style={{ mb: 0 }}
            />
          </Stack>
          <UserSalary
            userId={userId}
            userBank={userBank}
            setUserBank={setUserBank}
          />
        </Box>
      </Box>
    </>
  );
}
