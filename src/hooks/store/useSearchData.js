import { create } from "zustand";

export const useSearchData = create((set) => ({
  searchData: "",
  setSearchData: (data) => set(() => ({ searchData: data })),
}));
