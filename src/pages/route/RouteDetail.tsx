import styled from "styled-components";
import useKakaoMap from "../../hooks/useKakaoMap";
import locations from "../../data/locations.json";
import SelectedLocationList from "../../components/route/SelectedLocationList";
import { ReactComponent as StarIconSVG } from "../../assets/icons/star.svg";
import { ReactComponent as StarFilledIconSVG } from "../../assets/icons/saved-routes.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getRouteDetail,
  postBookmarkRoute,
  deleteBookmarkRoute,
  deleteRoute,
} from "../../api/route";
import { Route } from "../../types/components/route";

const RouteDetail = () => {
  const { routeId, roomId } = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState<Route | null>(null);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isBookmarkLoading, setIsBookmarkLoading] = useState(false);

  useEffect(() => {
    if (!routeId) return;

    getRouteDetail(Number(routeId)).then((response) => {
      setRoute(response);
    });
  }, [routeId]);

  const handleBookmarkClick = async () => {
    if (!routeId || isBookmarkLoading) return;

    try {
      setIsBookmarkLoading(true);
      if (route?.isBookmarked) {
        await deleteBookmarkRoute(Number(routeId));
        setRoute((prev) =>
          prev
            ? {
                ...prev,
                isBookmarked: false,
                bookmarkCount: prev.bookmarkCount - 1,
              }
            : null
        );
      } else {
        await postBookmarkRoute(Number(routeId));
        setRoute((prev) =>
          prev
            ? {
                ...prev,
                isBookmarked: true,
                bookmarkCount: prev.bookmarkCount + 1,
              }
            : null
        );
      }
    } catch (error) {
      console.error("북마크 처리 중 오류가 발생했습니다:", error);
    } finally {
      setIsBookmarkLoading(false);
    }
  };

  const handleEditClick = () => {
    if (!routeId || !roomId || !route) return;
    navigate(`/rooms/${roomId}/routes/create`, {
      state: {
        routeId: route.id,
        routeName: route.name,
        starbucksList: route.starbucksList,
        isEdit: true,
      },
    });
  };

  const handleDeleteClick = async () => {
    if (!routeId || isDeleteLoading) return;

    if (!window.confirm("정말로 이 동선을 삭제하시겠습니까?")) return;

    try {
      setIsDeleteLoading(true);
      await deleteRoute(Number(routeId));
      navigate(-1);
    } catch (error) {
      console.error("동선 삭제 중 오류가 발생했습니다:", error);
    } finally {
      setIsDeleteLoading(false);
    }
  };

  useKakaoMap(
    "map",
    locations,
    () => {},
    (route?.starbucksList || []).map((s) => ({
      ...s,
      address: "",
    })),
    true
  );

  return (
    <DetailContainer>
      <RouteTitleContainer>
        <RouteTitle>{route?.name}</RouteTitle>
        <ButtonGroup>
          <StarIconWrapper
            onClick={handleBookmarkClick}
            style={{
              cursor: isBookmarkLoading ? "not-allowed" : "pointer",
              opacity: isBookmarkLoading ? 0.5 : 1,
            }}
          >
            {route?.isBookmarked ? <StarFilledIconSVG /> : <StarIconSVG />}
            {route?.bookmarkCount}
          </StarIconWrapper>
          {route?.isOwner && (
            <OwnerButtonGroup>
              <EditButton onClick={handleEditClick}>수정</EditButton>
              <DeleteButton
                onClick={handleDeleteClick}
                style={{
                  cursor: isDeleteLoading ? "not-allowed" : "pointer",
                  opacity: isDeleteLoading ? 0.5 : 1,
                }}
              >
                삭제
              </DeleteButton>
            </OwnerButtonGroup>
          )}
        </ButtonGroup>
      </RouteTitleContainer>

      <MapContainer id="map" />

      <SelectedLocationList
        locations={route?.starbucksList || []}
        isOptimized={true}
        optimizedLocations={route?.starbucksList || []}
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

const RouteTitleContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 5rem;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RouteTitle = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  font-size: 1.5rem;
  font-weight: bold;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  border-radius: 0.5rem;
  background-color: #fff;
`;

const StarIconWrapper = styled.div`
  display: flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  margin-left: 0.3rem;
  gap: 0.1rem;
  background-color: #fff;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-left: 0.3rem;
`;

const OwnerButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const EditButton = styled.div`
  display: flex;
  height: 1.2rem;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #036635;

  &:hover {
    background-color: #f8fafc;
  }
`;

const DeleteButton = styled.div`
  display: flex;
  height: 1.2rem;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-radius: 0.25rem;
  padding: 0 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  color: #e74c3c;

  &:hover {
    background-color: #f8fafc;
  }
`;
