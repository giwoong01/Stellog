import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import { useNavigate, useParams } from "react-router-dom";
import RouteGrid from "../../components/route/list/RouteGrid";
import { getRoomRoutes } from "../../api/route";
import { Route } from "../../types/components/route";

const RoomRouteList = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const routesPerPage = currentPage === 1 ? 11 : 12;

  useEffect(() => {
    if (!roomId) return;
    setIsLoading(true);

    getRoomRoutes(Number(roomId)).then((response) => {
      if (Array.isArray(response)) {
        setRoutes(response);
      } else if (response && Array.isArray(response.routes)) {
        setRoutes(response.routes);
      } else {
        setRoutes([]);
      }
      setIsLoading(false);
    });
  }, [roomId]);

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

      {isLoading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : (
        <>
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
                navigate(`/rooms/${roomId}/routes/${routeId}`);
              }}
              showAddButton={true}
            />
          </GridWrapper>
        </>
      )}
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;
