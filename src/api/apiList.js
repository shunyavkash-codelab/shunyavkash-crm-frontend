import Employees from "../page/Employees";

export const APIS = {
  DASHBOARD: {
    DATA: "/dashboard/dashboard",
  },
  MANAGER: {
    ADD: "/manager/add",
    LOGIN: "/manager/login",
    FORGETPASSWORD: "/manager/forget-password",
    RESETPASSWORD: "/manager/reset-password",
    CHANGEPASSWORD: "/manager/change-password",
    EDIT: (managerId) => `/manager/${managerId}`,
    VIEW: (managerId) => `/manager/${managerId}`,
    VIEWLIST: "/manager/get-managers",
    LIST: "/manager/get-managers",
  },
  EMPLOYEE: {
    ADD: "/manager/add",
    ALLLIST: "/manager/get-all-employees",
    DELETE: (employeeId) => `/manager/${employeeId}`,
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
    LIST: "/bank/get-banks",
    DELETE: (bankId) => `/bank/${bankId}`,
    EDIT: (bankId) => `/bank/${bankId}`,
  },
  INVOICE: {
    GENERATENUM: "/invoice/generate-invoice-number",
    ADD: "/invoice/add",
    CHECKINVOICENUMBER: (number) => `/invoice/check-invoice-number/${number}`,
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
  },
};
