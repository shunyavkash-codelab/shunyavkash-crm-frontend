import React, { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import moment from "moment";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import CreateIcon from "@mui/icons-material/CreateOutlined";
import { useSnack } from "../hooks/store/useSnack";
import useApi from "../hooks/useApi";
import handleApiError from "../utils/handleApiError";
import { APIS } from "../api/apiList";
import { useAuth } from "../hooks/store/useAuth";
import { useSearchData } from "../hooks/store/useSearchData";
import NoData from "../component/NoData";
import ThemeButton from "../component/ThemeButton";
import SectionHeader from "../component/SectionHeader";
import ThemePagination from "../component/ThemePagination";
import LoadingIcon from "../component/icons/LoadingIcon";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import ModalComponent from "../component/ModalComponent";

export default function Project() {
  const [projectList, setProjectList] = useState([]);
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
  const [selectProject, setSelectProject] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageChange = () => {
    params.set("page", 1);
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  const deleteProject = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.DELETE(id),
        method: "delete",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        fetchProjects();
        setOpenDelete(false);
      }
    } catch (error) {
      setSnack(error.response.data.message, "warning");
    }
  };

  const fetchProjects = useCallback(async (search) => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.LIST,
        method: "get",
        params: {
          search: search,
          page,
          limit: limit,
          sortField: sortField,
          orderBy: orderBy,
        },
      });
      if (res.data.success === true) {
        setProjectList(res.data.data.data);
        setTotalPage(res.data.data.pagination.pages);
      }
    } catch (error) {
      console.log(error, setSnack);
      handleApiError(error, setSnack);
    }
  },[apiCall, limit, orderBy, page, setSnack, sortField]);

  useEffect(() => {
    setSearchData("");
  }, []);

  useEffect(() => {
    if (searchData) {
      const getData = setTimeout(async () => {
        page !== 1 ? handlePageChange() : fetchProjects(searchData);
      }, 1000);
      return () => {
        clearTimeout(getData);
      };
    } else {
      fetchProjects();
    }
  }, [fetchProjects, page, searchData]);

  const createSortHandler = (id) => {
    setSortField(id);
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  };
  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Our Projects"
          BreadCrumbPreviousLink="/"
          BreadCrumbPreviousTitle="Dashboard"
          BreadCrumbCurrentTitle="projects"
          style={{ mb: 0 }}
          createButtonTitle="Add Project"
          createLink="./add"
        />

        {isLoading ? (
          <LoadingIcon style={{ height: "50vh" }} />
        ) : projectList.length === 0 ? (
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
                id={"tableData"}
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
                        Project Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>Client</TableCell>
                    <TableCell>Manager</TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortField === "startDate"}
                        direction={orderBy || "asc"}
                        onClick={() => createSortHandler("startDate")}
                      >
                        Start date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>End date</TableCell>
                    <TableCell>Currency/hour</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {projectList.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                        "&>*": { p: 1.5 },
                      }}
                    >
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.clientName}</TableCell>
                      <TableCell>{row.userName}</TableCell>
                      <TableCell>
                        {moment(row.startDate).format("MMM D, YYYY")}
                      </TableCell>
                      <TableCell>
                        {moment(row.endDate).format("MMM D, YYYY")}
                      </TableCell>
                      <TableCell>
                        {row.currency}
                        {row.perHourCharge}/hour
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            fontSize: "12px",
                            p: 0.5,
                            borderRadius: 1,
                            maxWidth: "fit-content",
                            lineHeight: 1,
                            color: "white",
                            bgcolor:
                              row.status === "completed"
                                ? "success.main"
                                : row.status === "inReview"
                                ? "review.main"
                                : row.status === "inProgress"
                                ? "secondary.main"
                                : "grey.dark",
                          }}
                        >
                          {row.status}
                        </Box>
                      </TableCell>
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
                          {user.role !== 2 && (
                            <Link to={`./edit/${row._id}`}>
                              <Button disableRipple>
                                <CreateIcon sx={{ color: "primary.main" }} />
                              </Button>
                            </Link>
                          )}
                          {user.role === 0 && (
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
                                setSelectProject(row._id);
                              }}
                            >
                              <DeleteIcon sx={{ color: "error.main" }} />
                            </Button>
                          )}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                  <ModalComponent
                    open={openDelete}
                    setOpen={setOpenDelete}
                    modelStyle={{ maxWidth: "400px" }}
                  >
                    <Box sx={{ textAlign: "center", fontSize: "20px" }}>
                      {"Are you sure delete this project?"}
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
                          onClick={() => deleteProject(selectProject)}
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
        {projectList.length > 0 && (
          <ThemePagination
            totalPage={totalPage}
            count={projectList.length}
          />
        )}
      </Box>
    </>
  );
}
