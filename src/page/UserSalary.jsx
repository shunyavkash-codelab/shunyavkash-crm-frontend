import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import ModalComponent from "../component/ModalComponent";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import DateIcon from "@mui/icons-material/DateRangeOutlined";
import DetailsList from "../component/employee/DetailsList";
import Grid3x3Icon from "@mui/icons-material/Grid3x3";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountBoxOutlinedIcon from "@mui/icons-material/AccountBoxOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import EditIcon from "@mui/icons-material/Edit";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RedeemIcon from "@mui/icons-material/Redeem";
import PriceCheckIcon from "@mui/icons-material/PriceCheck";
import PaidIcon from "@mui/icons-material/Paid";
import moment from "moment";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import MarkAsPaidIcon from "@mui/icons-material/CheckCircleOutlined";
// import { Field } from "formik";

// import UserSalary from "../page/UserSalary";
// const formik = useFormik({
//   validationSchema: schema,
//   initialValues: {
//     name: projectData?.name,
//     clientId: projectData?.clientId,
//     description: projectData?.description,
//     startDate: moment(projectData?.startDate).format("YYYY-MM-DD"),
//     endDate: moment(projectData?.endDate).format("YYYY-MM-DD"),
//     perHourCharge: projectData?.perHourCharge,
//     currency: projectData?.currency,
//     payPeriod: projectData?.payPeriod,
//     // prefix: projectData?.prefix,
//     status: projectData?.status,
//   },
//   enableReinitialize: true,
//   onSubmit: async (values) => {
//     try {
//       // values.currency = currencyValue?.symbol;
//       const res = await apiCall({
//         url: id ? APIS.PROJECT.EDIT(id) : APIS.PROJECT.ADD,
//         method: id ? "patch" : "post",
//         data: JSON.stringify(values, null, 2),
//       });
//       if (res.data.success === true) {
//         setSnack(res.data.message);
//         !id && navigate("/projects");
//       }
//     } catch (error) {
//       console.log(error, "=================77");
//       let errorMessage = error.response.data.message;
//       setSnack(errorMessage, "warning");
//     }
//   },
// });

export default function UserSalary() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const [projectData] = useState(null);
  const { setInvoiceData } = useInvoiceStore();
  const navigate = useNavigate();
  const [invoiceList] = useState([]);
  const viewInvoice = async (invoiceNumber, row) => {
    setInvoiceData(row);
    navigate(`/invoices/view/${invoiceNumber}`);
  };
  return (
    <>
      <Box sx={{ bgcolor: "white", borderRadius: 4, mt: 3, p: 4 }}>
        <Box
          sx={{
            height: "100%",
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            maxWidth: "275px",
            p: 3,
            border: "2px solid rgba(0,0,0,0.2)",
            borderStyle: "dashed",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Button
            disableRipple
            type="submit"
            sx={{
              display: "block",
              p: 0,
              color: "text.primary",
              "& svg": {
                display: "block",
                m: "0 auto",
              },
              "&:hover": {
                bgcolor: "transparent",
              },
            }}
            onClick={handleOpen}
          >
            <AddIcon />
            Add Your Bank Details
          </Button>
        </Box>
      </Box>
      <Box sx={{ bgcolor: "white", borderRadius: 4, mt: 3, p: 4 }}>
        <Box
          sx={{
            borderBottom: "1px solid rgba(0 ,0 ,0 ,0.1)",
            // px: 3,
            pb: 2,
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              Add Bank Details
            </Typography>
          </Box>
        </Box>
        <Grid container rowSpacing={5} columnSpacing={2.5} sx={{ py: 3 }}>
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
      <Box sx={{ bgcolor: "white", borderRadius: 4, mt: 3, p: 4 }}>
        <Box
          sx={{
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" sx={{ fontWeight: "500" }}>
              Salary Details
            </Typography>
            <Box>
              {/* Todos : This button visable only admin */}
              <Button
                onClick={handleOpen}
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
            </Box>
          </Box>
        </Box>
        {/* <Grid container rowSpacing={3} columnSpacing={2} sx={{ py: 3 }}>
            <Grid item xs={12} md={6} lg={2}>
              <DetailsList
                Title={""}
                Text={"Deep Bhimani"}
                Icon={<AccountBoxOutlinedIcon />}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <DetailsList
                Title={""}
                Text={"10000$"}
                Icon={<PriceCheckIcon />}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <DetailsList Title={"status"} Text={"paid"} Icon={<PaidIcon />} />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <DetailsList
                Title={""}
                Text={"100$"}
                Icon={<RedeemIcon />}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <DetailsList
                Title={""}
                Text={"03/01/2024"}
                Icon={<CalendarMonthIcon />}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={2}>
              <DetailsList
                Title={"Order"}
                Text={"Ascending"}
                Icon={<CalendarMonthIcon />}
              />
            </Grid>
          </Grid> */}

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
                    "& .pending": {
                      bgcolor: "secondary.main",
                    },
                    "& .success": {
                      bgcolor: "success.main",
                    },
                  }}
                >
                  Unpaid
                </TableCell>
                <TableCell>500$</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        {/* <FormControl
            fullWidth
            size="small"
            sx={{
              "&>label": {
                fontSize: "14px",
                top: "4px",
              },
              "&>div>div": { py: 1.5 },
            }}
          >
            <InputLabel
              sx={{ textTransform: "capitalize" }}
              id="demo-simple-select-label"
            >
              Select Payemnt Period
            </InputLabel>
            <Field
              name="file"
              render={({ field, form }) => (
                <Select
                  labelId="demo-simple-select-label"
                  id="status"
                  label="Status"
                  sx={{
                    fontSize: "14px",
                  }}
                  {...field}
                  defaultValue={projectData?.status || "toDo"}
                  onChange={(event) => {
                    form.setFieldValue("status", event.target.value);
                  }}
                >
                  <MenuItem value={"toDo"}>
                    <Box
                      sx={{
                        color: "white",
                        fontSize: "12px",
                        p: 0.5,
                        borderRadius: 1,
                        maxWidth: "fit-content",
                        lineHeight: 1,
                        bgcolor: "grey.dark",
                      }}
                    >
                      To Do
                    </Box>
                  </MenuItem>
                  <MenuItem value={"inProgress"}>
                    <Box
                      sx={{
                        color: "white",
                        fontSize: "12px",
                        p: 0.5,
                        borderRadius: 1,
                        maxWidth: "fit-content",
                        lineHeight: 1,
                        bgcolor: "grey.dark",
                        bgcolor: "secondary.main",
                      }}
                    >
                      In Progress
                    </Box>
                  </MenuItem>
                  <MenuItem value={"inReview"}>
                    <Box
                      sx={{
                        color: "white",
                        fontSize: "12px",
                        p: 0.5,
                        borderRadius: 1,
                        maxWidth: "fit-content",
                        lineHeight: 1,
                        bgcolor: "grey.dark",
                        bgcolor: "secondary.main",
                        bgcolor: "review.main",
                      }}
                    >
                      In Review
                    </Box>
                  </MenuItem>
                  <MenuItem value={"completed"}>
                    <Box
                      sx={{
                        color: "white",
                        fontSize: "12px",
                        p: 0.5,
                        borderRadius: 1,
                        maxWidth: "fit-content",
                        lineHeight: 1,
                        bgcolor: "grey.dark",
                        bgcolor: "secondary.main",
                        bgcolor: "review.main",
                        bgcolor: "success.main",
                      }}
                    ></Box>
                  </MenuItem>
                </Select>
              )}
            />
          </FormControl> */}
      </Box>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        modalTitle={"Add Bank Details"}
      >
        <Box component="form">
          <Grid
            container
            rowSpacing={2.5}
            columnSpacing={2.5}
            id="add-bank-details-description"
          >
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
              sx={{ "> .MuiFormControl-root": { margin: 0 } }}
            >
              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Account Number"
                  type="text"
                  sx={{ fontSize: 14 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>

              <FormControl fullWidth sx={{ m: 1 }}>
                <OutlinedInput
                  placeholder="Account Number"
                  type="text"
                  sx={{ fontSize: 14 }}
                  startAdornment={
                    <InputAdornment position="start">
                      <EmailOutlinedIcon />
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

      {/* <ModalComponent
          open={open}
          setOpen={setOpen}
          modalTitle="Add Salary"
          aria-labelledby="add-salary-title"
          aria-describedby="add-salary-description"
        >
          <Box component="form" id="add-salary-description">
            <Typography variant="h5" id="add-salary-title">
              Add Salary
            </Typography>
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
                    placeholder="Amount"
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
                <FormControl fullWidth sx={{ m: 1 }}>
                  <OutlinedInput
                    placeholder="Status"
                    type="number"
                    sx={{ fontSize: 14 }}
                    startAdornment={
                      <InputAdornment position="start">
                        <EmailOutlinedIcon />
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
                    placeholder="Incentive"
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
                    placeholder="Date"
                    sx={{ fontSize: 14 }}
                    startAdornment={
                      <InputAdornment position="start">
                        <PermIdentityOutlinedIcon />
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </ModalComponent> */}
    </>
  );
}
