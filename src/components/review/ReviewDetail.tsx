import React from "react";
import styled from "styled-components";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import { ReviewDetailProps } from "../../types/components/review";
import { deleteReview } from "../../api/review";

const LikeSolidIcon = BiSolidLike as unknown as React.FC;
const LikeIcon = BiLike as unknown as React.FC;

const ReviewDetail = ({
  review,
  onBack,
  isRoom,
  onDelete,
  onToggleLike,
  likeLoadingId,
}: ReviewDetailProps) => {
  const navigate = useNavigate();
  const { roomId } = useParams();

  const parseContent = (content: string) => {
    const urlPattern =
      /(https?:\/\/(?:storage\.googleapis\.com|s3\.amazonaws\.com)\/[^\s]+)/gi;
    const parts = content.split(urlPattern);

    return parts.map((part, index) =>
      urlPattern.test(part) ? (
        <React.Fragment key={index}>
          <br />
          <ReviewDetailImage src={part} alt="review content" />
          <br />
        </React.Fragment>
      ) : (
        <span key={index}>{part}</span>
      )
    );
  };

  const handleEditClick = () => {
    navigate(`/rooms/${roomId}/review`, {
      state: {
        id: review.id,
        starbucksId: review.starbucksId,
        title: review.title,
        content: review.content,
        visitedAt: review.visitedAt,
        isEdit: true,
      },
    });
  };

  const handleDeleteClick = async () => {
    try {
      await deleteReview(review.id);

      alert("리뷰가 삭제되었습니다.");
      if (onDelete) {
        onDelete(review.id);
      } else {
        onBack();
      }
    } catch (error) {
      alert("리뷰 삭제에 실패했습니다.");
    }
  };

  return (
    <>
      <ActionButtons>
        <BackButton onClick={onBack}>◀ 목록으로</BackButton>
        {isRoom && (
          <ButtonContainer>
            <EditButton onClick={handleEditClick}>수정</EditButton>
            <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
          </ButtonContainer>
        )}
      </ActionButtons>

      <ReviewDetailWrapper>
        <ReviewDetailContent>
          <ReviewDetailTitle>{review.title}</ReviewDetailTitle>
          <ReviewInfo>작성자: {review.author}</ReviewInfo>
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
          <ReviewDetailText>{parseContent(review.content)}</ReviewDetailText>
        </ReviewDetailContent>
      </ReviewDetailWrapper>
    </>
  );
};

export default ReviewDetail;

const BackButton = styled.button`
  color: #036635;
  background: none;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const ReviewDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewDetailContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ReviewDetailTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: bold;
  margin: 0;
`;

const ReviewDetailText = styled.p`
  font-size: 0.95rem;
  line-height: 1.5;
  width: 80%;

  img {
    display: block;
    margin: 1rem auto;
    max-width: 80%;
  }
`;

const ReviewDetailImage = styled.img`
  border-radius: 6px;
`;

const ReviewInfo = styled.div`
  display: flex;
  text-align: center;
  font-size: 0.75rem;
  margin: 0.5rem 0;
`;

const ReviewLike = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  cursor: pointer;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const EditButton = styled.button`
  background-color: #036635;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #024a27;
  }
`;

const DeleteButton = styled.button`
  background-color: #ff0000;
  color: white;
  border: 1px solid #ff0000;
  border-radius: 4px;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #cc0000;
  }
`;
