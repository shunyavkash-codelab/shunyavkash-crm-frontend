import { create } from "zustand";

export const useInvoiceStore = create((set) => ({
  invoiceData: undefined,
  setInvoiceData: (data) => set(() => ({ invoiceData: data })),
  resetInvoiceStore: () => set({ invoiceData: undefined }),
}));
