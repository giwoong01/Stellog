import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface Member {
  id: number;
  name: string;
  nickname: string;
  profileImage: string;
}

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "followers" | "following";
  followers: Member[];
  following: Member[];
}

const FollowModal = ({
  isOpen,
  onClose,
  initialTab = "followers",
  followers,
  following,
}: FollowModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    initialTab
  );
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (tab: "followers" | "following") => {
    setActiveTab(tab);
    setSearchTerm("");
  };

  const handleMemberClick = (memberId: number) => {
    onClose();
    navigate(`/mypages/members/${memberId}`);
  };

  const filteredMembers = (
    activeTab === "followers" ? followers : following
  ).filter(
    (member) =>
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.nickname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <TabContainer>
            <Tab
              isActive={activeTab === "followers"}
              onClick={() => handleTabChange("followers")}
            >
              팔로워
            </Tab>
            <Tab
              isActive={activeTab === "following"}
              onClick={() => handleTabChange("following")}
            >
              팔로잉
            </Tab>
          </TabContainer>
          <CloseButton onClick={onClose}>✕</CloseButton>
        </ModalHeader>

        <SearchInput
          type="text"
          placeholder={`${
            activeTab === "followers" ? "팔로워" : "팔로잉"
          } 검색`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <MemberList>
          {filteredMembers.map((member) => (
            <MemberItem key={member.id}>
              <MemberProfile onClick={() => handleMemberClick(member.id)}>
                <ProfileImage src={member.profileImage} alt={member.name} />
                <MemberInfo>
                  <MemberName>{member.name}</MemberName>
                  <MemberNickname>{member.nickname}</MemberNickname>
                </MemberInfo>
              </MemberProfile>
              <DeleteButton onClick={() => {}}>삭제</DeleteButton>
            </MemberItem>
          ))}
          {filteredMembers.length === 0 && (
            <EmptyMessage>검색 결과가 없습니다.</EmptyMessage>
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
  width: 400px;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`;

const TabContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 0.5rem 1rem;
  border: none;
  background: none;
  font-size: 1rem;
  color: ${({ isActive }) => (isActive ? "#036635" : "#666")};
  font-weight: ${({ isActive }) => (isActive ? "bold" : "normal")};
  cursor: pointer;
  border-bottom: 2px solid
    ${({ isActive }) => (isActive ? "#036635" : "transparent")};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
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
  max-height: 400px;
  overflow-y: auto;
  padding: 0 1rem;

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

const MemberItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
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

const ProfileImage = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  object-fit: cover;
`;

const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.span`
  font-weight: bold;
  color: #333;
`;

const MemberNickname = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const DeleteButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 2rem;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: #f8f9fa;
    border-color: #666;
  }
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;
