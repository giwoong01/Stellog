import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import RouteGrid from "../../components/route/list/RouteGrid";
import styled from "styled-components";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { Route } from "../../types/components/route";
import { getPopularRoutes } from "../../api/route";

const RouteList = () => {
  const navigate = useNavigate();

  const [routes, setRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    getPopularRoutes().then((response) => {
      if (Array.isArray(response)) {
        setRoutes(response);
      } else if (response && Array.isArray(response.routes)) {
        setRoutes(response.routes);
      } else {
        setRoutes([]);
      }
      setIsLoading(false);
    });
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const routesPerPage = 12;
  const totalPages = Math.ceil((routes.length - 12) / 12) + 1;
  const startIndex = currentPage === 1 ? 0 : 12 + (currentPage - 2) * 12;
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

      <PopularRouteText>가장 인기있는 최적화 동선입니다.</PopularRouteText>

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
        {isLoading ? (
          <LoadingMessage>로딩 중...</LoadingMessage>
        ) : (
          <RouteGrid
            currentPage={currentPage}
            routes={currentRoutes}
            onClick={(routeId) => {
              navigate(`/routes/${routeId}`);
            }}
          />
        )}
      </GridWrapper>
    </PageWrapper>
  );
};

export default RouteList;

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

const PopularRouteText = styled.div`
  color: #0e0e0e;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
  margin: 0.5rem 0 0 0;
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
