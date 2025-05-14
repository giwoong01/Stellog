import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRoomStore } from "../../stores/useRoomStore";
import { useNavigate } from "react-router-dom";

import NameInput from "../../components/NameInput";
import MemberSelector from "../../components/room/create/MemberSelector";
import VisibilitySelector from "../../components/room/create/VisibilitySelector";
import CreateButton from "../../components/CreateButton";
import CancelButton from "../../components/CancelButton";

const RoomCreate = () => {
  const [roomName, setRoomName] = useState("");
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<
    { id: number; name: string; profileImage: string }[]
  >([]);
  const [filteredMembers, setFilteredMembers] = useState<
    { id: number; name: string; profileImage: string }[]
  >([]);
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  const { addRoom } = useRoomStore();
  const setCurrentRoomId = useRoomStore((state) => state.setCurrentRoomId);
  const setCurrentRoomTitle = useRoomStore(
    (state) => state.setCurrentRoomTitle
  );
  const navigate = useNavigate();

  const allMembers = [
    { id: 1, name: "홍길동", profileImage: "" },
    { id: 2, name: "김철수", profileImage: "" },
    { id: 3, name: "이영희", profileImage: "" },
    { id: 4, name: "박민수", profileImage: "" },
  ];

  const currenMember = { id: 0, name: "최기웅", profileImage: "" };

  useEffect(() => {
    setMembers([currenMember]);
  }, []);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (value.trim() === "") {
      setFilteredMembers([]);
    } else {
      const filtered = allMembers.filter((member) =>
        member.name.includes(value.trim())
      );
      setFilteredMembers(filtered);
    }
  };

  const toggleMember = (inputMember: {
    id: number;
    name: string;
    profileImage: string;
  }) => {
    if (members.some((member) => member.id === inputMember.id)) {
      setMembers((prev) =>
        prev.filter((member) => member.id !== inputMember.id)
      );
    } else {
      setMembers((prev) => [...prev, inputMember]);
    }
  };

  const handleCreateRoom = () => {
    if (!roomName.trim()) {
      alert("방 이름을 입력해주세요.");
      return;
    }

    const id = Math.random();
    addRoom({
      id: id,
      title: roomName,
      members,
      visitsCount: 0,
      isPublic: visibility === "public",
    });

    setCurrentRoomId(id);
    setCurrentRoomTitle(roomName);
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
          currentMemberId={currenMember.id}
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
