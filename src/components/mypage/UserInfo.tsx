import React from "react";
import styled from "styled-components";
import googleIcon from "../../assets/icons/google.svg";
import kakaoIcon from "../../assets/icons/kakao.svg";

interface UserInfoProps {
  nickname: string;
  provider: string;
  email: string;
  userId: string;
  roomCount: number;
  reviewCount: number;
}

export const UserInfo = ({
  nickname,
  provider,
  email,
  userId,
  roomCount,
  reviewCount,
}: UserInfoProps) => {
  const getProviderIcon = (provider: string) => {
    switch (provider) {
      case "google":
        return googleIcon;
      case "kakao":
        return kakaoIcon;
      default:
        return "";
    }
  };

  return (
    <InfoContainer>
      <InfoTitle>내 정보</InfoTitle>
      <InfoGrid>
        <InfoItem>
          <InfoLabel>닉네임</InfoLabel>
          <InfoValue>{nickname}</InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>이메일</InfoLabel>
          <InfoValue>
            <ProviderIcon src={getProviderIcon(provider)} alt={provider} />
            {email}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>아이디</InfoLabel>
          <InfoValue>{userId}</InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>방 개수</InfoLabel>
          <InfoValue>{roomCount}개</InfoValue>
        </InfoItem>

        <InfoItem>
          <InfoLabel>작성한 리뷰 수</InfoLabel>
          <InfoValue>{reviewCount}개</InfoValue>
        </InfoItem>
      </InfoGrid>
    </InfoContainer>
  );
};

const InfoContainer = styled.div`
  margin-top: 1rem;
`;

const InfoTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0 0 1rem 0.5rem;
  color: #333;
`;

const InfoGrid = styled.div`
  display: grid;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  margin-bottom: 2rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const InfoLabel = styled.div`
  width: 6.25rem;
  font-size: 1rem;
  font-weight: bold;
  color: #666;
`;

const InfoValue = styled.div`
  flex: 1;
  font-size: 1rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .email-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
`;

const ProviderIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;
