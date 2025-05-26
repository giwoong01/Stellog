import styled from "styled-components";
import RoomCard from "./RoomCard";
import AddRoomCard from "./AddRoomCard";
import { useNavigate } from "react-router-dom";
import { RoomGridProps } from "../../../types/components/room";

const RoomGrid = ({ currentPage, rooms }: RoomGridProps) => {
  const navigate = useNavigate();

  const handleAddRoom = () => {
    navigate("/rooms/create");
  };

  return (
    <GridContainer>
      <Grid>
        {currentPage === 1 && <AddRoomCard onClick={handleAddRoom} />}

        {rooms.map((room) => (
          <RoomCard
            key={room.roomId}
            roomName={room.roomName}
            visitedStarbucksCount={room.visitedStarbucksCount}
            memberCount={room.memberCount}
            onClick={() => {
              navigate(`/rooms/${room.roomId}`);
            }}
          />
        ))}
      </Grid>
    </GridContainer>
  );
};

export default RoomGrid;

const GridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: fit-content;
`;
