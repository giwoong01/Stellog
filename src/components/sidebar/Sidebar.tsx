import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/icons/logo.svg";
import { ReactComponent as RoomIconSVG } from "../../assets/icons/room.svg";
import { ReactComponent as MapIconSVG } from "../../assets/icons/map.svg";
import { ReactComponent as CalendarIconSVG } from "../../assets/icons/calendar.svg";
import { ReactComponent as RouteCalculationIconSVG } from "../../assets/icons/route-calculation.svg";
import { ReactComponent as RoomInfoIconSVG } from "../../assets/icons/room-info.svg";
import { ReactComponent as RoutesIconSVG } from "../../assets/icons/routes.svg";
import { ReactComponent as MyRouteIconSVG } from "../../assets/icons/my-route.svg";
import { ReactComponent as SavedRoutesIconSVG } from "../../assets/icons/saved-routes.svg";
import { ReactComponent as MyPageIconSVG } from "../../assets/icons/mypage.svg";
import { ReactComponent as ReviewIconSVG } from "../../assets/icons/review.svg";
import SidebarMenu from "./SidebarMenu";
import { useRoomStore } from "../../stores/useRoomStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoomId = useRoomStore((state) => state.currentRoomId);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const subMenuData = {
    rooms: [
      {
        label: "지도",
        Icon: StyledSubMapIcon,
        path: `/rooms/${currentRoomId}`,
      },
      {
        label: "캘린더",
        Icon: StyledSubCalendarIcon,
        path: `/rooms/${currentRoomId}/calendar`,
      },
      {
        label: "동선 계산",
        Icon: StyledSubRouteCalculationIcon,
        path: `/rooms/${currentRoomId}/routes`,
      },
      {
        label: "방 정보",
        Icon: StyledSubRoomInfoIcon,
        path: `/rooms/${currentRoomId}/info`,
      },
    ],
    routes: [
      {
        label: "내 동선",
        Icon: StyledSubMyRouteIcon,
        path: "/routes/my",
      },
      {
        label: "저장한 동선",
        Icon: StyledSubSavedRoutesIcon,
        path: "/routes/star",
      },
    ],
    mypage: [
      {
        label: "내 리뷰",
        Icon: StyledSubReviewIcon,
        path: "/mypages/reviews",
      },
      {
        label: "내 캘린더",
        Icon: StyledSubCalendarIcon,
        path: "/mypages/calendar",
      },
    ],
  };

  const toggleSubMenu = (menu: string) => {
    setOpenSubMenu(openSubMenu === menu ? null : menu);
  };

  // 현재 경로에 따라 서브 메뉴를 열기
  useEffect(() => {
    if (location.pathname.startsWith("/rooms/")) {
      setOpenSubMenu("rooms");
    } else if (location.pathname.startsWith("/routes")) {
      setOpenSubMenu("routes");
    } else if (location.pathname.startsWith("/mypages")) {
      setOpenSubMenu("mypages");
    } else {
      setOpenSubMenu(null);
    }
  }, [location.pathname]);

  return (
    <SidebarContainer>
      <LogoContainer>
        <StyledLogo
          onClick={() => {
            navigate("/");
            setOpenSubMenu(null);
          }}
        />
      </LogoContainer>

      <MenuContainer>
        <SidebarMenu
          label="방"
          icon={StyledRoomIcon}
          subMenuItems={subMenuData.rooms}
          basePath="/rooms"
          isOpen={openSubMenu === "rooms"}
          menu="rooms"
          toggleSubMenu={toggleSubMenu}
        />
        <SidebarMenu
          label="동선조회"
          icon={StyledRouteIcon}
          subMenuItems={subMenuData.routes}
          basePath="/routes"
          isOpen={openSubMenu === "routes"}
          menu="routes"
          toggleSubMenu={toggleSubMenu}
        />
        <SidebarMenu
          label="마이페이지"
          icon={StyledMyPageIcon}
          subMenuItems={subMenuData.mypage}
          basePath="/mypages"
          isOpen={openSubMenu === "mypages"}
          menu="mypages"
          toggleSubMenu={toggleSubMenu}
        />
      </MenuContainer>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 2px solid #036635;
  border-radius: 1rem;
  position: fixed;
  z-index: 1000;
  align-items: center;

  left: 3.75rem;
  top: 1.875rem;
  padding: 0.2rem;

  background-color: #ffffff;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  padding-bottom: 0.8rem;
`;

const StyledLogo = styled(Logo)`
  cursor: pointer;
`;

const MenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const commonIconStyles = css<{ isSelected: boolean }>`
  width: ${({ isSelected, theme }) =>
    isSelected ? theme.icon.iconSelectedWidth : theme.icon.iconDefaultWidth};
  height: ${({ isSelected, theme }) =>
    isSelected ? theme.icon.iconSelectedHeight : theme.icon.iconDefaultHeight};
  transition: all 0.3s ease;
  cursor: pointer;
  padding-bottom: 0.3rem;

  path {
    fill: ${({ isSelected, theme }) =>
      isSelected ? theme.icon.iconActive : theme.icon.iconDefault};
  }
`;

const StyledRoomIcon = styled(RoomIconSVG)<{ isSelected: boolean }>`
  ${commonIconStyles}
`;

const StyledRouteIcon = styled(RoutesIconSVG)<{ isSelected: boolean }>`
  ${commonIconStyles}
`;

const StyledMyPageIcon = styled(MyPageIconSVG)<{ isSelected: boolean }>`
  ${commonIconStyles}
`;

const commonSubIconStyles = css<{ isSelected: boolean }>`
  width: ${({ isSelected, theme }) =>
    isSelected
      ? theme.icon.subIconSelectedWidth
      : theme.icon.subIconDefaultWidth};
  height: ${({ isSelected, theme }) =>
    isSelected
      ? theme.icon.subIconSelectedHeight
      : theme.icon.subIconDefaultHeight};
  transition: all 0.3s ease;
  cursor: pointer;
  padding-bottom: 0.3rem;

  path {
    fill: ${({ isSelected, theme }) =>
      isSelected ? theme.icon.iconActive : theme.icon.iconDefault};
  }
`;

const StyledSubMapIcon = styled(MapIconSVG)<{ isSelected: boolean }>`
  ${commonSubIconStyles}
`;

const StyledSubCalendarIcon = styled(CalendarIconSVG)<{ isSelected: boolean }>`
  ${commonSubIconStyles}
`;

const StyledSubRouteCalculationIcon = styled(RouteCalculationIconSVG)<{
  isSelected: boolean;
}>`
  ${commonSubIconStyles}
`;

const StyledSubRoomInfoIcon = styled(RoomInfoIconSVG)<{ isSelected: boolean }>`
  ${commonSubIconStyles}
`;

const StyledSubMyRouteIcon = styled(MyRouteIconSVG)<{ isSelected: boolean }>`
  ${commonSubIconStyles}
`;

const StyledSubSavedRoutesIcon = styled(SavedRoutesIconSVG)<{
  isSelected: boolean;
}>`
  ${commonSubIconStyles}
`;

const StyledSubReviewIcon = styled(ReviewIconSVG)<{ isSelected: boolean }>`
  ${commonSubIconStyles}
`;
