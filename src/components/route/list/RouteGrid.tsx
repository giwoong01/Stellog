import styled from "styled-components";
import RouteCard from "./RouteCard";
import AddRouteCard from "./AddRouteCard";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../../../stores/useRoomStore";

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
  onClick: (routeId: number) => void;
  showAddButton?: boolean;
}

const RouteGrid = ({
  currentPage,
  routes,
  onClick,
  showAddButton = false,
}: RouteGridProps) => {
  const navigate = useNavigate();
  const { currentRoomId } = useRoomStore();

  const handleAddRoute = () => {
    navigate(`/rooms/${currentRoomId}/routes/create`);
  };

  return (
    <GridContainer>
      <Grid>
        {showAddButton && currentPage === 1 && (
          <AddRouteCard onClick={handleAddRoute} />
        )}

        {routes.map((route) => (
          <RouteCard
            key={route.id}
            route={route}
            onClick={() => onClick(route.id)}
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
