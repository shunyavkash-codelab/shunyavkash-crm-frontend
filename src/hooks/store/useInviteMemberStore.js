import { create } from "zustand";

export const useInviteMemberStore = create((set) => ({
  inviteMemberStore: undefined,
  setInviteMemberStore: (data) => set(() => ({ inviteMemberStore: data })),
}));
