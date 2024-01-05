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
  InputLabel,
  Link,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ImageUploder from "../component/form/ImageUploder";

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
              maxWidth: 600,
            }}
          >
            <Box component="form">
              <Grid container rowSpacing={2.5} columnSpacing={2.5}>
                {/* Radio Buttons */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{
                    "> .MuiFormControl-root": { margin: 0 },
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <FormControl
                    sx={{ "& > .MuiFormControl-root": { minWidth: "100%" } }}
                  >
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      // defaultValue="Credit"
                      name="radio-buttons-group"
                      sx={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "center",
                        "& .MuiButtonBase-root": { paddingY: 0 },
                      }}
                    >
                      <FormControlLabel
                        value="income"
                        control={<Radio />}
                        label="Income"
                        sx={{ "& > *": { fontSize: 14 } }}
                      />
                      <FormControlLabel
                        value="expance"
                        control={<Radio />}
                        label="Expance"
                        sx={{ "& > *": { fontSize: 14 } }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                {/* Date */}
                <Grid
                  item
                  xs={12}
                  md={5}
                  lg={6}
                  sx={{
                    "& > .MuiFormControl-root": { margin: 0 },
                  }}
                >
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    style={{
                      width: "100%",
                      maxWidth: "100%",
                    }}
                  >
                    <DemoContainer components={["DatePicker"]}>
                      <MobileDatePicker
                        label="Date"
                        sx={{
                          minWidth: "100% !important",
                          fontSize: "14px !important",
                          "& > *": { fontSize: 14 },
                        }}
                      />
                      {/* <DatePicker label="Basic date picker" size="small" /> */}
                    </DemoContainer>
                  </LocalizationProvider>
                </Grid>
                {/* Title */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <TextField
                    required
                    id="title"
                    label="Title"
                    defaultValue=""
                    size="normal"
                    sx={{ width: "100%", "& > *": { fontSize: 14 } }}
                  />
                </Grid>
                {/* Description */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <TextField
                    required
                    multiline
                    rows={4}
                    id="description"
                    label="Description"
                    defaultValue=""
                    sx={{
                      width: "100%",
                      fontSize: 14,
                      "& > *": { fontSize: 14 },
                    }}
                  />
                </Grid>
                {/* Amount */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <TextField
                    required
                    id="amount"
                    label="Amount"
                    defaultValue=""
                    sx={{ width: "100%", "& > *": { fontSize: 14 } }}
                  />
                </Grid>
                {/* Expance Type */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={6}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <FormControl
                    fullWidth
                    size="normal"
                    sx={{
                      "&>label": { fontSize: "14px" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      Expanse Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                      sx={{ fontSize: "14px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"rent-and-maintenance"}
                      >
                        Rent & Maintenance
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"salary"}
                      >
                        Salary
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"miscellaneous"}
                      >
                        Miscellaneous
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"asset-purchase"}
                      >
                        Asset purchase
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Invoice Type */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={6}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <FormControl
                    fullWidth
                    size="normal"
                    sx={{
                      "&>label": { fontSize: "14px" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      Invoice Type
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                      sx={{ fontSize: "14px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"inbound"}
                      >
                        Inbound
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"outbound"}
                      >
                        Outbound
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Invoice Owner */}
                <Grid
                  item
                  xs={12}
                  md={6}
                  lg={6}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <TextField
                    required
                    id="invoice-owner"
                    label="Invoice Owner"
                    defaultValue=""
                    sx={{ width: "100%", "& > *": { fontSize: 14 } }}
                  />
                </Grid>
                {/* Payment Method */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={6}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <FormControl
                    fullWidth
                    size="normal"
                    sx={{
                      "&>label": { fontSize: "14px" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      Payment Method
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                      sx={{ fontSize: "14px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"card"}
                      >
                        Card
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"bank-transfer"}
                      >
                        Bank Transfer
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Collaborator */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={6}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <FormControl
                    fullWidth
                    size="normal"
                    sx={{
                      "&>label": { fontSize: "14px" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      Collaborator
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Gender"
                      sx={{ fontSize: "14px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"pixel"}
                      >
                        Pixel
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"simpliigence"}
                      >
                        Simpliigence
                      </MenuItem>
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"rewenewd"}
                      >
                        Rewenewd
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {/* Invoice Upload */}
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={6}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <ImageUploder title="Invoice Upload"></ImageUploder>
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
