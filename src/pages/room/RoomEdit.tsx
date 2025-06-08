import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useRoomStore } from "../../stores/useRoomStore";
import { useNavigate, useParams } from "react-router-dom";

import NameInput from "../../components/NameInput";
import MemberSelector from "../../components/room/create/MemberSelector";
import VisibilitySelector from "../../components/room/create/VisibilitySelector";
import CreateButton from "../../components/CreateButton";
import CancelButton from "../../components/CancelButton";
import { useAuthStore } from "../../stores/useAuthStore";
import DeleteButton from "../../components/DeleteButton";
import { getMembers } from "../../api/member";
import { MemberInfo } from "../../types/components/member";

const RoomEdit = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { room, setRoom, updateRoom, deleteRoom } = useRoomStore();

  const [roomName, setRoomName] = useState("");
  const [search, setSearch] = useState("");
  const [filteredMembers, setFilteredMembers] = useState<MemberInfo[]>([]);
  const [members, setMembers] = useState<MemberInfo[]>([]);
  const [otherMemberIds, setOtherMemberIds] = useState<number[]>([]);
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const { memberInfo, fetchMemberInfo } = useAuthStore();

  const handleSearchChange = async (value: string) => {
    setSearch(value);

    try {
      const response = await getMembers({ name: value });
      setFilteredMembers(response);
    } catch (error) {
      console.error("멤버 검색 중 오류 발생:", error);
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
    const loadInitialData = async () => {
      await fetchMemberInfo();
      if (roomId) {
        await setRoom(Number(roomId));
      }
    };

    loadInitialData();
  }, [roomId]);

  useEffect(() => {
    if (room?.name) {
      setRoomName(room.name);
    }

    if (room?.roomMembers) {
      const initialMembers = room.roomMembers.map((member) => ({
        id: member.id,
        name: member.name,
        email: "",
        nickName: member.name,
        profileImgUrl: "",
        roomCount: 0,
        reviewCount: 0,
        followingCount: 0,
        followerCount: 0,
        provider: "",
      }));
      setMembers(initialMembers);
      setOtherMemberIds(room.roomMembers.map((member) => member.id));
    }
  }, [room]);

  const handleUpdateRoom = async () => {
    if (!memberInfo?.id) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    if (!roomName.trim()) {
      alert("방 이름을 입력해주세요.");
      return;
    }

    if (!roomId) return;

    const memberIdList = [memberInfo.id, ...otherMemberIds];

    await updateRoom(Number(roomId), {
      name: roomName,
      isPublic: visibility === "public",
      memberIdList,
    });

    alert("방 정보가 수정되었습니다!");
    navigate(`/rooms/${roomId}`);
  };

  const handleDeleteRoom = async () => {
    if (!roomId) return;

    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteRoom(Number(roomId));
      navigate(`/rooms`);
    }
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
          currentMemberId={memberInfo?.id || 0}
        />
        <VisibilitySelector visibility={visibility} onChange={setVisibility} />
      </SearchRadioContainer>
      <ButtonContainer>
        <CreateButton onClick={handleUpdateRoom} content="수정" />
        <CancelButton
          onClick={() => navigate(`/rooms/${roomId}`)}
          content="취소"
        />
        <DeleteButton onClick={handleDeleteRoom} content="삭제" />
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
