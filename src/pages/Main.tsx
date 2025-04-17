import React, { useState } from "react";
import useKakaoMap from "../hooks/useKakaoMap";
import LocationDetailModal from "../components/modals/LocationDetailModal";
import locations from "../data/locations.json";
import styled from "styled-components";

const Main: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  useKakaoMap("map", locations, handleMarkerClick);

  return (
    <MainContainer>
      <div id="map" style={{ width: "100%", height: "60rem" }} />

      {selectedLocation && (
        <LocationDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          location={selectedLocation}
        />
      )}
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;
