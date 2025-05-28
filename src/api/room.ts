import { RoomCreateRequest, RoomUpdateRequest } from "../types/api/room";
import { axiosInstance } from "../utils/apiConfig";

export const createRoom = async (room: RoomCreateRequest) => {
  const response = await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/rooms`,
    room
  );

  return response.data;
};

export const updateRoom = async (roomId: number, room: RoomUpdateRequest) => {
  const response = await axiosInstance.put(
    `${process.env.REACT_APP_API_BASE_URL}/rooms/${roomId}`,
    room
  );

  return response.data;
};

export const deleteRoom = async (roomId: number) => {
  await axiosInstance.delete(
    `${process.env.REACT_APP_API_BASE_URL}/rooms/${roomId}`
  );
};

export const getRooms = async () => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/rooms`
  );

  return response.data.data.rooms;
};

export const getRoom = async (roomId: number) => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/rooms/detail/${roomId}`
  );

  return response.data.data;
};
