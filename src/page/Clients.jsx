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
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import PlusIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";

export default function Clients() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [clientList, setClientList] = useState([]);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { accessToken } = useAuth();

  const fetchclientData = async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setClientList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchclientData();
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
                Our Clients
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                client
              </Typography>
            </Box>
            <Box>
              <Link variant="Button" to="./add">
                <Button
                  disableRipple
                  sx={{
                    px: 2.5,
                    py: 1.5,
                    bgcolor: "primary.main",
                    color: "white",
                    lineHeight: 1,
                    borderRadius: 2.5,
                    maxHeight: "42px",
                    "&:hover": { bgcolor: "rgb(22, 119, 255, 80%)" },
                  }}
                  startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
                >
                  New client
                </Button>
              </Link>
            </Box>
          </Box>
          {clientList.length === 0 ? (
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
                  borderRadius: 5,
                  mx: { xs: "-10px", sm: 0 },
                  width: { xs: "auto", sm: "auto" },
                  borderRadius: 2.5,
                }}
              >
                <Table
                  className="projectTable"
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
                      sx={{ "&>*": { lineHeight: 1, fontWeight: 700 } }}
                    >
                      <TableCell>Name</TableCell>
                      <TableCell>Company Name</TableCell>
                      <TableCell>Manager Name</TableCell>
                      <TableCell>Mobile number</TableCell>
                      <TableCell>Gender</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clientList.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                          "&>*": { p: 1.5 },
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
                                width: { xs: "36px", sm: "40px" },
                                height: { xs: "36px", sm: "40px" },
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
                        <TableCell>{row.managerName}</TableCell>
                        <TableCell>{row.mobileNumber}</TableCell>
                        <TableCell>{row.gender}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 1.25, sm: 1.75 },
                              opacity: 0.3,
                              "&>svg": { fontSize: { xs: "20px", sm: "24px" } },
                            }}
                          >
                            <Button
                              disableRipple
                              sx={{
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              }}
                            >
                              <VisibilityIcon />
                            </Button>
                            <Button
                              disableRipple
                              sx={{
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              }}
                            >
                              <CreateIcon />
                            </Button>
                            <Button
                              disableRipple
                              sx={{
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              }}
                            >
                              <DeleteIcon />
                            </Button>
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
      </Box>
    </>
  );
}
