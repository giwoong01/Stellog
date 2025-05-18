import reviews from "../../data/review.json";
import styled from "styled-components";
import ReviewList from "../../components/review/ReviewList";
import Dropdown from "../../components/Dropdown";
import { useRoomStore } from "../../stores/useRoomStore";
import { useState } from "react";
import ReviewDetail from "../../components/review/ReviewDetail";

const MyPageReview = () => {
  const { rooms, currentRoomId, setCurrentRoomId } = useRoomStore();
  const [selectedReview, setSelectedReview] = useState(null);

  const dropdownOptions = rooms.map((room) => ({
    id: room.id,
    label: room.title,
  }));

  return (
    <Container>
      <Dropdown
        options={dropdownOptions}
        value={currentRoomId}
        onChange={setCurrentRoomId}
        placeholder="방 선택"
      />
      <ReviewContainer>
        {selectedReview ? (
          <ReviewDetail
            review={selectedReview}
            onBack={() => setSelectedReview(null)}
          />
        ) : (
          <ReviewList reviews={reviews} onSelectReview={setSelectedReview} />
        )}
      </ReviewContainer>
    </Container>
  );
};

export default MyPageReview;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  width: 100%;
`;

const ReviewContainer = styled.div`
  width: 40%;
  min-width: 300px;
`;
