import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

interface SidebarSubMenuItem {
  label: string;
  Icon: React.ComponentType<{ isSelected: boolean }>;
  path: string;
}

interface SidebarSubMenuProps {
  items: SidebarSubMenuItem[];
  isOpen: boolean;
}

const SidebarSubMenu = ({ items, isOpen }: SidebarSubMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // 서브 메뉴가 열려야 하는 조건
  const shouldOpenSubMenu =
    (location.pathname.startsWith("/rooms/") &&
      location.pathname !== "/rooms" &&
      location.pathname !== "/rooms/create") ||
    location.pathname.startsWith("/routes") ||
    location.pathname.startsWith("/mypage");

  return (
    <SubMenuContainer isOpen={isOpen && shouldOpenSubMenu}>
      {items.map((item, index) => {
        const isSelected = location.pathname === item.path;

        return (
          <SubMenuItem
            key={index}
            isOpen={isOpen && shouldOpenSubMenu}
            delay={index * 0.15}
            onClick={() => navigate(item.path)}
          >
            <item.Icon isSelected={isSelected} />
            <SubMenuLabel isSelected={isSelected}>{item.label}</SubMenuLabel>
          </SubMenuItem>
        );
      })}
    </SubMenuContainer>
  );
};

export default SidebarSubMenu;

const SubMenuContainer = styled.div<{ isOpen: boolean }>`
  overflow: hidden;
  max-height: ${({ isOpen }) => (isOpen ? "50rem" : "0")};
  transition: max-height 0.5s ease;
`;

const SubMenuItem = styled.div<{
  isOpen: boolean;
  delay: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 0.5rem;
  cursor: pointer;

  opacity: ${({ isOpen }) => (isOpen ? "1" : "0")};
  transform: ${({ isOpen }) =>
    isOpen ? "translateY(0)" : "translateY(-10px)"};
  transition: opacity 0.5s ease, transform 0.5s ease;
  transition-delay: ${({ isOpen, delay }) => (isOpen ? `${delay}s` : "0s")};

  &:hover {
    opacity: 0.8;
  }
`;

const SubMenuLabel = styled.span<{ isSelected: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.small}; // 14px
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.textSecondary : theme.colors.text};
  transition: color 0.3s ease, font-size 0.3s ease;
`;
