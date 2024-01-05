import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModalComponent from "../component/ModalComponent";

function UserLeave() {
  const [setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const leaves = [
    {
      id: 1,
      username: "Deep Bhimani",
      type: "casual",
      reason: "Marriage Function",
      startDate: "15/01/2023",
      endDate: "17/01/2023",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet",
    },
    {
      id: 2,
      username: "Deep Bhimani",
      type: "sick",
      reason: "Medical",
      startDate: "25/02/2023",
      endDate: "27/02/2023",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet",
    },
    {
      id: 3,
      username: "Deep Bhimani",
      type: "paid",
      reason: "Going to Village",
      startDate: "31/04/2023",
      endDate: "2/05/2023",
      status: "unapprove",
      statusReason: "ipsum dolor sit amet lorem",
    },
    {
      id: 4,
      username: "Deep Bhimani",
      type: "unpaid",
      reason: "Going to Friend's Birthday Party",
      startDate: "25/04/2023",
      endDate: "25/04/2023",
      status: "unapprove",
      statusReason: "Lorem dolor sit ipsum amet",
    },
    {
      id: 5,
      username: "Deep Bhimani",
      type: "paid",
      reason: "sick",
      startDate: "14/08/2023",
      endDate: "14/08/2023",
      status: "approve",
      statusReason: "Lorem ipsum dolor sit amet",
    },
    {
      id: 6,
      username: "Deep Bhimani",
      type: "sick",
      reason: "Medical Issue",
      startDate: "12/10/2023",
      endDate: "15/10/2023",
      status: "approve",
      statusReason: "Lorem dolor sit amet",
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
                  <TableCell>User Name</TableCell>
                  <TableCell>Leave Type</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Start Date</TableCell>
                  <TableCell>End Date</TableCell>
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
                      "&:first-child td": {
                        maxWidth: "250px",
                        textWrap: "wrap",
                      },
                    }}
                  >
                    <TableCell>{leave.username}</TableCell>
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
                        "& .casual": {
                          bgcolor: "rgba(94, 115, 141, 15%)",
                          color: "grey.dark",
                        },
                        "& .sick": {
                          bgcolor: "rgba(248, 174, 0, 15%)",
                          color: "secondary.main",
                        },
                        "& .unpaid": {
                          bgcolor: "rgba(225, 107, 22, 15%)",
                          color: "review.main",
                        },
                        "& .paid": {
                          bgcolor: "rgba(74, 210, 146, 15%)",
                          color: "success.main",
                        },
                      }}
                    >
                      <Box
                        className={`statusBtn ${
                          leave.type === "casual"
                            ? "casual"
                            : leave.type === "sick"
                            ? "sick"
                            : leave.type === "unpaid"
                            ? "unpaid"
                            : "paid"
                        }`}
                      >
                        {leave.type}
                      </Box>
                    </TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    <TableCell>{leave.startDate}</TableCell>
                    <TableCell>{leave.endDate}</TableCell>
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
                        "& .unapprove": {
                          bgcolor: "secondary.main",
                        },
                        "& .approve": {
                          bgcolor: "success.main",
                        },
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={0.5}
                        className={`statusBtn ${
                          leave.status === "unapprove" ? "unapprove" : "approve"
                        }`}
                      >
                        <span style={{ display: "inline-block" }}>
                          {leave.status}
                        </span>
                        <Tooltip title={leave.statusReason}>
                          <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            sx={{
                              height: "16px",
                              width: "16px",
                              cursor: "pointer",
                              border: "1px solid white",
                              borderRadius: "100%",
                              padding: "3px",
                            }}
                          >
                            <img
                              src="/images/info.svg"
                              style={{ width: "100%", height: "100%" }}
                              alt="info"
                            />
                          </Stack>
                        </Tooltip>
                      </Stack>
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
                Leave Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Leave Type"
                sx={{ fontSize: "14px" }}
              >
                <MenuItem sx={{ textTransform: "capitalize" }} value={"casual"}>
                  Casual
                </MenuItem>
                <MenuItem sx={{ textTransform: "capitalize" }} value={"sick"}>
                  Sick
                </MenuItem>
                <MenuItem sx={{ textTransform: "capitalize" }} value={"paid"}>
                  Paid
                </MenuItem>
                <MenuItem sx={{ textTransform: "capitalize" }} value={"unpaid"}>
                  Unpaid
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ "> .MuiFormControl-root": { margin: 0 } }}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                size="normal"
                id="name"
                placeholder="Leave Reason"
                autoComplete="off"
                sx={{
                  "&>label,& input,&>div": { fontSize: "14px" },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>
      </ModalComponent>
    </>
  );
}

export default UserLeave;
