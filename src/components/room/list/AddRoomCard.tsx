import styled from "styled-components";

const AddRoomCard = ({ onClick }: { onClick: () => void }) => {
  return <AddCard onClick={onClick}>+</AddCard>;
};

export default AddRoomCard;

const AddCard = styled.div`
  width: 25rem;
  height: 11.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background-color: white;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 2px solid #036635;
  border-radius: 12px 12px 0 0;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;
