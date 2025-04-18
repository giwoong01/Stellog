import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import SidebarSub from "./SidebarSubMenu";

interface SidebarMenuProps {
  label: string;
  icon: React.ComponentType<{ isSelected: boolean }>;
  subMenuItems: Array<{
    label: string;
    Icon: React.ComponentType<{ isSelected: boolean }>;
    path: string;
  }>;
  basePath: string;
  isOpen: boolean;
  menu: string;
  toggleSubMenu: (menu: string) => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({
  label,
  icon: Icon,
  subMenuItems,
  basePath,
  isOpen,
  menu,
  toggleSubMenu,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = location.pathname.startsWith(basePath);

  return (
    <>
      <MenuItem
        onClick={() => {
          navigate(basePath);
          toggleSubMenu(menu);
        }}
      >
        <Icon isSelected={isSelected} />
        <MenuLabel isSelected={isSelected}>{label}</MenuLabel>
      </MenuItem>
      <SidebarSub isOpen={isOpen} items={subMenuItems} />
    </>
  );
};

export default SidebarMenu;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1.2rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const MenuLabel = styled.span<{ isSelected: boolean }>`
  font-size: ${({ isSelected, theme }) =>
    isSelected ? theme.fontSizes.selectedText : theme.fontSizes.unSelectedText};
  color: ${({ isSelected, theme }) =>
    isSelected ? theme.colors.textSecondary : theme.colors.text};
  transition: color 0.3s ease, font-size 0.3s ease;
`;
