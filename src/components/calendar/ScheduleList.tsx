import { CalendarItem } from "../../pages/room/RoomCalendar";
import { ReactComponent as ScheduleIconSVG } from "../../assets/icons/category.svg";
import styled from "styled-components";
import { useState } from "react";

interface ScheduleListProps {
  schedule: CalendarItem[];
  onAddSchedule?: (name: string) => void;
  onToggleSchedule?: (index: number) => void;
}

const ScheduleList = ({
  schedule,
  onAddSchedule,
  onToggleSchedule,
}: ScheduleListProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newSchedule, setNewSchedule] = useState("");

  const handleAddSchedule = () => {
    setIsAdding(true);
  };

  const handleConfirmAdd = () => {
    if (newSchedule.trim() && onAddSchedule) {
      onAddSchedule(newSchedule.trim());
      setNewSchedule("");
      setIsAdding(false);
    }
  };

  return (
    <ScheduleContainer>
      <ScheduleTitle>
        <StyledScheduleIcon />
        일정
        <AddButton onClick={handleAddSchedule}>+</AddButton>
      </ScheduleTitle>

      <ScheduleListContainer>
        {schedule.map((item, idx) => (
          <ScheduleItem key={idx}>
            <CheckboxWrapper>
              <HiddenCheckbox
                checked={item.completed ?? false}
                onChange={() => onToggleSchedule?.(idx)}
              />
              <CustomCheckbox checked={item.completed ?? false} />
            </CheckboxWrapper>
            <StyledSpan completed={item.completed ?? false}>
              {item.name}
            </StyledSpan>
          </ScheduleItem>
        ))}

        {isAdding && (
          <AddInputContainer>
            <ScheduleInput
              autoFocus
              value={newSchedule}
              onChange={(e) => setNewSchedule(e.target.value)}
              placeholder="새 일정 입력..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleConfirmAdd();
                } else if (e.key === "Escape") {
                  setIsAdding(false);
                  setNewSchedule("");
                }
              }}
            />
          </AddInputContainer>
        )}
      </ScheduleListContainer>
    </ScheduleContainer>
  );
};

export default ScheduleList;

const ScheduleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const StyledScheduleIcon = styled(ScheduleIconSVG)`
  width: 1.2rem;
  height: 1.2rem;
`;

const ScheduleTitle = styled.div`
  width: 30%;
  color: #0e0e0e;
  font-weight: bold;
  background-color: #4ade80;
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ScheduleListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const AddButton = styled.button`
  border-radius: 50%;
  cursor: pointer;
  margin-left: 0.5rem;
  width: 1.5rem;
  height: 1.5rem;
  &:hover {
    color: #0e0e0ea1;
  }
`;

const AddInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CheckboxWrapper = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
`;

const CustomCheckbox = styled.span<{ checked: boolean }>`
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid #4ade80;
  border-radius: 0.4rem;
  background: ${({ checked }) => (checked ? "#4ade80" : "#fff")};
  display: inline-block;
  margin-right: 0.5rem;
  position: relative;
  transition: background 0.2s;
  &:after {
    content: "";
    display: ${({ checked }) => (checked ? "block" : "none")};
    position: absolute;
    left: 0.28rem;
    top: 0.05rem;
    width: 0.3rem;
    height: 0.6rem;
    border: solid #fff;
    border-width: 0 0.18rem 0.18rem 0;
    transform: rotate(45deg);
  }
`;

const ScheduleItem = styled.div`
  font-size: 1.2rem;
  margin-bottom: 0.3rem;
  display: flex;
  align-items: center;
`;

const ScheduleInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

const StyledSpan = styled.span<{ completed: boolean }>`
  text-decoration: ${({ completed }) => (completed ? "line-through" : "none")};
`;
