import styled from "styled-components";
import { MemberProfile } from "../../components/mypage/MemberProfile";
import { MemberInfo } from "../../components/mypage/MemberInfo";
import BadgeGrid from "../../components/BadgeGrid";

const dummyData = {
  profile: {
    name: "방문한 친구",
    age: 25,
    profileImage:
      "https://storage.googleapis.com/image-gcs/project/3/33190dd8-ad66-4186-ba4e-e2763f371b5b",
    followers: 150,
    following: 120,
  },
  memberInfo: {
    nickname: "친구닉네임",
    provider: "google",
    email: "friend@gmail.com",
    userId: "friend1234",
    roomCount: 5,
    reviewCount: 30,
  },
  badges: [1, 2, 3, 4, 5],
};

const MemberPage = () => {
  return (
    <MemberPageContainer>
      <MainContent>
        <MemberProfile
          profileImage={dummyData.profile.profileImage}
          name={dummyData.profile.name}
          age={dummyData.profile.age}
          followers={dummyData.profile.followers}
          following={dummyData.profile.following}
          isOwnProfile={false}
        />
        <BadgeGrid badges={dummyData.badges} />
        <MemberInfo
          nickname={dummyData.memberInfo.nickname}
          provider={dummyData.memberInfo.provider}
          email={dummyData.memberInfo.email}
          userId={dummyData.memberInfo.userId}
          roomCount={dummyData.memberInfo.roomCount}
          reviewCount={dummyData.memberInfo.reviewCount}
          isOwnProfile={false}
        />
      </MainContent>
    </MemberPageContainer>
  );
};

export default MemberPage;

const MemberPageContainer = styled.div`
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
