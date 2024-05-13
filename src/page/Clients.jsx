import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Box, Table, TableContainer, Paper } from "@mui/material";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList.js";
import { useAuth } from "../hooks/store/useAuth.js";
import { useSearchData } from "../hooks/store/useSearchData.js";
import NoData from "../component/NoData.jsx";
import ThemeButton from "../component/ThemeButton.jsx";
import SectionHeader from "../component/SectionHeader.jsx";
import ThemePagination from "../component/ThemePagination";
import LoadingIcon from "../component/icons/LoadingIcon.jsx";
import ModalComponent from "../component/ModalComponent.jsx";
import CustomTableHeader from "../component/table/CustomTableHeader.jsx";
import CustomTableBody from "../component/table/CustomTableBody.jsx";

export default function Clients() {
  const [clientList, setClientList] = useState([]);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { user } = useAuth();
  const { searchData, setSearchData } = useSearchData();
  const [params] = useSearchParams();
  const page = +params.get("page") || 1;
  const limit = +params.get("limit") || 10;
  const [totalPage, setTotalPage] = useState(1);
  const [sortField, setSortField] = useState();
  const [orderBy, setOrderBy] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [selectClient, setSelectClient] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = () => {
    params.set("page", 1);
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const deleteClient = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.DELETE(id),
        method: "delete",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        fetchclientData();
        setOpenDelete(false);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const fetchclientData = useCallback(
    async (search) => {
      try {
        const res = await apiCall({
          url: APIS.CLIENT.LIST,
          method: "get",
          params: {
            search: search,
            page: page,
            limit: limit,
            sortField: sortField,
            orderBy: orderBy,
          },
        });
        if (res.data.success === true) {
          setClientList(res.data.data.data);
          setTotalPage(res.data.data.pagination.pages);
        }
      } catch (error) {
        console.log(error, setSnack);
      }
    },
    [apiCall, limit, orderBy, page, setSnack, sortField]
  );

  useEffect(() => {
    setSearchData("");
  }, []);

  useEffect(() => {
    if (searchData) {
      const getData = setTimeout(async () => {
        page !== 1 ? handlePageChange() : fetchclientData(searchData);
      }, 1000);
      return () => {
        clearTimeout(getData);
      };
    } else {
      fetchclientData();
    }
  }, [fetchclientData, searchData]);

  const createSortHandler = (id) => {
    setSortField(id);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };

  const TABLE_HEADINGS = [
    {
      id: "name",
      label: "Name",
      sortable: true,
    },
    { id: "companyName", label: "Company Name", sortable: false },
    {
      id: "projectName",
      label: "Project",
      sortable: false,
    },
    user.role === 0 && {
      id: "actions",
      label: "Actions",
      sortable: false,
      textAlign: "center",
    },
  ];

  const TABLE_BODY = clientList.map((client) => ({
    key: client._id,
    row: [
      {
        type: "avatar+name",
        value: {
          name: client.name,
          profile_img: client.profile_img,
          email: client.email,
        },
      },
      { type: "box", value: client.companyName },
      { type: "multi-items", value: client.projectName },
      user.role === 0 && {
        type: "edit",
        value: client.type,
        onEdit: () => navigate(`./edit/${client._id}`),
        onOpen: () => {
          navigate(`./view/${client._id}`);
          // setSelectedTransaction(client);
        },
        deleteIcon: true,
        onDelete: () => {
          setOpenDelete(true);
          setSelectClient(client._id);
        },
      },
    ],
  }));

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Our Clients"
          BreadCrumbPreviousLink="/"
          BreadCrumbPreviousTitle="Dashboard"
          BreadCrumbCurrentTitle="Clients"
          createButtonTitle="Add client"
          createLink="./add"
          style={{ mb: 0 }}
        />

        {isLoading ? (
          <LoadingIcon style={{ height: "50vh" }} />
        ) : clientList.length === 0 ? (
          <NoData />
        ) : (
          <>
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
                  "& thead > tr > th": {
                    backgroundColor: "#F8F9FA",
                  },
                  "& th,& td": { borderBottom: 0 },
                  "& tbody tr": {
                    borderTop: "1px solid rgba(224, 224, 224, 1)",
                  },
                }}
                aria-label="simple table"
              >
                <CustomTableHeader
                  createSortHandler={createSortHandler}
                  headings={TABLE_HEADINGS}
                  orderBy={orderBy}
                  sortField={sortField}
                />
                <CustomTableBody records={TABLE_BODY} />
                <ModalComponent
                  open={openDelete}
                  setOpen={setOpenDelete}
                  modelStyle={{ maxWidth: "400px" }}
                >
                  <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                    {"Are you sure delete this client?"}
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        mt: 2.5,
                        justifyContent: "center",
                      }}
                    >
                      <ThemeButton
                        success
                        Text="Yes"
                        type="submit"
                        onClick={() => deleteClient(selectClient)}
                      />
                      <ThemeButton
                        discard
                        Text="No"
                        onClick={() => setOpenDelete(false)}
                      />
                    </Box>
                  </Box>
                </ModalComponent>
              </Table>
            </TableContainer>
          </>
        )}
        {/* pagination */}
        {clientList.length > 0 && (
          <ThemePagination totalPage={totalPage} count={clientList.length} />
        )}
      </Box>
    </>
  );
}
