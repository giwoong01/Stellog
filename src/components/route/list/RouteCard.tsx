import styled from "styled-components";
import { ReactComponent as CoffeeIconSVG } from "../../../assets/icons/coffee.svg";
import { ReactComponent as TimeIconSVG } from "../../../assets/icons/time.svg";
import { ReactComponent as DistanceIconSVG } from "../../../assets/icons/distance.svg";
import { ReactComponent as StarIconSVG } from "../../../assets/icons/star.svg";

export interface Route {
  id: number;
  title: string;
  start: string;
  end: string;
  cafeCount: number;
  time: string;
  distance: string;
  star: number;
}

export interface RouteCardProps {
  route: Route;
  onClick: () => void;
}

const RouteCard = ({ route, onClick }: RouteCardProps) => {
  return (
    <Card onClick={onClick}>
      <Title>{route.title}</Title>
      <RouteInfo>
        <RoutePlace>
          {route.start} <Arrow>→</Arrow> {route.end}
        </RoutePlace>
        <RouteMeta>
          <MetaItem>
            <CoffeeIconSVG />
            {route.cafeCount}
          </MetaItem>
          <MetaItem>
            <TimeIconSVG />
            {route.time}
          </MetaItem>
          <MetaItem>
            <DistanceIconSVG />
            {route.distance}
          </MetaItem>
          <MetaItem>
            <StarIconSVG />
            {route.star}
          </MetaItem>
        </RouteMeta>
      </RouteInfo>
    </Card>
  );
};

export default RouteCard;

const Card = styled.div`
  width: 21.25rem;
  height: 5rem;
  background: #fff;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  padding: 0.2rem 0 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 1.05rem;
  font-weight: bold;
  margin: 0.2rem 0 0 0.3rem;
  color: #222;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const RouteInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 0 0.3rem;
`;

const RoutePlace = styled.div`
  font-size: 0.92rem;
  color: #222;
  display: flex;
  align-items: center;
  gap: 0.3rem;
`;

const Arrow = styled.span`
  margin: 0 0.3rem;
  font-size: 1.1rem;
`;

const RouteMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1.1rem;
  margin-top: 0.3rem;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #222;
  gap: 0.2rem;
`;
