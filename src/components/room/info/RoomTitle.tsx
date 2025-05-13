import styled from "styled-components";

export interface RoomTitleProps {
  title: string;
}

const RoomTitle = ({ title }: RoomTitleProps) => {
  return <Title>{title}</Title>;
};

export default RoomTitle;

const Title = styled.div`
  width: 50%;
  text-align: center;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  padding: 0.2rem 0 0.2rem 0;
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;
