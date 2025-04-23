import styled from "styled-components";
import { ReactComponent as CoffeeIconSVG } from "../../../assets/icons/coffee.svg";
import { ReactComponent as PersonIconSVG } from "../../../assets/icons/person.svg";

interface RoomCardProps {
  title: string;
  members: {
    id: number;
    name: string;
    profileImage: string;
  }[];
  visitsCount: number;
}

const RoomCard = ({ title, members, visitsCount }: RoomCardProps) => {
  return (
    <Card>
      <Title>{title}</Title>
      <IconContainer>
        <Meta>
          <StyledCoffeeIcon />
          {visitsCount}
        </Meta>
        <Meta>
          {members.map(() => (
            <StyledPersonIcon />
          ))}
          {members.length}
        </Meta>
      </IconContainer>
    </Card>
  );
};

export default RoomCard;

const Card = styled.div`
  width: 25rem;
  height: 11.5rem;
  background-color: white;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  border-bottom: 2px solid #036635;
  border-radius: 12px 12px 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
`;

const Title = styled.h3`
  font-size: 1rem;
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* 최대 2줄 */
  -webkit-box-orient: vertical;
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
  margin-bottom: 1rem;
  gap: 0.5rem;
`;

const Meta = styled.div`
  font-size: 0.9rem;
  align-items: center;
  display: flex;
  gap: 0.2rem;
`;

const StyledCoffeeIcon = styled(CoffeeIconSVG)``;

const StyledPersonIcon = styled(PersonIconSVG)``;
