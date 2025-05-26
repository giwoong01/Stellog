import styled from "styled-components";

interface DeleteButtonProps {
  onClick: () => void;
  content?: string;
}

const DeleteButton = ({ onClick, content }: DeleteButtonProps) => {
  return <StyledButton onClick={onClick}>{content}</StyledButton>;
};

export default DeleteButton;

const StyledButton = styled.button`
  margin-top: 2rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  color: #fff;
  background-color: #e74c3c;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #ff0000;
  }
`;
