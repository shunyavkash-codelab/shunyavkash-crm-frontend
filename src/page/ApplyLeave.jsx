import React, { useState } from "react";
import { Box, TextField, Button, label } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

{
  /* <style>
.css - hyxlzm{
    display:"none";
}
</style> */
}

export default function Home() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const [value, setValue] = React.useState("female");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  // const formik = useFormik({
  //   initialValues: {
  //     name: "",
  //     email: "",
  //     mobileNumber: "",
  //     gender: "",
  //     companyName: "",
  //     websiteURL: "",
  //     reference: "",
  //     profile_img: undefined,
  //     companyLogo: undefined,
  //     signature: undefined,
  //     mobileCode: undefined,
  //   },
  // });

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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          ml: { lg: sideBarWidth },
        }}
      >
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
            position: "relative",
          }}
        >
          <Box
            sx={{
              maxWidth: "700px",
              margin: "0 auto",
              bgcolor: "white",
              boxShadow: "0 0 10px rgba(0 ,0, 0, 0.1)",
              borderRadius: "10px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Box
              component="form"
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                width: "100%",
              }}
            >
              <FormControl
                component="fieldset"
                sx={{
                  // textAlign: "center",
                  maxWidth: "400px",
                  width: "100%",
                  gap: 2,
                  "&>label,&>span": {
                    p: 0,
                    pl: 1,
                  },
                }}
              >
                <Box
                  component="h2"
                  sx={{
                    mb: 2,
                    fontSize: "30px",
                  }}
                >
                  Apply For Leave
                </Box>
                <Box>
                  <FormLabel id="leave-type-group-buttons">
                    Leave Type
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="leave-type-group-buttons"
                    name="controlled-radio-buttons-group"
                    value={value}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="paid"
                      control={<Radio />}
                      label="Paid"
                      className="apply-leave"
                      // sx={{
                      //   "& input": {
                      //     display: "none",
                      //   },
                      //   "& span & svg": {
                      //     display: "none",
                      //   },
                      //   "&>*:first-child": {
                      //     position: "relative",
                      //     color: "#ff0000",
                      //     cursor: "pointer",
                      //     transition: "all 0.3s",
                      //     backgroundColor: "#000",
                      //     margin: "0 10px 0 0",
                      //     borderRadius: 2,
                      //     padding: 0,
                      //     // display: "none",
                      //     "& before": {
                      //       content: '""',
                      //       position: "absolute",
                      //       top: "50%",
                      //       right: 0,
                      //       backgroundColor: "#fe22ff",
                      //       fontSize: "50px",
                      //       color: "#ff0000",
                      //     },
                      //     "& svg": {
                      //       height: "18px",
                      //       width: "18px",
                      //       flexShrink: 0,
                      //       margin: "0 auto",
                      //       fill: "#ff0000",
                      //       backgroundColor: "#ff0000",
                      //       borderRadius: "100%",
                      //       boxShadow: "0 0 5px #000025",
                      //     },
                      //   },
                      // }}
                    />
                    <FormControlLabel
                      value="unpaid"
                      control={<Radio />}
                      label="Unpaid"
                      className="apply-leave"
                      // sx={{
                      //   "& input": {
                      //     display: "none",
                      //   },
                      //   "& span & svg": {
                      //     display: "none",
                      //   },
                      //   "&>*:first-child": {
                      //     position: "relative",
                      //     color: "#ff0000",
                      //     cursor: "pointer",
                      //     transition: "all 0.3s",
                      //     backgroundColor: "#000",
                      //     margin: "0 10px 0 0",
                      //     borderRadius: 2,
                      //     padding: 0,
                      //     // display: "none",
                      //     "& before": {
                      //       content: '""',
                      //       position: "absolute",
                      //       top: "50%",
                      //       right: 0,
                      //       backgroundColor: "#fe22ff",
                      //       fontSize: "50px",
                      //       color: "#ff0000",
                      //     },
                      //     "& svg": {
                      //       height: "18px",
                      //       width: "18px",
                      //       flexShrink: 0,
                      //       margin: "0 auto",
                      //       fill: "#ff0000",
                      //       backgroundColor: "#ff0000",
                      //       borderRadius: "100%",
                      //       boxShadow: "0 0 5px #000025",
                      //     },
                      //   },
                      // }}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Other"
                      className="apply-leave"
                      // sx={{
                      //   "& input": {
                      //     display: "none",
                      //   },
                      //   "& span & svg": {
                      //     display: "none",
                      //   },
                      //   "&>*:first-child": {
                      //     position: "relative",
                      //     color: "#ff0000",
                      //     cursor: "pointer",
                      //     transition: "all 0.3s",
                      //     backgroundColor: "#000",
                      //     margin: "0 10px 0 0",
                      //     borderRadius: 2,
                      //     padding: 0,
                      //     // display: "none",
                      //     "& before": {
                      //       content: '""',
                      //       position: "absolute",
                      //       top: "50%",
                      //       right: 0,
                      //       backgroundColor: "#fe22ff",
                      //       fontSize: "50px",
                      //       color: "#ff0000",
                      //     },
                      //     "& svg": {
                      //       height: "18px",
                      //       width: "18px",
                      //       flexShrink: 0,
                      //       margin: "0 auto",
                      //       fill: "#ff0000",
                      //       backgroundColor: "#ff0000",
                      //       borderRadius: "100%",
                      //       boxShadow: "0 0 5px #000025",
                      //     },
                      //   },
                      // }}
                    />
                  </RadioGroup>
                </Box>
                <Box>
                  <FormControl>
                    <FormLabel id="day-type-group-buttons">Day Type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="day-type-group-buttons"
                      name="controlled-radio-buttons-group"
                      value={value}
                      onChange={handleChange}
                    >
                      <FormControlLabel
                        value="Full"
                        control={<Radio />}
                        label="Full day"
                      />
                      <FormControlLabel
                        value="First half"
                        control={<Radio />}
                        label="First half"
                      />
                      <FormControlLabel
                        value="Second half"
                        control={<Radio />}
                        label="Second half"
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DateRangePicker"]}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <label>From</label>
                        <label>To</label>
                      </Box>
                      <DateRangePicker
                        localeText={{
                          From: "",
                          To: "",
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
                <Box>
                  <TextField
                    id="outlined-multiline-static"
                    label="Reason"
                    placeholder="Type here leave Reason"
                    multiline
                    rows={4}
                    fullWidth
                  />
                </Box>

                <Box>
                  <Button
                    disableRipple
                    type="submit"
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
                    <span style={{ position: "relative" }}>Apply Leave</span>
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
