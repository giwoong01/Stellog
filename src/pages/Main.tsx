import React, { useState } from "react";
import useKakaoMap from "../hooks/useKakaoMap";
import LocationDetailModal from "../components/modals/LocationDetailModal";
import locations from "../data/locations.json";
import styled from "styled-components";
import MemberInfo from "../components/MemberInfo";

const Main: React.FC = () => {
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberInfo, setMemberInfo] = useState<{
    name: string;
    imageUrl: string;
  } | null>(null);

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setMemberInfo({
      name: "웅이",
      imageUrl:
        "https://storage.googleapis.com/image-gcs/project/3/33190dd8-ad66-4186-ba4e-e2763f371b5b",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMemberInfo({
      name: "웅이",
      imageUrl:
        "https://storage.googleapis.com/image-gcs/project/3/33190dd8-ad66-4186-ba4e-e2763f371b5b",
    });
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

      <MemberInfo
        isLoggedIn={isLoggedIn}
        userInfo={memberInfo}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />
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
