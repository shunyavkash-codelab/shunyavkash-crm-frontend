import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { APIS } from "../../api/apiList";
import { useAuth } from "../../hooks/store/useAuth";
import { useSnack } from "../../hooks/store/useSnack";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "dark" ? "#1677FF" : "#65C466",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));

export default function BankDetailForm({ profileList }) {
  const { apiCall, isLoading } = useApi();
  const { accessToken, userId } = useAuth();
  const { setSnack } = useSnack();
  const [bankList, setBankList] = useState([]);

  const formik = useFormik({
    initialValues: {
      id: "",
      holderName: bankList.name,
      bankName: bankList.bankName,
      label: bankList.label,
      IFSC: bankList.IFSC,
      defaultBank: bankList.defaultBank,
    },

    onSubmit: async (values, ...rest) => {
      console.log(values, rest);
      try {
        const res = await apiCall({
          url: APIS.BANK.EDIT(values.id),
          method: "patch",
          data: JSON.stringify(values, null, 2),
        });
        if (res.status === 200) {
          setSnack(res.data.message);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  console.log(formik, "-----------------------105");

  // get manager detile
  const fetchBank = async () => {
    try {
      const res = await apiCall({
        url: APIS.BANK.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setBankList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    fetchBank();
  }, []);
  console.log(bankList, "------------------------------126");
  return (
    <>
      <Stack
        direction="row"
        sx={{
          flexDirection: { sm: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { sm: "start", md: "center" },
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
          Bank Details
        </Typography>
        <Button
          onClick={() => {
            setBankList((prevBanks) => [
              {
                _id: uuidv4(),
                holderName: "",
                bankName: "",
                label: "",
                IFSC: "",
                defaultBank: false,
              },
              ...prevBanks,
            ]);
          }}
          variant="contained"
        >
          Add Bank
        </Button>
      </Stack>

      {bankList.map((row) => (
        <Box
          component="form"
          onSubmit={formik.handleSubmit}
          key={row._id}
          sx={{
            "& .MuiGrid-container:not(:last-child)": {
              borderBottom: "1px solid rgba(224, 224, 224, 1)",
              pb: "32px",
            },
          }}
        >
          <input hidden value={formik.values.id} name="id" />
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            mt={2}
            sx={{
              "& .MuiFormLabel-root, & .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
          >
            <Grid item xs={12} sm={6}>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Bank account holder name"
                  variant="outlined"
                  sx={{ width: "100%", fontSize: "14px" }}
                  name="holderName"
                  defaultValue={row.holderName}
                  placeholder="Bank account holder name"
                  onChange={formik.handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Bank Name"
                  variant="outlined"
                  sx={{ width: "100%", fontSize: "14px" }}
                  name="bankName"
                  defaultValue={row.bankName}
                  placeholder="Bank name"
                  onChange={formik.handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Account number"
                  variant="outlined"
                  sx={{ width: "100%", fontSize: "14px" }}
                  defaultValue={row.label}
                  placeholder="Account number"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="Confirm Account number"
                  variant="outlined"
                  sx={{ width: "100%", fontSize: "14px" }}
                  name="label"
                  defaultValue={row.label}
                  placeholder="Confirm account number"
                  onChange={formik.handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box>
                <TextField
                  id="outlined-basic"
                  label="IFSC"
                  variant="outlined"
                  sx={{ width: "100%", fontSize: "14px" }}
                  name="IFSC"
                  defaultValue={row.IFSC}
                  placeholder="IFSC"
                  onChange={formik.handleChange}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      defaultChecked={row.defaultBank == true}
                    />
                  }
                  label="Make Default bank"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  type="submit"
                  variant="contained"
                  onClick={() => {
                    formik.setFieldValue("id", row._id);
                  }}
                >
                  Save Changes
                </Button>
                <Button variant="outlined" color="error">
                  Remove
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
}
