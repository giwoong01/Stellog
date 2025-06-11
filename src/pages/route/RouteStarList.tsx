import { useState, useEffect } from "react";
import useKakaoMap from "../../hooks/useKakaoMap";
import locations from "../../data/locations.json";
import styled from "styled-components";
import { getBookmarkedRoutes } from "../../api/route";
import { Route } from "../../types/components/route";
import { getRandomColor } from "../../utils/colors";

const RouteStarList = () => {
  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(true);
  const [savedRoutes, setSavedRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [routeColors, setRouteColors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchBookmarkedRoutes = async () => {
      try {
        setIsLoading(true);
        const response = await getBookmarkedRoutes();
        setSavedRoutes(response);

        const colors: { [key: number]: string } = {};
        response.forEach((route: Route) => {
          if (!colors[route.id]) {
            colors[route.id] = getRandomColor();
          }
        });
        setRouteColors(colors);
      } catch (error) {
        console.error("북마크된 동선 목록을 불러오는데 실패했습니다:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookmarkedRoutes();
  }, []);

  const selectedRoutesData = selectedRoutes.map((id) => {
    const route = savedRoutes.find((r) => r.id === id);
    return {
      locations: (route?.starbucksList || []).map((starbucks) => ({
        ...starbucks,
        address: "",
      })),
      color: routeColors[id] || "#4ade80",
    };
  });

  useKakaoMap(
    "map",
    locations,
    () => {},
    selectedRoutesData.flatMap((r) => r.locations),
    true,
    selectedRoutesData
  );

  const handleRouteToggle = (routeId: number) => {
    setSelectedRoutes((prev) =>
      prev.includes(routeId)
        ? prev.filter((id) => id !== routeId)
        : [...prev, routeId]
    );
  };

  return (
    <PageWrapper>
      <MapContainer id="map" />

      <RouteListContainer $isOpen={isOpen}>
        <ToggleButton onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
          {isOpen ? "▶" : "◀"}
        </ToggleButton>
        <RouteListTitle>저장된 동선 목록</RouteListTitle>

        <RouteList>
          {isLoading ? (
            <LoadingMessage>로딩 중...</LoadingMessage>
          ) : savedRoutes.length === 0 ? (
            <EmptyMessage>저장된 동선이 없습니다.</EmptyMessage>
          ) : (
            savedRoutes.map((route) => (
              <RouteItem key={route.id}>
                <Checkbox
                  checked={selectedRoutes.includes(route.id)}
                  onClick={() => handleRouteToggle(route.id)}
                  $color={routeColors[route.id] || "#4ade80"}
                />
                <RouteName>{route.name}</RouteName>
              </RouteItem>
            ))
          )}
        </RouteList>
      </RouteListContainer>
    </PageWrapper>
  );
};

export default RouteStarList;

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;

const RouteListContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  right: ${(props) => (props.$isOpen ? "0" : "-15rem")};
  top: 0;
  width: 15rem;
  height: 100vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
  transition: right 0.3s ease-in-out;
`;

const ToggleButton = styled.button<{ $isOpen: boolean }>`
  position: absolute;
  left: -2.5rem;
  top: 50%;
  transform: translateY(-50%);
  width: 2.5rem;
  height: 3rem;
  background-color: white;
  border: none;
  border-radius: 0.5rem 0 0 0.5rem;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #64748b;

  &:hover {
    color: #0f172a;
  }
`;

const RouteListTitle = styled.div`
  color: #0e0e0e;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const RouteList = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  overflow-y: auto;
  padding-right: 0.5rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const RouteItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem;
  background-color: white;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #f8fafc;
  }
`;

const Checkbox = styled.div<{ checked: boolean; $color: string }>`
  width: 1.5rem;
  height: 1.5rem;
  border: 2px solid ${(props) => (props.checked ? props.$color : "#cbd5e1")};
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) =>
    props.checked ? props.$color : "transparent"};
  transition: all 0.2s ease;
`;

const RouteName = styled.span`
  font-size: 1.1rem;
  color: #0e0e0e;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;
