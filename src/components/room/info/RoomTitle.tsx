import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ReactComponent as EditIconSVG } from "../../../assets/icons/edit.svg";
import { useRoomStore } from "../../../stores/useRoomStore";

export interface RoomTitleProps {
  title: string;
}

const RoomTitle = ({ title }: RoomTitleProps) => {
  const navigate = useNavigate();
  const currentRoomId = useRoomStore((state) => state.currentRoomId);

  const handleEditClick = () => {
    navigate(`/rooms/${currentRoomId}/edit`);
  };

  return (
    <TitleContainer>
      <Title>{title}</Title>
      <EditButton onClick={handleEditClick} title="방 수정">
        <StyledEditIcon />
      </EditButton>
    </TitleContainer>
  );
};

export default RoomTitle;

const TitleContainer = styled.div`
  width: 50%;
  position: relative;
  margin-bottom: 1rem;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  padding: 0.2rem 0 0.2rem 0;
  font-size: 2rem;
  font-weight: bold;
`;

const EditButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }

  &[title]:hover::after {
    content: attr(title);
    position: absolute;
    bottom: -25px;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 0.3rem 0.6rem;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
  }
`;

const StyledEditIcon = styled(EditIconSVG)`
  width: 1.5rem;
  height: 1.5rem;
  color: #036635;
`;
