import React from "react";
import styled from "styled-components";
import { BiSolidLike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";

const LikeSolidIcon = BiSolidLike as unknown as React.FC;
const LikeIcon = BiLike as unknown as React.FC;

interface Review {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  imageUrl: string;
  isLiked: boolean;
}

interface ReviewDetailProps {
  review: Review;
  onBack: () => void;
}

const ReviewDetail: React.FC<ReviewDetailProps> = ({ review, onBack }) => {
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

  return (
    <>
      <BackButton onClick={onBack}>◀ 목록으로</BackButton>
      <ReviewDetailWrapper>
        <ReviewHeader></ReviewHeader>
        <ReviewDetailContent>
          <ReviewDetailTitle>{review.title}</ReviewDetailTitle>
          <ReviewInfo>
            작성자: {review.author} <br />
            {review.date}
          </ReviewInfo>
          <ReviewLike>
            {review.isLiked ? <LikeSolidIcon /> : <LikeIcon />}
            {review.likes}
          </ReviewLike>
          <ReviewDetailText>{parseContent(review.content)}</ReviewDetailText>
        </ReviewDetailContent>
      </ReviewDetailWrapper>
    </>
  );
};

export default ReviewDetail;

const BackButton = styled.button`
  margin-bottom: 1rem;
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

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #555;

  @media (max-width: 768px) {
    justify-content: space-between;
    align-items: center;
    gap: 0.5rem;
  }
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
