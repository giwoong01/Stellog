import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ReviewList from "../review/ReviewList";
import ReviewDetail from "../review/ReviewDetail";
import {
  getRoomStarbucksReviews,
  getStarbucksReviews,
  likeReview,
  unlikeReview,
} from "../../api/review";
import { Review } from "../../types/components/review";
import { LocationDetailModalProps } from "../../types/components/modals";

const LocationDetailModal = ({
  isOpen,
  onClose,
  location,
  isRoom,
  roomId,
}: LocationDetailModalProps) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [likeLoadingId, setLikeLoadingId] = useState<number | null>(null);

  const handleToggleLike = async (reviewId: number, isLike: boolean) => {
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
    } catch (e) {
      alert("좋아요 처리에 실패했습니다.");
    } finally {
      setLikeLoadingId(null);
    }
  };

  const handleDeleteReview = (reviewId: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
    setSelectedReview(null);
  };

  useEffect(() => {
    const loadReviews = async () => {
      if (location?.id) {
        setIsLoading(true);
        try {
          let response;

          if (isRoom && roomId) {
            response = await getRoomStarbucksReviews(roomId, location.id);
          } else {
            response = await getStarbucksReviews(location.id);
          }

          setReviews(response);
        } catch (error) {
          console.error("리뷰를 불러오는데 실패했습니다:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (isOpen && location?.id) {
      loadReviews();
    }
  }, [isOpen, location?.id, isRoom, roomId]);

  const handleClose = () => {
    setSelectedReview(null);
    onClose();
  };

  if (!isOpen || !location) return null;

  return (
    <Overlay onClick={handleClose}>
      <ModalBox onClick={(e) => e.stopPropagation()}>
        <Title>{location.name}</Title>

        {selectedReview ? (
          <ReviewDetail
            review={selectedReview}
            onBack={() => setSelectedReview(null)}
            isRoom={isRoom}
            onDelete={handleDeleteReview}
            onToggleLike={handleToggleLike}
            likeLoadingId={likeLoadingId}
          />
        ) : (
          <ReviewList
            reviews={reviews}
            onSelectReview={setSelectedReview}
            isRoom={isRoom}
            isLoading={isLoading}
            locationId={location.id}
            onToggleLike={handleToggleLike}
            likeLoadingId={likeLoadingId}
          />
        )}
      </ModalBox>
    </Overlay>
  );
};

export default LocationDetailModal;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalBox = styled.div`
  width: 50%;
  height: 80%;
  flex-shrink: 0;
  border: 1px solid #036635;
  background: #fff;
  padding: 2rem 5rem;
  position: relative;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 60%;
    height: 85%;
    padding: 1.5rem 3rem;
  }

  @media (max-width: 480px) {
    width: 60%;
    height: 80%;
    padding: 1rem 2rem;
  }
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.3rem;
  font-weight: bold;
  padding: 0.375rem 10%;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0.375rem 5%;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.375rem 2%;
  }
`;
