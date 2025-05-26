import { useEffect, useState } from "react";
import useKakaoMap from "../../hooks/useKakaoMap";
import locations from "../../data/locations.json";
import LocationDetailModal from "../../components/modals/LocationDetailModal";
import styled from "styled-components";
import { useRoomStore } from "../../stores/useRoomStore";
import { useParams } from "react-router-dom";

const RoomDetail = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { roomId } = useParams();
  const { room, setRoom } = useRoomStore();

  useEffect(() => {
    const loadRoomData = async () => {
      if (roomId) {
        await setRoom(Number(roomId));
      }
    };

    loadRoomData();
  }, [roomId]);

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  useKakaoMap("map", locations, handleMarkerClick);

  return (
    <RoomDetailContainer>
      <RoomTitleContainer>
        <RoomTitle>{room?.roomName}</RoomTitle>
      </RoomTitleContainer>

      <MapContainer id="map" />

      {selectedLocation && (
        <LocationDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          location={selectedLocation}
          isRoom={true}
        />
      )}
    </RoomDetailContainer>
  );
};

export default RoomDetail;

const RoomDetailContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const RoomTitleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 5rem;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RoomTitle = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 60rem;
`;
