import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { DatePickerInputProps } from "../../types/components/review";

const DatePickerInput = ({
  selected,
  onChange,
  placeholder,
}: DatePickerInputProps) => (
  <DatePickerContainer>
    <DatePicker
      selected={selected}
      onChange={onChange}
      placeholderText={placeholder}
      dateFormat="yyyy-MM-dd"
    />
  </DatePickerContainer>
);

export default DatePickerInput;

const DatePickerContainer = styled.div`
  position: relative;
  width: 40%;
  display: flex;
  justify-content: end;
  margin-bottom: 2rem;

  input {
    padding: 0.7rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    outline: none;

    &:focus {
      border-color: #036635;
    }
  }
`;
