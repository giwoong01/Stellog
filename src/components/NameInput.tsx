import styled from "styled-components";

interface NameInputProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const NameInput = ({ placeholder, value, onChange }: NameInputProps) => (
  <Input
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    onFocus={(e) => (e.target.placeholder = "")}
  />
);

export default NameInput;

const Input = styled.input`
  width: 40%;
  padding: 0.7rem 0;
  font-size: 1.2rem;
  text-align: center;
  outline: none;
  border: 0;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
  margin-bottom: 2rem;
`;
