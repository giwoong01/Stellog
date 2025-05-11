import React from "react";
import styled from "styled-components";

interface RouteNameModalProps {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const RouteNameModal = ({
  value,
  onChange,
  onSave,
  onClose,
}: RouteNameModalProps) => {
  return (
    <ModalOverlay>
      <ModalBox>
        <ModalTitle>동선 이름을 입력하세요</ModalTitle>
        <ModalInput
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="동선 이름"
          autoFocus
        />
        <ModalBtnRow>
          <ModalSaveBtn onClick={onSave} disabled={!value.trim()}>
            저장
          </ModalSaveBtn>
          <ModalCancelBtn onClick={onClose}>취소</ModalCancelBtn>
        </ModalBtnRow>
      </ModalBox>
    </ModalOverlay>
  );
};

export default RouteNameModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalBox = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2rem 2.5rem;
  min-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const ModalInput = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-bottom: 1.2rem;

  &:focus {
    outline: none;
    border-color: #4ade80;
  }
`;

const ModalBtnRow = styled.div`
  display: flex;
  gap: 1rem;
`;

const ModalSaveBtn = styled.button`
  background: #4ade80;
  color: #fff;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;

  &:disabled {
    background: #e2e8f0;
    color: #aaa;
    cursor: not-allowed;
  }
`;

const ModalCancelBtn = styled.button`
  background: #e2e8f0;
  color: #aaa;
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
`;
