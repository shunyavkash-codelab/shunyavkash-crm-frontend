import { Pagination, Stack, TablePagination } from "@mui/material";
import React from "react";

function ThemePagination(props) {
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "space-between", xl: "space-between" }}
        sx={{ position: { xl: "relative" }, mt: 2.5, px: 2.5 }}
      >
        {props.totalpage > 1 && (
          <Pagination count={props.totalpage} onChange={props.onChange} />
        )}

        <TablePagination
          component="div"
          rowsPerPage={props.rowsPerPage}
          onRowsPerPageChange={props.onRowsPerPageChange}
          sx={{
            // position: { xl: "absolute" },
            // top: { xl: "50%" },
            // transform: { xl: "translateY(-50%)" },
            // right: { xl: 0 },
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
