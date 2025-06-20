import { useState, useEffect } from "react";
import styled from "styled-components";
import Calendar from "../../components/calendar/Calendar";
import CalendarSchedulePanel from "../../components/calendar/CalendarSchedulePanel";
import { format } from "date-fns";
import Dropdown from "../../components/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCalendar,
  getCalendarsByRoom,
  updateCalendar,
  deleteCalendar,
  completeCalendar,
  cancelCompleteCalendar,
  getCalendarMonthSummary,
} from "../../api/calendar";
import { RoomCalendarData } from "../../types/components/calendar";
import { useRoomStore } from "../../stores/useRoomStore";

const MyPageCalendar = () => {
  const { rooms, setRooms } = useRoomStore();
  const navigate = useNavigate();
  const today = new Date();
  const [roomId, setRoomId] = useState<number | null>(rooms[0]?.id ?? null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [roomCalendarData, setRoomCalendarData] = useState<RoomCalendarData>(
    {}
  );
  const [monthSummary, setMonthSummary] = useState<{
    [date: string]: { hasCalendar: boolean; hasReview: boolean };
  }>({});

  const [creating, setCreating] = useState(false);

  const dropdownOptions = rooms.map((room) => ({
    id: room.id,
    name: room.name,
  }));

  const roomKey = String(roomId);
  const calendarData = roomCalendarData[roomKey] || {};
  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  useEffect(() => {
    setRooms();
  }, []);

  useEffect(() => {
    if (rooms.length > 0) {
      setRoomId(rooms[0].id);
    }
  }, [rooms]);

  useEffect(() => {
    const fetchCalendar = async () => {
      if (!roomId || !selectedDate) return;
      try {
        const dateKey = formatDate(selectedDate);
        const data = await getCalendarsByRoom(Number(roomId), dateKey);
        const converted = {
          visited: (data.starbucksCalendars || []).map((item: any) => ({
            starbucksName: item.starbucksName ?? item.name ?? "",
          })),
          schedule: data.calendars || [],
        };
        setRoomCalendarData((prev) => ({
          ...prev,
          [roomKey]: {
            ...prev[roomKey],
            [dateKey]: converted,
          },
        }));
      } catch (e) {
        console.error(e);
      } finally {
      }
    };
    fetchCalendar();
  }, [roomId, selectedDate]);

  const handleAddSchedule = async (name: string) => {
    if (!selectedDate || !roomId) return;
    const dateKey = formatDate(selectedDate);
    setCreating(true);
    try {
      await createCalendar(Number(roomId), {
        name,
        date: dateKey,
      });
      const data = await getCalendarsByRoom(Number(roomId), dateKey);
      const converted = {
        visited: data.starbucksCalendars || [],
        schedule: data.calendars || [],
      };
      setRoomCalendarData((prev) => ({
        ...prev,
        [roomKey]: {
          ...prev[roomKey],
          [dateKey]: converted,
        },
      }));
    } catch (e) {
      alert("일정 추가에 실패했습니다.");
    } finally {
      setCreating(false);
    }
  };

  const handleToggleSchedule = async (idx: number, done?: () => void) => {
    if (!selectedDate || !roomId) return;
    const dateKey = formatDate(selectedDate);
    const schedule = roomCalendarData[roomKey]?.[dateKey]?.schedule || [];
    const item = schedule[idx];
    if (!item || !("id" in item)) {
      done && done();
      return;
    }
    try {
      if (item.completed) {
        await cancelCompleteCalendar(Number(roomId), Number(item.id));
      } else {
        await completeCalendar(Number(roomId), Number(item.id));
      }
      const data = await getCalendarsByRoom(Number(roomId), dateKey);
      const converted = {
        visited: data.starbucksCalendars || [],
        schedule: data.calendars || [],
      };
      setRoomCalendarData((prev) => ({
        ...prev,
        [roomKey]: {
          ...prev[roomKey],
          [dateKey]: converted,
        },
      }));
    } catch (e) {
      alert("일정 상태 변경에 실패했습니다.");
    } finally {
      done && done();
    }
  };

  const handleEditSchedule = async (
    item: any,
    newName: string,
    done?: () => void
  ) => {
    if (!selectedDate || !roomId) {
      done && done();
      return;
    }
    const dateKey = formatDate(selectedDate);
    try {
      await updateCalendar(Number(roomId), Number(item.id), {
        name: newName,
        date: dateKey,
      });
      const data = await getCalendarsByRoom(Number(roomId), dateKey);
      const converted = {
        visited: data.starbucksCalendars || [],
        schedule: data.calendars || [],
      };
      setRoomCalendarData((prev) => ({
        ...prev,
        [roomKey]: {
          ...prev[roomKey],
          [dateKey]: converted,
        },
      }));
    } catch (e) {
      alert("일정 수정에 실패했습니다.");
    } finally {
      done && done();
    }
  };

  const handleDeleteSchedule = async (item: any) => {
    if (!selectedDate || !roomId) return;
    const dateKey = formatDate(selectedDate);
    try {
      await deleteCalendar(Number(roomId), Number(item.id));
      const data = await getCalendarsByRoom(Number(roomId), dateKey);
      const converted = {
        visited: data.starbucksCalendars || [],
        schedule: data.calendars || [],
      };
      setRoomCalendarData((prev) => ({
        ...prev,
        [roomKey]: {
          ...prev[roomKey],
          [dateKey]: converted,
        },
      }));
    } catch (e) {
      alert("일정 삭제에 실패했습니다.");
    }
  };

  const handleMonthChange = async (year: number, month: number) => {
    if (!roomId) return;
    const yearMonth = `${year}-${String(month).padStart(2, "0")}`;
    try {
      const data = await getCalendarMonthSummary(Number(roomId), yearMonth);
      const summaryMap = (data.days || []).reduce((acc: any, day: any) => {
        acc[day.date] = {
          hasCalendar: day.hasCalendar,
          hasReview: day.hasReview,
        };
        return acc;
      }, {});
      setMonthSummary(summaryMap);
    } catch (e) {
      setMonthSummary({});
    }
  };

  if (!rooms || rooms.length === 0) {
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
      <Dropdown
        options={dropdownOptions}
        value={roomId}
        onChange={setRoomId}
        placeholder="방 선택"
      />
      {roomId && (
        <>
          <Calendar
            onDateClick={setSelectedDate}
            selectedDate={selectedDate ?? today}
            calendarData={calendarData}
            monthSummary={monthSummary}
            onMonthChange={handleMonthChange}
          />
          {selectedDate && (
            <CalendarSchedulePanel
              selectedDate={selectedDate}
              calendarData={calendarData}
              onAddSchedule={handleAddSchedule}
              onToggleSchedule={handleToggleSchedule}
              creating={creating}
              onEditSchedule={handleEditSchedule}
              onDeleteSchedule={handleDeleteSchedule}
            />
          )}
        </>
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
