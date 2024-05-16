import { Box, Paper, Table, TableContainer } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import SectionHeader from "../component/SectionHeader";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useSearchParams } from "react-router-dom";
import LoadingIcon from "../component/icons/LoadingIcon";
import NoData from "../component/NoData";
import CustomTableHeader from "../component/table/CustomTableHeader";
import CustomTableBody from "../component/table/CustomTableBody";
import ThemePagination from "../component/ThemePagination";
import handleApiError from "../utils/handleApiError";
import { APIS } from "../api/apiList";
import ProjectsIcon from "@mui/icons-material/FileCopyOutlined";
import InvoicesIcon from "@mui/icons-material/ReceiptOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import moment from "moment";

export default function Notifications() {
  const [notificationList, setNotificationList] = useState([]);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const [params] = useSearchParams();
  const page = +params.get("page") || 1;
  const limit = +params.get("limit") || 10;
  const [totalPage, setTotalPage] = useState(1);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.NOTIFICATION.LIST,
        method: "get",
        params: {
          page: page,
          limit: limit,
        },
      });
      if (res.data.success === true) {
        setNotificationList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
      handleApiError(error, setSnack);
    }
  }, [apiCall, limit, page, setSnack]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  function getTimeLapse(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const timeDifference = now.getTime() - date.getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7));

    if (minutes < 1) {
      return "just now";
    } else if (minutes < 60) {
      return `${minutes} min`;
    } else if (hours < 24) {
      return `${hours}h`;
    } else if (days < 7) {
      return `${days}d`;
    } else {
      return `${weeks}w`;
    }
  }

  const TABLE_HEADINGS = [
    {
      id: "text",
      label: "Description",
      sortable: false,
    },
  ];

  const TABLE_BODY = notificationList.map((notification) => ({
    key: notification._id,
    row: [
      {
        type: "avatar+name",
        value: {
          profile_img: notification.client_info
            ? notification.client_info.profile_img
            : notification.sender_info.profile_img,
          email: notification.text,
          type: notification.type,
          textname:
            notification.type === "my-salary"
              ? moment(notification.salary_info.date)
                  .subtract(1, "months")
                  .endOf("month")
                  .format("MMMM - YYYY")
              : notification.textname,
          date: getTimeLapse(notification.createdAt),
          href: ["clients", "projects"].includes(notification.type)
            ? `/${notification.type}/view/${notification.itemId}`
            : `/${notification.type}`,
        },
        Icon: () => {
          if (notification.type === "projects") {
            return <ProjectsIcon />;
          }
          if (notification.type === "invoices") {
            return <InvoicesIcon />;
          }
          if (notification.type === "my-salary") {
            return <AccountBalanceWalletOutlinedIcon />;
          }
        },
      },
    ],
  }));

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Notifications"
          BreadCrumbPreviousLink="/"
          BreadCrumbPreviousTitle="Dashboard"
          BreadCrumbCurrentTitle="notifications"
          style={{ mb: 0 }}
        />

        {isLoading ? (
          <LoadingIcon style={{ height: "50vh" }} />
        ) : notificationList.length === 0 ? (
          <NoData />
        ) : (
          <>
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                mx: { xs: "-10px", sm: 0 },
                width: { xs: "auto", sm: "auto" },
                borderRadius: 2.5,
              }}
            >
              <Table
                className="notificationTable"
                id={"tableData"}
                sx={{
                  minWidth: 650,
                  textTransform: "capitalize",
                  textWrap: "nowrap",
                  "& thead > tr > th": {
                    backgroundColor: "#F8F9FA",
                  },
                  "& th,& td": { borderBottom: 0 },
                  "& tbody tr": {
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  },
                }}
                aria-label="simple table"
              >
                <CustomTableHeader headings={TABLE_HEADINGS} />
                <CustomTableBody records={TABLE_BODY} />
              </Table>
            </TableContainer>
          </>
        )}
        {/* pagination */}
        {notificationList.length > 0 && (
          <ThemePagination
            totalPage={totalPage}
            count={notificationList.length}
          />
        )}
      </Box>
    </>
  );
}
