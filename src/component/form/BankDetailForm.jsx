import {
  Box,
  Button,
  Divider,
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
import { useSnack } from "../../hooks/store/useSnack";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";
import ThemeButton from "../ThemeButton";

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
  const { apiCall } = useApi();
  const [defaultChecked, setDefaultChecked] = useState({ id: "" });
  const { setSnack } = useSnack();
  const [bankList, setBankList] = useState([]);
  const [showBtn, setShowBtn] = useState();
  const [setDeleteBankData] = useState(false);

  // add and edit bank
  const formik = useFormik({
    initialValues: {
      id: "",
      holderName: "",
      bankName: "",
      accountNumber: "",
      IFSC: "",
      defaultBank: false,
    },

    onSubmit: async (values) => {
      try {
        // add bank details
        if (values.id.length > 24) {
          let value = {
            id: values.id,
            defaultBank: defaultChecked.id.length > 24 ? true : false,
          };
          values.defaultBank = value.defaultBank;
          const res = await apiCall({
            url: APIS.BANK.ADD,
            method: "post",
            data: JSON.stringify(values, null, 2),
          });
          if (res.status === 201) {
            setSnack(res.data.message);
            setBankList((prevBanks) =>
              prevBanks.map((bank) => {
                bank.defaultBank = bank._id === value.id;
                return bank;
              })
            );
            setShowBtn(false);
          }
        }

        // edit bank details
        if (
          defaultChecked.id === values.id &&
          defaultChecked.id.length === 24
        ) {
          let value = {
            id: values.id,
            defaultBank: true,
          };
          const res = await apiCall({
            url: APIS.BANK.EDIT(values.id),
            method: "patch",
            data: JSON.stringify(value, null, 2),
          });
          if (res.status === 200) {
            setSnack(res.data.message);
            setBankList((prevBanks) =>
              prevBanks.map((bank) => {
                bank.defaultBank = bank._id === value.id;
                return bank;
              })
            );
          }
        }
      } catch (error) {
        let errorMessage = error?.response?.data?.message || error.message;
        setSnack(errorMessage, "warning");
      }
    },
  });

  // delete bank
  const deleteBankdetail = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.BANK.DELETE(id),
        method: "delete",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setDeleteBankData(res.data.data);
      }
      return;
    } catch (error) {
      setSnack(error.response.data.message, "error");
      throw error;
      // handleApiError(error, setSnack);
    }
  };

  // get user detile
  const fetchBank = async () => {
    try {
      const res = await apiCall({
        url: APIS.BANK.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setBankList(res.data.data.data);
        setDefaultChecked({
          id: res.data.data.data.find((bank) => bank.defaultBank)._id,
        });
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    fetchBank();
  }, []);
  // });

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
        <Typography variant="h4" gutterBottom sx={{ fontSize: 16, mb: 0 }}>
          Bank Details
        </Typography>
        <ThemeButton
          Text="add bank"
          onClick={() => {
            setBankList((prevBanks) => [
              {
                _id: uuidv4(),
                holderName: "",
                bankName: "",
                label: "",
                IFSC: "",
                defaultBank: false,
                unSaved: true,
              },
              ...prevBanks,
            ]);
          }}
        />
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
          <input
            hidden
            value={row.unSaved ? "create" : "update"}
            name="unsave"
          />
          <Divider sx={{ borderColor: "rgba(0,0,0,10%)", my: 3 }} />
          <Grid
            container
            rowSpacing={2}
            columnSpacing={2}
            sx={{
              "& .MuiFormLabel-root, & .MuiInputBase-input": {
                fontSize: "14px",
              },
            }}
          >
            <Grid item xs={12} sx={{ pt: 3 }}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ fontSize: "16px", mb: "10px" }}
                >
                  {row.bankName}
                </Typography>
              </Box>
            </Grid>
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
                  InputProps={
                    row.unSaved === true
                      ? { readOnly: false }
                      : { readOnly: true }
                  }
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
                  InputProps={
                    row.unSaved === true
                      ? { readOnly: false }
                      : { readOnly: true }
                  }
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
                  defaultValue={row.accountNumber}
                  placeholder="Account number"
                  InputProps={
                    row.unSaved === true
                      ? { readOnly: false }
                      : { readOnly: true }
                  }
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
                  name="accountNumber"
                  defaultValue={row.accountNumber}
                  placeholder="Confirm account number"
                  onChange={formik.handleChange}
                  InputProps={
                    row.unSaved === true
                      ? { readOnly: false }
                      : { readOnly: true }
                  }
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
                  InputProps={
                    row.unSaved === true
                      ? { readOnly: false }
                      : { readOnly: true }
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <Box>
                <FormControlLabel
                  control={
                    <IOSSwitch
                      sx={{ m: 1 }}
                      checked={defaultChecked.id === row._id}
                      onChange={() => {
                        setDefaultChecked({ id: row._id });
                        setShowBtn(defaultChecked.id !== row._id);
                      }}
                    />
                  }
                  label="Make Default bank"
                  sx={{
                    "& .MuiFormControlLabel-label": {
                      fontSize: "14px",
                    },
                  }}
                  name="defaultBank"
                />
              </Box>
            </Grid>
            {showBtn && defaultChecked.id === row._id && (
              <Grid item xs={12}>
                <Stack direction="row" spacing={2}>
                  <ThemeButton
                    success
                    Text="Save"
                    type="submit"
                    onClick={() => {
                      formik.setFieldValue("id", row._id);
                    }}
                  />
                  <ThemeButton
                    discard
                    Text="discard"
                    onClick={async () => {
                      try {
                        if (!row.unSaved) {
                          // api
                          await deleteBankdetail(row._id);
                        }
                        setBankList((prev) =>
                          prev.filter((bank) => bank._id !== row._id)
                        );
                      } catch (error) {
                        setSnack(error.response.data.message, "error");
                      }
                    }}
                  />
                </Stack>
              </Grid>
            )}
          </Grid>
        </Box>
      ))}
    </>
  );
}
