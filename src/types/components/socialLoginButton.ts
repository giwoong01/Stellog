import { ReactNode } from "react";

export interface SocialLoginButtonProps {
  iconSrc: ReactNode;
  backgroundColor: string;
  border: string;
  text: string;
  provider: "kakao" | "google";
}
