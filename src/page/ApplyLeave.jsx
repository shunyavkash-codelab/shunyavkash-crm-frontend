import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { FormControl } from "@mui/material";
import dayjs from "dayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Home() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const [value, setValue] = React.useState(dayjs("2022-04-17"));

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
              // minHeight: "700px", // option after comment
              margin: "0 auto",
              bgcolor: "white",
              boxShadow: "0 0 10px rgba(0 ,0, 0, 0.1)",
              borderRadius: "10px",
              position: "absolute",
              top: "0",
              left: "0",
              transform: "translate(50%,50%)",
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
                  variant="h2"
                  sx={{
                    textAlign: "center",
                    mb: 2,
                  }}
                >
                  Apply For Leave
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    size="small"
                    id="title"
                    label="Leave Title"
                    autoComplete="off"
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    id="filled-multiline-flexible"
                    label="Leave Description"
                    multiline
                    maxRows={4}
                    sx={{
                      "&>label,& input,&>div": { fontSize: "14px" },
                      width: "100%",
                    }}
                  />
                </Box>

                <Box sx={{ display: "flex", gap: 2 }}>
                  {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      label="Leave Start Date:"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      format="DD-MM-YYYY"
                    />
                  </LocalizationProvider>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                      label="Leave End Date:"
                      value={value}
                      onChange={(newValue) => setValue(newValue)}
                      format="DD-MM-YYYY"
                    />
                  </LocalizationProvider> */}

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box
                      components={["DateField", "DateField"]}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                      }}
                    >
                      <DateField label="FROM" />
                      <DateField
                        label="TO"
                        value={value}
                        onChange={(newValue) => setValue(newValue)}
                      />
                    </Box>
                  </LocalizationProvider>
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
                    <span style={{ position: "relative" }}>Submit</span>
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
