import React, { useState } from "react";
import { Box, Typography, Grid, Card, Button } from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import CounterCards from "../component/CounterCards";
import ManagerIcon from "@mui/icons-material/PermIdentityOutlined";
import ClientsIcon from "@mui/icons-material/PeopleAltOutlined";
import ProjectsIcon from "@mui/icons-material/FileCopyOutlined";
import InvoicesIcon from "@mui/icons-material/ReceiptOutlined";
import { Link } from "react-router-dom";
import ToggleIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import PlusIcon from "@mui/icons-material/CloseOutlined";
import EmployeeIcon from "@mui/icons-material/BadgeOutlined";
import { height } from "@mui/system";
import useApi from "../hooks/useApi";
import {useSnack} from "../hooks/store/useSnack"

const Search = styled("div")();
const SearchIconWrapper = styled("div")();
const StyledInputBase = styled(InputBase)();

const sideBarWidth = "240px";

export default function Home() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showDorpDownMenu, setShowDorpDownMenu] = useState(false);
  const [userAvtar, setUserAvtar] = useState({name:"Aaron Cooper"});
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack()

  // const userAvtarCall = async (id) => {
  //   try {
  //     const res = await apiCall({
  //       url: `manager/${id}`,
  //       method: "get",
  //     });
  //     if (res.data.success === true) {
  //       setSnack(res.data.message);
  //       setUserAvtar(res.data.data)
  //       console.log(res.data.data,"userAvtar======54")
  //     }
  //   } catch (error) {
  //     console.log(error, setSnack);
  //     // handleApiError(error, setSnack);
  //   }
  // };
  // useEffect(() => {
  //     userAvtarCall('6569ca3bd8635fedc401bc8b')
  // }, []);
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
          <Box>
            <Box sx={{ mb: 3.25 }}>
              <Typography
                variant="h5"
                sx={{ mb: 0.75, textTransform: "capitalize" }}
              >
                DashBoard
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                DashBoard
              </Typography>
            </Box>
            <Grid container rowSpacing={1} columnSpacing={1}>
              <Grid item xs={12} sm={6} xl={3} sx={{ height: "100%" }}>
                <CounterCards
                  BgColor={"rgb(22, 108, 255, 10%)"}
                  Title={"Total Manager"}
                  Counter={"12"}
                  icon={
                    <ManagerIcon
                      sx={{ fontSize: { xs: "28px", sm: "32px" } }}
                    />
                  }
                ></CounterCards>
              </Grid>
              <Grid item xs={12} sm={6} xl={3} sx={{ height: "100%" }}>
                <CounterCards
                  BgColor={"rgb(255, 198, 117, 10%)"}
                  Title={"Total Clients"}
                  Counter={"22"}
                  icon={
                    <ClientsIcon
                      sx={{ fontSize: { xs: "28px", sm: "32px" } }}
                    />
                  }
                ></CounterCards>
              </Grid>
              <Grid item xs={12} sm={6} xl={3} sx={{ height: "100%" }}>
                <CounterCards
                  BgColor={"rgba(0, 255, 135, 10%)"}
                  Title={"Total projects"}
                  Counter={"100+"}
                  icon={
                    <ProjectsIcon
                      sx={{ fontSize: { xs: "28px", sm: "32px" } }}
                    />
                  }
                ></CounterCards>
              </Grid>
              <Grid item xs={12} sm={6} xl={3} sx={{ height: "100%" }}>
                <CounterCards
                  BgColor={"rgba(255, 0, 67, 10%)"}
                  Title={"Total invoices"}
                  Counter={"50"}
                  icon={
                    <InvoicesIcon
                      sx={{ fontSize: { xs: "28px", sm: "32px" } }}
                    />
                  }
                ></CounterCards>
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ mt: 6 }}>
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
                  Our Recent invoices
                </Typography>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.4, textTransform: "capitalize" }}
                >
                  invoices
                </Typography>
              </Box>
              <Box>
                <Link variant="Button" to="./Invoices">
                  <Button
                    disableRipple
                    sx={{
                      px: 3.5,
                      py: 1.75,
                      bgcolor: "primary.main",
                      color: "white",
                      lineHeight: 1,
                      borderRadius: 2.5,
                      "&:hover": { bgcolor: "rgb(22, 119, 255, 80%)" },
                    }}
                  >
                    View All
                  </Button>
                </Link>
              </Box>
            </Box>
            <Box>
              <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={6}
                  xl={4}
                  xxl={3}
                  sx={{ maxWidth: "420px", mx: { xs: "auto", sm: "0" } }}
                >
                  <Card
                    variant="outlined"
                    sx={{ height: "450px", borderRadius: 2.5 }}
                  ></Card>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={6}
                  xl={4}
                  xxl={3}
                  sx={{ maxWidth: "420px", mx: { xs: "auto", sm: "0" } }}
                >
                  <Card
                    variant="outlined"
                    sx={{ height: "450px", borderRadius: 2.5 }}
                  ></Card>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={6}
                  xl={4}
                  xxl={3}
                  sx={{ maxWidth: "420px", mx: { xs: "auto", sm: "0" } }}
                >
                  <Card
                    variant="outlined"
                    sx={{ height: "450px", borderRadius: 2.5 }}
                  ></Card>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  lg={6}
                  xl={4}
                  xxl={3}
                  sx={{ maxWidth: "420px", mx: { xs: "auto", sm: "0" } }}
                >
                  <Card
                    variant="outlined"
                    sx={{ height: "450px", borderRadius: 2.5 }}
                  ></Card>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
