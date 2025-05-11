// components/common/Pagination.tsx
import React from "react";
import styled from "styled-components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Wrapper>
      <PageButton
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        ◀
      </PageButton>
      {pageNumbers.map((page) => (
        <PageNumber
          key={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageNumber>
      ))}
      <PageButton
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        ▶
      </PageButton>
    </Wrapper>
  );
};

export default Pagination;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    gap: 0.5rem;
  }
`;

const PageButton = styled.button<{ disabled?: boolean }>`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  background-color: #f5f5f5;
  color: ${({ disabled }) => (disabled ? "#ccc" : "#036635")};
  padding: 0.3rem 0.5rem;
  border-radius: 4px;
  border: none;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "#036635")};
    color: ${({ disabled }) => (disabled ? "#ccc" : "#fff")};
  }
`;

const PageNumber = styled.button<{ isActive?: boolean }>`
  cursor: pointer;
  background-color: ${({ isActive }) => (isActive ? "#036635" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#036635")};
  padding: 0.5rem 0.75rem;
  border-radius: 4px;
  font-size: 0.875rem;
  border: none;

  &:hover {
    background-color: #036635;
    color: #fff;
  }
`;
