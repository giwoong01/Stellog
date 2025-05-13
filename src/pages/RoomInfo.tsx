import styled from "styled-components";
import RoomTitle from "../components/room/info/RoomTitle";
import RoomUserInfo from "../components/room/info/RoomUserInfo";
import RoomVisitStatus from "../components/room/info/RoomVisitStatus";
import RoomVisitList from "../components/room/info/RoomVisitList";
import { useRoomStore } from "../stores/useRoomStore";

const dummyRoom = {
  name: "1인 제주도 스타벅스 방문",
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
  const { currentRoomTitle } = useRoomStore();

  return (
    <Wrapper>
      <RoomTitle title={currentRoomTitle || ""} />

      <MainGrid>
        <SectionLabel>사용자</SectionLabel>
        <SectionLabel>배지</SectionLabel>
        <LeftSection>
          {dummyRoom.user.map((user) => (
            <RoomUserInfo key={user.name} user={user} isOwner={user.isOwner} />
          ))}
        </LeftSection>
        <RightSection>
          <BadgeCard>
            <BadgeRow>
              {dummyRoom.badges.map((badge) => (
                <BadgeIcon key={badge} />
              ))}
            </BadgeRow>
          </BadgeCard>
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
  overflow-y: auto;
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const BadgeCard = styled.div`
  width: 100%;
  background: #fff;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.7rem 0.2rem 0.7rem 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1 1 0;
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

const BadgeRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem 0;
  padding-right: 0.3rem;
  justify-items: center;
`;

const BadgeIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: #215c3c;
  border-radius: 0.5rem;
  display: inline-block;
`;
