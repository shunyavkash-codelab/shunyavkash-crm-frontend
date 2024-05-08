import React, { useEffect, useState } from "react";
import UserSalary from "./UserSalary";
import SectionHeader from "../component/SectionHeader";
import { Box, Stack } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";

export default function MySalary() {
  const [userBank, setUserBank] = useState(false);
  const { userId } = useAuth();
  const { apiCall } = useApi();
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
            stackSx={{ mb: 0 }}
          />
        </Stack>
        <UserSalary
          userId={userId}
          userBank={userBank}
          setUserBank={setUserBank}
        />
      </Box>
    </>
  );
}
