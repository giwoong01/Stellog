import styled from "styled-components";
import { SocialLoginButtonProps } from "../types/components/socialLoginButton";

const SocialLoginButton = ({
  provider,
  iconSrc,
  backgroundColor,
  border,
  text,
}: SocialLoginButtonProps) => {
  const handleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_BASE_URL}/oauth2/login?provider=${provider}`;
  };

  return (
    <Button
      backgroundColor={backgroundColor}
      border={border}
      onClick={handleLogin}
    >
      <IconWrapper provider={provider === "kakao"}>{iconSrc}</IconWrapper>
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

const IconWrapper = styled.div<{ provider: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: ${({ provider }) => (provider ? "0" : "1rem")};

  svg {
    width: ${({ provider, theme }) =>
      provider
        ? theme.icon.loginKakaoIconWidth
        : theme.icon.loginGoogleIconWidth};
    height: ${({ provider, theme }) =>
      provider
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
