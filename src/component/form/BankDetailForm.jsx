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
  const { apiCall } = useApi();
  const [defaultChecked, setDefaultChecked] = useState({ id: "" });
  const { setSnack } = useSnack();
  const [bankList, setBankList] = useState([]);

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

  const [setDeleteBankData] = useState(false);

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
        <Typography variant="h4" gutterBottom sx={{ fontSize: 16 }}>
          Bank Details
        </Typography>
        <Button
          disableRipple
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
              bgcolor: "primary.main",
              "&:before": { height: "10rem" },
            },
          }}
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
        >
          <span style={{ position: "relative" }}>add bank</span>
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
          <input
            hidden
            value={row.unSaved ? "create" : "update"}
            name="unsave"
          />
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
                  defaultValue={row.label}
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
                  defaultValue={row.label}
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
            <Grid item xs={12}>
              <Stack direction="row" spacing={2}>
                <Button
                  disableRipple
                  type="submit"
                  sx={{
                    maxHeight: "42px",
                    position: "relative",
                    px: 2.5,
                    py: 1.5,
                    bgcolor: "error.main",
                    border: "1px solid",
                    borderColor: "error.main",
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
                      color: "error.main",
                      bgcolor: "error.main",
                      "&:before": { height: "10rem" },
                    },
                  }}
                  onClick={() => {
                    formik.setFieldValue("id", row._id);
                  }}
                >
                  <span style={{ position: "relative" }}>Save Changes</span>
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
                >
                  <span style={{ position: "relative" }}>discard</span>
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      ))}
    </>
  );
}
