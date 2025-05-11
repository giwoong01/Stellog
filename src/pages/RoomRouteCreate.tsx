import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useKakaoMap from "../hooks/useKakaoMap";
import locations from "../data/locations.json";
import RouteNameModal from "../components/modals/RouteNameModal";
import { useRoomStore } from "../stores/useRoomStore";
import styled from "styled-components";
import SelectedLocationList from "../components/route/SelectedLocationList";

const RoomRouteCreate = () => {
  const navigate = useNavigate();
  const [selectedLocations, setSelectedLocations] = useState<any[]>([]);
  const [optimizedLocations, setOptimizedLocations] = useState<any[]>([]);
  const [isOptimized, setIsOptimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routeName, setRouteName] = useState("");
  const { currentRoomId } = useRoomStore();

  const handleMarkerClick = (location: any) => {
    if (isOptimized) return;
    if (!selectedLocations.find((l) => l.name === location.name)) {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  useKakaoMap(
    "map",
    locations,
    handleMarkerClick,
    isOptimized ? optimizedLocations : selectedLocations,
    isOptimized
  );

  const handleRemove = (name: string) => {
    setSelectedLocations(selectedLocations.filter((l) => l.name !== name));
  };

  const handleComplete = async () => {
    // 최적화 API 호출 예정
    setOptimizedLocations([...selectedLocations]);
    setIsOptimized(true);
  };

  const handleEditClick = () => {
    setIsOptimized(false);
    setOptimizedLocations([]);
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  const handleSaveRoute = async () => {
    setIsModalOpen(false);
    // 동선 저장 API 호출 예정
    navigate(`/rooms/${currentRoomId}/routes`);
  };

  return (
    <RoomRouteDetailContainer>
      <MapContainer id="map" />

      <SelectedLocationList
        locations={selectedLocations}
        isOptimized={isOptimized}
        optimizedLocations={optimizedLocations}
        onRemove={handleRemove}
        showButtons={true}
        onComplete={handleComplete}
        onSave={handleSaveClick}
        onEdit={handleEditClick}
      />

      {isModalOpen && (
        <RouteNameModal
          value={routeName}
          onChange={setRouteName}
          onSave={handleSaveRoute}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </RoomRouteDetailContainer>
  );
};

export default RoomRouteCreate;

const RoomRouteDetailContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 60rem;
`;
