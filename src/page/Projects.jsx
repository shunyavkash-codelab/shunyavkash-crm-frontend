import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Box, Table, TableContainer, Paper } from "@mui/material";
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
import ModalComponent from "../component/ModalComponent";
import CustomTableHeader from "../component/table/CustomTableHeader";
import CustomTableBody from "../component/table/CustomTableBody";

export default function Project() {
  const [projectList, setProjectList] = useState([]);
  const { apiCall, isLoading } = useApi();
  const { setSnack } = useSnack();
  const { user, permission } = useAuth();
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

  const fetchProjects = useCallback(
    async (search) => {
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
    },
    [apiCall, limit, orderBy, page, setSnack, sortField]
  );

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

  const TABLE_HEADINGS = [
    {
      id: "name",
      label: "Project Name",
      sortable: true,
    },
    { id: "clientName", label: "Client", sortable: false },
    {
      id: "userName",
      label: "Manager",
      sortable: false,
    },
    {
      id: "startDate",
      label: "Start date",
      sortable: true,
    },
    {
      id: "endDate",
      label: "End date",
      sortable: false,
    },
    {
      id: "perHourCharge",
      label: "Currency/hour",
      sortable: false,
    },
    {
      id: "status",
      label: "Status",
      sortable: false,
    },
    {
      id: "actions",
      label: "Actions",
      sortable: false,
      textAlign: "center",
    },
  ];

  const TABLE_BODY = projectList.map((project) => ({
    key: project._id,
    row: [
      { type: "box", value: project.name },
      { type: "box", value: project.clientName },
      { type: "box", value: project.userName },
      { type: "date", value: project.startDate },
      { type: "date", value: project.endDate },
      {
        type: "box",
        value: project.currency + project.perHourCharge + "/hour",
      },
      {
        type: "box",
        value: project.status,
        textSX: {
          fontSize: "12px",
          p: 0.5,
          borderRadius: 1,
          maxWidth: "fit-content",
          lineHeight: 1,
          color: "white",
          bgcolor:
            project.status === "completed"
              ? "success.main"
              : project.status === "inReview"
              ? "review.main"
              : project.status === "inProgress"
              ? "secondary.main"
              : "grey.dark",
        },
      },
      {
        type: "edit",
        value: project.type,
        editIcon: permission.project.write,
        onEdit: () => navigate(`./edit/${project._id}`),
        onOpen: () => {
          navigate(`./view/${project._id}`);
          // setSelectedTransaction(project);
        },
        deleteIcon: user.role === 0,
        onDelete: () => {
          setOpenDelete(true);
          setSelectProject(project._id);
        },
      },
    ],
  }));

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Our Projects"
          BreadCrumbPreviousLink="/"
          BreadCrumbPreviousTitle="Dashboard"
          BreadCrumbCurrentTitle="projects"
          style={{ mb: 0 }}
          createButtonTitle={permission.project?.write && "Add Project"}
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
              </Table>
            </TableContainer>
          </>
        )}
        {/* pagination */}
        {projectList.length > 0 && (
          <ThemePagination totalPage={totalPage} count={projectList.length} />
        )}
      </Box>
    </>
  );
}
