import React, { useEffect, useState, useCallback } from "react";
import SectionHeader from "../component/SectionHeader";
import { Box, Card } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ThemeButton from "../component/ThemeButton";
import { APIS } from "../api/apiList";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";

import AccountAddForm from "../component/form/AccountAddForm";
import AddClientsModal from "../component/AddClientsModal";
import Loading from "../component/ui/Loading";

function AccountAdd() {
  const [viewTransaction, setViewTransaction] = useState(false);
  const [clientList, setClientList] = useState([]);
  const [newClientId, setNewClientId] = useState(null);
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const navigate = useNavigate();
  const location = useLocation();

  const getTransaction = useCallback(
    async (id) => {
      try {
        const res = await apiCall({
          url: APIS.ACCOUNTMANAGE.GET(id),
          method: "get",
        });
        if (res.data.success === true) {
          setViewTransaction(res.data.data);
        }
      } catch (error) {
        let errorMessage = error.response.data.message;
        setSnack(errorMessage, "warning");
      }
    },
    [apiCall, setSnack]
  );

  const fetchClients = useCallback(async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.LIST,
        method: "get",
        params: { limit: 1000 },
      });
      if (res.data.success === true) {
        let data = res.data.data.data;
        setClientList([
          ...data.map((client) => ({ label: client.name, value: client._id })),
          {
            label: (
              <Box sx={{ display: "flex" }}>
                <ThemeButton
                  Text="Add Client"
                  buttonStyle={{ maxHeight: "36px" }}
                  onClick={() => setOpen(true)}
                />
              </Box>
            ),
            value: "",
          },
        ]);
        return res.data.data.data;
      }
    } catch (error) {
      console.error(error, setSnack);
    }
  }, [apiCall, setSnack]);
  // delete employee and user
  const deleteEmpandman = async () => {
    try {
      const res = await apiCall({
        url: APIS.ACCOUNTMANAGE.DELETE(id),
        method: "delete",
      });
      if (res.status === 200) {
        setSnack(res.data.message);
        navigate("/account-management");
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  useEffect(() => {
    if (id) {
      getTransaction(id);
    }
  }, [id, getTransaction]);

  const isEdit = location.pathname.includes("/edit/");
  return (
    <>
      <Box component="main">
        <SectionHeader
          Title={isEdit ? "Edit Entry" : "Add Entry"}
          BreadCrumbPreviousLink="/account-management"
          BreadCrumbPreviousTitle="A/C Management"
          BreadCrumbCurrentTitle={isEdit ? "Edit Entry" : "Add Entry"}
          stackSx={{ mb: 0 }}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <Card
            sx={{
              p: 3,
              border: 0,
              borderRadius: 3,
              boxShadow: "none",
              maxWidth: 600,
            }}
          >
            <AccountAddForm
              viewTransaction={viewTransaction}
              id={id}
              deleteEmpandman={deleteEmpandman}
              clientList={clientList}
              isEdit={isEdit}
              newClientId={newClientId}
            />
          </Card>
        )}
      </Box>

      <AddClientsModal
        open={open}
        setOpen={setOpen}
        onSuccess={async (id) => {
          await fetchClients();
          setNewClientId(id);
        }}
      />
    </>
  );
}

export default AccountAdd;
