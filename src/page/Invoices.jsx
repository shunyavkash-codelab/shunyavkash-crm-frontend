import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";

const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const [showTable, setShowTable] = useState(false);

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
              alignItems: "center",
              justifyContent: "space-between",
              gap: 2,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ mb: 0.75, textTransform: "capitalize" }}
              >
                Our Recent Invoices
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                Invoices
              </Typography>
            </Box>
            <Box
              sx={{
                "& > button": {
                  height: "40px",
                  width: "40px",
                  minWidth: "unset",
                  borderRadius: 0,
                },
              }}
            >
              <Button
                onClick={() => {
                  setShowTable(false);
                }}
                sx={{
                  bgcolor: showTable ? "#dcdcdc" : "primary.main",
                  color: showTable ? "primary.main" : "white",
                  ":hover": {
                    bgcolor: showTable ? "#dcdcdc" : "primary.main",
                    color: showTable ? "primary.main" : "white",
                  },
                }}
              >
                <CreditCardOutlinedIcon />
              </Button>
              <Button
                onClick={() => {
                  setShowTable(true);
                }}
                sx={{
                  bgcolor: showTable ? "primary.main" : "#dcdcdc",
                  color: showTable ? "white" : "primary.main",
                  ":hover": {
                    bgcolor: showTable ? "primary.main" : "#dcdcdc",
                    color: showTable ? "white" : "primary.main",
                  },
                }}
              >
                <ListOutlinedIcon />
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: showTable ? "none" : "block" }}>
            <Box>
              <Grid container rowSpacing={2} columnSpacing={2}>
                {gridItems.map((item) => (
                  <Grid
                    key={item}
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
                    >
                      {/* Add your card content here */}
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
          <Box sx={{ display: showTable ? "block" : "none" }}>
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
                  <TableRow sx={{ "&>th": { lineHeight: 1 } }}>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Start date</TableCell>
                    <TableCell>End date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&>*": { p: 1.5 },
                    }}
                  >
                    <TableCell>CRM</TableCell>
                    <TableCell>Hiren</TableCell>
                    <TableCell>Deep</TableCell>
                    <TableCell>12-12-23</TableCell>
                    <TableCell>13-12-23</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&>*": { p: 1.5 },
                    }}
                  >
                    <TableCell>CRM</TableCell>
                    <TableCell>Hiren</TableCell>
                    <TableCell>Deep</TableCell>
                    <TableCell>12-12-23</TableCell>
                    <TableCell>13-12-23</TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&>*": { p: 1.5 },
                    }}
                  >
                    <TableCell>CRM</TableCell>
                    <TableCell>Hiren</TableCell>
                    <TableCell>Deep</TableCell>
                    <TableCell>12-12-23</TableCell>
                    <TableCell>13-12-23</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </>
  );
}
