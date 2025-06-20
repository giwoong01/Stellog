import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FollowModalProps } from "../../types/components/member";
import {
  getFollowers,
  getFollowing,
  getMembers,
  followMember,
  unfollowMember,
} from "../../api/member";
import { MemberInfo } from "../../types/components/member";

const FollowModal = ({
  isOpen,
  onClose,
  initialTab = "followers",
  followers: initialFollowers,
  following: initialFollowing,
  isLoading: initialLoading = false,
}: FollowModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    initialTab
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [followers, setFollowers] = useState(initialFollowers);
  const [following, setFollowing] = useState(initialFollowing);
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [members, setMembers] = useState<MemberInfo[]>([]);

  const handleSearchChange = async (value: string) => {
    setSearchTerm(value);

    try {
      const response = await getMembers({ name: value });
      setMembers(response);
    } catch (error) {
      console.error("멤버 검색 중 오류 발생:", error);
      setMembers([]);
    }

    if (value === "") {
      setMembers([]);
      return;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (activeTab === "followers") {
          const data = await getFollowers();
          setFollowers(data);
        } else {
          const data = await getFollowing();
          setFollowing(data);
        }
      } catch (error) {
        console.error("팔로우/팔로잉 목록 조회 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const handleTabChange = (tab: "followers" | "following") => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  const handleMemberClick = (memberId: number) => {
    onClose();
    navigate(`/mypages/members/${memberId}`);
  };

  const handleFollow = async (memberId: number) => {
    try {
      await followMember(memberId);
      alert("팔로우 완료!");
    } catch (error) {
      alert("팔로우 실패");
    }
  };

  const handleUnfollow = async (memberId: number) => {
    try {
      await unfollowMember(memberId);
      alert("팔로우 취소 완료!");
    } catch (error) {
      alert("팔로우 취소 실패");
    }
  };

  const isFollowing = (memberId: number) => {
    return following.some((member) => member.id === memberId);
  };

  const filteredMembers = (
    activeTab === "followers" ? followers : following
  ).filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nickName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <TabButton
            active={activeTab === "followers"}
            onClick={() => handleTabChange("followers")}
          >
            팔로워
          </TabButton>
          <TabButton
            active={activeTab === "following"}
            onClick={() => handleTabChange("following")}
          >
            팔로잉
          </TabButton>
        </ModalHeader>

        <SearchInput
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
        />

        <MemberList>
          {isLoading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : searchTerm ? (
            members.length > 0 ? (
              members.map((member) => (
                <MemberProfile
                  key={member.id}
                  onClick={() => handleMemberClick(member.id)}
                >
                  <MemberInfoContainer>
                    <MemberImg src={member.profileImgUrl} alt={member.name} />
                    <MemberName>{member.name}</MemberName>
                    <MemberNickname>{member.nickName}</MemberNickname>
                    <FollowButton
                      onClick={(e) => {
                        e.stopPropagation();
                        isFollowing(member.id)
                          ? handleUnfollow(member.id)
                          : handleFollow(member.id);
                      }}
                    >
                      {isFollowing(member.id) ? "팔로우 취소" : "팔로우"}
                    </FollowButton>
                  </MemberInfoContainer>
                </MemberProfile>
              ))
            ) : (
              <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
            )
          ) : filteredMembers.length > 0 ? (
            filteredMembers.map((member) => (
              <MemberProfile
                key={member.id}
                onClick={() => handleMemberClick(member.id)}
              >
                <MemberInfoContainer>
                  <MemberImg src={member.profileImageUrl} alt={member.name} />
                  <MemberName>{member.name}</MemberName>
                  <MemberNickname>{member.nickName}</MemberNickname>
                  <FollowButton
                    onClick={(e) => {
                      e.stopPropagation();
                      isFollowing(member.id)
                        ? handleUnfollow(member.id)
                        : handleFollow(member.id);
                    }}
                  >
                    {isFollowing(member.id) ? "팔로우 취소" : "팔로우"}
                  </FollowButton>
                </MemberInfoContainer>
              </MemberProfile>
            ))
          ) : (
            <EmptyMessage>
              {activeTab === "followers"
                ? "팔로워가 없습니다."
                : "팔로잉이 없습니다."}
            </EmptyMessage>
          )}
        </MemberList>
      </ModalContent>
    </ModalOverlay>
  );
};

export default FollowModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  width: 30vw;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  gap: 5rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const TabButton = styled.button<{ active: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-size: 1rem;
  color: ${({ active }) => (active ? "#036635" : "#666")};
  font-weight: ${({ active }) => (active ? "bold" : "normal")};
  cursor: pointer;
  border-bottom: 2px solid
    ${({ active }) => (active ? "#036635" : "transparent")};
`;

const SearchInput = styled.input`
  margin: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #036635;
  }
`;

const MemberList = styled.div`
  max-height: 30vh;
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #036635;
    border-radius: 0.2rem;
  }
`;

const MemberProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f8f9fa;
  }
`;

const MemberImg = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
`;

const MemberName = styled.span`
  font-weight: bold;
  color: #333;
`;

const MemberNickname = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const FollowButton = styled.button`
  padding: 0.2rem 0.4rem;
  background: #036635;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  margin-left: auto;

  &:hover {
    background: #024826;
  }
`;
