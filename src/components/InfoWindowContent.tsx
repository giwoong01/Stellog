import styled from "styled-components";
import theme from "../styles/theme";

interface InfoWindowContentProps {
  name: string;
  address: string;
}

const InfoWindowContent = ({ name, address }: InfoWindowContentProps) => {
  return (
    <Container>
      <Name>{name}</Name>
      <br />
      <Address>{address}</Address>
    </Container>
  );
};

export default InfoWindowContent;

const Container = styled.div`
  padding: 0.625rem;
  font-size: 0.875rem;
  color: #333;
  background-color: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
  max-width: 12.5rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-0.25rem);
    box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  }
`;

const Name = styled.strong`
  display: block;
  font-size: 1rem;
  color: ${theme.colors.secondary};
  margin-bottom: 0.5rem;
  text-transform: capitalize;
`;

const Address = styled.span`
  font-size: 0.75rem;
  color: #555;
  line-height: 1.5;
`;
