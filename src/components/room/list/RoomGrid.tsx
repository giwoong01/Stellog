import styled from "styled-components";
import RoomCard from "./RoomCard";
import AddRoomCard from "./AddRoomCard";
import { useNavigate } from "react-router-dom";

interface Room {
  id: number;
  title: string;
  members: {
    id: number;
    name: string;
    profileImage: string;
  }[];
  visitsCount: number;
  isPublic: boolean;
}

interface RoomGridProps {
  currentPage: number;
  rooms: Room[];
}

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
            key={room.id}
            title={room.title}
            members={room.members}
            visitsCount={room.visitsCount}
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
  margin-top: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  width: fit-content;
`;
