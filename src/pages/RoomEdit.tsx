import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRoomStore } from "../stores/useRoomStore";
import { useNavigate, useParams } from "react-router-dom";

import NameInput from "../components/NameInput";
import MemberSelector from "../components/room/create/MemberSelector";
import VisibilitySelector from "../components/room/create/VisibilitySelector";
import CreateButton from "../components/CreateButton";
import CancelButton from "../components/CancelButton";

const RoomEdit = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const { rooms, updateRoom } = useRoomStore();
  const currentRoomId = useRoomStore((state) => state.currentRoomId);
  const setCurrentRoomTitle = useRoomStore(
    (state) => state.setCurrentRoomTitle
  );

  const [roomName, setRoomName] = useState("");
  const [search, setSearch] = useState("");
  const [members, setMembers] = useState<
    { id: number; name: string; profileImage: string }[]
  >([]);
  const [filteredMembers, setFilteredMembers] = useState<
    { id: number; name: string; profileImage: string }[]
  >([]);
  const [visibility, setVisibility] = useState<"public" | "private">("public");

  const allMembers = [
    { id: 1, name: "홍길동", profileImage: "" },
    { id: 2, name: "김철수", profileImage: "" },
    { id: 3, name: "이영희", profileImage: "" },
    { id: 4, name: "박민수", profileImage: "" },
  ];

  const currenMember = { id: 0, name: "최기웅", profileImage: "" };

  // 기존 방 정보 불러오기
  useEffect(() => {
    if (!roomId) return;

    const room = rooms.find((r) => r.id.toString() === roomId);
    if (!room) {
      alert("존재하지 않는 방입니다.");
      navigate("/rooms");
      return;
    }

    setRoomName(room.title);
    setMembers(room.members || [currenMember]);
    setVisibility(room.isPublic ? "public" : "private");
  }, [roomId, rooms, navigate]);

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

  const handleUpdateRoom = () => {
    if (!roomName.trim()) {
      alert("방 이름을 입력해주세요.");
      return;
    }

    if (!roomId) return;

    updateRoom({
      id: parseFloat(roomId),
      title: roomName,
      members,
      isPublic: visibility === "public",
    });

    setCurrentRoomTitle(roomName);
    alert("방 정보가 수정되었습니다!");
    navigate(`/rooms/${roomId}`);
  };

  return (
    <FormContainer>
      <PageTitle>방 정보 수정</PageTitle>
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
        <CreateButton onClick={handleUpdateRoom} content="수정" />
        <CancelButton
          onClick={() => navigate(`/rooms/${roomId}`)}
          content="취소"
        />
      </ButtonContainer>
    </FormContainer>
  );
};

export default RoomEdit;

const FormContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const PageTitle = styled.h1`
  color: #036635;
  margin-bottom: 2rem;
  text-align: center;
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
