import * as React from "react";
import { ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import Routes from "./Routes";
import { socket } from "./Socket";
import { useEffect } from "react";
import { useAuth } from "./hooks/store/useAuth";
import { useSocket } from "./hooks/store/useSocket";

export default function App() {
  const { socketConnection, setSocketConnection } = useSocket();
  const { isLoggedIn, userId } = useAuth();

  useEffect(() => {
    socket.on("connect", () => {
      setSocketConnection(true);
    });
    socket.on("connect_error", () => {
      setSocketConnection(false);
    });
  }, [setSocketConnection]);

  useEffect(() => {
    console.log("socket connected:", socket.connected);
    if (isLoggedIn && socketConnection) {
      socket.emit("connect_user", { userId: userId });
    }
  }, [isLoggedIn, socketConnection, userId]);

  useEffect(() => {
    socket.on("connected", (data) => {
      console.log(data);
    });
    return () => {
      socket.off("connected");
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes />
    </ThemeProvider>
  );
}
