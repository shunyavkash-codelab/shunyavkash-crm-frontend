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
  Stack,
} from "@mui/material";
import SideBar from "../component/SideBar.jsx";
import Header from "../component/Header.jsx";
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import useApi from "../hooks/useApi.js";
import { useSnack } from "../hooks/store/useSnack.js";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import { useSearchData } from "../hooks/store/useSearchData.js";
import NoData from "../component/NoData.jsx";
import ThemeButton from "../component/ThemeButton.jsx";
import SectionHeader from "../component/SectionHeader.jsx";

export default function User() {
  const [userList, setUserList] = useState([]);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const { accessToken, user } = useAuth();
  const { searchData } = useSearchData();

  const fetchUsers = async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.MANAGERLIST,
        method: "get",
        params: { search: searchData },
      });
      if (res.data.success === true) {
        setUserList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    if (searchData !== undefined) {
      const getData = setTimeout(async () => {
        fetchUsers();
      }, 1000);
      return () => clearTimeout(getData);
    }
  }, [searchData]);
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
            Title=" Our Manager"
            BreadCrumbPreviousLink="/"
            BreadCrumbPreviousTitle="Dashboard"
            BreadCrumbCurrentTitle="Manager"
            style={{ mb: 0 }}
          />
          {user.role === 0 && (
            <Link to="./add">
              <ThemeButton
                Text="Add Manager"
                startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
              />
            </Link>
          )}
        </Stack>

        {userList.length === 0 ? (
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
                className="userTable"
                sx={{
                  minWidth: 650,
                  textTransform: "capitalize",
                  textWrap: "nowrap",
                  "& th,& td": { borderBottom: 0 },
                  "& tbody tr": {
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  },
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow
                    sx={{
                      "&>th": { lineHeight: 1, fontWeight: 700 },
                    }}
                  >
                    <TableCell>user</TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Mobile Number</TableCell>
                    <TableCell>Gender</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userList.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.75,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: "36px",
                              height: "36px",
                            }}
                            alt={row.name}
                            src={row.profile_img}
                          />
                          <Box>
                            <Typography
                              sx={{
                                mb: 0.75,
                                lineHeight: 1,
                                fontWeight: 600,
                                fontSize: { xs: "14px", sm: "16px" },
                              }}
                            >
                              {row.name}
                            </Typography>
                            <Typography
                              sx={{
                                lineHeight: 1,
                                textTransform: "lowercase",
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              {row.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{row.companyName}</TableCell>
                      <TableCell>{row.mobileNumber}</TableCell>
                      <TableCell>{row.gender}</TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 1.25, sm: 1.5 },
                            opacity: 0.3,
                            "& button": {
                              p: 0,
                              minWidth: "auto",
                              color: "black",
                              "&:hover": { color: "primary.main" },
                            },
                            "& svg": {
                              fontSize: { xs: "20px", sm: "22px" },
                            },
                          }}
                        >
                          <Link to={`./view/${row._id}`}>
                            <Button disableRipple>
                              <VisibilityIcon />
                            </Button>
                          </Link>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </>
  );
}
