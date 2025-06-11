import { axiosInstance } from "../utils/apiConfig";
import { RouteCreateRequest, RouteUpdateRequest } from "../types/api/route";

export const putRoute = async (
  routeId: number,
  routeUpdateRequest: RouteUpdateRequest
) => {
  const response = await axiosInstance.put(
    `${process.env.REACT_APP_API_BASE_URL}/routes/${routeId}`,
    routeUpdateRequest
  );
  return response.data;
};

export const deleteRoute = async (routeId: number) => {
  const response = await axiosInstance.delete(
    `${process.env.REACT_APP_API_BASE_URL}/routes/${routeId}`
  );
  return response.data;
};

export const postOptimizeRoute = async (
  roomId: number,
  routeCreateRequest: RouteCreateRequest
) => {
  const response = await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/routes/optimize/${roomId}`,
    routeCreateRequest
  );

  return response.data;
};

export const postBookmarkRoute = async (routeId: number) => {
  const response = await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/routes/bookmark/${routeId}`
  );
  return response.data;
};

export const deleteBookmarkRoute = async (routeId: number) => {
  const response = await axiosInstance.delete(
    `${process.env.REACT_APP_API_BASE_URL}/routes/bookmark/${routeId}`
  );
  return response.data;
};

export const getRouteDetail = async (routeId: number) => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/routes/route/${routeId}`
  );

  return response.data.data;
};

export const getRoomRoutes = async (roomId: number) => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/routes/room/${roomId}`
  );

  return response.data.data;
};

export const getPopularRoutes = async () => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/routes/popular`
  );
  return response.data.data;
};

export const getMemberRoutes = async () => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/routes/member`
  );

  return response.data.data.routeMemberRoomResDtos;
};

export const getBookmarkedRoutes = async () => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/routes/bookmark`
  );

  return response.data.data.routes;
};
