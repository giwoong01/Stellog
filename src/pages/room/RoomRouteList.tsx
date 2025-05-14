import { useState } from "react";
import SearchBar from "../../components/SearchBar";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import routes from "../../data/routes.json";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../../stores/useRoomStore";
import RouteGrid from "../../components/route/list/RouteGrid";

const RoomRouteList = () => {
  const navigate = useNavigate();
  const { currentRoomId } = useRoomStore();

  const [currentPage, setCurrentPage] = useState(1);
  const routesPerPage = currentPage === 1 ? 11 : 12;
  const totalPages = Math.ceil((routes.length - 11) / 12) + 1;
  const startIndex = currentPage === 1 ? 0 : 11 + (currentPage - 2) * 12;
  const currentRoutes = routes.slice(startIndex, startIndex + routesPerPage);

  return (
    <PageWrapper>
      <SearchBarWrapper>
        <SearchBar
          placeholder="최적화 동선을 검색해주세요."
          onClick={() => {
            alert("검색 기능은 아직 구현되지 않았습니다.");
          }}
        />
      </SearchBarWrapper>

      <PaginationWrapper>
        {currentRoutes.length !== 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </PaginationWrapper>

      <GridWrapper>
        <RouteGrid
          currentPage={currentPage}
          routes={currentRoutes}
          onClick={(routeId) => {
            navigate(`/rooms/${currentRoomId}/routes/${routeId}`);
          }}
          showAddButton={true}
        />
      </GridWrapper>
    </PageWrapper>
  );
};

export default RoomRouteList;

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
