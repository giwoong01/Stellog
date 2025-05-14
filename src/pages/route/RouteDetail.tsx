import styled from "styled-components";
import useKakaoMap from "../../hooks/useKakaoMap";
import locations from "../../data/locations.json";
import { useRoomStore } from "../../stores/useRoomStore";
import SelectedLocationList from "../../components/route/SelectedLocationList";

const RouteDetail = () => {
  const { currentRoomId } = useRoomStore();

  // RoomId + RouteId에 따른 동선 정보 API 호출 예정 -> 현재는 더미 데이터 사용
  useKakaoMap("map", locations, () => {}, locations, true);

  return (
    <DetailContainer>
      <MapContainer id="map" />

      <SelectedLocationList
        locations={locations}
        isOptimized={true}
        optimizedLocations={locations}
      />
    </DetailContainer>
  );
};

export default RouteDetail;

const DetailContainer = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100vh;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 60rem;
`;
