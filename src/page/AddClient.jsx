import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useParams } from "react-router-dom";
import SectionHeader from "../component/SectionHeader";
import AddClientForm from "../component/form/AddClientForm";

export default function AddClient() {
  const { id } = useParams();

  const { setSnack } = useSnack();
  const { apiCall } = useApi();

  const [clientList, setClientList] = useState(false);

  const initialValues = {
    name: clientList?.name || "",
    email: clientList?.email || "",
    mobileNumber: clientList?.mobileNumber || "",
    gender: clientList?.gender || "",
    companyName: clientList?.companyName || "",
    websiteURL: clientList?.websiteURL || "",
    address: clientList?.address || "",
    profile_img: clientList?.profile_img || "",
    companyLogo: clientList?.companyLogo || "",
    mobileCode: clientList?.mobileCode || "+91",
    bankName: clientList?.bankName || "",
    IFSC: clientList?.IFSC || "",
    holderName: clientList?.holderName || "",
    accountNumber: clientList?.accountNumber || "",
  };

  // get client list
  const fetchClient = useCallback(
    async (id) => {
      try {
        const res = await apiCall({
          url: APIS.CLIENT.VIEW(id),
          method: "get",
        });
        if (res.data.success === true) {
          setClientList(res.data.data);
        }
      } catch (error) {
        console.log(error, setSnack);
      }
    },
    [apiCall, setSnack]
  );

  useEffect(() => {
    if (id !== undefined) {
      fetchClient(id);
    }
    // fetchCountry();
  }, [fetchClient, id]);

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Add Client"
          BreadCrumbPreviousLink="/Clients"
          BreadCrumbPreviousTitle="Clients"
          BreadCrumbCurrentTitle="Add Client"
          stackSx={{ mb: 0 }}
        />
        {(clientList || id === undefined) && (
          <AddClientForm
            clientList={clientList}
            initialValues={initialValues}
            id={id}
          />
        )}
      </Box>
    </>
  );
}
