import React, { useState, useEffect } from "react";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import useApi from "../hooks/useApi";
import { APIS } from "../api/apiList.js";
import { useSearchData } from "../hooks/store/useSearchData.js";
import { useSnack } from "../hooks/store/useSnack";
import EmployeeListRaw from "../component/EmployeeListRaw.jsx";
import { useInviteMemberStore } from "../hooks/store/useInviteMemberStore.js";
import NoData from "../component/NoData.jsx";
import SectionHeader from "../component/SectionHeader.jsx";

export default function Employees() {
  const { apiCall } = useApi();
  const { setSnack } = useSnack();
  const [employeesList, setEmployeesList] = useState([]);
  const { searchData } = useSearchData();
  const { inviteMemberStore } = useInviteMemberStore();

  const fetchEmployees = async () => {
    try {
      const res = await apiCall({
        url: APIS.USER.EMPLOYEELIST,
        method: "get",
        params: { search: searchData },
      });
      if (res.data.success === true) {
        setEmployeesList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };
  useEffect(() => {
    fetchEmployees();
  }, []);
  // });
  useEffect(() => {
    if (inviteMemberStore)
      setEmployeesList([...[inviteMemberStore], ...employeesList]);
  }, [inviteMemberStore]);

  return (
    <>
      <Box component="main">
        <SectionHeader
          Title="Our Employees"
          BreadCrumbPreviousLink="/"
          BreadCrumbPreviousTitle="Dashboard"
          BreadCrumbCurrentTitle="Employees"
        />

        {/* <FormikProvider value={formik}> */}
        <Box>
          {employeesList.length === 0 ? (
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
                  className="userTable"
                  sx={{
                    minWidth: 650,
                    textTransform: "capitalize",
                    textWrap: "nowrap",
                    "& th,& td": { borderBottom: 0 },
                    "& tbody tr": {
                      borderTop: "1px solid rgba(224, 224, 224, 1)",
                    },
                  }}
                  aria-label="simple table"
                >
                  <TableHead>
                    <TableRow
                      sx={{
                        "&>th": { lineHeight: 1, fontWeight: 700 },
                      }}
                    >
                      <TableCell>employee</TableCell>
                      <TableCell sx={{ width: "250px" }}>Role</TableCell>
                      <TableCell>status</TableCell>
                      <TableCell sx={{ width: "140px" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {employeesList.map((row) => (
                      <EmployeeListRaw
                        row={row}
                        uniqId={row._id}
                        setEmployeesList={setEmployeesList}
                        employeesList={employeesList}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Box>
        {/* </FormikProvider> */}
      </Box>
    </>
  );
}
