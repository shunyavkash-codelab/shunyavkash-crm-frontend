import { TableCell, TableRow } from "@mui/material";
import CustomFormikField from "./form/CustomFormikField";

export default function InvoiceTable({ formik, values, clientList, name }) {
  return (
    <TableRow
      sx={{
        "&>*": {
          "&:first-of-type": { fontWeight: "600" },
          "&:last-child": {
            px: 2,
          },
          "& > *": {
            maxWidth: "unset",
            "& input": {
              p: 1,
            },
            "& fieldset": {
              borderColor: "transparent",
            },
          },
        },
      }}
    >
      <TableCell
        sx={{
          "&>div>div": {
            p: 1,
          },
        }}
      >
        <CustomFormikField
          name={name + ".name"}
          multiline
          placeholder="Enter an items"
        />
      </TableCell>
      <TableCell>
        <CustomFormikField
          name={name + ".pricePerHours"}
          placeholder="00.00"
          inputProps={{ min: 1 }}
          type="number"
        />
      </TableCell>
      <TableCell>
        <CustomFormikField
          name={name + ".number"}
          placeholder="00"
          inputProps={{ min: 1 }}
          type="number"
        />
      </TableCell>
      <TableCell>${values.number * values.pricePerHours || 0}</TableCell>
    </TableRow>
  );
}
