import { ReactComponent as ScheduleIconSVG } from "../../assets/icons/category.svg";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { ScheduleListProps } from "../../types/components/calendar";

const ScheduleList = ({
  schedule,
  onAddSchedule,
  onToggleSchedule,
  creating,
  onEditSchedule,
  onDeleteSchedule,
}: ScheduleListProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newSchedule, setNewSchedule] = useState("");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editingIdx, setEditingIdx] = useState<number | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [togglingId, setTogglingId] = useState<number | null>(null);

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

  const handleEdit = (idx: number, name: string) => {
    setEditIdx(idx);
    setEditValue(name);
  };

  const handleEditConfirm = (item: any) => {
    if (onEditSchedule && editValue.trim()) {
      setEditingIdx(editIdx);
      onEditSchedule(item, editValue.trim(), () => {
        setEditingIdx(null);
        setEditIdx(null);
        setEditValue("");
      });
    }
  };

  const handleDelete = (item: any) => {
    if (onDeleteSchedule) {
      setDeletingId(item.id);
      onDeleteSchedule(item, () => setDeletingId(null));
    }
  };

  const handleToggle = (idx: number, item: any) => {
    setTogglingId(item.id);
    onToggleSchedule?.(idx, () => setTogglingId(null));
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
          <ScheduleItem
            key={idx}
            onMouseEnter={() => setHoveredIdx(idx)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            <CheckboxWrapper>
              <HiddenCheckbox
                checked={item.completed ?? false}
                onChange={() => handleToggle(idx, item)}
                disabled={togglingId === item.id}
              />
              <CustomCheckbox
                checked={item.completed ?? false}
                disabled={togglingId === item.id}
              />
            </CheckboxWrapper>

            {editIdx === idx ? (
              <AddInputContainer>
                <ScheduleInput
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onBlur={() => handleEditConfirm(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleEditConfirm(item);
                  }}
                  autoFocus
                />
                {editingIdx === idx && (
                  <LoadingMessage>
                    수정중<span className="dot">.</span>
                    <span className="dot">.</span>
                    <span className="dot">.</span>
                  </LoadingMessage>
                )}
              </AddInputContainer>
            ) : (
              <StyledSpan completed={item.completed ?? false}>
                {item.name}
              </StyledSpan>
            )}

            {hoveredIdx === idx && editIdx !== idx && (
              <>
                <ActionButton onClick={() => handleEdit(idx, item.name)}>
                  수정
                </ActionButton>
                <ActionButton onClick={() => handleDelete(item)} $delete>
                  삭제
                </ActionButton>
              </>
            )}
            {deletingId === item.id && (
              <LoadingMessage>
                삭제중<span className="dot">.</span>
                <span className="dot">.</span>
                <span className="dot">.</span>
              </LoadingMessage>
            )}
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

        {!isAdding && creating && (
          <AddInputContainer>
            <LoadingMessage>
              생성중<span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </LoadingMessage>
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
  width: 35%;
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
  input:disabled + span {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(0.7);
  }
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
  display: none;
  &:disabled + span {
    opacity: 0.4;
    cursor: not-allowed;
    filter: grayscale(0.7);
  }
`;

const CustomCheckbox = styled.span<{ checked: boolean; disabled?: boolean }>`
  width: 1.1rem;
  height: 1.1rem;
  border: 2px solid #4ade80;
  border-radius: 0.4rem;
  background: ${({ checked }) => (checked ? "#4ade80" : "#fff")};
  display: inline-block;
  margin-right: 0.5rem;
  position: relative;
  transition: background 0.2s, opacity 0.2s, filter 0.2s;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  filter: ${({ disabled }) => (disabled ? "grayscale(0.7)" : "none")};
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

const loadingDots = keyframes`
  0% { opacity: 0.2; }
  20% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const LoadingMessage = styled.div`
  display: flex;
  align-items: center;
  background: #e0f7e9;
  color: #036635;
  border-radius: 1rem;
  padding: 0.3rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  margin-left: 0.7rem;
  box-shadow: 0 2px 8px rgba(76, 175, 80, 0.08);
  .dot {
    animation: ${loadingDots} 1.4s infinite;
    margin-left: 0.1em;
    &:nth-child(2) {
      animation-delay: 0.2s;
    }
    &:nth-child(3) {
      animation-delay: 0.4s;
    }
  }
`;

const ActionButton = styled.button<{ $delete?: boolean }>`
  margin-left: 0.5rem;
  padding: 0.2rem 0.7rem;
  border: none;
  border-radius: 0.5rem;
  background: ${({ $delete }) => ($delete ? "#ffbdbd" : "#e0f7e9")};
  color: ${({ $delete }) => ($delete ? "#b71c1c" : "#036635")};
  font-size: 0.8rem;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: ${({ $delete }) => ($delete ? "#ff8a80" : "#b2f2d7")};
  }
`;
