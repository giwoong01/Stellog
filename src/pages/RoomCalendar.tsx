import { useState } from "react";
import Calendar from "../components/calendar/Calendar";
import CalendarSchedulePanel from "../components/calendar/CalendarSchedulePanel";
import { format } from "date-fns";
import { useRoomStore } from "../stores/useRoomStore";

export interface CalendarItem {
  name: string;
  completed?: boolean;
}

export interface CalendarData {
  [date: string]: {
    visited: CalendarItem[];
    schedule: CalendarItem[];
  };
}

export interface RoomCalendarData {
  [roomId: string]: CalendarData;
}

const RoomCalendar = () => {
  const { currentRoomId } = useRoomStore();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [roomCalendarData, setRoomCalendarData] = useState<RoomCalendarData>({
    1: {
      "2025-05-08": {
        visited: [
          { name: "스타벅스 더제주중동파크점" },
          { name: "스타벅스 더제주중동파크점" },
        ],
        schedule: [
          { name: "스타벅스 제주 종합점" },
          { name: "스타벅스 제주DT점" },
        ],
      },
      "2025-05-25": {
        visited: [{ name: "스타벅스 제주 종합점" }],
        schedule: [],
      },
    },
    2: {
      "2025-05-10": {
        visited: [],
        schedule: [{ name: "회의" }],
      },
    },
  });

  const roomKey = String(currentRoomId);
  const calendarData = roomCalendarData[roomKey] || {};

  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  // 일정 추가 (API 연동 예정)
  const handleAddSchedule = (name: string) => {
    if (!selectedDate || currentRoomId === undefined || currentRoomId === null)
      return;
    const dateKey = formatDate(selectedDate);
    const roomKey = String(currentRoomId);
    setRoomCalendarData((prev) => ({
      ...prev,
      [roomKey]: {
        ...prev[roomKey],
        [dateKey]: {
          visited: prev[roomKey]?.[dateKey]?.visited || [],
          schedule: [
            ...(prev[roomKey]?.[dateKey]?.schedule || []),
            { name, completed: false },
          ],
        },
      },
    }));
  };

  // 일정 완료 토글 (API 연동 예정)
  const handleToggleSchedule = (idx: number) => {
    if (!selectedDate || currentRoomId === undefined || currentRoomId === null)
      return;
    const dateKey = formatDate(selectedDate);
    const roomKey = String(currentRoomId);
    setRoomCalendarData((prev) => ({
      ...prev,
      [roomKey]: {
        ...prev[roomKey],
        [dateKey]: {
          ...prev[roomKey]?.[dateKey],
          schedule: (prev[roomKey]?.[dateKey]?.schedule || []).map(
            (item: CalendarItem, i: number) =>
              i === idx ? { ...item, completed: !item.completed } : item
          ),
        },
      },
    }));
  };

  return (
    <>
      <Calendar
        onDateClick={setSelectedDate}
        selectedDate={selectedDate ?? today}
        calendarData={calendarData}
      />
      {selectedDate && (
        <CalendarSchedulePanel
          selectedDate={selectedDate}
          calendarData={calendarData}
          onAddSchedule={handleAddSchedule}
          onToggleSchedule={handleToggleSchedule}
        />
      )}
    </>
  );
};

export default RoomCalendar;
