import styled from "styled-components";
import AddRouteCard from "./AddRouteCard";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../../../stores/useRoomStore";
import RouteCard from "./RouteCard";

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

interface RouteGridProps {
  currentPage: number;
  routes: Route[];
}

const RouteGrid = ({ currentPage, routes }: RouteGridProps) => {
  const navigate = useNavigate();
  const { currentRoomId } = useRoomStore();

  const handleAddRoute = () => {
    navigate(`/rooms/${currentRoomId}/routes/create`);
  };

  return (
    <GridContainer>
      <Grid>
        {currentPage === 1 && <AddRouteCard onClick={handleAddRoute} />}

        {routes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            onClick={() => {
              navigate(`/rooms/${currentRoomId}/routes/${route.id}`);
            }}
          />
        ))}
      </Grid>
    </GridContainer>
  );
};

export default RouteGrid;

const GridContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 3rem;
  width: fit-content;
`;
