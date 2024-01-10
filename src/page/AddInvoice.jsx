import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Divider,
  Tooltip,
  TableBody,
  Checkbox,
  FormControlLabel,
  FormHelperText,
  Stack,
} from "@mui/material";
import SideBar from "../component/SideBar";
import Header from "../component/Header";
import { useAuth } from "../hooks/store/useAuth";
import { useTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import { FieldArray, Form, Formik } from "formik";
import useApi from "../hooks/useApi";
import { useSnack } from "../hooks/store/useSnack";
import { APIS } from "../api/apiList";
import { useNavigate, useParams } from "react-router-dom";
import { useInvoiceStore } from "../hooks/store/useInvoiceStore";
import InvoiceTable from "../component/InvoiceTable";
import CustomFormikField from "../component/form/CustomFormikField";
import InvoiceInputForm from "../component/form/InvoiceInputForm";
import EditIcon from "@mui/icons-material/CreateOutlined";
import * as Yup from "yup";
import AddClientsModal from "../component/AddClientsModal";
import SignChangeIcon from "@mui/icons-material/CameraAlt";
import ReactFileReader from "react-file-reader";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

// find Due Date
const currentDate = new Date();
const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(currentDate.getDate() + 15);

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Invoices() {
  let [sideBarWidth, setSidebarWidth] = useState("240px");
  const [showSidebar, setShowSidebar] = useState(false);
  const { accessToken } = useAuth();
  const { setSnack } = useSnack();
  const { apiCall } = useApi();
  const navigate = useNavigate();
  const location = useLocation();
  const [clientList, setClientList] = useState([]);
  const [setCountryList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const theme = useTheme();
  const [personName, setPersonName] = React.useState([]);
  const [adminList, setAdminList] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [selectedClient, setSelectedClient] = useState();
  const { setInvoiceData, invoiceData } = useInvoiceStore();
  const { invoiceNumber } = useParams();
  const [projectDescription, setProjectDescription] = useState(false);
  const [bankDetails, setBankDetails] = useState(false);
  const [discountPer, setDiscountPer] = useState(0);
  const [discountRS, setDiscountRS] = useState(0);
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [showWatermark, setShowWatermark] = useState(true);
  const [showSign, setShowSign] = useState(true);

  // model open for admin
  const [fromOpen, setFromOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const [bankOpen, setBankOpen] = useState(false);
  const [invoiceNO, setInvoiceNO] = useState(invoiceNumber);

  const [invoiceDATE, setInvoiceDATE] = useState(
    currentDate.toISOString().split("T")[0]
  );
  const [invoiceDUEDATE, setInvoiceDUEDATE] = useState(
    fifteenDaysAgo.toISOString().split("T")[0]
  );
  let edit = location.pathname.includes("/edit/");
  // get single project detile by projectId
  const fetchProjectDetail = useCallback(async () => {
    try {
      if (!invoiceData?.projectId) {
        return;
      }
      const res = await apiCall({
        url: APIS.PROJECT.VIEW(invoiceData?.projectId),
        method: "get",
      });
      if (res.data.success === true) {
        setSnack(res.data.message);
        setSelectedProjectId(res.data.data._id);
        setProjectDescription(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  }, []);
  // });

  // set initial data for update

  useEffect(() => {
    if (invoiceData?.projectId) {
      fetchProjectDetail(invoiceData?.projectId);
    }
  }, [invoiceData?.projectId]);

  useEffect(() => {
    if (invoiceData?.tasks) {
      setPersonName(invoiceData.tasks.map((task) => task.taskName));
    }
  }, [invoiceData?.projectId]);
  useEffect(() => {
    if (invoiceData?.projectId) {
      fetchTask(invoiceData?.projectId);
    }
  }, [invoiceData?.projectId]);
  // end initail data for update invoice
  // validation
  const schema = Yup.object({
    invoiceNumber: Yup.string()
      .required("Invoice number is required")
      .test(
        "is-unique-invoiceNumber",
        "This invoice number is already taken",
        async function (value) {
          try {
            let result = await apiCall({
              url: APIS.INVOICE.CHECKINVOICENUMBER(value),
              method: "get",
            });

            if (result.data.success || edit) return true;
            else return false;
          } catch (error) {
            return false;
          }
        }
      ),
    to: Yup.string().required("Bill to is required"),
    select_Bank: Yup.string().required("Bank detail is required"),
    project: Yup.string().required("Project is required"),
    task: Yup.array()
      .min(1, "Minimum ${min} task required")
      .required("Task is required"),
  });
  useEffect(() => {
    if (invoiceData?.invoiceDate) {
      setInvoiceDATE(
        new Date(invoiceData?.invoiceDate)?.toISOString().split("T")[0]
      );
      setInvoiceDUEDATE(
        new Date(invoiceData?.invoiceDueDate)?.toISOString().split("T")[0]
      );
    }
  }, [invoiceData?.invoiceDate]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };

  // discount
  const handleDiscountPerChange = (subTotal, event) => {
    const percentage = parseFloat(event.target.value) || 0;
    setDiscountPer(percentage);
    setDiscountRS((percentage / 100) * subTotal);
  };

  const handleDiscountRSChange = (subTotal, event) => {
    const amount = parseFloat(event.target.value) || 0;
    setDiscountRS(amount);
    setDiscountPer((amount / subTotal) * 100); // Assuming you have 'subtotal' defined
  };

  const taskInitialValues = { name: "", pricePerHours: "", number: "1" };

  // get client list all client
  const fetchClient = async () => {
    try {
      const res = await apiCall({
        url: APIS.CLIENT.LIST,
        method: "get",
      });
      if (res.data.success === true) {
        setClientList(res.data.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  // get project list by clientId
  const fetchProject = async (clientId) => {
    try {
      const res = await apiCall({
        url: APIS.PROJECT.CLIENTWISEPROJECT(clientId),
        method: "get",
      });
      if (res.data.success === true) {
        setProjectList(res.data.data);
        setSelectedProjectId(res.data.data[0]._id);
        if (projectDescription) {
          setProjectDescription((prevProject) => {
            const project = res.data.data.find(
              (proj) => proj._id === prevProject._id
            );
            return project || {};
          });
        }
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  useEffect(() => {
    if (invoiceData?.clientId) {
      fetchProject(invoiceData?.clientId);
    }
  }, [invoiceData?.clientId]);

  // get country list
  const fetchCountry = async () => {
    try {
      const res = await apiCall({
        url: APIS.COUNTRY.GET,
        method: "get",
      });
      if (res.data.success === true) {
        setCountryList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  // get admin details
  const fetchAdmin = async () => {
    try {
      const res = await apiCall({
        url: APIS.ADMIN.GET,
        method: "get",
      });
      if (res.data.success === true) {
        setAdminList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  // get task details
  const fetchTask = async (id) => {
    try {
      const res = await apiCall({
        url: APIS.TASK.GET(id),
        method: "get",
      });
      if (res.data.success === true) {
        setTaskList(res.data.data);
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  // client Data
  const clientData = async (id) => {
    const clientAddress = clientList.find((client) => {
      return client._id === id;
    });
    setSelectedClient(clientAddress);
    await fetchProject(id);
  };

  // project Data
  const handleProjectChange = async (event) => {
    const projectId = event.target.value;
    setSelectedProjectId(projectId);
    const project = projectList.find((proj) => proj._id === projectId);
    setProjectDescription(project);
    await fetchTask(project._id);
    setPersonName([]);
  };

  // Bank Details
  const handleBankChange = async (event) => {
    const bankId = event.target.value;
    if (Array.isArray(adminList.bank)) {
      const bankD = adminList.bank.find((bank) => bank._id === bankId);
      if (bankD) {
        setBankDetails({
          bankId: bankId,
          bankName: bankD.bankName,
          IFSC: bankD.IFSC,
          holderName: bankD.holderName,
          accountNumber: bankD.accountNumber,
          label: bankD.label,
        });
      } else {
        setBankDetails(false);
      }
    } else {
      console.log("adminList.bank is not an array");
    }
  };

  const getSubTotal = (task) => {
    return task.reduce((accum, taskDetail) => {
      accum += taskDetail.pricePerHours * taskDetail.number;
      return accum;
    }, 0);
  };

  useEffect(() => {
    fetchClient();
    fetchCountry();
    fetchAdmin();
  }, []);
  // });

  // add task
  const addTask = async (task) => {
    const randomFiveDigitNumber = Math.floor(10000 + Math.random() * 90000);
    let taskPriority = ["Urgent", "High", "Normal", "Low"];
    const randomPriority =
      taskPriority[Math.floor(Math.random() * taskPriority.length)];

    let obj = {
      projectId: task.projectId,
      taskNo: randomFiveDigitNumber.toString(),
      taskName: task.name,
      hours: task.number,
      taskPriority: randomPriority,
      perHourCharge: task.pricePerHours,
    };

    // return task;
    try {
      const res = await apiCall({
        url: APIS.TASK.ADD,
        method: "post",
        data: JSON.stringify(obj, null, 2),
      });
      if (res.data.success === true) {
        setTaskList(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const compairTask = async (task) => {
    const isIdMatch = taskList.some((item) => item._id === task._id);
    if (isIdMatch) {
      // Id match
      let taskName = taskList.some(
        (taskName) => taskName.taskName === task.name
      );
      let pricePerHours = taskList.some(
        (pricePerHours) => pricePerHours.perHourCharge === task.pricePerHours
      );
      let hours = taskList.some((hours) => hours.hours === task.number);
      if (taskName && pricePerHours && hours) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  // update task
  const updateTask = async (task) => {
    let obj = {
      taskName: task.name,
      hours: task.number,
      perHourCharge: task.pricePerHours,
    };
    try {
      const res = await apiCall({
        url: APIS.TASK.EDIT(task._id),
        method: "patch",
        data: JSON.stringify(obj, null, 2),
      });
      if (res.data.success === true) {
        setTaskList(res.data.data);
        return res.data.data;
      }
    } catch (error) {
      console.log(error, setSnack);
    }
  };

  const { id } = useParams();
  const [url, setUrl] = useState();
  const handleFiles = async (files) => {
    console.log(files, "---------------95");
    setUrl(files.base64);
    let formData = new FormData();
    // values.profile_img = url?.fileList[0];

    formData.append("profile_img", files.fileList[0]);

    try {
      const res = await apiCall({
        url: APIS.MANAGER.EDIT(id),
        method: "patch",
        headers: "multipart/form-data",
        data: formData,
      });
      if (res.status === 200) {
        setSnack(res.data.message);
        // setUrl(files.base64);
      }
    } catch (error) {
      let errorMessage = error.response.data.message;
      setSnack(errorMessage, "warning");
    }
  };

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
      {/* niche no code mukvathi page text sav upper chhapay jay chhe */}
      {/* {selectedProjectId || "not selected"} */}
      {selectedProjectId}

      <Box
        component={Formik}
        validationSchema={schema}
        enableReinitialize={true}
        initialValues={{
          email: adminList.email,
          address: adminList.address,
          address2: adminList.address2,
          landmark: adminList.landmark,
          pincode: adminList.pincode,
          mobileCode: adminList.mobileCode,
          mobileNumber: adminList.mobileNumber,
          invoiceNumber: invoiceNO,
          task: taskList
            .filter((task) => personName.includes(task.taskName))
            .map((task) => ({
              _id: task._id,
              name: task.taskName,
              number: task.hours || "00.00",
              pricePerHours: task.perHourCharge || "00.00",
              amount: task.hours * task.perHourCharge,
            })),
          clientAddress: selectedClient?.address || "",
          total: "10",
          projectDescription: projectDescription?.description || "",
          customBankName: "",
          customIFSC: "",
          customHolderName: "",
          customAccountNumber: "",
          // to: Formik.values,
          project: "",
          salesTax: invoiceData?.totals?.discountPer || 0,
          invoiceDate: invoiceDATE,
          invoiceDueDate: invoiceDUEDATE,
        }}
        onSubmit={async (values) => {
          for (let i = 0; i < values.task.length; i++) {
            let compairtask = await compairTask(values.task[i]);
            if (!compairtask) {
              if (!values.task[i]._id) {
                console.log("insert call");
                //   // API call
                values.task[i].amount =
                  values.task[i].number * values.task[i].pricePerHours;
                values.task[i].projectId = projectDescription._id;
                values.task[i].taskName = values.task[i].name;

                let addtask = await addTask(values.task[i]);
                values.task[i]._id = addtask._id;
              } else {
                // update
                let updatetask = await updateTask(values.task[i]);
              }
            }
          }

          try {
            let tasks = values.task.map((tas) => {
              return {
                taskName: tas.name,
                price_hours: tas.pricePerHours,
                hours: tas.number,
                amount: tas.amount || tas.pricePerHours * tas.number,
              };
            });
            let taskId = values.task.filter((id) => id._id).map((id) => id._id);
            let obj = {
              from: {
                address: values.address,
                address2: values.address2,
                landmark: values.landmark,
                pincode: values.pincode,
                email: values.email,
                mobileCode: values.mobileCode,
                mobileNumber: values.mobileNumber,
              },
              userId: adminList._id,
              clientId: selectedClient?._id || invoiceData?.clientId,
              to: {
                name: selectedClient?.name || invoiceData?.clientName,
                address: values.clientAddress || invoiceData?.to?.address,
              },
              invoiceNumber: values.invoiceNumber,
              invoiceDate: values.invoiceDate,
              invoiceDueDate: values.invoiceDueDate,
              projectId: projectDescription._id,
              project: {
                name: projectDescription?.name,
                description: values.projectDescription,
              },
              taskIds: taskId,
              tasks: tasks,
              totals: {
                subTotal: `${getSubTotal(values.task)}`,
                discountRS: parseFloat(discountRS).toFixed(2),
                discountPer: parseFloat(discountPer).toFixed(2),
                salesTax: parseFloat(values.salesTax).toFixed(2),
                total: `${(
                  parseFloat(values.salesTax) +
                  parseFloat(getSubTotal(values.task)) -
                  parseFloat(discountRS)
                ).toFixed(2)}`,
                amountPaid: "",
                balanceDue: "",
              },
              bankId: bankDetails.bankId,
              bank: {
                bankName: bankDetails.bankName || values.customBankName,
                IFSC: bankDetails.IFSC || values.customIFSC,
                holderName: bankDetails.holderName || values.customHolderName,
                accountNumber: bankDetails.label || values.customeAccountNumber,
              },
              note: values.note,
            };
            setInvoiceData(obj);
            navigate(`/invoices/edit/${invoiceNO}/preview`);
          } catch (error) {
            let errorMessage = error.response.data.message;
            setSnack(errorMessage, "warning");
          }
        }}
      >
        {({ values, ...formik }) => {
          setInvoiceNO(values.invoiceNumber);
          setInvoiceDATE(values.invoiceDate);
          setInvoiceDUEDATE(values.invoiceDueDate);
          return (
            <>
              <Box sx={{ ml: { lg: sideBarWidth } }}>
                <Box component="main">
                  <Box sx={{ mb: 3.25, textAlign: "center" }}>
                    <Typography
                      variant="h5"
                      sx={{ textTransform: "capitalize" }}
                    >
                      Add Invoice
                    </Typography>
                  </Box>
                  <Form style={{ position: "relative" }}>
                    <Box
                      className="watermark"
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%) rotate(-45deg)",
                        width: "700px",
                        opacity: 0.06,
                        zIndex: 1,
                        display: showWatermark ? "inline-flex" : "none",
                      }}
                    >
                      <img
                        src="/images/logo.svg"
                        style={{ height: "auto", width: "100%", flexShrink: 0 }}
                        alt=""
                      />
                    </Box>
                    <Box
                      sx={{
                        bgcolor: "white",
                        borderRadius: 2.5,
                        p: 6.75,
                        "&:not(:hover) .editIcon": {
                          opacity: "0",
                          pointerEvents: "none",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: 2,
                        }}
                      >
                        <Box sx={{ flexGrow: 1, maxWidth: "390px" }}>
                          <Typography
                            variant="h4"
                            sx={{
                              textTransform: "capitalize",
                            }}
                          >
                            Shunyavkash PVT. LTD
                          </Typography>
                          <Box
                            sx={{
                              mt: 1,
                              position: "relative",
                            }}
                          >
                            <Typography
                              variant="subtitle3"
                              sx={{
                                lineHeight: 1.6,
                                display: "block",
                                fontSize: "16px",
                              }}
                            >
                              {adminList.address} {adminList.address2}
                              {adminList.landmark} {adminList.pincode}
                            </Typography>
                            <Box
                              sx={{
                                mt: 3.5,
                              }}
                            >
                              <Typography
                                variant="subtitle3"
                                sx={{
                                  display: "block",
                                  fontSize: "16px",
                                }}
                              >
                                {adminList.mobileCode} {adminList.mobileNumber}
                              </Typography>
                              <Typography
                                variant="subtitle3"
                                sx={{
                                  mt: 0.75,
                                  display: "block",
                                  fontSize: "16px",
                                }}
                              >
                                {adminList.email}
                              </Typography>
                            </Box>
                            <Box
                              className="editIcon"
                              sx={{
                                display: "inline-flex",
                                position: "absolute",
                                left: "-30px",
                                bottom: 0,
                                opacity: 0.4,
                                "& > *": {
                                  color: "text.primary",
                                },
                              }}
                            >
                              <Tooltip title="Edit" arrow>
                                <Link
                                  href="#"
                                  onClick={() => setFromOpen(true)}
                                  style={{
                                    display: "inline-flex",
                                  }}
                                >
                                  <EditIcon />
                                </Link>
                              </Tooltip>
                            </Box>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            maxHeight: "140px",
                            maxWidth: "300px",
                            minWidth: "80px",
                            flexShrink: 0,
                          }}
                        >
                          <img
                            src="/images/logo.svg"
                            style={{
                              maxHeight: "inherit",
                              width: "100%",
                              display: "block",
                            }}
                            alt=""
                          />
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          my: 6,
                        }}
                      >
                        <Divider
                          sx={{
                            border: "1px solid rgba(0,0,0,0.1)",
                            flexGrow: 1,
                          }}
                        />
                        <Typography
                          variant="h3"
                          sx={{
                            flexShrink: 0,
                            letterSpacing: "4px",
                            textTransform: "uppercase",
                          }}
                        >
                          Invoice
                        </Typography>
                        <Divider
                          sx={{
                            border: "1px solid rgba(0,0,0,0.1)",
                            flexGrow: 1,
                          }}
                        />
                      </Box>
                      <Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            gap: 2,
                          }}
                        >
                          <Box
                            sx={{
                              flexGrow: 1,
                              maxWidth: "390px",
                              position: "relative",
                            }}
                          >
                            <Typography
                              className="bg-style"
                              variant="subtitle3"
                              sx={{
                                display: "block",
                                fontWeight: 600,
                                fontSize: "16px",
                                textTransform: "capitalize",
                              }}
                            >
                              Bill to
                            </Typography>
                            <FormControl
                              fullWidth
                              size="small"
                              sx={{
                                maxWidth: "300px",
                                mt: 2,
                                display: "flex",
                                textTransform: "capitalize",
                                "&>label": { fontSize: "14px" },
                              }}
                            >
                              <InputLabel
                                sx={{
                                  textTransform: "capitalize",
                                }}
                                id="demo-simple-select-label"
                              >
                                To
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="to"
                                label="To"
                                onChange={(e) => clientData(e.target.value)}
                                sx={{ fontSize: "14px" }}
                                defaultValue={invoiceData?.clientId}
                              >
                                {clientList.map((clientName) => (
                                  <MenuItem
                                    key={clientName.name}
                                    sx={{ textTransform: "capitalize" }}
                                    value={clientName._id}
                                  >
                                    {clientName.name}
                                  </MenuItem>
                                ))}
                                <MenuItem
                                  value={"Add Client"}
                                  onClick={handleOpen}
                                >
                                  <Box sx={{ display: "flex" }}>
                                    <Button
                                      disableRipple
                                      sx={{
                                        maxHeight: "36px",
                                        position: "relative",
                                        px: 2.5,
                                        py: 1.5,
                                        bgcolor: "text.primary",
                                        border: "1px solid",
                                        borderColor: "text.primary",
                                        color: "white",
                                        lineHeight: 1,
                                        borderRadius: 2.5,
                                        overflow: "hidden",
                                        display: "flex",
                                        justifyContent: "center",
                                        "&:before": {
                                          content: "''",
                                          height: 0,
                                          width: "10rem",
                                          position: "absolute",
                                          top: "50%",
                                          left: "50%",
                                          zIndex: "0",
                                          bgcolor: "white",
                                          transform:
                                            "rotate(-45deg) translate(-50%, -50%)",
                                          transformOrigin: "0% 0%",
                                          transition: "all 0.4s ease-in-out",
                                        },
                                        "&:hover": {
                                          color: "text.primary",
                                          bgcolor: "text.primary",
                                          "&:before": { height: "10rem" },
                                        },
                                      }}
                                    >
                                      <span style={{ position: "relative" }}>
                                        Add Client
                                      </span>
                                    </Button>
                                  </Box>
                                </MenuItem>
                                <AddClientsModal
                                  open={open}
                                  setOpen={setOpen}
                                />
                              </Select>
                              {Boolean(formik.errors.to) && (
                                <FormHelperText error={true}>
                                  {formik.errors.to}
                                </FormHelperText>
                              )}
                            </FormControl>
                            {(selectedClient?.address ||
                              invoiceData?.to?.address) && (
                              <>
                                <Typography
                                  variant="subtitle3"
                                  sx={{
                                    mt: 1.75,
                                    lineHeight: 1.6,
                                    display: "block",
                                    fontSize: "16px",
                                  }}
                                >
                                  {selectedClient?.address ||
                                    invoiceData?.to?.address}
                                </Typography>
                                <Box
                                  className="editIcon"
                                  sx={{
                                    display: "inline-flex",
                                    position: "absolute",
                                    left: "-30px",
                                    bottom: 0,
                                    opacity: 0.4,
                                    "& > *": {
                                      color: "text.primary",
                                    },
                                  }}
                                >
                                  <Tooltip title="Edit" arrow>
                                    <Link
                                      href="#"
                                      onClick={() => setClientOpen(true)}
                                      style={{
                                        display: "inline-flex",
                                      }}
                                    >
                                      <EditIcon />
                                    </Link>
                                  </Tooltip>
                                </Box>
                              </>
                            )}
                          </Box>
                          <Box
                            sx={{
                              flexGrow: 1,
                              maxWidth: "300px",
                              "&>*:not(:first-of-type)": {
                                mt: 1.75,
                              },
                            }}
                          >
                            <Box
                              sx={{
                                "& input": {
                                  textTransform: "uppercase",
                                },
                              }}
                            >
                              <CustomFormikField
                                name={"invoiceNumber"}
                                label="invoice No."
                                disabled={edit ? true : false}
                              />
                            </Box>
                            <CustomFormikField
                              name={"invoiceDate"}
                              label="Invoice Date"
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                              defaultValue={"10/10/2023"}
                            />
                            <CustomFormikField
                              name={"invoiceDueDate"}
                              label="Invoice Due"
                              type="date"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          </Box>
                        </Box>
                        {/* {(selectedClient || invoiceData?.clientId) && (
                          <Box
                            sx={{
                              mt: 6,
                              maxWidth: "390px",
                              position: "relative",
                            }}
                          >
                            <Typography
                              className="bg-style"
                              variant="subtitle3"
                              sx={{
                                display: "block",
                                fontWeight: 600,
                                fontSize: "16px",
                                textTransform: "capitalize",
                              }}
                            >
                              project
                            </Typography>
                            <FormControl
                              fullWidth
                              size="small"
                              sx={{
                                maxWidth: "300px",
                                mt: 2,
                                display: "flex",
                                "&>label": { fontSize: "14px" },
                              }}
                            >
                              <InputLabel
                                sx={{
                                  textTransform: "capitalize",
                                }}
                                id="demo-simple-select-label"
                              >
                                Project
                              </InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="project"
                                label="Project"
                                sx={{ fontSize: "14px" }}
                                onChange={handleProjectChange}
                                value={selectedProjectId}
                              >
                                {projectList.map((projectName) => (
                                  <MenuItem
                                    key={projectName.name}
                                    sx={{ textTransform: "capitalize" }}
                                    value={projectName._id}
                                  >
                                    {projectName.name}
                                  </MenuItem>
                                ))}
                              </Select>
                              {Boolean(formik.errors.project) && (
                                <FormHelperText error={true}>
                                  {formik.errors.project}
                                </FormHelperText>
                              )}
                            </FormControl>
                            {projectDescription?.description && (
                              <>
                                <Typography
                                  variant="subtitle3"
                                  sx={{
                                    mt: 1.75,
                                    lineHeight: 1.6,
                                    display: "block",
                                    fontSize: "16px",
                                  }}
                                >
                                  {projectDescription?.description}
                                </Typography>
                                <Box
                                  className="editIcon"
                                  sx={{
                                    display: "inline-flex",
                                    position: "absolute",
                                    left: "-30px",
                                    bottom: 0,
                                    opacity: 0.4,
                                    "& > *": {
                                      color: "text.primary",
                                    },
                                  }}
                                >
                                  <Tooltip title="Edit" arrow>
                                    <Link
                                      href="#"
                                      onClick={() => setProjectOpen(true)}
                                      style={{
                                        display: "inline-flex",
                                      }}
                                    >
                                      <EditIcon />
                                    </Link>
                                  </Tooltip>
                                </Box>
                              </>
                            )}
                          </Box>
                        )} */}
                        <Box sx={{ mt: 7, mb: 3.5 }}>
                          {/* {selectedProjectId && (
                            <FormControl
                              fullWidth
                              size="small"
                              sx={{
                                mb: 2,
                                maxWidth: "480px",
                                display: "flex",
                                "&>label": { fontSize: "12px" },
                              }}
                            >
                              <InputLabel
                                sx={{ textTransform: "capitalize" }}
                                id="demo-simple-select-label"
                              >
                                Select Tasks
                              </InputLabel>
                              <Select
                                multiple
                                labelId="demo-simple-select-label"
                                id="select_tasks"
                                label="Select Tasks"
                                // defaultValue={invoiceData?.taskIds}
                                sx={{
                                  fontSize: "12px",
                                  position: "relative",
                                  "&>div": {
                                    "&>div": {
                                      position: "absolute",
                                      top: "50%",
                                      left: "14px",
                                      right: "32px",
                                      transform: "translateY(-50%)",
                                      flexWrap: "nowrap",
                                      overflowX: "auto",
                                      "&::-webkit-scrollbar": {
                                        display: "none",
                                      },
                                      "&>*": {
                                        height: "auto",
                                        "&>span": {
                                          py: 0.25,
                                          px: 1,
                                          fontSize: "12px",
                                        },
                                      },
                                    },
                                  },
                                }}
                                value={personName}
                                onChange={handleChange}
                                renderValue={(selected) => (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexWrap: "wrap",
                                      gap: 0.5,
                                    }}
                                  >
                                    {selected.map((value) => (
                                      <Chip key={value} label={value} />
                                    ))}
                                  </Box>
                                )}
                                MenuProps={MenuProps}
                              >
                                {taskList.map((taskName) => (
                                  <MenuItem
                                    key={taskName}
                                    value={taskName.taskName}
                                    style={getStyles(
                                      taskName.taskName,
                                      personName,
                                      theme
                                    )}
                                  >
                                    {taskName.taskName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          )} */}
                          <TableContainer
                            component={Paper}
                            sx={{
                              boxShadow: "none",
                            }}
                          >
                            <Table
                              className="projectTable"
                              sx={{
                                borderBottom:
                                  "1px solid rgba(128, 128, 128, 0.1)",
                                minWidth: 650,
                                textTransform: "capitalize",
                                textWrap: "nowrap",
                                "& th,& td": {
                                  fontSize: "16px",
                                  border: 0,
                                },
                              }}
                            >
                              <TableHead>
                                <TableRow
                                  sx={{
                                    "& th": {
                                      lineHeight: 1,
                                      fontWeight: 600,
                                      p: 0,
                                      "& span": {
                                        bgcolor: "text.primary",
                                        fontWeight: "700",
                                        display: "block",
                                        color: "white",
                                        p: 2,
                                      },
                                      "&:first-of-type span": {
                                        borderRadius: "10px 0 0 10px",
                                      },
                                      "&:last-child span": {
                                        borderRadius: "0 10px 10px 0",
                                      },
                                    },
                                  }}
                                >
                                  <TableCell>
                                    <span>description</span>
                                  </TableCell>
                                  <TableCell sx={{ width: "130px" }}>
                                    <span>price/hours</span>
                                  </TableCell>
                                  <TableCell sx={{ width: "90px" }}>
                                    <span>hours</span>
                                  </TableCell>
                                  <TableCell sx={{ width: "108px" }}>
                                    <span>Amount</span>
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              {/* component render   */}
                              {/* {Array.from({ length: taskCount }, (_, i) => ( */}
                              <FieldArray
                                name="task"
                                error={Boolean(formik.errors.task)}
                                helperText={formik.errors.task}
                              >
                                {({ insert, remove, push }) => (
                                  <>
                                    <TableBody
                                      sx={{
                                        "&>*": {
                                          borderBottom:
                                            "1px solid rgba(128, 128, 128, 0.1)",
                                          "& td": {
                                            p: 1,
                                          },
                                        },
                                      }}
                                    >
                                      {values.task.map((taskDetail, i) => (
                                        <InvoiceTable
                                          values={values.task[i]}
                                          name={`task.${i}`}
                                          key={i}
                                          taskDetail={taskDetail}
                                        />
                                      ))}
                                    </TableBody>
                                    <Box sx={{ m: 1 }}>
                                      <Button
                                        disableRipple
                                        sx={{
                                          maxHeight: "36px",
                                          position: "relative",
                                          px: 2.5,
                                          py: 1.5,
                                          bgcolor: "text.primary",
                                          border: "1px solid",
                                          borderColor: "text.primary",
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
                                            transform:
                                              "rotate(-45deg) translate(-50%, -50%)",
                                            transformOrigin: "0% 0%",
                                            transition: "all 0.4s ease-in-out",
                                          },
                                          "&:hover": {
                                            color: "text.primary",
                                            bgcolor: "text.primary",
                                            "&:before": { height: "10rem" },
                                          },
                                        }}
                                        onClick={() => {
                                          push(taskInitialValues);
                                        }}
                                      >
                                        <span style={{ position: "relative" }}>
                                          Add Task
                                        </span>
                                      </Button>
                                    </Box>
                                  </>
                                )}
                              </FieldArray>
                              {Boolean(formik.errors.task) && (
                                <FormHelperText error={true}>
                                  {formik.errors.task}
                                </FormHelperText>
                              )}
                            </Table>
                          </TableContainer>
                        </Box>
                        <Box
                          sx={{
                            ml: "auto",
                            maxWidth: "fit-content",
                            "&>*": {
                              "&:not(:first-of-type)": { mt: 1.75 },
                              px: 1.75,
                              display: "flex",
                              justifyContent: "space-between",
                              gap: 9.75,
                              "&>*": {
                                lineHeight: "1!important",
                                "&:first-of-type": {
                                  textTransform: "capitalize",
                                  width: "140px",
                                },
                                "&:last-child": {
                                  width: "78px",
                                },
                              },
                            },
                          }}
                        >
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 700, fontSize: "16px" }}
                            >
                              subtotal
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 700, fontSize: "16px" }}
                            >
                              ${getSubTotal(values.task)}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              alignItems: "center",
                              "& > *:last-child": {
                                maxWidth: "85px",
                              },
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                textWrap: "nowrap",
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              Discount (%)
                              <Box
                                sx={{
                                  "& > *:last-child": {
                                    width: "66px",
                                  },
                                }}
                              >
                                <CustomFormikField
                                  name={"discountPer"}
                                  value={
                                    discountPer ||
                                    invoiceData?.totals?.discountPer
                                  }
                                  placeholder="0%"
                                  onChange={handleDiscountPerChange.bind(
                                    null,
                                    getSubTotal(values.task)
                                  )}
                                />
                              </Box>
                            </Typography>
                            <CustomFormikField
                              name={"discountRS"}
                              value={
                                discountRS || invoiceData?.totals?.discountRS
                              }
                              onChange={handleDiscountRSChange.bind(
                                null,
                                getSubTotal(values.task)
                              )}
                              placeholder="00.00"
                            />
                          </Box>
                          <Box
                            sx={{
                              alignItems: "center",
                              "& > *:last-child": {
                                maxWidth: "85px",
                              },
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{
                                textWrap: "nowrap",
                                fontSize: "16px",
                                fontWeight: 600,
                              }}
                            >
                              tax
                            </Typography>
                            <CustomFormikField
                              name={"salesTax"}
                              placeholder="00.00"
                            />
                          </Box>
                          <Box
                            sx={{
                              py: 1.75,
                              bgcolor: "text.primary",
                              borderRadius: 2.5,
                              color: "white",
                            }}
                          >
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 700, fontSize: "16px" }}
                            >
                              total
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: 700, fontSize: "16px" }}
                            >
                              $
                              {+values.salesTax +
                                getSubTotal(values.task) -
                                discountRS}
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "end",
                            gap: 2,
                          }}
                        >
                          <Box sx={{ minWidth: "300px", maxWidth: "450px" }}>
                            <Box>
                              <Typography
                                variant="h6"
                                className="bg-style"
                                sx={{
                                  fontSize: "20px",
                                  mb: 2,
                                  display: "inline-block",
                                }}
                              >
                                Bank Details
                              </Typography>
                              <Box
                                sx={{
                                  "&>*:not(:first-of-type)": {
                                    mt: 1.75,
                                  },
                                }}
                              >
                                <FormControl
                                  fullWidth
                                  size="small"
                                  sx={{
                                    maxWidth: "300px",
                                    display: "flex",
                                    "&>label": { fontSize: "14px" },
                                    "&>div": { textAlign: "left" },
                                  }}
                                >
                                  <InputLabel
                                    sx={{ textTransform: "capitalize" }}
                                    id="demo-simple-select-label"
                                  >
                                    Select Bank
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="select_Bank"
                                    label="Select Bank"
                                    sx={{ fontSize: "14px" }}
                                    defaultValue={invoiceData?.bankId}
                                    onChange={handleBankChange}
                                  >
                                    {adminList.bank &&
                                      adminList.bank.map((bank) => (
                                        <MenuItem
                                          sx={{ textTransform: "capitalize" }}
                                          value={bank._id}
                                          onClick={() =>
                                            bankOpen && setBankOpen(false)
                                          }
                                        >
                                          {bank.bankName}
                                        </MenuItem>
                                      ))}

                                    <MenuItem
                                      value={"Custom Add"}
                                      onClick={() => setBankOpen(true)}
                                    >
                                      <Box sx={{ display: "flex" }}>
                                        <Button
                                          disableRipple
                                          sx={{
                                            maxHeight: "36px",
                                            position: "relative",
                                            px: 2.5,
                                            py: 1,
                                            bgcolor: "text.primary",
                                            border: "1px solid",
                                            borderColor: "text.primary",
                                            color: "white",
                                            lineHeight: 1,
                                            borderRadius: 2.5,
                                            overflow: "hidden",
                                            display: "flex",
                                            justifyContent: "center",
                                            "&:before": {
                                              content: "''",
                                              height: 0,
                                              width: "10rem",
                                              position: "absolute",
                                              top: "50%",
                                              left: "50%",
                                              zIndex: "0",
                                              bgcolor: "white",
                                              transform:
                                                "rotate(-45deg) translate(-50%, -50%)",
                                              transformOrigin: "0% 0%",
                                              transition:
                                                "all 0.4s ease-in-out",
                                            },
                                            "&:hover": {
                                              color: "text.primary",
                                              bgcolor: "text.primary",
                                              "&:before": { height: "10rem" },
                                            },
                                          }}
                                        >
                                          <span
                                            style={{ position: "relative" }}
                                          >
                                            Add Client
                                          </span>
                                        </Button>
                                      </Box>
                                    </MenuItem>
                                  </Select>
                                  {Boolean(formik.errors.select_Bank) && (
                                    <FormHelperText error={true}>
                                      {formik.errors.select_Bank}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                                {bankOpen && (
                                  <>
                                    <CustomFormikField
                                      name="customBankName"
                                      label="Bank Name"
                                      style={{
                                        "& input": {
                                          textTransform: "capitalize",
                                        },
                                      }}
                                    />
                                    <CustomFormikField
                                      name="customIFSC"
                                      label="IFSC"
                                      style={{
                                        "& input": {
                                          textTransform: "uppercase",
                                        },
                                      }}
                                    />
                                    <CustomFormikField
                                      name="customHolderName"
                                      label="A/c Holder Name"
                                      style={{
                                        "& input": {
                                          textTransform: "capitalize",
                                        },
                                      }}
                                    />
                                    <CustomFormikField
                                      name="customeAccountNumber"
                                      label="A/c Number"
                                    />
                                  </>
                                )}
                                {!bankOpen && bankDetails && (
                                  <>
                                    <Box
                                      sx={{
                                        mt: 3.5,
                                        "&>*": {
                                          display: "flex",
                                          gap: 1.25,
                                          "&:not(:first-of-type)": { mt: 1.75 },
                                          "&>*": {
                                            fontSize: "16px!important",
                                            lineHeight: "1!important",
                                            textTransform: "capitalize",
                                            "&:first-of-type": {
                                              width: "110px",
                                              display: "flex",
                                              justifyContent: "space-between",
                                              fontWeight: 600,
                                            },
                                          },
                                        },
                                      }}
                                    >
                                      <Box>
                                        <Typography variant="subtitle2">
                                          Bank Name<span>:</span>
                                        </Typography>
                                        <Typography variant="subtitle2">
                                          {bankDetails.bankName ||
                                            invoiceData?.bank?.bankName}
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="subtitle2">
                                          IFSC Code<span>:</span>
                                        </Typography>
                                        <Typography variant="subtitle2">
                                          {bankDetails.IFSC ||
                                            invoiceData?.bank?.IFSC}
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="subtitle2">
                                          A/c Name<span>:</span>
                                        </Typography>
                                        <Typography variant="subtitle2">
                                          {bankDetails.holderName ||
                                            invoiceData?.bank?.holderName}
                                        </Typography>
                                      </Box>
                                      <Box>
                                        <Typography variant="subtitle2">
                                          A/c No.<span>:</span>
                                        </Typography>
                                        <Typography variant="subtitle2">
                                          {bankDetails.label ||
                                            invoiceData?.bank?.accountNumber}
                                        </Typography>
                                      </Box>
                                    </Box>
                                  </>
                                )}
                              </Box>
                            </Box>
                            <Box sx={{ mt: 6 }}>
                              <Typography
                                variant="h6"
                                sx={{
                                  fontSize: "20px",
                                  mb: 2,
                                  display: "block",
                                }}
                              >
                                Notes
                              </Typography>
                              <CustomFormikField
                                name="note"
                                label="Descrption"
                                multiline
                                rows={3}
                              />
                            </Box>
                          </Box>
                          {/* ToDo = Error is coming when change sign image */}
                          <Box
                            sx={{
                              display: showSign ? "inline-flex" : "none",
                              mt: 8.5,
                              mr: 6,
                              maxHeight: "80px",
                              maxWidth: "200px",
                              flexShrink: 0,
                              position: "relative",
                            }}
                          >
                            <img
                              src={url ? url : "/images/sign.svg"}
                              style={{
                                maxHeight: "inherit",
                                width: "100%",
                                display: "block",
                              }}
                              alt="Sign"
                            />
                            <Tooltip title="Please add 136x78 size image" arrow>
                              <Button
                                disableRipple
                                sx={{
                                  position: "absolute",
                                  bottom: "-35px",
                                  right: 0,
                                  minWidth: "unset",
                                  borderRadius: "100%",
                                  width: "32px",
                                  height: "32px",
                                  backgroundColor: "rgba(0,0,0,0.4)",
                                  "&:hover": {
                                    backgroundColor: "rgba(0,0,0,0.5)",
                                  },
                                }}
                              >
                                <ReactFileReader
                                  fileTypes={[".png", ".jpg"]}
                                  base64={true}
                                  handleFiles={handleFiles}
                                  as={Button}
                                >
                                  <SignChangeIcon
                                    sx={{
                                      fontSize: 20,
                                      color: "white",
                                      display: "block",
                                    }}
                                  />
                                </ReactFileReader>
                              </Button>
                            </Tooltip>
                          </Box>
                        </Box>
                      </Box>
                      <Stack spacing={1} sx={{ mt: 3 }}>
                        <FormControlLabel
                          label="Add watermark"
                          sx={{
                            userSelect: "none",
                            m: 0,
                            "&>span:last-child": {
                              ml: 1,
                            },
                          }}
                          control={
                            <Checkbox
                              onClick={() => setShowWatermark(!showWatermark)}
                              disableRipple
                              sx={{
                                p: 0,
                                position: "relative",
                                borderRadius: "4px",
                                width: "20px",
                                height: "20px",
                                bgcolor: "text.primary",
                                "& svg": { opacity: 0 },
                                "&:before": {
                                  content: "'✓'",
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%,-50%)",
                                  opacity: 0,
                                  transition: "all 0.2s ease-in-out",
                                  color: "white",
                                  fontSize: "14px",
                                },
                                "&.Mui-checked:before": {
                                  opacity: 1,
                                },
                              }}
                              defaultChecked
                            />
                          }
                        />
                        <FormControlLabel
                          label="Add Signature"
                          sx={{
                            userSelect: "none",
                            m: 0,
                            "&>span:last-child": {
                              ml: 1,
                            },
                          }}
                          control={
                            <Checkbox
                              onClick={() => setShowSign(!showSign)}
                              disableRipple
                              sx={{
                                p: 0,
                                position: "relative",
                                borderRadius: "4px",
                                width: "20px",
                                height: "20px",
                                bgcolor: "text.primary",
                                "& svg": { opacity: 0 },
                                "&:before": {
                                  content: "'✓'",
                                  position: "absolute",
                                  top: "50%",
                                  left: "50%",
                                  transform: "translate(-50%,-50%)",
                                  opacity: 0,
                                  transition: "all 0.2s ease-in-out",
                                  color: "white",
                                  fontSize: "14px",
                                },
                                "&.Mui-checked:before": {
                                  opacity: 1,
                                },
                              }}
                              defaultChecked
                            />
                          }
                        />
                      </Stack>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 2,
                        mt: 2.5,
                      }}
                    >
                      {/* <Link to="./preview"> */}
                      <Button
                        type="submit"
                        disableRipple
                        sx={{
                          maxHeight: "42px",
                          position: "relative",
                          px: 2.5,
                          py: 1.5,
                          bgcolor: "success.main",
                          border: "1px solid",
                          borderColor: "success.main",
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
                            color: "success.main",
                            bgcolor: "success.main",
                            "&:before": { height: "10rem" },
                          },
                        }}
                      >
                        <span style={{ position: "relative" }}>Preview</span>
                      </Button>
                      {/* </Link> */}
                      <Link to="../invoices">
                        <Button
                          disableRipple
                          sx={{
                            maxHeight: "42px",
                            position: "relative",
                            px: 2.5,
                            py: 1.5,
                            color: "text.primary",
                            bgcolor: "#e4e4e4",
                            border: "1px solid",
                            borderColor: "#e4e4e4",
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
                              bgcolor: "#e4e4e4",
                              "&:before": { height: "10rem" },
                            },
                          }}
                        >
                          <span style={{ position: "relative" }}>discard</span>
                        </Button>
                      </Link>
                    </Box>
                  </Form>
                </Box>
              </Box>
              {/* admin information edit */}
              <InvoiceInputForm
                open={fromOpen}
                setOpen={setFromOpen}
                val={[
                  {
                    address: values.address,
                    address2: values.address2,
                    landmark: values.landmark,
                    pincode: values.pincode,
                    mobileNumber: values.mobileNumber,
                    email: values.email,
                  },
                ]}
                onSuccess={fetchAdmin}
                label={"Edit Business Information"}
                identify={1}
              />
              {/* client information edit */}
              <InvoiceInputForm
                open={clientOpen}
                setOpen={setClientOpen}
                val={[
                  {
                    address: values.clientAddress,
                  },
                ]}
                onSuccess={fetchClient}
                // onSuccess={
                //   selectedClient?._id
                //     ? fetchProject.bind(null, selectedClient._id)
                //     : () => {}
                // }
                label={"Edit Client Information"}
                uniqId={selectedClient?._id}
                identify={2}
              />
              {/* project information edit */}
              <InvoiceInputForm
                open={projectOpen}
                setOpen={setProjectOpen}
                val={[
                  {
                    description: projectDescription?.description,
                  },
                ]}
                onSuccess={
                  selectedClient?._id
                    ? fetchProject.bind(null, selectedClient._id)
                    : () => {}
                }
                label={"Edit Project Information"}
                uniqId={projectDescription?._id}
                identify={3}
              />
              {/* invoice information edit */}
              <InvoiceInputForm
                open={invoiceOpen}
                setOpen={setInvoiceOpen}
                val={[
                  {
                    invoiceNumber: invoiceNumber,
                    invoiceDate:
                      // new Date(invoiceData.invoiceDATE)
                      //   .toISOString()
                      //   .split("T")[0] ||
                      new Date().toISOString().split("T")[0],
                    invoiceDueDate: fifteenDaysAgo.toISOString().split("T")[0],
                  },
                ]}
                // onSuccess={
                //   selectedClient?._id
                //     ? fetchProject.bind(null, selectedClient._id)
                //     : () => {}
                // }
                label={"Edit Invoice Information"}
                // uniqId={projectDescription?._id}
                identify={3}
              />
            </>
          );
        }}
      </Box>
    </>
  );
}
