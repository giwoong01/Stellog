import { format } from "date-fns";
import VisitedStarbucks from "./VisitedStarbucks";
import ScheduleList from "./ScheduleList";
import styled from "styled-components";
import { CalendarSchedulePanelProps } from "../../types/components/calendar";

const CalendarSchedulePanel = ({
  selectedDate,
  calendarData,
  onAddSchedule,
  onToggleSchedule,
  creating,
  onEditSchedule,
  onDeleteSchedule,
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
        creating={creating}
        onEditSchedule={onEditSchedule}
        onDeleteSchedule={onDeleteSchedule}
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
