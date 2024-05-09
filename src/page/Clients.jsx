import React, { useCallback, useEffect, useState } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Chip,
  Stack,
  TableSortLabel,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
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
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ModalComponent from "../component/ModalComponent.jsx";

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
                <TableHead>
                  <TableRow sx={{ "& th": { lineHeight: 1, fontWeight: 600 } }}>
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "name"}
                        direction={orderBy || "asc"}
                        onClick={() => createSortHandler("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Company Name</TableCell>
                    <TableCell>Project</TableCell>
                    {user.role === 0 && <TableCell>Actions</TableCell>}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {clientList.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": { p: 1.5 },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.75,
                          }}
                        >
                          <Avatar
                            sx={{
                              width: "36px",
                              height: "36px",
                            }}
                            alt={row.name}
                            src={row.profile_img}
                          />
                          <Box>
                            <Typography
                              sx={{
                                mb: 0.75,
                                lineHeight: 1,
                                fontWeight: 500,
                                fontSize: { xs: "14px", sm: "16px" },
                              }}
                            >
                              {row.name}
                            </Typography>
                            <Typography
                              sx={{
                                lineHeight: 1,
                                textTransform: "lowercase",
                                fontSize: { xs: "12px", sm: "14px" },
                              }}
                            >
                              {row.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>{row.companyName}</TableCell>
                      <TableCell>
                        <Stack sx={{}}>
                          {row.projectName.map((pro) => (
                            <Chip
                              label={pro}
                              sx={{ maxWidth: "fit-content" }}
                            />
                          ))}
                        </Stack>
                      </TableCell>
                      {user.role === 0 && (
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: { xs: 1.25, sm: 1.5 },
                              "& button": {
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                transition: "all 0.5s",
                              },
                              "& svg": {
                                fontSize: { xs: "20px", sm: "22px" },
                              },
                            }}
                          >
                            <Link to={`./view/${row._id}`}>
                              <Button disableRipple>
                                <VisibilityIcon
                                  sx={{ color: "secondary.main" }}
                                />
                              </Button>
                            </Link>
                            <Link to={`./edit/${row._id}`}>
                              <Button disableRipple>
                                <CreateIcon sx={{ color: "primary.main" }} />
                              </Button>
                            </Link>
                            <Button
                              disableRipple
                              sx={{
                                p: 0,
                                minWidth: "auto",
                                color: "black",
                                "&:hover": { color: "primary.main" },
                              }}
                              onClick={() => {
                                setOpenDelete(true);
                                setSelectClient(row._id);
                              }}
                            >
                              <DeleteIcon sx={{ color: "error.main" }} />
                            </Button>
                          </Box>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
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
                </TableBody>
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
