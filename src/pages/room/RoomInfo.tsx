import styled from "styled-components";
import RoomTitle from "../../components/room/info/RoomTitle";
import RoomUserInfo from "../../components/room/info/RoomUserInfo";
import RoomVisitStatus from "../../components/room/info/RoomVisitStatus";
import RoomVisitList from "../../components/room/info/RoomVisitList";
import { useRoomStore } from "../../stores/useRoomStore";
import BadgeGrid from "../../components/BadgeGrid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../../stores/useAuthStore";

const dummyRoom = {
  user: [
    { name: "최기웅1", isOwner: true },
    { name: "최기웅2", isOwner: false },
    { name: "최기웅3", isOwner: false },
    { name: "최기웅4", isOwner: false },
    { name: "최기웅5", isOwner: false },
    { name: "최기웅6", isOwner: false },
    { name: "최기웅7", isOwner: false },
    { name: "최기웅8", isOwner: false },
    { name: "최기웅9", isOwner: false },
    { name: "최기웅10", isOwner: false },
    { name: "최기웅11", isOwner: false },
    { name: "최기웅12", isOwner: false },
    { name: "최기웅13", isOwner: false },
    { name: "최기웅14", isOwner: false },
    { name: "최기웅15", isOwner: false },
    { name: "최기웅16", isOwner: false },
  ],
  badges: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  visitCount: 10,
  totalCount: 33,
  visits: [
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
    { memo: "아 여기 맛있더라", date: "2025.3.24", store: "제주성산DT점" },
  ],
};

const RoomInfo = () => {
  const { roomId } = useParams();
  const { room, setRoom } = useRoomStore();
  const { memberInfo, fetchMemberInfo } = useAuthStore();

  useEffect(() => {
    fetchMemberInfo();
    if (roomId) {
      setRoom(Number(roomId));
    }
  }, []);

  return (
    <Wrapper>
      <RoomTitle roomId={room?.roomId || 0} title={room?.roomName || ""} />

      <MainGrid>
        <SectionLabel>사용자</SectionLabel>
        <SectionLabel>배지</SectionLabel>
        <LeftSection>
          {room?.roomMembers.map((member) => (
            <RoomUserInfo
              key={member.id}
              user={member}
              isOwner={member.id === memberInfo?.id}
            />
          ))}
        </LeftSection>
        <RightSection>
          <BadgeGrid badges={dummyRoom.badges} />
          <StatusCard>
            <RoomVisitStatus
              visitCount={dummyRoom.visitCount}
              totalCount={dummyRoom.totalCount}
            />
          </StatusCard>
        </RightSection>
      </MainGrid>

      <RoomVisitList visits={dummyRoom.visits} />
    </Wrapper>
  );
};

export default RoomInfo;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background: #fff;
  margin-top: 2rem;
`;

const MainGrid = styled.div`
  width: 50%;
  height: 20rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr;
  gap: 0 2rem;
  margin-bottom: 2rem;
  align-items: stretch;
`;

const LeftSection = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  padding: 0.7rem 0;
  margin-top: 1rem;
  overflow-y: auto;
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const StatusCard = styled.div`
  width: 100%;
  background: #fff;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.7rem 0;
`;

const SectionLabel = styled.div`
  color: #215c3c;
  font-size: 1.05rem;
  font-weight: 500;
  margin-bottom: 0.1rem;
`;
