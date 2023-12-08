export const APIS = {
  DASHBOARD: {
    DATA: "/dashboard/dashboard",
  },
  MANAGER: {
    SIGNUP: "/manager/signup",
    LOGIN: "/manager/login",
    EDIT: (managerId) => `/manager/${managerId}`,
    VIEW: (managerId) => `/manager/${managerId}`,
    LIST: "/manager/getManagers",
  },
  CLIENT: {
    ADD: "/client/add",
    EDIT: (clientId) => `/client/${clientId}`,
    VIEW: (clientId) => `/client/${clientId}`,
    LIST: "/client/getClients",
  },
  PROJECT: {
    ADD: "/project/add",
    EDIT: (projectId) => `/project/${projectId}`,
    VIEW: (projectId) => `/project/${projectId}`,
    LIST: "/project/getProjects",
  },
  BANK: {
    ADD: "/bank/add",
    VIEW: (bankId) => `/bank/${bankId}`,
    LIST: "/bank/getBanks",
  },
};
