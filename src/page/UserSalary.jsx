import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../component/ModalComponent.jsx";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import DetailsList from "../component/employee/DetailsList";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import AccountHolderIcon from "@mui/icons-material/PermIdentityOutlined";
import BankNameIcon from "@mui/icons-material/AccountBalance";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Person2Icon from "@mui/icons-material/Person2";
import RedeemIcon from "@mui/icons-material/Redeem";
import NumbersIcon from "@mui/icons-material/Numbers";
import EditIcon from "@mui/icons-material/CreateOutlined";
import ConfirmNumber from "@mui/icons-material/ThumbUpAlt";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function UserSalary() {
  const [openBank, setOpenBank] = React.useState(false);
  const [openSalary, setOpenSalary] = React.useState(false);

  const handleOpenBank = () => setOpenBank(true);
  const handleOpenSalary = () => setOpenSalary(true);
  const [date, setDate] = useState("");
  const handleChange = (event) => {
    setDate(event.target.value);
  };

  const salaries = [
    {
      id: 1,
      date: "01/01/2023",
      memberName: "Deep Bhimani",
      status: "paid",
      amount: "₹10000",
      incentive: "₹6000",
    },
    {
      id: 2,
      date: "03/01/2023",
      memberName: "sujit hirapara",
      status: "unpaid",
      amount: "₹20000",
      incentive: "₹7000",
    },
    {
      id: 3,
      date: "15/01/2023",
      memberName: "prince suhagiya",
      status: "paid",
      amount: "₹30000",
      incentive: "₹8000",
    },
    {
      id: 4,
      date: "28/01/2023",
      memberName: "ravi chodvadiya",
      status: "unpaid",
      amount: "₹40000",
      incentive: "₹9000",
    },
  ];

  return (
    <>
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          mt: 3,
          p: 4,
        }}
      >
        <Button
          onClick={handleOpenBank}
          disableRipple
          sx={{
            display: "block",
            mx: "auto",
            color: "text.primary",
            height: "100%",
            bgcolor: "rgb(22 119 255/ 6%)",
            border: "2px dashed rgba(0,0,0,1)",
            borderRadius: 2,
            p: 3,
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              bgcolor: "#f5f5f5",
              border: "2px dashed rgba(0,0,0,0.2)",
            },
          }}
        >
          <AddIcon sx={{ display: "block", mx: "auto", mb: 1 }} />
          <span style={{ display: "inline-block" }}>Add Your Bank Details</span>
        </Button>
      </Box>

      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 4,
          mt: 3,
          pt: 2,
          pb: 3,
        }}
      >
        <Box
          sx={{
            px: 3,
            pb: 2,
            mb: 3,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
            Add Bank Details
          </Typography>
          <Button
            onClick={handleOpenBank}
            startIcon={<EditIcon sx={{ width: 16 }} />}
            sx={{
              cursor: "pointer",
              height: "unset",
              py: 0.3,
              px: 1.5,
              border: "1px solid",
              borderColor: "primary.main",
              borderRadius: 4,
            }}
          >
            Edit
          </Button>
        </Box>
        <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ px: 3 }}>
          <Grid item xs={12} md={6} xl={4}>
            <DetailsList
              Title={"Bank Name"}
              Text={"Bank of Baroda"}
              Icon={<BankNameIcon />}
              TextStyle={{ textTransform: "capitalize" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <DetailsList
              Title={"A/c Holder Name"}
              Text={"Deep Bhimani"}
              Icon={<AccountHolderIcon />}
              TextStyle={{ textTransform: "capitalize" }}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <DetailsList
              Title={"A/c Number"}
              Text={"0112345678"}
              Icon={<EmailOutlinedIcon />}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={4}>
            <DetailsList
              Title={"IFSC"}
              Text={"BOBN0005943"}
              Icon={<AccountHolderIcon />}
              TextStyle={{ textTransform: "uppercase" }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ bgcolor: "white", borderRadius: 4, mt: 3, pt: 2, pb: 3 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{
            px: 2,
            mb: 3,
            pb: 2,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
            Salary Details
          </Typography>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                flexGrow: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "end",
                gap: 2.5,
                "& fieldset": { borderRadius: "6px" },
                minWidth: "140px",
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
                  id="date-wise-select-label"
                >
                  Date
                </InputLabel>
                <Select
                  labelId="date-wise-select-label"
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
                    value={"lastWeek"}
                  >
                    Last Week
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"lastMonth"}
                  >
                    Last Month
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"lastQuarter"}
                  >
                    Last Quarter
                  </MenuItem>
                  <MenuItem
                    sx={{ textTransform: "capitalize", fontSize: "14px" }}
                    value={"lastYear"}
                  >
                    Last Year
                  </MenuItem>
                </Select>
              </FormControl>
              {date === "CustomRange" && (
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
            {/* Todos : This button visable only admin */}
            <Button
              onClick={handleOpenSalary}
              startIcon={<AddIcon sx={{ width: 16 }} />}
              sx={{
                cursor: "pointer",
                height: "unset",
                py: 0.3,
                px: 1.5,
                border: "1px solid",
                borderColor: "primary.main",
                borderRadius: 4,
              }}
            >
              Add Salary
            </Button>
          </Stack>
        </Stack>
        <Box sx={{ px: 3 }}>
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
                  <TableCell>Date</TableCell>
                  <TableCell>Member Name</TableCell>
                  <TableCell>Salary Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Incentive</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salaries.map((salary) => (
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&:first-of-type td": {
                        maxWidth: "250px",
                        textWrap: "wrap",
                      },
                    }}
                  >
                    <TableCell>{salary.date}</TableCell>
                    <TableCell>{salary.memberName}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          color: "white",
                          fontSize: "12px",
                          p: 0.5,
                          borderRadius: 1,
                          maxWidth: "fit-content",
                          lineHeight: 1,
                          bgcolor:
                            salary.status === "paid"
                              ? "success.main"
                              : "review.main",
                        }}
                      >
                        {salary.status}
                      </Box>
                    </TableCell>
                    <TableCell>{salary.amount}</TableCell>
                    <TableCell>{salary.incentive}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <ModalComponent
        open={openBank}
        setOpen={setOpenBank}
        modalTitle={"Add Bank Details"}
      >
        <Grid container rowSpacing={2.5} columnSpacing={2.5}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Bank Name"
                sx={{ fontSize: 14 }}
                startAdornment={
                  <InputAdornment position="start">
                    <BankNameIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="A/c Holder Name"
                sx={{ fontSize: 14 }}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountHolderIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="A/c Number"
                type="text"
                sx={{ fontSize: 14 }}
                startAdornment={
                  <InputAdornment position="start">
                    <PersonPinIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} lg={6}>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Confirm A/c Number"
                type="text"
                sx={{ fontSize: 14 }}
                startAdornment={
                  <InputAdornment position="start">
                    <ConfirmNumber />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="IFSC"
                sx={{ fontSize: 14 }}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountBoxOutlinedIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
              <span style={{ position: "relative" }}>add bank</span>
            </Button>
          </Grid>
        </Grid>
      </ModalComponent>

      <ModalComponent
        open={openSalary}
        setOpen={setOpenSalary}
        modalTitle="Add Salary"
      >
        <Grid container rowSpacing={2.5} columnSpacing={2.5}>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <MobileDatePicker
                label="Date"
                defaultValue={dayjs(new Date().toLocaleDateString())}
                sx={{
                  minWidth: "100% !important",
                  "&>div": { fontSize: "14px" },
                  "&>label": { fontSize: "14px" },
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              sx={{
                "&>label": { fontSize: "14px" },
              }}
            >
              <InputLabel
                sx={{ textTransform: "capitalize" }}
                id="demo-simple-select-label"
              >
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Status"
                onChange={handleChange}
                sx={{ fontSize: "14px" }}
              >
                <MenuItem value={"paid"}>
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      color: "white",
                      fontSize: "12px",
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: "fit-content",
                      lineHeight: 1,
                      bgcolor: "success.main",
                    }}
                  >
                    Paid
                  </Box>
                </MenuItem>
                <MenuItem value={"unpaid"}>
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      color: "white",
                      fontSize: "12px",
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: "fit-content",
                      lineHeight: 1,
                      bgcolor: "review.main",
                    }}
                  >
                    unpaid
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Member Name"
                sx={{ fontSize: 14 }}
                startAdornment={
                  <InputAdornment position="start">
                    <Person2Icon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Amount"
                sx={{ fontSize: 14 }}
                startAdornment={
                  <InputAdornment position="start">
                    <NumbersIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <OutlinedInput
                placeholder="Incentive"
                sx={{ fontSize: 14 }}
                startAdornment={
                  <InputAdornment position="start">
                    <RedeemIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
              <span style={{ position: "relative" }}>Add salary</span>
            </Button>
          </Grid>
        </Grid>
      </ModalComponent>
    </>
  );
}
