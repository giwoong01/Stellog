import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

interface TextAreaInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onButtonClick: () => void;
}

const TextAreaInput = ({
  value,
  onChange,
  placeholder,
  onButtonClick,
}: TextAreaInputProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const mirrorRef = useRef<HTMLDivElement>(null);
  const [buttonPos, setButtonPos] = useState({
    top: 0,
    left: 0,
    visible: false,
  });

  useEffect(() => {
    updateButtonPosition();
  }, [value]);

  const updateButtonPosition = () => {
    if (!textAreaRef.current || !mirrorRef.current) return;

    const textarea = textAreaRef.current;
    const mirror = mirrorRef.current;

    const selectionStart = textarea.selectionStart;

    const beforeCursor = value.slice(0, selectionStart);
    const afterCursor = value.slice(selectionStart);

    mirror.innerHTML =
      beforeCursor.replace(/\n$/g, "\n\u200b").replace(/\n/g, "<br/>") +
      "<span id='cursor-span'>|</span>" +
      afterCursor.replace(/\n/g, "<br/>");

    const cursorSpan = mirror.querySelector("#cursor-span") as HTMLSpanElement;

    if (cursorSpan) {
      const rect = cursorSpan.getBoundingClientRect();
      const mirrorRect = mirror.getBoundingClientRect();

      const top = rect.top - mirrorRect.top - textarea.scrollTop;
      const left = rect.left - mirrorRect.left;

      const visibleTop = textarea.scrollTop;
      const visibleBottom = visibleTop + textarea.clientHeight;

      const cursorOffsetTop = cursorSpan.offsetTop;

      const isVisible =
        cursorOffsetTop >= visibleTop && cursorOffsetTop <= visibleBottom - 15;

      setButtonPos({
        top,
        left,
        visible: isVisible,
      });
    }
  };

  const handleCursorMove = () => {
    requestAnimationFrame(updateButtonPosition);
  };

  return (
    <>
      {buttonPos.visible && (
        <AddButton
          style={{ top: buttonPos.top - 2, left: -30 }}
          onClick={onButtonClick}
        >
          +
        </AddButton>
      )}
      <TextArea
        ref={textAreaRef}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          handleCursorMove();
        }}
        onClick={handleCursorMove}
        onKeyUp={handleCursorMove}
        onScroll={handleCursorMove}
        placeholder={placeholder}
      />
      <MirrorContent ref={mirrorRef} aria-hidden="true" />
    </>
  );
};

export default TextAreaInput;

const TextArea = styled.textarea`
  width: 100%;
  height: 60vh;
  padding: 0.7rem 0.7rem 0 0.7rem;
  font-size: 1rem;
  line-height: 1.5rem;

  border: 0;
  border-top: 0.3px solid #036635;
  border-left: 0.3px solid #036635;
  border-right: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;

  resize: none;
  outline: none;
  overflow: auto;

  scrollbar-width: thin;
  scrollbar-color: #036635 #0366351a;
`;

const MirrorContent = styled.div`
  width: 100%;
  height: 60vh;
  padding: 0.7rem 0.7rem 0 0.7rem;
  font-size: 1rem;
  line-height: 1.5rem;

  position: absolute;
  top: 0;
  left: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
  pointer-events: none;
  visibility: hidden;
`;

const AddButton = styled.button`
  position: absolute;
  background-color: #0366351a;
  color: #036635;
  border: none;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: #036635;
    color: white;
  }
`;
