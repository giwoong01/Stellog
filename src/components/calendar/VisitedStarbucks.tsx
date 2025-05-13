import { CalendarItem } from "../../pages/RoomCalendar";
import { ReactComponent as VisitedStarbucksIconSVG } from "../../assets/icons/category.svg";
import { ReactComponent as CoffeeIconSVG } from "../../assets/icons/coffee.svg";
import styled from "styled-components";

interface VisitedStarbucksProps {
  visited: CalendarItem[];
}

const VisitedStarbucks = ({ visited }: VisitedStarbucksProps) => {
  return (
    <VisitedStarbucksContainer>
      <VisitedStarbucksTitle>
        <StyledVisitedStarbucksIcon />
        방문한 스타벅스
      </VisitedStarbucksTitle>
      {visited.length ? (
        <VisitedStarbucksListContainer>
          {visited.map((item, idx) => (
            <VisitedStarbucksItem key={idx}>
              <StyledCoffeeIcon />
              {item.name}
            </VisitedStarbucksItem>
          ))}
        </VisitedStarbucksListContainer>
      ) : (
        <></>
      )}
    </VisitedStarbucksContainer>
  );
};

export default VisitedStarbucks;

const VisitedStarbucksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledVisitedStarbucksIcon = styled(VisitedStarbucksIconSVG)`
  width: 1.2rem;
  height: 1.2rem;
`;

const VisitedStarbucksTitle = styled.div`
  width: 40%;
  color: #0e0e0e;
  font-weight: bold;
  background-color: #f48f9b;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const VisitedStarbucksListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const VisitedStarbucksItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.3rem;
`;

const StyledCoffeeIcon = styled(CoffeeIconSVG)`
  width: 1.2rem;
  height: 1.2rem;
`;
