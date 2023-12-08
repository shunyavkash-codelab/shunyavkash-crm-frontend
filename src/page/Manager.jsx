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
import AddManager from "../component/AddManager";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";

export default function Manager() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [managerList, setManagerList] = useState([]);
  const [open, setOpen] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const fetchManagers = async () => {
    try {
      const res = await apiCall({
        url: `manager/getManagers`,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setManagerList(res.data.data.data);
        console.log(res.data.data.data, "============133");
      }
    } catch (error) {
      console.log(error, setSnack);
      // handleApiError(error, setSnack);
    }
  };
  useEffect(() => {
    fetchManagers();
  }, []);
  return (
    <>
      <SideBar
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
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
                Our Managers
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                Manager
              </Typography>
            </Box>
            <Box>
              <Link variant="Button" to="javascript:void(0);">
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
                  onClick={() => setOpen(true)}
                >
                  New Manager
                </Button>
                {open && <AddManager open={open} setOpen={setOpen} />}
              </Link>
            </Box>
          </Box>
          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid rgba(224, 224, 224, 1)",
              borderRadius: 5,
              mx: { xs: "-10px", sm: 0 },
              width: { xs: "auto", sm: "auto" },
              borderRadius: { xs: 4, sm: 6 },
            }}
          >
            <Table
              className="managerTable"
              sx={{
                minWidth: 650,
                textTransform: "capitalize",
                textWrap: "nowrap",
              }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ "&>th": { lineHeight: 1 } }}>
                  <TableCell>manager</TableCell>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {managerList.map((row) => (
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
                          gap: { xs: 1.25, sm: 1.75 },
                          opacity: 0.3,
                          "&>svg": { fontSize: { xs: "20px", sm: "24px" } },
                        }}
                      >
                        <VisibilityIcon />
                        <CreateIcon />
                        <DeleteIcon />
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </>
  );
}
