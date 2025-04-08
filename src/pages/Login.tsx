import React from "react";
import styled from "styled-components";
import SocialLoginButton from "../components/SocialLoginButton";
import { ReactComponent as MapLineSVG } from "../assets/icons/map-line.svg";
import { ReactComponent as Logo } from "../assets/icons/logo.svg";
import { ReactComponent as KakaoSVG } from "../assets/icons/kakao.svg";
import { ReactComponent as GoogleSVG } from "../assets/icons/google.svg";

const Login: React.FC = () => {
  return (
    <Container>
      <StyledMapLineSVG />
      <Content>
        <StyledLogo />
        <SocialLoginButton
          socialType="kakao"
          iconSrc={<KakaoSVG />}
          backgroundColor="#FEE500"
          border="#FEE500"
          text="카카오 로그인"
        />
        <SocialLoginButton
          socialType="google"
          iconSrc={<GoogleSVG />}
          backgroundColor="#FFFFFF"
          border="#E0E0E0"
          text="구글 로그인"
        />
      </Content>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledMapLineSVG = styled(MapLineSVG)`
  position: absolute;
  width: 74.13481rem;
  height: 41.33244rem;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  z-index: 1;
`;

const StyledLogo = styled(Logo)`
  width: 20rem;
  height: 15rem;
`;
