import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRoomStore } from "../../stores/useRoomStore";
import { useNavigate } from "react-router-dom";
import NameInput from "../../components/NameInput";
import MemberSelector from "../../components/room/create/MemberSelector";
import VisibilitySelector from "../../components/room/create/VisibilitySelector";
import CreateButton from "../../components/CreateButton";
import CancelButton from "../../components/CancelButton";
import { useAuthStore } from "../../stores/useAuthStore";
import { getMembers } from "../../api/member";
import { MemberInfo } from "../../types/components/member";

const RoomCreate = () => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<MemberInfo[]>([]);
  const [members, setMembers] = useState<MemberInfo[]>([]);
  const [otherMemberIds, setOtherMemberIds] = useState<number[]>([]);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const { createRoom } = useRoomStore();
  const { memberInfo, fetchMemberInfo } = useAuthStore();

  const handleSearchChange = async (value: string) => {
    setSearch(value);

    try {
      const response = await getMembers({ name: value });
      setFilteredMembers(response);
    } catch (error) {
      setFilteredMembers([]);
    }

    if (value === "") {
      setFilteredMembers([]);
      return;
    }
  };

  const toggleMember = (inputMember: MemberInfo) => {
    if (members.some((member) => member.id === inputMember.id)) {
      setMembers((prev) =>
        prev.filter((member) => member.id !== inputMember.id)
      );
      setOtherMemberIds((prev) => prev.filter((id) => id !== inputMember.id));
    } else {
      setMembers((prev) => [...prev, inputMember]);
      setOtherMemberIds((prev) => [...prev, inputMember.id]);
    }
  };

  useEffect(() => {
    fetchMemberInfo();
  }, []);

  const handleCreateRoom = async () => {
    if (!memberInfo?.id) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const memberIdList = [memberInfo.id, ...otherMemberIds];

    await createRoom({
      name: roomName,
      isPublic: visibility === "public",
      memberIdList,
    });

    alert("방이 생성되었습니다!");
    setRoomName("");
    navigate("/rooms");
  };

  return (
    <FormContainer>
      <NameInput
        placeholder="방 이름을 입력하세요"
        value={roomName}
        onChange={setRoomName}
      />
      <SearchRadioContainer>
        <MemberSelector
          search={search}
          onSearchChange={handleSearchChange}
          filteredMembers={filteredMembers}
          selectedMembers={members}
          toggleMember={toggleMember}
          currentMemberId={memberInfo?.id || 0}
        />
        <VisibilitySelector visibility={visibility} onChange={setVisibility} />
      </SearchRadioContainer>
      <ButtonContainer>
        <CreateButton onClick={handleCreateRoom} content="생성" />
        <CancelButton onClick={() => navigate("/rooms")} content="취소" />
      </ButtonContainer>
    </FormContainer>
  );
};

export default RoomCreate;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const SearchRadioContainer = styled.div`
  width: 40%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;
