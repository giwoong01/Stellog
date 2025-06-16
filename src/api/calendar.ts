import { axiosInstance } from "../utils/apiConfig";
import {
  CalendarCreateRequest,
  CalendarUpdateRequest,
} from "../types/api/calendar";

export const createCalendar = async (
  roomId: number,
  data: CalendarCreateRequest
) => {
  const response = await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/calendars/${roomId}`,
    data
  );

  return response.data;
};

export const getCalendarsByRoom = async (roomId: number, date: string) => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/calendars/${roomId}?date=${date}`
  );

  return response.data.data;
};

export const updateCalendar = async (
  roomId: number,
  calenderId: number,
  data: CalendarUpdateRequest
) => {
  const response = await axiosInstance.put(
    `${process.env.REACT_APP_API_BASE_URL}/calendars/${roomId}/${calenderId}`,
    data
  );

  return response.data;
};

export const deleteCalendar = async (roomId: number, calenderId: number) => {
  const response = await axiosInstance.delete(
    `${process.env.REACT_APP_API_BASE_URL}/calendars/${roomId}/${calenderId}`
  );

  return response.data;
};

export const completeCalendar = async (roomId: number, calenderId: number) => {
  await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/calendars/complete/${roomId}/${calenderId}`
  );
};

export const cancelCompleteCalendar = async (
  roomId: number,
  calenderId: number
) => {
  await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/calendars/cancel-complete/${roomId}/${calenderId}`
  );
};

export const getCalendarMonthSummary = async (
  roomId: number,
  yearMonth: string
) => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/calendars/${roomId}/month?month=${yearMonth}`
  );

  return response.data.data;
};
