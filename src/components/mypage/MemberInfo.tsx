import React, { useState } from "react";
import styled from "styled-components";
import googleIcon from "../../assets/icons/google.svg";
import kakaoIcon from "../../assets/icons/kakao.svg";
import { MemberInfoState } from "../../types/components/member";

export const MemberInfo = ({
  nickname,
  provider,
  email,
  roomCount,
  reviewCount,
  isOwnProfile = true,
  onNicknameChange,
  isLoading = false,
}: MemberInfoState) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNickname, setEditedNickname] = useState(nickname);

  const handleEdit = () => {
    setEditedNickname(nickname);
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (onNicknameChange) {
      await onNicknameChange(editedNickname);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedNickname(nickname);
    setIsEditing(false);
  };

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
          <InfoValue>
            {isEditing ? (
              <NicknameEditContainer>
                <NicknameInput
                  value={editedNickname}
                  onChange={(e) => setEditedNickname(e.target.value)}
                  disabled={isLoading}
                />
                <EditButton onClick={handleSave} disabled={isLoading}>
                  {isLoading ? "저장 중..." : "저장"}
                </EditButton>
                <EditButton onClick={handleCancel} disabled={isLoading}>
                  취소
                </EditButton>
              </NicknameEditContainer>
            ) : (
              <NicknameContainer>
                {nickname}
                {isOwnProfile && (
                  <EditButton onClick={handleEdit} disabled={isLoading}>
                    수정
                  </EditButton>
                )}
              </NicknameContainer>
            )}
          </InfoValue>
        </InfoItem>
        <InfoItem>
          <InfoLabel>이메일</InfoLabel>
          <InfoValue>
            <ProviderIcon src={getProviderIcon(provider)} alt={provider} />
            {email}
          </InfoValue>
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

const NicknameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NicknameEditContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const NicknameInput = styled.input`
  padding: 0.25rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;

  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const EditButton = styled.button`
  padding: 0.25rem 0.5rem;
  background-color: #036635;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;

  &:hover {
    background-color: #024d28;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
