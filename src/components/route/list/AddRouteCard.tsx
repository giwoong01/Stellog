import styled from "styled-components";

const AddRouteCard = ({ onClick }: { onClick: () => void }) => {
  return <AddCard onClick={onClick}>+</AddCard>;
};

export default AddRouteCard;

const AddCard = styled.div`
  width: 21.25rem;
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  background-color: white;
  border: 0rem;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  cursor: pointer;
  padding: 0.2rem 0 0 0;
`;
