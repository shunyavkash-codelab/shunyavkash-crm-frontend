import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuth = create(
  persist(
    (set) => ({
      user: { name: "" },
      accessToken: "",
      userId: "",
      setProfile: false,
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
          setProfile: false,
        })),
      setUserDatail: (name, profile_img, companyName) => {
        set((state) => ({
          ...state,
          user: { ...state.user, name, profile_img, companyName },
        }));
      },
      setUserProfile: (setProfile) => {
        set((state) => ({ ...state, setProfile }));
      },
      setUserProfileImg: (profile_img) => {
        set((state) => ({ ...state, user: { ...state.user, profile_img } }));
      },
      setMobile: (mobile) => {
        set((state) => ({
          ...state,
          user: { ...state.user, mobile },
        }));
      },
      setAccessToken: (accessToken) =>
        set((state) => ({ ...state, accessToken })),
    }),
    { name: "auth" }
  )
);
