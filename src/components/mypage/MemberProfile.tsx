import React from "react";
import styled from "styled-components";
import { MemberProfileProps } from "../../types/components/member";
import EditIcon from "../../assets/icons/image-edit.svg";

export const MemberProfile = ({
  profileImage,
  name,
  followers,
  following,
  onFollowersClick,
  onFollowingClick,
  isOwnProfile = true,
  onProfileImageChange,
}: MemberProfileProps & { onProfileImageChange?: (file: File) => void }) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    onProfileImageChange?.(file);
  };

  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="프로필 이미지" />
          {isOwnProfile && (
            <EditOverlay onClick={handleEditClick}>
              <EditImg src={EditIcon} alt="이미지 변경" />
              <HiddenInput
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </EditOverlay>
          )}
        </ProfileImageWrapper>

        <ProfileInfo>
          <UserName>{name}</UserName>
          <FollowInfo>
            <FollowText onClick={onFollowersClick}>
              팔로워 {followers}
            </FollowText>
            <Dot>·</Dot>
            <FollowText onClick={onFollowingClick}>
              팔로잉 {following}
            </FollowText>
          </FollowInfo>
        </ProfileInfo>
      </ProfileContent>
    </ProfileContainer>
  );
};

const ProfileContainer = styled.div`
  padding: 3rem 2rem 1rem 2rem;
`;

const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const ProfileImageWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  position: relative;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: left;
`;

const UserName = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 0;
  color: #000000;
`;

const FollowInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666666;
  font-size: 1.2rem;
`;

const FollowText = styled.span`
  color: #666666;
  cursor: pointer;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #036635;
  }
`;

const Dot = styled.span`
  color: #666666;
`;

const EditOverlay = styled.div`
  position: absolute;
  bottom: 0.5rem;
  right: 0.5rem;
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
`;

const EditImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

const HiddenInput = styled.input`
  display: none;
`;
