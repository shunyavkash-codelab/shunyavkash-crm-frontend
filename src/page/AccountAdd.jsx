import React, { useState } from "react";
import SideBar from "../component/SideBar";
import { useAuth } from "../hooks/store/useAuth";
import Header from "../component/Header";
import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
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
import { Link } from "react-router-dom";

function AccountAdd() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const [selected, setSelected] = useState("");
  const changeHandler = (e) => {
    setSelected(e.target.value);
  };
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
              <Link to="/account-management" style={{ textDecoration: "none" }}>
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
                Add Entry
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
                        sx={{ "& > *.MuiTypography-root": { fontSize: 14 } }}
                        checked={selected === "income"}
                        onChange={changeHandler}
                      />
                      <FormControlLabel
                        value="expance"
                        control={<Radio />}
                        label="Expance"
                        sx={{ "& > *.MuiTypography-root": { fontSize: 14 } }}
                        checked={selected === "expance"}
                        onChange={changeHandler}
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
                        defaultValue={dayjs("2022-04-17")}
                        sx={{
                          minWidth: "100% !important",
                          "& > *": { fontSize: "14px !important" },
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
                    sx={{
                      width: "100%",
                      "& > .MuiFormLabel-root": { fontSize: 14 },
                    }}
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
                {selected == "expance" ? (
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
                        label="Expanse Type"
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
                ) : (
                  ""
                )}
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
                      label="Invoice Type"
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
                      label="Payment Method"
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
                {selected == "income" ? (
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
                        label="Collaborator"
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
                ) : (
                  ""
                )}
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
                <Grid
                  item
                  xs={12}
                  md={12}
                  lg={12}
                  sx={{ "> .MuiFormControl-root": { margin: 0 } }}
                >
                  <Button
                    disableRipple
                    sx={{
                      maxHeight: "42px",
                      position: "relative",
                      px: 2.5,
                      py: 1.5,
                      bgcolor: "success.main",
                      border: "1px solid",
                      borderColor: "success.main",
                      color: "white",
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
                        bgcolor: "white",
                        transform: "rotate(-45deg) translate(-50%, -50%)",
                        transformOrigin: "0% 0%",
                        transition: "all 0.4s ease-in-out",
                      },
                      "&:hover": {
                        color: "success.main",
                        bgcolor: "success.main",
                        "&:before": { height: "10rem" },
                      },
                    }}
                  >
                    <span style={{ position: "relative" }}>Add Account</span>
                  </Button>
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
