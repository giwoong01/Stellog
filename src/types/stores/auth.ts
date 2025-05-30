import { MemberInfo } from "../api/member";

export interface AuthState {
  isLoggedIn: boolean;
  memberInfo: MemberInfo | null;
  login: (tokens: LoginTokens) => Promise<void>;
  logout: () => Promise<void>;
  fetchMemberInfo: () => Promise<void>;
}

export interface LoginTokens {
  accessToken: string;
}
