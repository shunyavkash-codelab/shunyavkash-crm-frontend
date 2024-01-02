import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { FormControl } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { useFormik } from "formik";
import moment from "moment";

export default function Home() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const [value, setValue] = React.useState("female");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const [projectData] = useState(null);

  const formik = useFormik({
    initialValues: {
      startDate: moment(projectData?.startDate).format("YYYY-MM-DD"),
      endDate: moment(projectData?.endDate).format("YYYY-MM-DD"),
    },
  });

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
              width: "100%",
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
                <Box sx={{ mb: 4 }}>
                  <FormLabel
                    id="leave-type-group-buttons"
                    sx={{
                      mb: 2,
                      display: "block",
                      fontWeight: 600,
                    }}
                  >
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
                      className="css-hyxlzm"
                      sx={{
                        "&>*:first-child": {
                          position: "relative",
                          color: "#65748B",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          margin: "0px 10px 0px 10px",
                          padding: 0,
                          height: "18px",
                          width: "18px",
                        },
                        "&, &.Mui-checked": {
                          color: "text.primary",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="unpaid"
                      control={<Radio />}
                      label="Unpaid"
                      className="css-hyxlzm"
                      sx={{
                        "&>*:first-child": {
                          position: "relative",
                          color: "#65748B",
                          cursor: "pointer",
                          transition: "all 0.3s",
                          margin: "0px 10px 0px 10px",
                          padding: 0,
                          height: "18px",
                          width: "18px",
                        },
                        "&, &.Mui-checked": {
                          color: "text.primary",
                        },
                      }}
                    />
                    <FormControlLabel
                      value="sick"
                      control={<Radio />}
                      label="Sick"
                      className="css-hyxlzm"
                      sx={{
                        "&>*:first-child": {
                          position: "relative",
                          color: "#65748B",
                          cursor: "pointer",
                          transition: "all 0.5s",
                          margin: "0px 10px 0px 10px",
                          padding: 0,
                          height: "18px",
                          width: "18px",
                        },
                        "&, &.Mui-checked": {
                          color: "text.primary",
                        },
                      }}
                    />
                  </RadioGroup>
                </Box>
                <Box sx={{ mb: 4 }}>
                  <FormControl>
                    <FormLabel
                      id="day-type-group-buttons"
                      sx={{ mb: 2, display: "block", fontWeight: 600 }}
                    >
                      Day Type
                    </FormLabel>
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
                        className="css-hyxlzm"
                        sx={{
                          "&>*:first-child": {
                            position: "relative",
                            color: "#65748B",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            margin: "0px 10px 0px 10px",
                            padding: 0,
                            height: "18px",
                            width: "18px",
                          },
                          "&, &.Mui-checked": {
                            color: "text.primary",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="First half"
                        control={<Radio />}
                        label="First half"
                        className="css-hyxlzm"
                        sx={{
                          "&>*:first-child": {
                            position: "relative",
                            color: "#65748B",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            margin: "0px 10px 0px 10px",
                            padding: 0,
                            height: "18px",
                            width: "18px",
                          },
                          "&, &.Mui-checked": {
                            color: "text.primary",
                          },
                        }}
                      />
                      <FormControlLabel
                        value="Second half"
                        control={<Radio />}
                        label="Second half"
                        className="css-hyxlzm"
                        sx={{
                          "&>*:first-child": {
                            position: "relative",
                            color: "#65748B",
                            cursor: "pointer",
                            transition: "all 0.3s",
                            margin: "0px 10px 0px 10px",
                            padding: 0,
                            height: "18px",
                            width: "18px",
                          },
                          "&, &.Mui-checked": {
                            color: "text.primary",
                          },
                        }}
                      />
                    </RadioGroup>
                  </FormControl>
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    id="startDate"
                    label="Select start date"
                    autoComplete="off"
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="mm/dd/yyyy"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "16px" },
                      "& input": {
                        p: "14px 15px",
                      },
                    }}
                    defaultValue={projectData?.startDate}
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                  />
                  <TextField
                    fullWidth
                    size="small"
                    id="endDate"
                    label="Select end date"
                    autoComplete="off"
                    type="date"
                    value={formik.values.endDate}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    placeholder="mm/dd/yyyy"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "16px" },
                      "& input": {
                        p: "14px 15px",
                      },
                    }}
                    // defaultValue={projectData?.endDate}
                    onChange={formik.handleChange}
                    // value={formik.values.endDate}
                  />
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

                <Box sx={{ display: "flex", gap: 2.5 }}>
                  <Button
                    disableRipple
                    type="submit"
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
                        bgcolor: "#fff",
                        "&:before": { height: "10rem" },
                      },
                    }}
                  >
                    <span style={{ position: "relative" }}>Apply Leave</span>
                  </Button>
                  <Button
                    disableRipple
                    sx={{
                      maxHeight: "42px",
                      position: "relative",
                      px: 2.5,
                      py: 1.5,
                      color: "text.primary",
                      bgcolor: "#e4e4e4",
                      border: "1px solid",
                      borderColor: "#e4e4e4",
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
                        bgcolor: "#e4e4e4",
                        "&:before": { height: "10rem" },
                      },
                    }}
                  >
                    <span style={{ position: "relative" }}>cancle</span>
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
