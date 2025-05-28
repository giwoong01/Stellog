import React, { useState } from "react";
import styled from "styled-components";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import Pagination from "../Pagination";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewListProps } from "../../types/components/review";

const LikeSolidIcon = BiSolidLike as unknown as React.FC;
const LikeIcon = BiLike as unknown as React.FC;

const ReviewList = ({
  reviews,
  onSelectReview,
  isRoom,
  isLoading,
  locationId,
  onToggleLike,
  likeLoadingId,
}: ReviewListProps) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { roomId } = useParams();

  if (isRoom && !isLoading && reviews.length === 0) {
    return (
      <>
        {isRoom && (
          <ButtonContainer>
            <WriteReviewButton
              onClick={() =>
                navigate(`/rooms/${roomId}/review`, {
                  state: {
                    starbucksId: locationId,
                  },
                })
              }
            >
              리뷰 작성
            </WriteReviewButton>
          </ButtonContainer>
        )}
        <EmptyMessage>리뷰가 없습니다.</EmptyMessage>
      </>
    );
  }

  if (!isLoading && reviews.length === 0) {
    return <EmptyMessage>리뷰가 없습니다.</EmptyMessage>;
  }

  const reviewsPerPage = 4;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const startIndex = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(startIndex, startIndex + reviewsPerPage);

  const parseContent = (content: string) => {
    const urlPattern =
      /(https?:\/\/(?:storage\.googleapis\.com|s3\.amazonaws\.com)\/[^\s]+)/gi;
    const parts = content.split(urlPattern);

    return parts.map((part, index) =>
      urlPattern.test(part) ? <></> : <span key={index}>{part}</span>
    );
  };

  return (
    <>
      {isRoom && (
        <ButtonContainer>
          <WriteReviewButton
            onClick={() =>
              navigate(`/rooms/${roomId}/review`, {
                state: {
                  starbucksId: locationId,
                },
              })
            }
          >
            리뷰 작성
          </WriteReviewButton>
        </ButtonContainer>
      )}

      {currentReviews.map((review) => (
        <ReviewBox key={review.id} onClick={() => onSelectReview(review)}>
          <Thumbnail src={review.mainImgUrl} alt="review" />
          <ReviewContent>
            <div>
              <ReviewTitle>{review.title}</ReviewTitle>
              <ReviewDesc>{parseContent(review.content)}</ReviewDesc>
            </div>
            <ReviewFooter>
              <ReviewInfo>
                작성자: {review.author} <br />
                {review.visitedAt.split("T")[0]}
              </ReviewInfo>
              <ReviewLike
                onClick={(e) => {
                  e.stopPropagation();
                  if (!likeLoadingId || likeLoadingId !== review.id) {
                    onToggleLike && onToggleLike(review.id, review.isLike);
                  }
                }}
                style={{
                  opacity: likeLoadingId === review.id ? 0.5 : 1,
                  pointerEvents: likeLoadingId === review.id ? "none" : "auto",
                }}
              >
                {review.isLike ? <LikeSolidIcon /> : <LikeIcon />}
                {review.likeCount}
              </ReviewLike>
            </ReviewFooter>
          </ReviewContent>
        </ReviewBox>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default ReviewList;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1rem;
`;

const WriteReviewButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  background-color: #036635;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #024a27;
  }

  &:active {
    background-color: #01381d;
  }
`;

const ReviewBox = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  padding: 0.5rem 0;
  cursor: pointer;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Thumbnail = styled.img`
  width: 30%;
  height: 8rem;
  object-fit: cover;
  border-radius: 6px;
  margin-right: 1rem;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 8rem;
    height: auto;
    margin-right: 0;
    margin-bottom: 1rem;
  }

  @media (max-width: 480px) {
    width: 100%;
    max-height: 5rem;
    height: auto;
  }
`;

const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  flex: 1;

  @media (max-width: 768px) {
    align-items: start;
    text-align: left;
  }
`;

const ReviewTitle = styled.h4`
  font-size: 1rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

const ReviewDesc = styled.p`
  font-size: 0.9rem;
  margin: 0.4rem 0;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 480px) {
    font-size: 0.8rem;
  }
`;

const ReviewFooter = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: #555;
  width: 100%;

  @media (max-width: 768px) {
    align-items: center;
    gap: 0.5rem;
  }
`;

const ReviewInfo = styled.div`
  font-size: 0.75rem;
`;

const ReviewLike = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #666;
`;
