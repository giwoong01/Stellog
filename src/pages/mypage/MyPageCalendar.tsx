import { useState } from "react";
import styled from "styled-components";
import Calendar from "../../components/calendar/Calendar";
import CalendarSchedulePanel from "../../components/calendar/CalendarSchedulePanel";
import { format } from "date-fns";
import { useRoomStore } from "../../stores/useRoomStore";
import Dropdown from "../../components/Dropdown";
import { useNavigate } from "react-router-dom";

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

const MyPageCalendar = () => {
  const { rooms, currentRoomId } = useRoomStore();
  const navigate = useNavigate();
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

  const dropdownOptions = rooms.map((room) => ({
    id: room.id,
    label: room.name,
  }));

  const calendarData = roomCalendarData[currentRoomId?.toString() || "1"] || {};
  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  // 일정 추가 (API 연동 예정)
  const handleAddSchedule = (name: string) => {
    if (!selectedDate || !currentRoomId) return;
    const dateKey = formatDate(selectedDate);
    const roomKey = currentRoomId.toString();
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
    if (!selectedDate || !currentRoomId) return;
    const dateKey = formatDate(selectedDate);
    const roomKey = currentRoomId.toString();
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

  if (rooms.length === 0) {
    return (
      <EmptyContainer>
        <EmptyMessage>
          아직 생성된 방이 없습니다.
          <br />
          새로운 방을 만들어 일정을 관리해보세요!
        </EmptyMessage>
        <CreateRoomButton onClick={() => navigate("/rooms/create")}>
          방 만들기
        </CreateRoomButton>
      </EmptyContainer>
    );
  }

  return (
    <Container>
      {/* <Dropdown
        options={dropdownOptions}
        value={currentRoomId}
        onChange={setCurrentRoomId}
        placeholder="방 선택"
      /> */}
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
    </Container>
  );
};

export default MyPageCalendar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const EmptyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  height: 100%;
  padding: 2rem;
`;

const EmptyMessage = styled.p`
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  line-height: 1.6;
`;

const CreateRoomButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #036635;
  color: white;
  border: none;
  border-radius: 2rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background: #025528;
  }
`;
