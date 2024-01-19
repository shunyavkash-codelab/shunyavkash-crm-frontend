import { Pagination, Stack, TablePagination } from "@mui/material";
import React from "react";

function ThemePagination(props) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "space-between", xl: "center" }}
        sx={{ position: { xl: "relative" }, mt: 2.5 }}
      >
        <Pagination
          count={props.totalpage}
          page={props.page}
          onChange={props.onChange}
        />
        <TablePagination
          component="div"
          count={props.count}
          page={props.page}
          onPageChange={props.onChange}
          rowsPerPage={props.rowsPerPage}
          onRowsPerPageChange={props.onRowsPerPageChange}
          sx={{
            position: { xl: "absolute" },
            top: { xl: "50%" },
            transform: { xl: "translateY(-50%)" },
            right: { xl: 0 },
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
