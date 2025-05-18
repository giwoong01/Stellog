import React, { useState } from "react";
import styled from "styled-components";

interface DropdownOption {
  id: number;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: number | null;
  onChange: (id: number) => void;
  placeholder?: string;
  width?: string;
}

const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = "선택",
  width = "40%",
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id: number) => {
    onChange(id);
    setIsOpen(false);
  };

  const selectedOption = options.find((option) => option.id === value);

  return (
    <Container width={width}>
      <Button onClick={() => setIsOpen(!isOpen)}>
        {selectedOption?.label || placeholder}
        <Arrow isOpen={isOpen}>▼</Arrow>
      </Button>
      {isOpen && (
        <List>
          {options.map((option) => (
            <Item
              key={option.id}
              onClick={() => handleSelect(option.id)}
              isSelected={option.id === value}
            >
              {option.label}
            </Item>
          ))}
        </List>
      )}
    </Container>
  );
};

export default Dropdown;

const Container = styled.div<{ width: string }>`
  position: relative;
  width: ${({ width }) => width};
  margin-bottom: 0.5rem;
`;

const Button = styled.button`
  width: 100%;
  padding: 0.8rem 1rem;
  background: white;
  border: 1px solid #036635;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: #333;

  &:hover {
    background: #f8f9fa;
  }
`;

const Arrow = styled.span<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease-in-out;
`;

const List = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #036635;
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
  max-height: 15rem;
  overflow-y: auto;
  z-index: 1000;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #036635;
    border-radius: 0.2rem;
  }
`;

const Item = styled.div<{ isSelected: boolean }>`
  padding: 0.8rem 1rem;
  cursor: pointer;
  background: ${({ isSelected }) => (isSelected ? "#e6f3ed" : "white")};
  color: ${({ isSelected }) => (isSelected ? "#036635" : "#333")};

  &:hover {
    background: #f8f9fa;
  }

  &:last-child {
    border-radius: 0 0 0.5rem 0.5rem;
  }
`;
