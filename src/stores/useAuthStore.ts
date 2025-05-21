import { create } from "zustand";
import { getMemberInfo } from "../api/member";
import { AuthState, LoginTokens } from "../types/stores/auth";

export const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem("accessToken"),
  memberInfo: null,

  fetchMemberInfo: async () => {
    try {
      const memberInfo = await getMemberInfo();
      set({ memberInfo });
    } catch (error) {
      console.log("유저 정보를 가져오는데 실패했습니다.");
      set({ isLoggedIn: false, memberInfo: null });
    }
  },

  login: async ({ accessToken }: LoginTokens) => {
    localStorage.setItem("accessToken", accessToken);
    set({ isLoggedIn: true });

    const memberInfo = await getMemberInfo();
    set({ memberInfo });
  },

  logout: async () => {
    localStorage.removeItem("accessToken");
    set({ isLoggedIn: false, memberInfo: null });
  },
}));
