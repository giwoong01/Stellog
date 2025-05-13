import styled from "styled-components";

interface VisibilitySelectorProps {
  visibility: "public" | "private";
  onChange: (value: "public" | "private") => void;
}

const VisibilitySelector = ({
  visibility,
  onChange,
}: VisibilitySelectorProps) => {
  return (
    <RadioWrapper>
      <RadioLabel>
        <input
          type="radio"
          value="public"
          checked={visibility === "public"}
          onChange={() => onChange("public")}
        />
        공개
      </RadioLabel>
      <RadioLabel>
        <input
          type="radio"
          value="private"
          checked={visibility === "private"}
          onChange={() => onChange("private")}
        />
        비공개
      </RadioLabel>
    </RadioWrapper>
  );
};

export default VisibilitySelector;

const RadioWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const RadioLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 6px;
`;
