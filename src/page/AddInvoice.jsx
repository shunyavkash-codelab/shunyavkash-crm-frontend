import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  TableFooter,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, invoiceTable, setInvoiceTable } = useAuth();

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
          <Box sx={{ mb: 3.25 }}>
            <Typography
              variant="h5"
              sx={{ mb: 0.75, textTransform: "capitalize" }}
            >
              Invoice
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.4, textTransform: "capitalize" }}
            >
              Invoice
            </Typography>
          </Box>
          <Box
            sx={{
              bgcolor: "white",
              p: 6.75,
              borderRadius: 2.5,
              maxWidth: "1280px",
              mx: "auto",
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "end",
                  gap: 2,
                }}
              >
                <Box sx={{ height: "160px" }}>
                  <img
                    src="https://vex.visurel.com/assets/img/logo/logo.svg"
                    style={{ height: "100%", width: "auto" }}
                  />
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography variant="h4" sx={{ textTransform: "capitalize" }}>
                    US Invoice
                  </Typography>
                  <Box
                    sx={{
                      mt: 3.75,
                      "&>*:not(:first-child)": {
                        mt: 1,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 3.75,
                      }}
                    >
                      <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                        Invoice no:
                      </Typography>
                      <Typography variant="subtitle3">001</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 3.75,
                      }}
                    >
                      <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                        Invoice Date:
                      </Typography>
                      <Typography variant="subtitle3">
                        Dec 13th, 2023
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 3.75,
                      }}
                    >
                      <Typography variant="subtitle3" sx={{ opacity: 0.5 }}>
                        Due:
                      </Typography>
                      <Typography variant="subtitle3">
                        Jan 13th, 2023
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 6,
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    From
                  </Typography>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      mt: 1,
                      minWidth: "250px",
                      maxWidth: "250px",
                      display: "flex",
                      "&>label": { fontSize: "12px" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      From
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="from"
                      label="From"
                      sx={{ fontSize: "12px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"shunyavkash"}
                      >
                        Shunyavkash
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    label="Address"
                    autoComplete="off"
                    multiline
                    rows={4}
                    sx={{
                      mt: 2.25,
                      minWidth: "250px",
                      maxWidth: "250px",
                      "&>label,& textarea": { fontSize: "12px" },
                      "& textarea": { lineHeight: 1.6 },
                    }}
                  />
                </Box>
                <Box sx={{ textAlign: "right" }}>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    Bill to
                  </Typography>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      mt: 1,
                      minWidth: "250px",
                      maxWidth: "250px",
                      display: "flex",
                      "&>label": { fontSize: "12px" },
                      "&>div": { textAlign: "left" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      To
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="to"
                      label="To"
                      sx={{ fontSize: "12px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"shunyavkash"}
                      >
                        Shunyavkash
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="address"
                    label="Address"
                    autoComplete="off"
                    multiline
                    rows={4}
                    sx={{
                      mt: 2.25,
                      minWidth: "250px",
                      maxWidth: "250px",
                      "&>label,& textarea": { fontSize: "12px" },
                      "& textarea": { lineHeight: 1.6 },
                    }}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  mt: 3,
                  gap: 2,
                }}
              >
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ fontWeight: 700, lineHeight: 1 }}
                  >
                    Manager
                  </Typography>
                  <FormControl
                    fullWidth
                    size="small"
                    sx={{
                      mt: 1,
                      minWidth: "250px",
                      maxWidth: "250px",
                      display: "flex",
                      "&>label": { fontSize: "12px" },
                    }}
                  >
                    <InputLabel
                      sx={{ textTransform: "capitalize" }}
                      id="demo-simple-select-label"
                    >
                      Select Manager
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="manager"
                      label="Manager"
                      sx={{ fontSize: "12px" }}
                    >
                      <MenuItem
                        sx={{ textTransform: "capitalize" }}
                        value={"Hiren polra"}
                      >
                        Hiren polra
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <TextField
                    fullWidth
                    size="small"
                    id="manager_details"
                    label="Manager details"
                    autoComplete="off"
                    multiline
                    rows={4}
                    sx={{
                      mt: 2.25,
                      minWidth: "250px",
                      maxWidth: "250px",
                      "&>label,& textarea": { fontSize: "12px" },
                      "& textarea": { lineHeight: 1.6 },
                    }}
                  />
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 10 }}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    mt: 1,
                    width: "25%",
                    display: "flex",
                    "&>label": { fontSize: "12px" },
                    "&>div": { textAlign: "left" },
                  }}
                >
                  <InputLabel
                    sx={{ textTransform: "capitalize" }}
                    id="demo-simple-select-label"
                  >
                    Select Project
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="select_project"
                    label="Select Project"
                    sx={{ fontSize: "12px" }}
                  >
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"Project 1"}
                    >
                      Project 1
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    mt: 1,
                    minWidth: "250px",
                    maxWidth: "250px",
                    display: "flex",
                    "&>label": { fontSize: "12px" },
                    "&>div": { textAlign: "left" },
                  }}
                >
                  <InputLabel
                    sx={{ textTransform: "capitalize" }}
                    id="demo-simple-select-label"
                  >
                    Select Task
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="select_task"
                    label="Select Task"
                    sx={{ fontSize: "12px" }}
                  >
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"Task 1"}
                    >
                      Task 1
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <TableContainer
                component={Paper}
                sx={{
                  mt: 2,
                  border: "1px solid rgba(224, 224, 224, 1)",
                  borderRadius: 2.5,
                }}
              >
                <Table
                  className="projectTable"
                  sx={{
                    minWidth: 650,
                    textTransform: "capitalize",
                    textWrap: "nowrap",
                    "& th,& td": {
                      borderBottom: 0,
                    },
                    "& tbody tr,& tfoot tr": {
                      borderTop: "1px solid rgba(224, 224, 224, 1)",
                    },
                    "& tbody tr td:first-child": {
                      maxWidth: "400px",
                      textWrap: "wrap",
                    },
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        "& th": {
                          lineHeight: 1,
                          fontWeight: 600,
                          bgcolor: "primary.main",
                          color: "white",
                        },
                      }}
                    >
                      <TableCell>description</TableCell>
                      <TableCell>price per</TableCell>
                      <TableCell>unit</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": {
                          p: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Recurring Bill (Hosting)</TableCell>
                      <TableCell>$652.87</TableCell>
                      <TableCell>Hour</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>$1,958.61</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": {
                          p: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Recurring Bill (Domain)</TableCell>
                      <TableCell>$239.00</TableCell>
                      <TableCell>Hour</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell>$717.00</TableCell>
                    </TableRow>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": {
                          p: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                      }}
                    >
                      <TableCell>Web design</TableCell>
                      <TableCell>$958.00</TableCell>
                      <TableCell>Hour</TableCell>
                      <TableCell>1</TableCell>
                      <TableCell>$958.00</TableCell>
                    </TableRow>
                  </TableBody>
                  <TableFooter>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": {
                          p: 1.5,
                          "&:first-child": { fontWeight: "600" },
                        },
                        bgcolor: "primary.light",
                      }}
                    >
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell></TableCell>
                      <TableCell sx={{ fontWeight: "700" }}>3633.61</TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            </Box>
            <Box
              sx={{
                mt: 6,
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
              }}
            >
              <Box>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, lineHeight: 1 }}
                >
                  Bank Details
                </Typography>
                <FormControl
                  fullWidth
                  size="small"
                  sx={{
                    mt: 1,
                    minWidth: "250px",
                    maxWidth: "250px",
                    display: "flex",
                    "&>label": { fontSize: "12px" },
                    "&>div": { textAlign: "left" },
                  }}
                >
                  <InputLabel
                    sx={{ textTransform: "capitalize" }}
                    id="demo-simple-select-label"
                  >
                    Select Bank
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="select Bank"
                    label="Select Bank"
                    sx={{ fontSize: "12px" }}
                  >
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"Kotak"}
                    >
                      Kotak
                    </MenuItem>
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={"HDFC"}
                    >
                      HDFC
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box
                sx={{
                  ml: "auto",
                  flexShrink: 0,
                  "&>*": { "&:not(:first-child)": { mt: 1.75 }, px: 1.75 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                      fontWeight: "700!important",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    subtotal:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $3633.61
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    Discount (20%):
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    shipping cost:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    sales tax:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $450.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    total:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $4083.61
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    amount paid:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $0.00
                  </Typography>
                </Box>
                <Box
                  sx={{
                    py: 1.75,
                    bgcolor: "primary.light",
                    borderRadius: 2.5,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 15,
                    "&>*": {
                      lineHeight: "1!important",
                      display: "block",
                      fontWeight: 700,
                    },
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    balance due:
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{ textTransform: "capitalize" }}
                  >
                    $4083.61
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: 2,
                mt: 6,
              }}
            >
              <Box sx={{ maxWidth: "400px" }}>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 700, lineHeight: 1 }}
                >
                  Notes
                </Typography>
                <Box
                  sx={{
                    mt: 2.25,
                    "&>*": {
                      display: "block",
                      lineHeight: 1.5,
                    },
                  }}
                >
                  <Typography variant="subtitle3">
                    ptototype-based programming is a style of object-oriented
                    programming in which behaviour.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ height: "100px" }}>
                <img
                  src="/images/sign.svg"
                  style={{ height: "100%", width: "auto" }}
                ></img>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
            <Link variant="Button" to="./preview">
              <Button
                disableRipple
                sx={{
                  mt: 2.5,
                  px: 2.5,
                  py: 1.5,
                  bgcolor: "success.main",
                  color: "white",
                  lineHeight: 1,
                  borderRadius: 2.5,
                  maxHeight: "42px",
                  "&:hover": { bgcolor: "rgb(74, 210, 146, 80%)" },
                }}
              >
                preview
              </Button>
            </Link>
            <Button
              disableRipple
              sx={{
                mt: 2.5,
                px: 2.5,
                py: 1.5,
                bgcolor: "error.main",
                color: "white",
                lineHeight: 1,
                borderRadius: 2.5,
                maxHeight: "42px",
                "&:hover": { bgcolor: "error.light" },
              }}
              type="submit"
            >
              cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
