import { Pagination, Stack, TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

function ThemePagination(props) {
  const [params] = useSearchParams();
  const [page, setPage] = useState(+params.get("page") || 1);
  const navigate = useNavigate();
  const location = useLocation();
  const handlePageChange = (_, newPage) => {
    setPage(newPage);
    params.set("page", newPage);
    navigate({ pathname: location.pathname, search: params.toString() });
  };
  const [rowsPerPage, setRowsPerPage] = React.useState(
    +params.get("limit") || 10
  );

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    params.set("page", 1);

    params.set("limit", parseInt(event.target.value, 10));
    navigate({ pathname: location.pathname, search: params.toString() });
  };

  useEffect(() => {
    if (ROWS_PER_PAGE_OPTIONS.includes(rowsPerPage)) {
      return;
    }
    setRowsPerPage(10);
    params.set("limit", 10);
    navigate({ pathname: location.pathname, search: params.toString() });
  }, [rowsPerPage, params, location.pathname, navigate]);

  useEffect(() => {
    if (page <= props.totalPage) {
      return;
    }
    setPage(1);
    params.set("page", 1);
    navigate({ pathname: location.pathname, search: params.toString() });
  }, [location.pathname, navigate, page, params, props.totalPage]);
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "space-between", xl: "space-between" }}
        sx={{ position: { xl: "relative" }, mt: 2.5, px: 2.5 }}
      >
        {+props.totalPage > 1 && (
          <Pagination
            count={+props.totalPage || 0}
            page={+page}
            onChange={handlePageChange}
          />
        )}

        <TablePagination
          component="div"
          rowsPerPage={+rowsPerPage}
          rowsPerPageOptions={ROWS_PER_PAGE_OPTIONS}
          count={+props.count || 0}
          onRowsPerPageChange={handleChangeRowsPerPage}
          onPageChange={handlePageChange}
          page={props.count || props.count <= 0 ? 0 : page}
          sx={{
            marginLeft: "auto",
            "&>div": {
              p: 0,
              minHeight: "24px",
              "& .MuiTablePagination-selectLabel": {
                lineHeight: 1,
                fontWeight: 600,
              },
              "& .MuiTablePagination-input": {
                mr: 0,
                "&>div": {
                  p: "0 24px 0 0",
                  bgcolor: "transparent",
                },
              },
              "& .MuiTablePagination-displayedRows,& .MuiTablePagination-actions":
                {
                  display: "none",
                },
            },
          }}
        />
      </Stack>
    </>
  );
}

export default ThemePagination;
