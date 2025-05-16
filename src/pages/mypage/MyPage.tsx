import React from "react";
import styled from "styled-components";
import { UserProfile } from "../../components/mypage/UserProfile";
import { UserInfo } from "../../components/mypage/UserInfo";
import BadgeGrid from "../../components/BadgeGrid";

const dummyData = {
  profile: {
    name: "최기웅",
    age: 23,
    profileImage:
      "https://storage.googleapis.com/image-gcs/project/3/33190dd8-ad66-4186-ba4e-e2763f371b5b",
    followers: 2000,
    following: 1,
  },
  userInfo: {
    nickname: "웅이",
    provider: "google",
    email: "a123@gmail.com",
    userId: "qwer1234",
    roomCount: 3,
    reviewCount: 21,
  },
  badges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
};

const MyPage = () => {
  return (
    <MyPageContainer>
      <MainContent>
        <UserProfile
          profileImage={dummyData.profile.profileImage}
          name={dummyData.profile.name}
          age={dummyData.profile.age}
          followers={dummyData.profile.followers}
          following={dummyData.profile.following}
        />
        <BadgeGrid badges={dummyData.badges} />
        <UserInfo
          nickname={dummyData.userInfo.nickname}
          provider={dummyData.userInfo.provider}
          email={dummyData.userInfo.email}
          userId={dummyData.userInfo.userId}
          roomCount={dummyData.userInfo.roomCount}
          reviewCount={dummyData.userInfo.reviewCount}
        />
      </MainContent>
    </MyPageContainer>
  );
};

export default MyPage;

const MyPageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  width: 40%;
  height: 100%;
`;
