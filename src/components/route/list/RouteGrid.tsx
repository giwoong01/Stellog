import styled from "styled-components";
import RouteCard from "./RouteCard";
import AddRouteCard from "./AddRouteCard";
import { useNavigate, useParams } from "react-router-dom";
import { RouteGridProps } from "../../../types/components/route";

const RouteGrid = ({
  currentPage,
  routes,
  onClick,
  showAddButton = false,
}: RouteGridProps) => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const handleAddRoute = () => {
    navigate(`/rooms/${roomId}/routes/create`);
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
