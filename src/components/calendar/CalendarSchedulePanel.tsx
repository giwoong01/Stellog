import { format } from "date-fns";
import VisitedStarbucks from "./VisitedStarbucks";
import ScheduleList from "./ScheduleList";
import styled from "styled-components";
import { CalendarData } from "../../pages/RoomCalendar";

interface CalendarSchedulePanelProps {
  selectedDate: Date;
  calendarData: CalendarData;
  onAddSchedule: (name: string) => void;
  onToggleSchedule: (idx: number) => void;
}

const CalendarSchedulePanel = ({
  selectedDate,
  calendarData,
  onAddSchedule,
  onToggleSchedule,
}: CalendarSchedulePanelProps) => {
  const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

  return (
    <ScheduleContainer>
      <VisitedStarbucks
        visited={calendarData[formatDate(selectedDate)]?.visited ?? []}
      />
      <ScheduleList
        schedule={calendarData[formatDate(selectedDate)]?.schedule ?? []}
        onAddSchedule={onAddSchedule}
        onToggleSchedule={onToggleSchedule}
      />
    </ScheduleContainer>
  );
};

export default CalendarSchedulePanel;

const ScheduleContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 40rem;
  margin: 0rem auto;
`;
