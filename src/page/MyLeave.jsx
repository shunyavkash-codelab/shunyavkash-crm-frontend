import React from "react";
import SectionHeader from "../component/SectionHeader";
import { Box, Stack } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import UserLeave from "./UserLeave";

export default function MyLeave() {
  const { userId } = useAuth();
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
            Title="My Leave"
            BreadCrumbPreviousLink="/"
            BreadCrumbPreviousTitle="Dashboard"
            BreadCrumbCurrentTitle="My Leave"
            style={{ mb: 0 }}
            stackSx={{ mb: 0 }}
          />
        </Stack>
        <UserLeave profileId={userId} />
      </Box>
    </>
  );
}
