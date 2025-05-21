import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useKakaoMap from "../hooks/useKakaoMap";
import LocationDetailModal from "../components/modals/LocationDetailModal";
import locations from "../data/locations.json";
import styled from "styled-components";
import MemberInfo from "../components/MemberInfo";
import { useAuthStore } from "../stores/useAuthStore";

const Main = () => {
  const navigate = useNavigate();
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, memberInfo, fetchMemberInfo, logout } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      fetchMemberInfo();
    }
  }, [isLoggedIn]);

  const handleMarkerClick = (location: any) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    await logout();
  };

  useKakaoMap("map", locations, handleMarkerClick);

  return (
    <MainContainer>
      <MapContainer id="map" />

      {selectedLocation && (
        <LocationDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          location={selectedLocation}
        />
      )}

      <MemberInfo
        isLoggedIn={isLoggedIn}
        memberInfo={memberInfo}
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

const MapContainer = styled.div`
  width: 100%;
  height: 60rem;
`;
