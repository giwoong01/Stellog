import React from "react";
import styled from "styled-components";

interface UserProfileProps {
  profileImage: string;
  name: string;
  age: number;
  followers: number;
  following: number;
}

export const UserProfile = ({
  profileImage,
  name,
  age,
  followers,
  following,
}: UserProfileProps) => {
  return (
    <ProfileContainer>
      <ProfileContent>
        <ProfileImageWrapper>
          <ProfileImage src={profileImage} alt="프로필 이미지" />
        </ProfileImageWrapper>

        <ProfileInfo>
          <UserName>
            {name} {age}세 (만)
          </UserName>
          <FollowInfo>
            <FollowText onClick={() => {}}>팔로워 {followers}</FollowText>
            <Dot>·</Dot>
            <FollowText onClick={() => {}}>팔로잉 {following}</FollowText>
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
`;

const Dot = styled.span`
  color: #666666;
`;
