import React, { useState } from "react";
import { Link } from "react-router-dom";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Tooltip,
} from "@mui/material";
import { useAuth } from "../hooks/store/useAuth";
import PlusIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/CheckOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import InvitationModal from "../component/InvitationModal";

export default function TeamMembers() {
  const { accessToken } = useAuth();
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const [modalOpen, setOpen] = useState(false);

  return (
    <>
      <SideBar
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        accessToken={accessToken}
      />
      <Header
        sideBarWidth={sideBarWidth}
        setSidebarWidth={setSidebarWidth}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
      <Box
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ height: "100vh", ml: { lg: sideBarWidth } }}
      >
        <Box
          sx={{
            flexGrow: 1,
            pt: 13,
            px: 2.5,
            pb: 2.5,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Box
            sx={{
              mb: 3.25,
              display: "flex",
              alignItems: { sm: "center" },
              justifyContent: { sm: "space-between" },
              flexDirection: { xs: "column", sm: "row" },
              columnGap: 2,
              rowGap: 2.5,
            }}
          >
            <Box>
              <Typography
                variant="h5"
                sx={{ mb: 0.75, textTransform: "capitalize" }}
              >
                Our Members
              </Typography>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Link to={"/"} style={{ textDecoration: "none" }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      textTransform: "capitalize",
                      color: "primary.main",
                      transition: "all 0.4s ease-in-out",
                      ":not(:hover)": {
                        opacity: 0.7,
                      },
                    }}
                  >
                    Dashboard /
                  </Typography>
                </Link>
                <Typography
                  variant="subtitle2"
                  sx={{ opacity: 0.4, textTransform: "capitalize" }}
                >
                  Members
                </Typography>
              </Box>
            </Box>
            <Button
              disableRipple
              onClick={() => setOpen(true)}
              startIcon={<PlusIcon sx={{ transform: "rotate(45deg)" }} />}
              sx={{
                maxHeight: "42px",
                position: "relative",
                px: 2.5,
                py: 1.5,
                bgcolor: "primary.main",
                border: "1px solid",
                borderColor: "primary.main",
                color: "white",
                lineHeight: 1,
                borderRadius: 2.5,
                overflow: "hidden",
                "&:before": {
                  content: "''",
                  height: 0,
                  width: "10rem",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  zIndex: "0",
                  bgcolor: "white",
                  transform: "rotate(-45deg) translate(-50%, -50%)",
                  transformOrigin: "0% 0%",
                  transition: "all 0.4s ease-in-out",
                },
                "&:hover": {
                  color: "primary.main",
                  bgcolor: "primary.main",
                  "&:before": { height: "10rem" },
                },
              }}
            >
              <span style={{ position: "relative" }}>New Member</span>
            </Button>
          </Box>
          <Box component="form">
            <TableContainer
              component={Paper}
              sx={{
                border: "1px solid rgba(224, 224, 224, 1)",
                borderRadius: 5,
                mx: { xs: "-10px", sm: 0 },
                width: { xs: "auto", sm: "auto" },
                borderRadius: 2.5,
              }}
            >
              <Table
                className="managerTable"
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
                    <TableCell>manager</TableCell>
                    <TableCell sx={{ width: "250px" }}>Role</TableCell>
                    <TableCell>invite</TableCell>
                    <TableCell sx={{ width: "140px" }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.75,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: "36px",
                            height: "36px",
                          }}
                          alt="avatar"
                          src=""
                        />
                        <Box>
                          <Typography
                            sx={{
                              mb: 0.75,
                              lineHeight: 1,
                              fontWeight: 600,
                              fontSize: { xs: "14px", sm: "16px" },
                            }}
                          >
                            Deep bhimani
                          </Typography>
                          <Typography
                            sx={{
                              lineHeight: 1,
                              textTransform: "lowercase",
                              fontSize: { xs: "12px", sm: "14px" },
                            }}
                          >
                            deep.bhimani@shunyavkash.com
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{
                          "&>label": { fontSize: "14px" },
                        }}
                      >
                        <InputLabel
                          sx={{ textTransform: "capitalize" }}
                          id="demo-simple-select-label"
                        >
                          Role
                        </InputLabel>
                        <Select
                          id="role"
                          label="Role"
                          sx={{ fontSize: "14px" }}
                        >
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"Super Admin"}
                          >
                            super admin
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"Manager"}
                          >
                            manager
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"Member"}
                          >
                            member
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      sx={{
                        "& .statusBtn": {
                          color: "white",
                          fontSize: "12px",
                          p: 0.5,
                          borderRadius: 1,
                          maxWidth: "fit-content",
                          lineHeight: 1,
                        },
                        "& .notAccepted": {
                          bgcolor: "secondary.main",
                        },
                        "& .accepted": {
                          bgcolor: "success.main",
                        },
                      }}
                    >
                      <Box className="statusBtn accepted">accepted</Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1.25, sm: 1.5 },
                          "& button": {
                            p: 0,
                            minWidth: "unset",
                            color: "black",
                            "&:hover": { color: "primary.main" },
                          },
                          "& svg": {
                            fontSize: { xs: "20px", sm: "22px" },
                          },
                        }}
                      >
                        <Tooltip title="Save" arrow>
                          <Button
                            disableRipple
                            disableElevation
                            sx={{
                              transition: "all 0.4s ease-in-out",
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                              "&:not(:hover)": { opacity: 0.2 },
                            }}
                          >
                            <SaveIcon disableRipple />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <Button
                            disableRipple
                            sx={{
                              transition: "all 0.4s ease-in-out",
                              "&:not(:hover)": { opacity: 0.2 },
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      "&>td": { fontSize: { xs: "12px", sm: "14px" } },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1.75,
                        }}
                      >
                        <Avatar
                          sx={{
                            width: "36px",
                            height: "36px",
                          }}
                          alt="avatar"
                          src=""
                        />
                        <Box>
                          <Typography
                            sx={{
                              mb: 0.75,
                              lineHeight: 1,
                              fontWeight: 600,
                              fontSize: { xs: "14px", sm: "16px" },
                            }}
                          >
                            sujit hirapara
                          </Typography>
                          <Typography
                            sx={{
                              lineHeight: 1,
                              textTransform: "lowercase",
                              fontSize: { xs: "12px", sm: "14px" },
                            }}
                          >
                            sujit.hirapara@shunyavkash.com
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <FormControl
                        fullWidth
                        size="small"
                        sx={{
                          "&>label": { fontSize: "14px" },
                        }}
                      >
                        <InputLabel
                          sx={{ textTransform: "capitalize" }}
                          id="demo-simple-select-label"
                        >
                          Role
                        </InputLabel>
                        <Select
                          id="role"
                          label="Role"
                          sx={{ fontSize: "14px" }}
                        >
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"Super Admin"}
                          >
                            super admin
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"Manager"}
                          >
                            manager
                          </MenuItem>
                          <MenuItem
                            sx={{
                              textTransform: "capitalize",
                              fontSize: "14px",
                            }}
                            value={"Member"}
                          >
                            member
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell
                      sx={{
                        "& .statusBtn": {
                          color: "white",
                          fontSize: "12px",
                          p: 0.5,
                          borderRadius: 1,
                          maxWidth: "fit-content",
                          lineHeight: 1,
                        },
                        "& .notAccepted": {
                          bgcolor: "secondary.main",
                        },
                        "& .accepted": {
                          bgcolor: "success.main",
                        },
                      }}
                    >
                      <Box className="statusBtn notAccepted">not accepted</Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: { xs: 1.25, sm: 1.5 },
                          "& button": {
                            p: 0,
                            minWidth: "unset",
                            color: "black",
                            "&:hover": { color: "primary.main" },
                          },
                          "& svg": {
                            fontSize: { xs: "20px", sm: "22px" },
                          },
                        }}
                      >
                        <Tooltip title="Save" arrow>
                          <Button
                            disableRipple
                            disableElevation
                            sx={{
                              transition: "all 0.4s ease-in-out",
                              "&:hover": {
                                bgcolor: "transparent",
                              },
                              "&:not(:hover)": { opacity: 0.2 },
                            }}
                          >
                            <SaveIcon disableRipple />
                          </Button>
                        </Tooltip>
                        <Tooltip title="Delete" arrow>
                          <Button
                            disableRipple
                            sx={{
                              transition: "all 0.4s ease-in-out",
                              "&:not(:hover)": { opacity: 0.2 },
                            }}
                          >
                            <DeleteIcon />
                          </Button>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <InvitationModal open={modalOpen} setOpen={setOpen} />
        </Box>
      </Box>
    </>
  );
}
