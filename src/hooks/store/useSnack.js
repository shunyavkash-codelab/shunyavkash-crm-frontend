import { create } from "zustand";

export const useSnack = create((set) => ({
  message: "",
  type: "",
  open: false,
  setSnack(message = "", type = "success", open = true) {
    //  Promise((resolve, reject) => {
    setTimeout(() => {
      set(() => ({
        message,
        type,
        open,
      }));
      //   resolve();
      //   }, 500);
    });
  },
  closeSnack() {
    set(() => ({ message: "", type: "", open: false }));
  },
}));
