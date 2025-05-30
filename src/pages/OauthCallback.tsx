import { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { handleOAuthLogin } from "../api/auth";
import { useAuthStore } from "../stores/useAuthStore";
import styled, { keyframes } from "styled-components";

const OAuthCallback = () => {
  const { provider } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuthStore();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get("code");

    const processOAuthCallback = async () => {
      if (!provider || !code) return;
      try {
        const data = await handleOAuthLogin(provider, code);

        await login({
          accessToken: data.accessToken,
        });

        navigate("/");
      } catch (error) {
        console.error(error);
      }
    };

    processOAuthCallback();
  }, [provider, location, navigate, login]);

  return (
    <Container>
      <SpinnerWrapper>
        <Spinner provider={provider} />
      </SpinnerWrapper>
      <Message>
        로그인 처리 중입니다...
        <br />
        잠시만 기다려주세요.
      </Message>
    </Container>
  );
};

export default OAuthCallback;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f9fafb;
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
`;

const Spinner = styled.div<{ provider?: string }>`
  border: 6px solid #e5e7eb;
  border-top: 6px solid
    ${({ provider }) => (provider === "kakao" ? "#ffcd00" : "#4285F4")};
  border-radius: 50%;
  width: 56px;
  height: 56px;
  animation: ${spin} 1s linear infinite;
`;

const Message = styled.div`
  font-size: 1.25rem;
  color: #374151;
  text-align: center;
  line-height: 1.6;
  font-weight: 500;
`;
