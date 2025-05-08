import { format, addMonths, subMonths } from "date-fns";
import styled, { css } from "styled-components";
import useCalendar from "../../hooks/useCalendar";
import { CalendarData } from "../../pages/RoomCalendar";

export const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"] as const;

export interface CalendarDay {
  date: Date | null;
}

export interface CalendarProps {
  initialDate?: Date;
  onDateClick: (date: Date) => void;
  selectedDate: Date;
  calendarData: CalendarData;
}

const Calendar = ({
  initialDate = new Date(),
  onDateClick,
  selectedDate,
  calendarData,
}: CalendarProps) => {
  const { currentMonth, setCurrentMonth, getMonthDays } =
    useCalendar(initialDate);
  const days = getMonthDays();
  const today = new Date();

  return (
    <Container>
      <Header>
        <Button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
          {"<"}
        </Button>
        <MonthTitle>{format(currentMonth, "yyyy년 MM월")}</MonthTitle>
        <Button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
          {">"}
        </Button>
      </Header>

      <Grid>
        {WEEKDAYS.map((day) => (
          <DayHeader key={day} day={day}>
            {day}
          </DayHeader>
        ))}

        {days.map(({ date }, index) => {
          if (!date) {
            return (
              <DayCell key={index}>
                <EmptyCell />
              </DayCell>
            );
          }

          const dateKey = format(date, "yyyy-MM-dd");
          const dayData = calendarData[dateKey] || {
            visited: [],
            schedule: [],
          };

          const isToday =
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();

          const isSelected =
            selectedDate &&
            date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();

          return (
            <DayCell key={index}>
              <DayContent
                isToday={isToday}
                isSelected={isSelected}
                onClick={() => onDateClick?.(date)}
              >
                <span>{format(date, "d")}</span>
                <DotWrapper>
                  {dayData.visited.length > 0 && <Dot color="#F48F9B" />}
                  {dayData.schedule.length > 0 && <Dot color="#4ADE80" />}
                </DotWrapper>
              </DayContent>
            </DayCell>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Calendar;

export const Container = styled.div`
  width: 100%;
  max-width: 40rem;
  margin: 2rem auto 0rem auto;
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #1a1a1a;
  cursor: pointer;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f1f3f5;
  }
`;

export const MonthTitle = styled.h2`
  margin: 0rem 1.5rem;
  font-size: 1.5rem;
  color: #1a1a1a;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
`;

export const DayHeader = styled.div<{ day: string }>`
  padding: 1rem 0rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ day }) =>
    day === "일" ? "#FF0000" : day === "토" ? "#0000FF" : "#0e0e0e"};
`;
export const DayCell = styled.div`
  aspect-ratio: 1;
`;

export const DayContent = styled.div<{
  isToday?: boolean;
  isSelected?: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 50%;
  font-size: 1.2rem;
  font-weight: bold;
  position: relative;
  cursor: pointer;

  ${({ isToday }) =>
    isToday &&
    css`
      background: #e6f9e6;
      border-radius: 0.7rem;
    `}
  ${({ isSelected }) =>
    isSelected &&
    css`
      &:after {
        content: "";
        position: absolute;
        bottom: 0rem;
        width: 30%;
        height: 0.2rem;
        background-color: #036635;
      }
    `}
`;

export const EmptyCell = styled(DayContent)``;

const DotWrapper = styled.div`
  display: flex;
  gap: 0.2rem;
  justify-content: center;
  margin-top: 0.2rem;
`;

const Dot = styled.div<{ color: string }>`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  background: ${({ color }) => color};
`;
