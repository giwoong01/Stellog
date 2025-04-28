import React, { useState } from "react";
import useKakaoMap from "../hooks/useKakaoMap";
import locations from "../data/locations.json";
import LocationDetailModal from "../components/modals/LocationDetailModal";

const RoomDetail: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  useKakaoMap("map", locations, handleMarkerClick);

  return (
    <>
      <div id="map" style={{ width: "100%", height: "60rem" }} />

      {selectedLocation && (
        <LocationDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          location={selectedLocation}
        />
      )}
    </>
  );
};

export default RoomDetail;
