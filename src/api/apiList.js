export const APIS = {
  DASHBOARD: {
    DATA: "/dashboard/dashboard",
  },
  MANAGER: {
    SIGNUP: "/manager/signup",
    LOGIN: "/manager/login",
    FORGETPASSWORD: "/manager/forget-password",
    RESETPASSWORD: "/manager/change-password",
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
  },
};
