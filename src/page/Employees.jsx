import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList.js";
import { useSearchData } from "../hooks/store/useSearchData.js";
import { useSnack } from "../hooks/store/useSnack";
import EmployeeListRaw from "../component/EmployeeListRaw.jsx";
import { useInviteMemberStore } from "../hooks/store/useInviteMemberStore.js";

export default function Employees() {
  const { accessToken } = useAuth();
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const [employeesList, setEmployeesList] = useState([]);
  const { searchData } = useSearchData();
  const { inviteMemberStore } = useInviteMemberStore();

  const fetchEmployees = async () => {
    try {
      const res = await apiCall({
        url: APIS.EMPLOYEE.ALLLIST,
        method: "get",
        params: { search: searchData },
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setEmployeesList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  // });
  useEffect(() => {
    if (inviteMemberStore)
      setEmployeesList([...[inviteMemberStore], ...employeesList]);
  }, [inviteMemberStore]);

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
          <Box
            sx={{
              mb: 3.25,
              display: "flex",
              alignItems: { sm: "center" },
              justifyContent: { sm: "space-between" },
              flexDirection: { xs: "column", sm: "row" },
              columnGap: 2,
              rowGap: 2.5,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ mb: 0.75, textTransform: "capitalize" }}
              >
                Our Employees
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Link to={"/"} style={{ textDecoration: "none" }}>
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
                    Dashboard /
                  </Typography>
                </Link>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.4, textTransform: "capitalize" }}
                >
                  Employees
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* <FormikProvider value={formik}> */}
          <Box>
            {employeesList.length === 0 ? (
              <Box
                sx={{
                  width: "100%",
                  display: "block",
                  padding: "25px 16px",
                  backgroundColor: "primary.light",
                  textAlign: "center",
                  borderRadius: 2.5,
                }}
              >
                <Typography
                  mb={1.5}
                  variant="h4"
                  sx={{
                    fontSize: "20px",
                    color: "#1677FF",
                    fontWeight: "500",
                    letterSpacing: "0.5px",
                  }}
                >
                  No data available in table
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ fontSize: 14, color: "#848484", fontWeight: "400" }}
                >
                  Currently there no data available!
                </Typography>
              </Box>
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
                    className="managerTable"
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
                        <TableCell>employee</TableCell>
                        <TableCell sx={{ width: "250px" }}>Role</TableCell>
                        <TableCell>status</TableCell>
                        <TableCell sx={{ width: "140px" }}>Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {employeesList.map((row) => (
                        <EmployeeListRaw
                          row={row}
                          uniqId={row._id}
                          setEmployeesList={setEmployeesList}
                          employeesList={employeesList}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            )}
          </Box>
          {/* </FormikProvider> */}
        </Box>
      </Box>
    </>
  );
}
