import { useState, useEffect } from "react";
import Calendar from "../../components/calendar/Calendar";
import CalendarSchedulePanel from "../../components/calendar/CalendarSchedulePanel";
import { format } from "date-fns";
import {
  getCalendarsByRoom,
  createCalendar,
  completeCalendar,
  cancelCompleteCalendar,
  updateCalendar,
  deleteCalendar,
  getCalendarMonthSummary,
} from "../../api/calendar";
import { useParams } from "react-router-dom";
import { RoomCalendarData } from "../../types/components/calendar";

const RoomCalendar = () => {
  const { roomId } = useParams();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [roomCalendarData, setRoomCalendarData] = useState<RoomCalendarData>(
    {}
  );
  const [creating, setCreating] = useState(false);
  const [monthSummary, setMonthSummary] = useState<{
    [date: string]: { hasCalendar: boolean; hasReview: boolean };
  }>({});

  const roomKey = String(roomId);
  const calendarData = roomCalendarData[roomKey] || {};

  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  useEffect(() => {
    const fetchCalendar = async () => {
      if (!roomId || !selectedDate) return;
      try {
        const dateKey = formatDate(selectedDate);
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
        console.log(e);
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

  return (
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
  );
};

export default RoomCalendar;
