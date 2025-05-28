import styled from "styled-components";
import { ReactComponent as CoffeeIconSVG } from "../../../assets/icons/coffee.svg";
import { useState } from "react";
import Pagination from "../../Pagination";
import { RoomVisitListProps, Visit } from "../../../types/components/room";

const RoomVisitList = ({ visits }: RoomVisitListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const visitsPerPage = 6;
  const totalPages = Math.ceil(visits.length / visitsPerPage);

  const indexOfLastVisit = currentPage * visitsPerPage;
  const indexOfFirstVisit = indexOfLastVisit - visitsPerPage;
  const currentVisits = visits.slice(indexOfFirstVisit, indexOfLastVisit);

  return (
    <VisitListContainer>
      <VisitListWrapper>
        {currentVisits.map((v, i) => (
          <VisitItem key={i} {...v} />
        ))}
      </VisitListWrapper>

      {visits.length > visitsPerPage && (
        <PaginationWrapper>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </PaginationWrapper>
      )}
    </VisitListContainer>
  );
};

const VisitItem = ({ title, date, starbucksName }: Visit) => (
  <VisitItemWrapper>
    <Left>
      <StyledCoffeeIcon />
      <MemoText>{title}</MemoText>
    </Left>

    <Right>
      <DateText>{date}</DateText>
      <StoreText>{starbucksName}</StoreText>
    </Right>
  </VisitItemWrapper>
);

export default RoomVisitList;

const VisitListContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const VisitListWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 0.5rem;
`;

const VisitItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  padding: 0.5rem;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const StyledCoffeeIcon = styled(CoffeeIconSVG)`
  width: 1.25rem;
  height: 1.25rem;
`;

const MemoText = styled.span`
  font-size: 1.1rem;
`;

const DateText = styled.span`
  color: #888;
  font-size: 0.98rem;
`;

const StoreText = styled.span`
  font-size: 1.05rem;
  font-weight: 500;
`;
