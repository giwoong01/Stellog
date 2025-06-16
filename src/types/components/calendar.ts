export interface CalendarItem {
  id: number;
  name: string;
  completed?: boolean;
}

export interface StarbucksCalendarItem {
  starbucksName: string;
}

export interface CalendarData {
  [date: string]: {
    visited: StarbucksCalendarItem[];
    schedule: CalendarItem[];
  };
}

export interface RoomCalendarData {
  [roomId: string]: CalendarData;
}

export interface VisitedStarbucksProps {
  visited: StarbucksCalendarItem[];
}

export interface ScheduleListProps {
  schedule: CalendarItem[];
  onAddSchedule?: (name: string) => void;
  onToggleSchedule?: (index: number, done?: () => void) => void;
  creating?: boolean;
  onEditSchedule?: (
    item: CalendarItem,
    newName: string,
    done?: () => void
  ) => void;
  onDeleteSchedule?: (item: CalendarItem, done?: () => void) => void;
}

export interface CalendarSchedulePanelProps {
  selectedDate: Date;
  calendarData: CalendarData;
  onAddSchedule: (name: string) => void;
  onToggleSchedule: (idx: number, done?: () => void) => void;
  creating?: boolean;
  onEditSchedule?: (
    item: CalendarItem,
    newName: string,
    done?: () => void
  ) => void;
  onDeleteSchedule?: (item: CalendarItem, done?: () => void) => void;
}

export interface CalendarDay {
  date: Date | null;
}

export interface CalendarProps {
  initialDate?: Date;
  onDateClick: (date: Date) => void;
  selectedDate: Date;
  calendarData: CalendarData;
}
