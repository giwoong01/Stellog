import styled from "styled-components";
import { BadgeGridProps } from "../types/components/badge";
import badge1 from "../assets/badge/1.svg";
import badge2 from "../assets/badge/2.svg";
import badge3 from "../assets/badge/3.svg";
import badge4 from "../assets/badge/4.svg";
import badge5 from "../assets/badge/5.svg";
import badge6 from "../assets/badge/6.svg";

const BadgeGrid = ({ badges }: BadgeGridProps) => {
  const getBadgeImage = (badgeNumber: number) => {
    switch (badgeNumber) {
      case 1:
        return badge1;
      case 2:
        return badge2;
      case 3:
        return badge3;
      case 4:
        return badge4;
      case 5:
        return badge5;
      case 6:
        return badge6;
      default:
        return badge1;
    }
  };

  return (
    <Container>
      <BadgeCard>
        {badges.length > 0 ? (
          <BadgeRow>
            {badges.map((badge) => (
              <BadgeWrapper key={badge.id}>
                <BadgeIcon
                  src={getBadgeImage(badge.id)}
                  alt={`배지 ${badge.id}`}
                />
                <Tooltip>{badge.name}</Tooltip>
              </BadgeWrapper>
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
  height: 100%;
`;

const BadgeCard = styled.div`
  width: 100%;
  height: 100%;
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

const Tooltip = styled.div`
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  border-radius: 0.3rem;
  font-size: 0.8rem;
  white-space: nowrap;
  transition: opacity 0.2s;
  z-index: 1;
  margin-top: 0.3rem;
`;

const BadgeWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover ${Tooltip} {
    visibility: visible;
    opacity: 1;
  }
`;

const BadgeIcon = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
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
