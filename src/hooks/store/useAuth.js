import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      user: { name: "" },
      accessToken: "",
      userId: "",
      invoiceTable: false,
      login: ({ user, accessToken, userId }) => {
        set((state) => ({
          ...state,
          user,
          accessToken,
          userId,
        }));
      },
      logout: () =>
        set(() => ({
          user: {},
          accessToken: "",
          userId: "",
        })),
      setUserDatail: (name, profile_img, companyName) => {
        set((state) => ({
          ...state,
          user: { ...state.user, name, profile_img, companyName },
        }));
      },
      setUserProfile: (profileImage) => {
        set((state) => ({
          ...state,
          user: { ...state.user, profileImage },
        }));
      },
      setMobile: (mobile) => {
        set((state) => ({
          ...state,
          user: { ...state.user, mobile },
        }));
      },
      setEmailVerificationFlag: (email_verified) => {
        set((state) => ({
          ...state,
          user: { ...state.user, email_verified },
        }));
      },
      setAccessToken: (accessToken) =>
        set((state) => ({ ...state, accessToken })),
      setInvoiceTable: (invoiceTable) =>
        set((state) => ({ ...state, invoiceTable })),
    }),
    { name: "auth" }
  )
);
