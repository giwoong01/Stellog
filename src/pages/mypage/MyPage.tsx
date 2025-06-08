import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MemberProfile } from "../../components/mypage/MemberProfile";
import { MemberInfo } from "../../components/mypage/MemberInfo";
import FollowModal from "../../components/modals/FollowModal";
import { useAuthStore } from "../../stores/useAuthStore";
import {
  updateMemberNickname,
  getFollowers,
  getFollowing,
  updateProfileImage,
} from "../../api/member";
import { FollowMember } from "../../types/components/member";

const MyPage = () => {
  const { memberInfo, fetchMemberInfo } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followModalTab, setFollowModalTab] = useState<
    "followers" | "following"
  >("followers");
  const [followers, setFollowers] = useState<FollowMember[]>([]);
  const [following, setFollowing] = useState<FollowMember[]>([]);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  const handleFollowClick = async (tab: "followers" | "following") => {
    setFollowModalTab(tab);
    setIsFollowModalOpen(true);
    setIsFollowLoading(true);

    try {
      if (tab === "followers") {
        const data = await getFollowers();
        setFollowers(data);
      } else {
        const data = await getFollowing();
        setFollowing(data);
      }
    } catch (error) {
      console.error("팔로우/팔로잉 목록 조회 실패:", error);
    } finally {
      setIsFollowLoading(false);
    }
  };

  const handleNicknameChange = async (newNickname: string) => {
    try {
      setIsLoading(true);
      await updateMemberNickname(newNickname);
      await fetchMemberInfo();
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfileImageChange = async (file: File) => {
    try {
      setIsLoading(true);
      await updateProfileImage(file);
      await fetchMemberInfo();
      alert("프로필 이미지가 변경되었습니다.");
    } catch {
      alert("이미지 변경 실패");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  return (
    <MyPageContainer>
      <MainContent>
        <MemberProfile
          profileImage={memberInfo?.profileImgUrl || ""}
          name={memberInfo?.name || ""}
          followers={memberInfo?.followerCount || 0}
          following={memberInfo?.followingCount || 0}
          onFollowersClick={() => handleFollowClick("followers")}
          onFollowingClick={() => handleFollowClick("following")}
          onProfileImageChange={handleProfileImageChange}
        />
        <MemberInfo
          nickname={memberInfo?.nickName || ""}
          provider={memberInfo?.provider || ""}
          email={memberInfo?.email || ""}
          roomCount={memberInfo?.roomCount || 0}
          reviewCount={memberInfo?.reviewCount || 0}
          onNicknameChange={handleNicknameChange}
          isLoading={isLoading}
        />
      </MainContent>
      <FollowModal
        isOpen={isFollowModalOpen}
        onClose={() => setIsFollowModalOpen(false)}
        initialTab={followModalTab}
        followers={followers}
        following={following}
        isLoading={isFollowLoading}
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
