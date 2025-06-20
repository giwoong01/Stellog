import styled from "styled-components";
import RoomTitle from "../../components/room/info/RoomTitle";
import RoomUserInfo from "../../components/room/info/RoomUserInfo";
import RoomVisitStatus from "../../components/room/info/RoomVisitStatus";
import RoomVisitList from "../../components/room/info/RoomVisitList";
import { useRoomStore } from "../../stores/useRoomStore";
import BadgeGrid from "../../components/BadgeGrid";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RoomInfo = () => {
  const { roomId } = useParams();
  const { room, setRoom } = useRoomStore();
  const ownerId = room?.roomMembers[0]?.id;

  useEffect(() => {
    if (roomId) {
      setRoom(Number(roomId));
    }
  }, []);

  return (
    <Wrapper>
      <RoomTitle roomId={room?.id || 0} title={room?.name || ""} />

      <MainGrid>
        <SectionLabel>사용자</SectionLabel>
        <SectionLabel>배지</SectionLabel>
        <LeftSection>
          {room?.roomMembers.map((member) => (
            <RoomUserInfo
              key={member.id}
              user={member}
              isOwner={member.id === ownerId}
            />
          ))}
        </LeftSection>
        <RightSection>
          <BadgeGrid badges={room?.roomBadgeDtos || []} />
          <StatusCard>
            <RoomVisitStatus visitCount={room?.visitedStarbucksCount || 0} />
          </StatusCard>
        </RightSection>
      </MainGrid>

      <RoomVisitList visits={room?.reviews || []} />
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
