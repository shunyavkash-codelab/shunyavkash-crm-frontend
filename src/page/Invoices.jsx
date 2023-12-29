import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import PlusIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import MarkAsPaidIcon from "@mui/icons-material/CheckCircleOutlined";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList";
import { useSnack } from "../hooks/store/useSnack";
import moment from "moment";

const gridItems = Array.from({ length: 10 }, (_, index) => index + 1);

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken, invoiceTable, setInvoiceTable } = useAuth();
  const [showTable, setShowTable] = useState(invoiceTable);
  const [date, setDate] = useState("");
  const { apiCall, isLoading } = useApi();
  const navigate = useNavigate();
  const { setSnack } = useSnack();
  const [invoiceList, setInvoiceList] = useState([]);

  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const invoiceNumberGenerate = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.GENERATENUM,
        method: "get",
      });
      if (res.data.success === true) {
        navigate(`./add/${res.data.data}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const viewInvoice = async (invoiceNumber) => {
    navigate(`/invoices/view/${invoiceNumber}`);
  };

  const listInvoice = async () => {
    try {
      const res = await apiCall({
        url: APIS.INVOICE.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setInvoiceList(res.data.data.data);
        console.log(res.data.data.data, "-----------------------75");
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    listInvoice();
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
                Our invoices
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Link to={"/"} style={{ textDecoration: "none" }}>
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
                    Dashboard /
                  </Typography>
                </Link>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.4, textTransform: "capitalize" }}
                >
                  invoices
                </Typography>
              </Box>
            </Box>
            <Box>
              <Button
                disableRipple
                startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
                sx={{
                  maxHeight: "42px",
                  position: "relative",
                  px: 2.5,
                  py: 1.5,
                  bgcolor: "primary.main",
                  border: "1px solid",
                  borderColor: "primary.main",
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
                    color: "primary.main",
                    bgcolor: "primary.main",
                    "&:before": { height: "10rem" },
                  },
                }}
                onClick={invoiceNumberGenerate}
              >
                <span style={{ position: "relative" }}>New Invoice</span>
              </Button>
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
                "& fieldset": { borderRadius: "6px" },
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
                  sx={{
                    fontSize: "14px",
                    "&": {
                      bgcolor: "white",
                    },
                  }}
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
                      "&": {
                        bgcolor: "white",
                        borderRadius: 1.5,
                      },
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
                      "&": {
                        bgcolor: "white",
                        borderRadius: 1.5,
                      },
                    }}
                  />
                </Box>
              )}
            </Box>
            {/* <Box
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
            </Box> */}
          </Box>
          <Typography
            variant="subtitle2"
            sx={{
              opacity: 0.6,
              lineHeight: 1,
              mb: 1.75,
            }}
          >
            {invoiceList.length} Invoices found
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
          {invoiceList.length === 0 ? (
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
                    <TableRow
                      sx={{ "& th": { lineHeight: 1, fontWeight: 700 } }}
                    >
                      <TableCell>Project Name</TableCell>
                      <TableCell>Client</TableCell>
                      <TableCell>Manager</TableCell>
                      <TableCell>Invoice No.</TableCell>
                      <TableCell>Invoice Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Total</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {invoiceList.map((row) => (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                          "&:first-child td": {
                            maxWidth: "250px",
                            textWrap: "wrap",
                          },
                        }}
                      >
                        <TableCell>{row.projectName}</TableCell>
                        <TableCell>{row.clientName}</TableCell>
                        <TableCell>{row.managerName}</TableCell>
                        <TableCell>{row.invoiceNumber}</TableCell>
                        <TableCell>
                          {moment(row.invoiceDate).format("DD/MM/YYYY")}
                        </TableCell>
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
                            "& .pending": {
                              bgcolor: "secondary.main",
                            },
                            "& .success": {
                              bgcolor: "success.main",
                            },
                          }}
                        >
                          <Box
                            className={`statusBtn ${
                              row.status == "success" ? "success" : "pending"
                            }`}
                          >
                            {row.status}
                          </Box>
                          <Box
                            sx={{
                              fontSize: "13px",
                              lineHeight: 1,
                              textWrap: "nowrap",
                              mt: 0.75,
                            }}
                          >
                            {moment(row.invoiceDueDate).format("DD/MM/YYYY")}

                            {/* Due on 13/12/23 */}
                          </Box>
                        </TableCell>
                        <TableCell>${row.totals.total}</TableCell>
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 1.25, sm: 1.5 },
                              opacity: 0.3,
                              "& button": {
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              },
                              "& svg": { fontSize: { xs: "20px", sm: "22px" } },
                            }}
                          >
                            <Button
                              disableRipple
                              onClick={() => viewInvoice(row.invoiceNumber)}
                            >
                              <VisibilityIcon />
                            </Button>
                            <Button disableRipple>
                              <MarkAsPaidIcon />
                            </Button>
                            <Button disableRipple>
                              <CreateIcon />
                            </Button>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
