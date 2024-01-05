import React, { useState } from "react";
import SideBar from "../component/SideBar";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
import {
  Box,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

function AccountAdd() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();

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
          <Box>
            <Typography
              variant="h5"
              sx={{ textTransform: "capitalize", mb: 0.5 }}
            >
              Add Account
            </Typography>
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Link to={"/managers"} style={{ textDecoration: "none" }}>
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
                  Account Management /
                </Typography>
              </Link>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                Add Account
              </Typography>
            </Box>
          </Box>
          <Card
            sx={{
              p: 3,
              mt: 3,
              border: 0,
              borderRadius: 3,
              boxShadow: "none",
            }}
          >
            <Box component="form">
              <Grid container rowSpacing={2.5} columnSpacing={2.5}>
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <FormControl
                    sx={{ "& > .MuiFormControl-root": { width: "100%" } }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="Credit"
                      name="radio-buttons-group"
                      sx={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <FormControlLabel
                        value="credit"
                        control={<Radio />}
                        label="Credit"
                      />
                      <FormControlLabel
                        value="debit"
                        control={<Radio />}
                        label="Debit"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <TextField
                    required
                    id="outlined-required"
                    label="Required"
                    defaultValue="Hello World"
                  />
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}

export default AccountAdd;
