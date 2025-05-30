import styled from "styled-components";
import { ReactComponent as CoffeeIconSVG } from "../../../assets/icons/coffee.svg";

const RoomVisitStatus = ({ visitCount }: { visitCount: number }) => (
  <StatusWrapper>
    <StyledCoffeeIcon />
    <StatusText>{visitCount} / 33</StatusText>
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
