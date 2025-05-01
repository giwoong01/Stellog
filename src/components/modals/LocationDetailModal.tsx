import React, { useState } from "react";
import styled from "styled-components";
import reviews from "../../data/review.json";
import ReviewList from "./ReviewList";
import ReviewDetail from "./ReviewDetail";

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

interface LocationDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  location: {
    name: string;
    address: string;
  } | null;
  isRoom?: boolean;
}

const LocationDetailModal = ({
  isOpen,
  onClose,
  location,
  isRoom,
}: LocationDetailModalProps) => {
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

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
          />
        ) : (
          <ReviewList
            reviews={reviews}
            onSelectReview={setSelectedReview}
            isRoom={isRoom}
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
