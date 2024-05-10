import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React from "react";

export default function CustomTableHeader({
  headings,
  sortField,
  orderBy,
  createSortHandler,
  numSelected,
  selectAllClick,
  setSelectAllClick,
  handleSelectAllChange,
  dataList,
}) {
  return (
    <TableHead>
      <TableRow
        sx={{
          "& th": {
            lineHeight: 1,
            fontWeight: 600,
            padding: "14px",
          },
        }}
      >
        {headings.map((heading) =>
          heading.id === "checkbox" ? (
            <TableCell padding="checkbox" key={heading.id}>
              <Checkbox
                color="primary"
                sx={{ color: "primary.main", width: "24px" }}
                indeterminate={
                  numSelected?.length > 0 &&
                  numSelected?.length < dataList.length
                }
                checked={numSelected?.length === dataList.length}
                onChange={() => {
                  setSelectAllClick(!selectAllClick);
                  handleSelectAllChange();
                }}
                inputProps={{
                  "aria-label": "select all desserts",
                }}
              />
            </TableCell>
          ) : (
            <TableCell
              key={heading.id}
              sx={{
                width: heading.width,
                display:
                  heading.condition || heading.condition === undefined
                    ? "table-cell"
                    : "none",
              }}
            >
              {heading.sortable ? (
                <TableSortLabel
                  active={sortField === heading.id}
                  direction={orderBy || "asc"}
                  onClick={() => createSortHandler(heading.id)}
                >
                  {heading.label}
                </TableSortLabel>
              ) : (
                heading.label
              )}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
}
