import { axiosInstance } from "../utils/apiConfig";
import {
  Review,
  ReviewCreateRequest,
  ReviewUpdateRequest,
} from "../types/api/review";

export const getReview = async (reviewId: number): Promise<Review[]> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewId}`
  );

  return response.data.data;
};

export const createReview = async (
  roomId: number,
  review: ReviewCreateRequest
): Promise<void> => {
  await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/${roomId}`,
    review
  );
};

export const updateReview = async (
  reviewId: number,
  review: ReviewUpdateRequest
): Promise<Review> => {
  const response = await axiosInstance.put(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewId}`,
    review
  );

  return response.data.data;
};

export const deleteReview = async (reviewId: number): Promise<void> => {
  await axiosInstance.delete(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewId}`
  );
};

export const toggleLike = async (reviewId: number): Promise<void> => {
  await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewId}/like`
  );
};

export const getReviewDetail = async (reviewId: number): Promise<Review> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/${reviewId}`
  );

  return response.data;
};

export const likeReview = async (reviewId: number): Promise<void> => {
  await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/like/${reviewId}`
  );
};

export const unlikeReview = async (reviewId: number): Promise<void> => {
  await axiosInstance.delete(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/like/${reviewId}`
  );
};

export const getRoomStarbucksReviews = async (
  roomId: number,
  starbucksId: number
): Promise<Review[]> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/${roomId}/${starbucksId}`
  );

  return response.data.data.reviews;
};

export const getStarbucksReviews = async (
  starbucksId: number
): Promise<Review[]> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/starbucks/${starbucksId}`
  );

  return response.data.data.reviews;
};

export const getRoomReviews = async (roomId: number): Promise<Review[]> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/reviews/room/${roomId}`
  );

  return response.data.data.reviews;
};
