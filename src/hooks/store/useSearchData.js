import { create } from "zustand";

export const useSearchData = create((set) => ({
  searchData: undefined,
  setSearchData: (data) => set(() => ({ searchData: data })),
}));
