import { TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import React from "react";

export default function CustomTableHeader({
  headings,
  sortField,
  orderBy,
  createSortHandler,
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
        {headings.map((heading) => (
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
        ))}
      </TableRow>
    </TableHead>
  );
}
