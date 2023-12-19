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
    LIST: "/manager/get-managers",
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
  },
  BANK: {
    ADD: "/bank/add",
    VIEW: (bankId) => `/bank/${bankId}`,
    LIST: "/bank/get-banks",
    DELETE: (bankId) => `/bank/${bankId}`,
    EDIT: (bankId) => `/bank/${bankId}`,
  },
  COUNTRY: {
    GET: "/country-code",
  },
  CURRENCY: {
    GET: "/currency",
  },
};
