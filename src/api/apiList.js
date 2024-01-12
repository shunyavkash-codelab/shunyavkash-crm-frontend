import Employees from "../page/Employees";

export const APIS = {
  DASHBOARD: {
    DATA: "/dashboard/dashboard",
  },
  MANAGER: {
    ADD: "/user/add",
    LOGIN: "/user/login",
    FORGETPASSWORD: "/user/forget-password",
    RESETPASSWORD: "/user/reset-password",
    CHANGEPASSWORD: "/user/change-password",
    EDIT: (userId) => `/user/${userId}`,
    VIEW: (userId) => `/user/${userId}`,
    VIEWLIST: "/user/get-users",
    LIST: "/user/get-users",
    ALLUSER: "/user/get-all-user",
  },
  EMPLOYEE: {
    ADD: "/user/add",
    ALLLIST: "/user/get-all-employees",
    DELETE: (employeeId) => `/user/${employeeId}`,
  },
  CLIENT: {
    ADD: "/client/add",
    EDIT: (clientId) => `/client/${clientId}`,
    VIEW: (clientId) => `/client/${clientId}`,
    LIST: "/client/get-clients",
  },
  PROJECT: {
    ADD: "/project/add",
    EDIT: (projectId) => `/project/${projectId}`,
    VIEW: (projectId) => `/project/${projectId}`,
    LIST: "/project/get-projects",
    CLIENTWISEPROJECT: (clientId) => `/project/get-project-name/${clientId}`,
  },
  BANK: {
    ADD: "/bank/add",
    VIEW: (bankId) => `/bank/${bankId}`,
    USERBANK: (userId) => `/bank/user/${userId}`,
    LIST: "/bank/get-banks",
    DELETE: (bankId) => `/bank/${bankId}`,
    EDIT: (bankId) => `/bank/${bankId}`,
  },
  INVOICE: {
    GENERATENUM: "/invoice/generate-invoice-number",
    ADD: "/invoice/add",
    EDIT: "/invoice/edit",
    CHECKINVOICENUMBER: (number) => `/invoice/check-invoice-number/${number}`,
    LIST: "/invoice/invoices",
  },
  COUNTRY: {
    GET: "/country-code",
  },
  CURRENCY: {
    GET: "/currency",
  },
  ADMIN: {
    GET: "admin/getAdmin",
    EDIT: "/admin/edit",
  },
  TASK: {
    GET: (projectId) => `task/tasks/${projectId}`,
    ADD: "/task/add",
    EDIT: (taskId) => `task/${taskId}`,
  },
};
