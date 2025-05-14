import { useState } from "react";
import useKakaoMap from "../../hooks/useKakaoMap";
import locations from "../../data/locations.json";
import styled from "styled-components";

interface SavedRoute {
  id: number;
  name: string;
  locations: typeof locations;
  color: string;
}

// 임시 더미 데이터
const savedRoutes: SavedRoute[] = [
  { id: 1, name: "동선 이름1", locations: locations, color: "#4ade80" },
  { id: 2, name: "동선 이름2", locations: locations, color: "#f472b6" },
  { id: 3, name: "동선 이름3", locations: locations, color: "#60a5fa" },
  { id: 4, name: "동선 이름4", locations: locations, color: "#c084fc" },
  { id: 5, name: "동선 이름5", locations: locations, color: "#fb923c" },
  { id: 6, name: "동선 이름6", locations: locations, color: "#fbbf24" },
  { id: 7, name: "동선 이름7", locations: locations, color: "#34d399" },
  { id: 8, name: "동선 이름8", locations: locations, color: "#34d399" },
  { id: 9, name: "동선 이름9", locations: locations, color: "#34d399" },
  { id: 10, name: "동선 이름10", locations: locations, color: "#34d399" },
  { id: 11, name: "동선 이름11", locations: locations, color: "#34d399" },
  { id: 12, name: "동선 이름12", locations: locations, color: "#34d399" },
  { id: 13, name: "동선 이름13", locations: locations, color: "#34d399" },
  { id: 14, name: "동선 이름14", locations: locations, color: "#34d399" },
  { id: 15, name: "동선 이름15", locations: locations, color: "#34d399" },
  { id: 16, name: "동선 이름16", locations: locations, color: "#34d399" },
  { id: 17, name: "동선 이름17", locations: locations, color: "#34d399" },
];

const RouteStarList = () => {
  const [selectedRoutes, setSelectedRoutes] = useState<number[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  const selectedRoutesData = selectedRoutes.map((id) => {
    const route = savedRoutes.find((r) => r.id === id);
    return {
      locations: route?.locations || [],
      color: route?.color || "#4ade80",
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
          {savedRoutes.map((route) => (
            <RouteItem key={route.id}>
              <Checkbox
                checked={selectedRoutes.includes(route.id)}
                onClick={() => handleRouteToggle(route.id)}
                $color={route.color}
              />
              <RouteName>{route.name}</RouteName>
            </RouteItem>
          ))}
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
