import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import RoomGrid from "../../components/room/list/RoomGrid";
import Pagination from "../../components/Pagination";
import { useRoomStore } from "../../stores/useRoomStore";
import LoadingSpinner from "../../components/LoadingSpinner";

const RoomList = () => {
  const { rooms, setRooms, isLoading } = useRoomStore();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setRooms();
  }, []);

  const roomsPerPage = currentPage === 1 ? 5 : 6;
  const totalPages = Math.ceil((rooms.length - 5) / 6) + 1;
  const startIndex = currentPage === 1 ? 0 : 5 + (currentPage - 2) * 6;
  const currentRooms = rooms.slice(startIndex, startIndex + roomsPerPage);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PageWrapper>
      <SearchBarWrapper>
        <SearchBar
          placeholder="방을 검색해주세요."
          onClick={() => {
            alert("검색 기능은 아직 구현되지 않았습니다.");
          }}
        />
      </SearchBarWrapper>

      <PaginationWrapper>
        {currentRooms.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </PaginationWrapper>

      <GridWrapper>
        <RoomGrid currentPage={currentPage} rooms={currentRooms} />
      </GridWrapper>
    </PageWrapper>
  );
};

export default RoomList;

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
`;

const GridWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow-y: auto;
  margin-top: 1rem;
`;
