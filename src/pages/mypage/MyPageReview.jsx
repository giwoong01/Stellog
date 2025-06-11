import { useEffect, useState } from "react";
import styled from "styled-components";
import ReviewList from "../../components/review/ReviewList";
import Dropdown from "../../components/Dropdown";
import { useRoomStore } from "../../stores/useRoomStore";
import ReviewDetail from "../../components/review/ReviewDetail";
import { getRoomReviews, likeReview, unlikeReview } from "../../api/review";

const MyPageReview = () => {
  const { rooms, setRooms } = useRoomStore();
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [selectedReview, setSelectedReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likeLoadingId, setLikeLoadingId] = useState(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const dropdownOptions = rooms.map((room) => ({
    id: room.id,
    name:
      room.id === currentRoomId
        ? `${room.name} (${reviews.length})`
        : room.name,
  }));

  useEffect(() => {
    const fetchRooms = async () => {
      setIsInitialLoading(true);
      await setRooms();
    };

    fetchRooms();
  }, []);

  useEffect(() => {
    if (rooms.length > 0 && !currentRoomId) {
      setCurrentRoomId(rooms[0].id);
    }
  }, [rooms, currentRoomId]);

  useEffect(() => {
    if (!currentRoomId) return;
    setIsLoading(true);
    getRoomReviews(currentRoomId)
      .then((data) => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setIsLoading(false));

    setIsInitialLoading(false);
  }, [currentRoomId]);

  const handleToggleLike = async (reviewId, isLike) => {
    if (likeLoadingId === reviewId) return;
    setLikeLoadingId(reviewId);
    try {
      if (isLike) {
        await unlikeReview(reviewId);
      } else {
        await likeReview(reviewId);
      }
      setReviews((prev) =>
        prev.map((r) =>
          r.id === reviewId
            ? {
                ...r,
                isLike: !r.isLike,
                likeCount: r.isLike ? r.likeCount - 1 : r.likeCount + 1,
              }
            : r
        )
      );
      setSelectedReview((prev) =>
        prev && prev.id === reviewId
          ? {
              ...prev,
              isLike: !prev.isLike,
              likeCount: prev.isLike ? prev.likeCount - 1 : prev.likeCount + 1,
            }
          : prev
      );
    } finally {
      setLikeLoadingId(null);
    }
  };

  return (
    <Container>
      {isInitialLoading ? (
        <LoadingMessage>로딩 중...</LoadingMessage>
      ) : (
        <>
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
                onToggleLike={handleToggleLike}
                likeLoadingId={likeLoadingId}
              />
            ) : (
              <ReviewList
                reviews={reviews}
                onSelectReview={setSelectedReview}
                isLoading={isLoading}
                onToggleLike={handleToggleLike}
                likeLoadingId={likeLoadingId}
              />
            )}
          </ReviewContainer>
        </>
      )}
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

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;
