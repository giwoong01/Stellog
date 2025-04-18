import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const navigate = useNavigate();

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setMemberInfo(null);
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
