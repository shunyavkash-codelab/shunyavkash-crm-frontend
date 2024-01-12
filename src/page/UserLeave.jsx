import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModalComponent from "../component/ModalComponent";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import AccountHolderIcon from "@mui/icons-material/PermIdentityOutlined";
import InfoIcon from "@mui/icons-material/InfoOutlined";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function UserLeave() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  const leaves = [
    {
      id: 1,
      type: "casual",
      reason: "Marriage Function",
      startDate: "15/01/2023",
      startDayType: "first half",
      endDate: "17/01/2023",
      endDayType: "second half",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      type: "sick",
      reason: "Medical",
      startDate: "25/02/2023",
      startDayType: "second half",
      endDate: "27/02/2023",
      endDayType: "full day",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      type: "paid",
      reason: "Going to Village",
      startDate: "31/04/2023",
      startDayType: "full day",
      endDate: "2/05/2023",
      endDayType: "full day",
      status: "unapprove",
      statusReason: "ipsum dolor sit amet lorem",
    },
    {
      id: 4,
      type: "unpaid",
      reason: "Going to Friend's Birthday Party",
      startDate: "25/04/2023",
      startDayType: "second half",
      endDate: "25/04/2023",
      endDayType: "first half",
      status: "unapprove",
      statusReason: "Lorem dolor sit ipsum amet",
    },
  ];

  return (
    <>
      <Grid container rowSpacing={2.5} columnSpacing={2.5} mt={0}>
        <Grid item xs={6} md={3} lg={3}>
          <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
            <Typography
              sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
            >
              Total Leaves
            </Typography>
            <Typography
              sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
            >
              15
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
            <Typography
              sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
            >
              Casual Leaves
            </Typography>
            <Typography
              sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
            >
              5
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
            <Typography
              sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
            >
              Sick Leaves
            </Typography>
            <Typography
              sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
            >
              5
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Box p={3} sx={{ backgroundColor: "white", borderRadius: 3 }}>
            <Typography
              sx={{ color: "#2a4062", fontWeight: 500, opacity: 0.5 }}
            >
              Unpaid Leaves
            </Typography>
            <Typography
              sx={{ fontSize: 22, color: "black", fontWeight: 600, mt: 2 }}
            >
              N/A
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <Box sx={{ mt: 5 }}>
        <Box
          className="cardHeader"
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography sx={{ textTransform: "capitalize", fontWeight: 600 }}>
            My Leaves
          </Typography>
          <Button
            onClick={handleOpen}
            startIcon={<AddOutlinedIcon sx={{ width: 16 }} />}
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
            Add Leave
          </Button>
        </Box>
        <Box>
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
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>day type</TableCell>
                  <TableCell>End Date</TableCell>
                  <TableCell>day type</TableCell>
                  {/* Admin ni status ni row na aave */}
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaves.map((leave) => (
                  <TableRow
                    key={leave.key}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                      "&:first-of-type td": {
                        maxWidth: "250px",
                        textWrap: "wrap",
                      },
                    }}
                  >
                    <TableCell>
                      <Box
                        sx={{
                          fontSize: "12px",
                          p: 0.5,
                          borderRadius: 1,
                          maxWidth: "fit-content",
                          lineHeight: 1,
                          bgcolor:
                            leave.type === "casual"
                              ? "rgba(94, 115, 141, 15%)"
                              : leave.type === "sick"
                              ? "rgba(248, 174, 0, 15%)"
                              : leave.type === "unpaid"
                              ? "rgba(225, 107, 22, 15%)"
                              : "rgba(74, 210, 146, 15%)",
                          color:
                            leave.type === "casual"
                              ? "grey.dark"
                              : leave.type === "sick"
                              ? "secondary.main"
                              : leave.type === "unpaid"
                              ? "review.main"
                              : "success.main",
                        }}
                      >
                        {leave.type}
                      </Box>
                    </TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    <TableCell>{leave.startDate}</TableCell>
                    <TableCell>{leave.startDayType}</TableCell>
                    <TableCell>{leave.endDate}</TableCell>
                    <TableCell>{leave.endDayType}</TableCell>
                    {/* Admin ni status ni row na aave */}
                    <TableCell>
                      <Tooltip title={leave.statusReason} arrow>
                        <Button
                          disableRipple
                          sx={{
                            textTransform: "capitalize",
                            color: "white",
                            fontSize: "12px",
                            p: 0.5,
                            borderRadius: 1,
                            maxWidth: "fit-content",
                            lineHeight: 1,
                            bgcolor:
                              leave.status === "unapprove"
                                ? "review.main"
                                : "success.main",
                            "&:hover": {
                              bgcolor:
                                leave.status === "unapprove"
                                  ? "review.main"
                                  : "success.main",
                            },
                            "& .MuiButton-endIcon": {
                              ml: "3px",
                              mr: 0,
                            },
                          }}
                          endIcon={
                            <InfoIcon sx={{ fontSize: "18px!important" }} />
                          }
                        >
                          <span style={{ display: "inline-block" }}>
                            {leave.status}
                          </span>
                        </Button>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <ModalComponent
        open={open}
        setOpen={setOpen}
        modalTitle="Add Leave"
        sx={{ padding: "6px" }}
      >
        <Grid container rowSpacing={2.5} columnSpacing={2.5}>
          <Grid item xs={12}>
            <FormControl
              fullWidth
              size="normal"
              sx={{
                textTransform: "capitalize",
                "&>label": { fontSize: "14px" },
              }}
            >
              <InputLabel
                sx={{ textTransform: "capitalize" }}
                id="demo-simple-select-label"
              >
                Leave Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Leave Type"
                sx={{ fontSize: "14px" }}
              >
                <MenuItem value={"casual"}>
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: "fit-content",
                      lineHeight: 1,
                      bgcolor: "rgba(94, 115, 141, 15%)",
                      color: "grey.dark",
                    }}
                  >
                    Casual
                  </Box>
                </MenuItem>
                <MenuItem value={"sick"}>
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: "fit-content",
                      lineHeight: 1,
                      bgcolor: "rgba(248, 174, 0, 15%)",
                      color: "secondary.main",
                    }}
                  >
                    Sick
                  </Box>
                </MenuItem>
                <MenuItem value={"paid"}>
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: "fit-content",
                      lineHeight: 1,
                      bgcolor: "rgba(74, 210, 146, 15%)",
                      color: "success.main",
                    }}
                  >
                    Paid
                  </Box>
                </MenuItem>
                <MenuItem value={"unpaid"}>
                  <Box
                    sx={{
                      textTransform: "capitalize",
                      fontSize: "12px",
                      p: 0.5,
                      borderRadius: 1,
                      maxWidth: "fit-content",
                      lineHeight: 1,
                      bgcolor: "rgba(225, 107, 22, 15%)",
                      color: "review.main",
                    }}
                  >
                    Unpaid
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{
                width: "100%",
                maxWidth: "100%",
              }}
            >
              {/* <DemoContainer components={["DatePicker"]}> */}
              <MobileDatePicker
                fullWidth
                label="Start Date"
                defaultValue={dayjs(new Date().toLocaleDateString())}
                sx={{
                  minWidth: "100% !important",
                  fontSize: "14px !important",
                  "&>div": { fontSize: "14px" },
                  "&>label": { fontSize: "14px" },
                }}
              />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              size="normal"
              sx={{
                textTransform: "capitalize",
                "&>label": { fontSize: "14px" },
              }}
            >
              <InputLabel
                sx={{ textTransform: "capitalize" }}
                id="demo-simple-select-label"
              >
                Day type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Day type"
                sx={{ fontSize: "14px" }}
              >
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={"frist half"}
                >
                  frist half
                </MenuItem>
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={"seconad half"}
                >
                  seconad half
                </MenuItem>
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={"full day"}
                >
                  full day
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              style={{
                width: "100%",
                maxWidth: "100%",
              }}
            >
              {/* <DemoContainer components={["DatePicker"]}> */}
              <MobileDatePicker
                label="End Date"
                defaultValue={dayjs(new Date().toLocaleDateString())}
                sx={{
                  minWidth: "100% !important",
                  "&>div": { fontSize: "14px" },
                  "&>label": { fontSize: "14px" },
                }}
              />
              {/* </DemoContainer> */}
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              size="normal"
              sx={{
                textTransform: "capitalize",
                "&>label": { fontSize: "14px" },
              }}
            >
              <InputLabel
                sx={{ textTransform: "capitalize" }}
                id="demo-simple-select-label"
              >
                Day type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Day type"
                sx={{ fontSize: "14px" }}
              >
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={"frist half"}
                >
                  frist half
                </MenuItem>
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={"seconad half"}
                >
                  seconad half
                </MenuItem>
                <MenuItem
                  sx={{ textTransform: "capitalize" }}
                  value={"full day"}
                >
                  full day
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth sx={{ "&>div": { fontSize: "14px" } }}>
              <OutlinedInput
                placeholder="Leave Title"
                startAdornment={
                  <InputAdornment position="start">
                    <AccountHolderIcon />
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
              <span style={{ position: "relative" }}>Add Leave</span>
            </Button>
          </Grid>
        </Grid>
      </ModalComponent>
    </>
  );
}

export default UserLeave;
