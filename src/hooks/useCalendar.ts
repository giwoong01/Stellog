import { useState } from 'react';
import { startOfMonth, endOfMonth, getDay } from 'date-fns';

export interface CalendarDay {
  date: Date | null;
}

export interface CalendarProps {
  initialDate?: Date;
}

const useCalendar = (initialDate: Date = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);

  const getMonthDays = (): CalendarDay[] => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    const daysInMonth = end.getDate();
    const startDay = getDay(start);

    const days: CalendarDay[] = Array.from({ length: startDay }, () => ({
      date: null
    }));

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      });
    }

    return days;
  };

  return {
    currentMonth,
    setCurrentMonth,
    getMonthDays,
  };
};

export default useCalendar;