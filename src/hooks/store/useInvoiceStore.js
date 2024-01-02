import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useInvoiceStore = create(
  persist(
    (set) => ({
      invoiceData: undefined,
      setInvoiceData: (data) => set(() => ({ invoiceData: data })),
      resetInvoiceStore: () => set({ invoiceData: undefined }),
    }),
    {
      name: "invoiceData", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
