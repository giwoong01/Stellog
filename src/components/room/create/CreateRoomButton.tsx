import styled from "styled-components";

interface CreateRoomButtonProps {
  onClick: () => void;
}

const CreateRoomButton = ({ onClick }: CreateRoomButtonProps) => (
  <Button onClick={onClick}>생성</Button>
);

export default CreateRoomButton;

const Button = styled.button`
  margin-top: 2rem;
  padding: 0.4rem 1.2rem;
  font-size: 1rem;
  color: white;
  background-color: #036635;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #024c27;
  }
`;
