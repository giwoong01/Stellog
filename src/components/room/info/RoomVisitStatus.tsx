import styled from "styled-components";
import { ReactComponent as CoffeeIconSVG } from "../../../assets/icons/coffee.svg";

const RoomVisitStatus = ({
  visitCount,
  totalCount,
}: {
  visitCount: number;
  totalCount: number;
}) => (
  <StatusWrapper>
    <StyledCoffeeIcon />
    <StatusText>
      {visitCount} / {totalCount}
    </StatusText>
  </StatusWrapper>
);

export default RoomVisitStatus;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StyledCoffeeIcon = styled(CoffeeIconSVG)`
  width: 1rem;
  height: 1rem;
`;

const StatusText = styled.span`
  font-size: 1.1rem;
`;
