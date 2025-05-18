import React, { useState } from "react";
import styled from "styled-components";
import { MemberProfile } from "../../components/mypage/MemberProfile";
import { MemberInfo } from "../../components/mypage/MemberInfo";
import BadgeGrid from "../../components/BadgeGrid";
import FollowModal from "../../components/modals/FollowModal";

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
  followers: [
    {
      id: 1,
      name: "김철수",
      nickname: "철수123",
      profileImage:
        "https://storage.googleapis.com/image-gcs/project/3/33190dd8-ad66-4186-ba4e-e2763f371b5b",
    },
    {
      id: 2,
      name: "이영희",
      nickname: "영희456",
      profileImage:
        "https://storage.googleapis.com/image-gcs/project/3/33190dd8-ad66-4186-ba4e-e2763f371b5b",
    },
  ],
  following: [
    {
      id: 3,
      name: "박지민",
      nickname: "지민789",
      profileImage:
        "https://storage.googleapis.com/image-gcs/project/3/33190dd8-ad66-4186-ba4e-e2763f371b5b",
    },
  ],
};

const MyPage = () => {
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followModalTab, setFollowModalTab] = useState<
    "followers" | "following"
  >("followers");

  const handleFollowClick = (tab: "followers" | "following") => {
    setFollowModalTab(tab);
    setIsFollowModalOpen(true);
  };

  return (
    <MyPageContainer>
      <MainContent>
        <MemberProfile
          profileImage={dummyData.profile.profileImage}
          name={dummyData.profile.name}
          age={dummyData.profile.age}
          followers={dummyData.profile.followers}
          following={dummyData.profile.following}
          onFollowersClick={() => handleFollowClick("followers")}
          onFollowingClick={() => handleFollowClick("following")}
        />
        <BadgeGrid badges={dummyData.badges} />
        <MemberInfo
          nickname={dummyData.userInfo.nickname}
          provider={dummyData.userInfo.provider}
          email={dummyData.userInfo.email}
          userId={dummyData.userInfo.userId}
          roomCount={dummyData.userInfo.roomCount}
          reviewCount={dummyData.userInfo.reviewCount}
        />
      </MainContent>
      <FollowModal
        isOpen={isFollowModalOpen}
        onClose={() => setIsFollowModalOpen(false)}
        initialTab={followModalTab}
        followers={dummyData.followers}
        following={dummyData.following}
      />
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
