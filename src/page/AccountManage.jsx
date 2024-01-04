import React, { useState } from "react";
import SideBar from "../component/SideBar";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ModalComponent from "../component/ModalComponent";
import PlusIcon from "@mui/icons-material/Close";

function AccountManage() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [dashboardData, setDashboardData] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { accessToken, user } = useAuth();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const leaves = [
    {
      id: 1,
      username: "Deep Bhimani",
      type: "casual",
      reason: "Marriage Function",
      startDate: "15/01/2023",
      endDate: "17/01/2023",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      username: "Deep Bhimani",
      type: "sick",
      reason: "Medical",
      startDate: "25/02/2023",
      endDate: "27/02/2023",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      username: "Deep Bhimani",
      type: "paid",
      reason: "Going to Village",
      startDate: "31/04/2023",
      endDate: "2/05/2023",
      status: "unapprove",
      statusReason: "ipsum dolor sit amet lorem",
    },
    {
      id: 4,
      username: "Deep Bhimani",
      type: "unpaid",
      reason: "Going to Friend's Birthday Party",
      startDate: "25/04/2023",
      endDate: "25/04/2023",
      status: "unapprove",
      statusReason: "Lorem dolor sit ipsum amet",
    },
    {
      id: 5,
      username: "Deep Bhimani",
      type: "paid",
      reason: "sick",
      startDate: "14/08/2023",
      endDate: "14/08/2023",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet",
    },
    {
      id: 6,
      username: "Deep Bhimani",
      type: "sick",
      reason: "Medical Issue",
      startDate: "12/10/2023",
      endDate: "15/10/2023",
      status: "approve",
      statusReason: "Lorem dolor sit amet",
    },
  ];
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
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Typography
              variant="h5"
              sx={{ textTransform: "capitalize", mb: 0.5 }}
            >
              Account Management
            </Typography>
            <Button
              disableRipple
              startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
              sx={{
                maxHeight: "42px",
                position: "relative",
                px: 2.5,
                py: 1.5,
                border: "1px solid",
                borderColor: "primary.main",
                color: "primary.main",
                lineHeight: 1,
                borderRadius: 2.5,
                overflow: "hidden",
                "&:before": {
                  content: "''",
                  height: 0,
                  width: "10rem",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: "0",
                  bgcolor: "primary.main",
                  transform: "rotate(-45deg) translate(-50%, -50%)",
                  transformOrigin: "0% 0%",
                  transition: "all 0.4s ease-in-out",
                },
                "&:hover": {
                  color: "white",
                  "&:before": { height: "10rem" },
                },
              }}
            >
              <span style={{ position: "relative" }}>New Account</span>
            </Button>
          </Stack>
          <Grid container rowSpacing={2.5} columnSpacing={2.5} mt={0}>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Sales
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹1,50,000
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Expance
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹80,000
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Balance
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹50,000
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={3} lg={3}>
              <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
                <Typography
                  sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
                >
                  Total Income
                </Typography>
                <Typography
                  sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
                >
                  ₹565000
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            mt={4}
          >
            <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
              Accounting items
            </Typography>
            <Box maxWidth={150} width={"100%"}></Box>
          </Stack>

          <Box mt={2}>
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
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}>
                    <TableCell>User Name</TableCell>
                    <TableCell>Leave Type</TableCell>
                    <TableCell>Reason</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaves.map((leave) => (
                    <TableRow
                      key={leave.key}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&:first-child td": {
                          maxWidth: "250px",
                          textWrap: "wrap",
                        },
                      }}
                    >
                      <TableCell>{leave.username}</TableCell>
                      <TableCell
                        sx={{
                          "& .statusBtn": {
                            color: "white",
                            fontSize: "12px",
                            p: 0.5,
                            borderRadius: 1,
                            maxWidth: "fit-content",
                            lineHeight: 1,
                          },
                          "& .casual": {
                            bgcolor: "rgba(94, 115, 141, 15%)",
                            color: "grey.dark",
                          },
                          "& .sick": {
                            bgcolor: "rgba(248, 174, 0, 15%)",
                            color: "secondary.main",
                          },
                          "& .unpaid": {
                            bgcolor: "rgba(225, 107, 22, 15%)",
                            color: "review.main",
                          },
                          "& .paid": {
                            bgcolor: "rgba(74, 210, 146, 15%)",
                            color: "success.main",
                          },
                        }}
                      >
                        <Box
                          className={`statusBtn ${
                            leave.type === "casual"
                              ? "casual"
                              : leave.type === "sick"
                              ? "sick"
                              : leave.type === "unpaid"
                              ? "unpaid"
                              : "paid"
                          }`}
                        >
                          {leave.type}
                        </Box>
                      </TableCell>
                      <TableCell>{leave.reason}</TableCell>
                      <TableCell>{leave.startDate}</TableCell>
                      <TableCell>{leave.endDate}</TableCell>
                      <TableCell
                        sx={{
                          "& .statusBtn": {
                            color: "white",
                            fontSize: "12px",
                            p: 0.5,
                            borderRadius: 1,
                            maxWidth: "fit-content",
                            lineHeight: 1,
                          },
                          "& .unapprove": {
                            bgcolor: "secondary.main",
                          },
                          "& .approve": {
                            bgcolor: "success.main",
                          },
                        }}
                      >
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                          className={`statusBtn ${
                            leave.status === "unapprove"
                              ? "unapprove"
                              : "approve"
                          }`}
                        >
                          <span style={{ display: "inline-block" }}>
                            {leave.status}
                          </span>
                          <Tooltip title={leave.statusReason}>
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="center"
                              sx={{
                                height: "16px",
                                width: "16px",
                                cursor: "pointer",
                                border: "1px solid white",
                                borderRadius: "100%",
                                padding: "3px",
                              }}
                            >
                              <img
                                src="/images/info.svg"
                                style={{ width: "100%", height: "100%" }}
                                alt="info"
                              />
                            </Stack>
                          </Tooltip>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>

      <ModalComponent
        open={open}
        setOpen={setOpen}
        modalTitle="Add Accounting"
        size="large"
      >
        <Grid container rowSpacing={2.5} columnSpacing={2.5}>
          <Grid
            item
            xs={12}
            md={12}
            lg={12}
            sx={{ "> .MuiFormControl-root": { margin: 0 } }}
          >
            <FormControl sx={{ "& > .MuiFormControl-root": { width: "100%" } }}>
              {/* <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel> */}
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                sx={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                {/* <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                </Stack> */}
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={6}
            sx={{ "> .MuiFormControl-root": { margin: 0 } }}
          >
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                fullWidth
                size="normal"
                id="name"
                placeholder="Leave Reason"
                autoComplete="off"
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </ModalComponent>
    </>
  );
}

export default AccountManage;
