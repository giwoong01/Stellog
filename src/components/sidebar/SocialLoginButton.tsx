import React from "react";
import styled from "styled-components";

interface SocialLoginButtonProps {
  iconSrc: React.ReactNode;
  backgroundColor: string;
  border: string;
  text: string;
  socialType: "kakao" | "google";
}

const SocialLoginButton = ({
  socialType,
  iconSrc,
  backgroundColor,
  border,
  text,
}: SocialLoginButtonProps) => {
  const handleKakaoLogin = () => {
    // 로그인 로직
  };

  const handleGoogleLogin = () => {
    // 로그인 로직
  };

  return (
    <Button
      backgroundColor={backgroundColor}
      border={border}
      onClick={socialType === "kakao" ? handleKakaoLogin : handleGoogleLogin}
    >
      <IconWrapper socialType={socialType === "kakao"}>{iconSrc}</IconWrapper>
      <Text>{text}</Text>
    </Button>
  );
};

export default SocialLoginButton;

const Button = styled.button<{ backgroundColor: string; border: string }>`
  background-color: ${({ backgroundColor }) => backgroundColor};
  border: ${({ border }) => (border ? `1px solid ${border}` : "none")};
  box-sizing: border-box;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 3rem;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const IconWrapper = styled.div<{ socialType: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ socialType }) => (socialType ? "0" : "1rem")};

  svg {
    width: ${({ socialType, theme }) =>
      socialType
        ? theme.icon.loginKakaoIconWidth
        : theme.icon.loginGoogleIconWidth};
    height: ${({ socialType, theme }) =>
      socialType
        ? theme.icon.loginKakaoIconHeight
        : theme.icon.loginGoogleIconHeight};
  }
`;

const Text = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  line-height: 1;
  color: #1f2937;
`;
