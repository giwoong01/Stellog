import styled from "styled-components";
import { BadgeGridProps } from "../types/components/badge";

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  return (
    <Container>
      <BadgeCard>
        {badges.length > 0 ? (
          <BadgeRow>
            {badges.map((badge) => (
              <BadgeIcon key={badge} />
            ))}
          </BadgeRow>
        ) : (
          <EmptyMessage>
            배지가 없습니다.
            <br />
            <br />
            스타벅스를 방문하여 리뷰를 작성하면 배지를 얻을 수 있습니다.
          </EmptyMessage>
        )}
      </BadgeCard>
    </Container>
  );
};

export default BadgeGrid;

const Container = styled.div`
  margin: 1rem 0;
`;

const BadgeCard = styled.div`
  width: 100%;
  max-height: 12rem;
  background: #fff;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.7rem 0.2rem;
  overflow-y: auto;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0.2rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #036635;
    border-radius: 0.2rem;
  }
`;

const BadgeRow = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.2rem 0;
  padding-right: 0.3rem;
  justify-items: center;
`;

const BadgeIcon = styled.div`
  width: 3rem;
  height: 3rem;
  background: #215c3c;
  border-radius: 0.5rem;
  display: inline-block;
`;

const EmptyMessage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.9rem;
  color: #666;
  text-align: center;
`;
