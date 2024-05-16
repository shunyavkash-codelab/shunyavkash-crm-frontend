import { io } from "socket.io-client";

export const socket = io(process.env.REACT_APP_API_BASE_URL, {
  autoConnect: true,
  reconnectionAttempts: 3,
  reconnectionDelay: 5000,
});
