import styled from "styled-components";

interface CancelButtonProps {
  onClick: () => void;
  content?: string;
}

const CancelButton = ({ onClick, content }: CancelButtonProps) => {
  return <StyledButton onClick={onClick}>{content}</StyledButton>;
};

export default CancelButton;

const StyledButton = styled.button`
  margin-top: 2rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  color: #aaa;
  background-color: #e2e8f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;
