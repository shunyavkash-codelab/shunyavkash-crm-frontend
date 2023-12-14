import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";

const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, invoiceTable, setInvoiceTable } = useAuth();
  const [showTable, setShowTable] = useState(invoiceTable);
  const [date, setDate] = useState("");

  const handleChange = (event) => {
    setDate(event.target.value);
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
                Our invoices
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{ opacity: 0.4, textTransform: "capitalize" }}
              >
                invoices
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
                  Create Invoice
                </Button>
              </Link>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2.5,
              mb: 3.25,
              flexDirection: { xs: "column", sm: "row" },
            }}
          >
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2.5,
                "& fieldset": { borderRadius: "10px" },
                width: { xs: "100%", sm: "75%", md: "50%" },
              }}
            >
              <FormControl
                size="small"
                sx={{
                  "&>label": { fontSize: "14px" },
                  flexGrow: 1,
                }}
              >
                <InputLabel
                  sx={{ textTransform: "capitalize" }}
                  id="demo-simple-select-label"
                >
                  Date
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={date}
                  label="Date"
                  onChange={handleChange}
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"1WeekAgo"}
                  >
                    1 Week ago
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"1MonthAgo"}
                  >
                    1 Month ago
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"1YearAgo"}
                  >
                    1 Year ago
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"CustomRange"}
                  >
                    Custom Range
                  </MenuItem>
                </Select>
              </FormControl>
              {date == "CustomRange" && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    "& > *": { maxWidth: { xs: "100%", sm: "50%" } },
                    gap: 2.5,
                    flexShrink: 0,
                  }}
                >
                  <TextField
                    fullWidth
                    size="small"
                    id="form"
                    label="From"
                    autoComplete="off"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="mm/dd/yyyy"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="to"
                    label="To"
                    autoComplete="off"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="mm/dd/yyyy"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                  />
                </Box>
              )}
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
                  setInvoiceTable(false);
                }}
                sx={{
                  // bgcolor: showTable ? "#dcdcdc" : "primary.main",
                  // color: showTable ? "primary.main" : "white",
                  ":hover,&": {
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
                  setInvoiceTable(true);
                }}
                sx={{
                  // bgcolor: showTable ? "primary.main" : "#dcdcdc",
                  // color: showTable ? "white" : "primary.main",
                  ":hover,&": {
                    bgcolor: showTable ? "primary.main" : "#dcdcdc",
                    color: showTable ? "white" : "primary.main",
                  },
                }}
              >
                <ListOutlinedIcon />
              </Button>
            </Box>
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.6,
              lineHeight: 1,
              mb: 1.75,
            }}
          >
            50 Invoices found
          </Typography>
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
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>Invoice No.</TableCell>
                    <TableCell>Invoice Date</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Payment Ref No.</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Actions</TableCell>
                    {/* <TableCell>Start date</TableCell>
                  <TableCell>End date</TableCell> */}
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
                    <TableCell>12345</TableCell>
                    <TableCell>12-12-23</TableCell>
                    <TableCell>13-12-23</TableCell>
                    <TableCell>11815886</TableCell>
                    <TableCell>
                      {" "}
                      <Box
                        sx={{
                          color: "secondary.main",
                          py: 1,
                          px: 1,
                          bgcolor: "rgba(255, 198, 117, 10%)",
                          borderRadius: 2.5,
                        }}
                      >
                        Pending
                      </Box>
                    </TableCell>
                    <TableCell>300.00$</TableCell>
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
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          <CreateIcon />
                        </Button>
                      </Box>
                    </TableCell>
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
                    <TableCell>12345</TableCell>
                    <TableCell>12-12-23</TableCell>
                    <TableCell>13-12-23</TableCell>
                    <TableCell>11815886</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          color: "success.main",
                          py: 1,
                          px: 1,
                          bgcolor: "rgba(74, 210, 146,10%)",
                          borderRadius: 2.5,
                        }}
                      >
                        Done
                      </Box>
                    </TableCell>
                    <TableCell>150.00$</TableCell>
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
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          <CreateIcon />
                        </Button>
                      </Box>
                    </TableCell>
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
                    <TableCell>12345</TableCell>
                    <TableCell>12-12-23</TableCell>
                    <TableCell>13-12-23</TableCell>
                    <TableCell>11815886</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          color: "secondary.main",
                          py: 1,
                          px: 1,
                          bgcolor: "rgba(255, 198, 117, 10%)",
                          borderRadius: 2.5,
                        }}
                      >
                        Pending
                      </Box>
                    </TableCell>
                    <TableCell>850.00$</TableCell>
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
                            "&:hover": { color: "primary.main" },
                          }}
                        >
                          <CreateIcon />
                        </Button>
                      </Box>
                    </TableCell>
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
