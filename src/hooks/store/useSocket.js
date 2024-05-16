import { create } from "zustand";

export const useSocket = create((set) => ({
  socketConnection: true,
  setSocketConnection(connectionStatus) {
    set(() => ({ socketConnection: connectionStatus }));
  },
}));
