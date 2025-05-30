import { MemberInfo } from "../api/member";

export interface MemberInfoProps {
  isLoggedIn: boolean;
  memberInfo: MemberInfo | null;
  onLogin: () => void;
  onLogout: () => void;
}
