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
// import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../component/ModalComponent.jsx";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import DetailsList from "../component/employee/DetailsList";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import PersonPinIcon from "@mui/icons-material/PersonPin";
// import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import Person2Icon from "@mui/icons-material/Person2";
import RedeemIcon from "@mui/icons-material/Redeem";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import NumbersIcon from "@mui/icons-material/Numbers";
import EditIcon from "@mui/icons-material/CreateOutlined";

export default function UserSalary() {
  const [openBank, setOpenBank] = React.useState(false);
  const [openSalary, setOpenSalary] = React.useState(false);

  const handleOpenBank = () => setOpenBank(true);
  const handleOpenSalary = () => setOpenSalary(true);
  const [date, setDate] = useState("");
  // const navigate = useNavigate();
  // const { setInvoiceData } = useInvoiceStore();
  // const viewInvoice = async (invoiceNumber, row) => {
  //   setInvoiceData(row);
  //   navigate(`/invoices/view/${invoiceNumber}`);
  // };
  // const [setOpen] = React.useState(false);
  const handleChange = (event) => {
    setDate(event.target.value);
  };

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
          <Grid item xs={12} md={6} lg={4}>
            <DetailsList
              Title={"Bank Name"}
              Text={"Bank of Baroda"}
              Icon={<AccountBalanceIcon />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DetailsList
              Title={"Bank Holder Name"}
              Text={"Dipali Gediya"}
              Icon={<PermIdentityOutlinedIcon />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DetailsList
              Title={"Bank Account Number"}
              Text={"0112345678"}
              Icon={<EmailOutlinedIcon />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DetailsList
              Title={"Bank IFSC Code"}
              Text={"BOBN0005943"}
              Icon={<PermIdentityOutlinedIcon />}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <DetailsList
              Title={"Bank Branch Name"}
              Text={"Puna Kumbhariya"}
              Icon={<PermIdentityOutlinedIcon />}
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
                  <TableCell>User Name</TableCell>
                  <TableCell>Salary Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Incentive</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
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
                  <TableCell>03/01/2024</TableCell>
                  <TableCell>Deep Bhimani</TableCell>
                  <TableCell>100000$</TableCell>
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
                      "& .unpaid": {
                        bgcolor: "secondary.main",
                      },
                      "& .paid": {
                        bgcolor: "success.main",
                      },
                    }}
                  >
                    <Box
                      /* when dynamic then row.status uncomment */

                      // className={`statusBtn
                      // ${row.status === "paid" ? "paid" : "unpaid"}`}
                      className="statusBtn unpaid"
                    >
                      Unpaid
                    </Box>
                  </TableCell>
                  <TableCell>500$</TableCell>
                </TableRow>
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
                  <TableCell>04/01/2024</TableCell>
                  <TableCell>Deep Bhimani</TableCell>
                  <TableCell>500000$</TableCell>
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
                      "& .unpaid": {
                        bgcolor: "secondary.main",
                      },
                      "& .paid": {
                        bgcolor: "success.main",
                      },
                    }}
                  >
                    <Box
                      /* when dynamic then row.status uncomment */

                      // className={`statusBtn
                      // ${row.status === "paid" ? "paid" : "unpaid"}`}
                      className="statusBtn paid"
                    >
                      paid
                    </Box>
                  </TableCell>
                  <TableCell>1000$</TableCell>
                </TableRow>
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
                  <TableCell>05/01/2024</TableCell>
                  <TableCell>Deep Bhimani</TableCell>
                  <TableCell>600000$</TableCell>
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
                      "& .unpaid": {
                        bgcolor: "secondary.main",
                      },
                      "& .paid": {
                        bgcolor: "success.main",
                      },
                    }}
                  >
                    <Box
                      /* when dynamic then row.status uncomment */

                      // className={`statusBtn
                      // ${row.status === "paid" ? "paid" : "unpaid"}`}
                      className="statusBtn unpaid"
                    >
                      Unpaid
                    </Box>
                  </TableCell>
                  <TableCell>580$</TableCell>
                </TableRow>
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
                  <TableCell>06/01/2024</TableCell>
                  <TableCell>Deep Bhimani</TableCell>
                  <TableCell>100000$</TableCell>
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
                      "& .unpaid": {
                        bgcolor: "secondary.main",
                      },
                      "& .paid": {
                        bgcolor: "success.main",
                      },
                    }}
                  >
                    <Box
                      /* when dynamic then row.status uncomment */

                      // className={`statusBtn
                      // ${row.status === "paid" ? "paid" : "unpaid"}`}
                      className="statusBtn unpaid"
                    >
                      Unpaid
                    </Box>
                  </TableCell>
                  <TableCell>500$</TableCell>
                </TableRow>
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
        <Box component="form">
          <Grid container rowSpacing={2.5} columnSpacing={2.5}>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Bank Name"
                  sx={{ fontSize: 14 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountBalanceIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Account Holder Name"
                  sx={{ fontSize: 14 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              sx={{
                "> .MuiFormControl-root": {
                  margin: 0,
                },
              }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Account Number"
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
            <Grid
              item
              xs={12}
              md={12}
              lg={6}
              sx={{
                "> .MuiFormControl-root": {
                  margin: 0,
                },
              }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Account Number"
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
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Account IFSC Number"
                  sx={{ fontSize: 14 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <AccountBoxOutlinedIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Bank Branch Name"
                  sx={{ fontSize: 14 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <PermIdentityOutlinedIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
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
                <span style={{ position: "relative" }}>Save</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ModalComponent>

      <ModalComponent
        open={openSalary}
        setOpen={setOpenSalary}
        modalTitle="Add Salary"
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
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="User Name"
                  sx={{ fontSize: 14 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <Person2Icon />
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
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
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
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
                    id="status-select-label"
                  >
                    Status
                  </InputLabel>
                  <Select
                    labelId="status-select-label"
                    id="demo-simple-select"
                    label="Status"
                    onChange={handleChange}
                    sx={{
                      fontSize: "14px",
                      "&": {
                        bgcolor: "white",
                      },
                      "& div": {
                        py: 2,
                        px: 1.5,
                      },
                    }}
                  >
                    <MenuItem
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "14px",
                      }}
                      value={"paid"}
                    >
                      Paid
                    </MenuItem>
                    <MenuItem
                      sx={{
                        textTransform: "capitalize",
                        fontSize: "14px",
                      }}
                      value={"unpaid"}
                    >
                      Unpaid
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
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
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
            <Grid
              item
              xs={12}
              md={12}
              lg={12}
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Date"
                  sx={{ fontSize: 14 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <HistoryToggleOffIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
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
                <span style={{ position: "relative" }}>Save</span>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </ModalComponent>
    </>
  );
}
