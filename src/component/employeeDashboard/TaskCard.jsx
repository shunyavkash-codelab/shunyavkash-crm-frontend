import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowIcon from "@mui/icons-material/ArrowForwardRounded";
import TaskDetail from "./TaskDetail";

const tasks = [
  "Web design",
  "web devlopment",
  "img compressor",
  "svg design",
  "create dynamic",
];
function TaskCard({ heading, showExtraDetail = false }) {
  return (
    <Grid item xs={12} xl={4}>
      <Box
        sx={{
          py: 2.5,
          px: 2,
          bgcolor: "white",
          boxShadow: "0 0 14px 0px rgb(42, 64, 98, 10%)",
          color: "text.primary",
          borderRadius: 2.5,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textTransform: "capitalize",
              lineHeight: 1.4,
              fontSize: { xs: "15px", sm: "18px" },
            }}
          >
            {heading}
          </Typography>
          <Button
            disableRipple
            sx={{
              bgcolor: "transparent!important",
              p: 0,
              lineHeight: 1,
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "#00ac8d",
              "&:hover svg": {
                transform: "translatex(2px)",
              },
            }}
          >
            See all
            <ArrowIcon
              sx={{
                fontSize: "20px",
                transition: "all 0.4s ease-in-out",
              }}
            />
          </Button>
        </Box>
        <Box>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow: "none",
              borderRadius: 0,
            }}
          >
            <Table
              sx={{
                textTransform: "capitalize",
                textWrap: "nowrap",
                "& th,& td": { borderBottom: 0 },
              }}
            >
              <TableHead>
                <TableRow
                  sx={{
                    bgcolor: "#ECECEC",
                    "& th": {
                      lineHeight: 1,
                      fontWeight: 600,
                      p: 1.25,
                      fontSize: "12px",
                    },
                  }}
                >
                  <TableCell colspan={2} sx={{ minWidth: "200px", pl: 1 }}>
                    Task Name
                  </TableCell>
                  <TableCell sx={{ width: "64px" }}>Priority</TableCell>
                  <TableCell
                    sx={{
                      width: "84px",
                      textAlign: "center",
                    }}
                  >
                    Due date
                  </TableCell>
                  {showExtraDetail && (
                    <>
                      <TableCell sx={{ width: "150px" }}>Assignee</TableCell>
                      <TableCell sx={{ width: "150px" }}>
                        Time Tracked
                      </TableCell>
                      <TableCell sx={{ width: "150px" }}>Actions</TableCell>
                    </>
                  )}
                </TableRow>
              </TableHead>
              <TableBody
                sx={{
                  "&>*:nth-child(even) span": {
                    bgcolor: "red",
                  },
                }}
              >
                {tasks.map((task, index) => (
                  <TaskDetail
                    task={task}
                    key={index}
                    showExtraDetail={showExtraDetail}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Grid>
  );
}

export default TaskCard;
