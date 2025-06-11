import { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useKakaoMap from "../../hooks/useKakaoMap";
import locations from "../../data/locations.json";
import RouteNameModal from "../../components/modals/RouteNameModal";
import styled from "styled-components";
import SelectedLocationList from "../../components/route/SelectedLocationList";
import { postOptimizeRoute, putRoute } from "../../api/route";

const RoomRouteCreate = () => {
  const navigate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const state = location.state as {
    routeId?: number;
    routeName?: string;
    starbucksList?: any[];
    isEdit?: boolean;
  };

  const [selectedLocations, setSelectedLocations] = useState<any[]>(
    state?.starbucksList || []
  );
  const [optimizedLocations, setOptimizedLocations] = useState<any[]>([]);
  const [isOptimized, setIsOptimized] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [routeName, setRouteName] = useState(state?.routeName || "");

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
    if (!roomId || selectedLocations.length === 0) return;

    try {
      const routeCreateRequest = {
        name: routeName || "임시동선",
        starbucksIds: selectedLocations.map((loc) => loc.id),
      };

      if (state?.isEdit && state?.routeId) {
        await putRoute(state.routeId, routeCreateRequest);
      } else {
        const result = await postOptimizeRoute(
          Number(roomId),
          routeCreateRequest
        );

        const nextOptimized = Array.isArray(result.optimizedLocations)
          ? result.optimizedLocations
          : Array.isArray(result)
          ? result
          : [];
        setOptimizedLocations(nextOptimized);
        setIsOptimized(true);
      }

      setIsModalOpen(false);
      navigate(`/rooms/${roomId}/routes`);
    } catch (e) {
      alert(state?.isEdit ? "수정 실패" : "최적화 실패");
    }
  };

  const handleEditClick = () => {
    setIsOptimized(false);
    setOptimizedLocations([]);
  };

  const handleSaveClick = () => {
    setIsModalOpen(true);
  };

  return (
    <RoomRouteDetailContainer>
      <MapContainer id="map" />

      <SelectedLocationList
        locations={selectedLocations}
        isOptimized={isOptimized}
        optimizedLocations={
          Array.isArray(optimizedLocations) ? optimizedLocations : []
        }
        onRemove={handleRemove}
        showButtons={true}
        onSave={handleSaveClick}
        onEdit={handleEditClick}
      />

      {isModalOpen && (
        <RouteNameModal
          value={routeName}
          onChange={setRouteName}
          onSave={handleComplete}
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
