import React, { useState } from "react";
import styled from "styled-components";
import RoomSearchBar from "../components/room/list/RoomSearchBar";
import RoomGrid from "../components/room/list/RoomGrid";
import Pagination from "../components/Pagination";
import { useRoomStore } from "../stores/useRoomStore";

const Room = () => {
  const { rooms } = useRoomStore();
  const [currentPage, setCurrentPage] = useState(1);

  const roomsPerPage = currentPage === 1 ? 5 : 6;
  const totalPages = Math.ceil((rooms.length - 5) / 6) + 1;
  const startIndex = currentPage === 1 ? 0 : 5 + (currentPage - 2) * 6;
  const currentRooms = rooms.slice(startIndex, startIndex + roomsPerPage);

  return (
    <PageWrapper>
      <RoomSearchBar />
      <RoomGrid currentPage={currentPage} rooms={currentRooms} />
      {currentRooms.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </PageWrapper>
  );
};

export default Room;

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 0;
`;
