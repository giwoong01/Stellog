import styled from "styled-components";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NameInput from "../components/NameInput";
import TextAreaInput from "../components/review/TextAreaInput";
import CreateButton from "../components/CreateButton";

const ReviewForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  const [reviewName, setReviewName] = useState(state?.title || "");
  const [content, setContent] = useState(state?.content || "");
  const [visitDate, setVisitDate] = useState<Date | null>(null);

  const handleAddPictureButtonClick = () => {
    console.log("추가 버튼 클릭");
  };

  const handleCreateReviewButtonClick = () => {
    console.log("리뷰 생성 버튼 클릭");
    console.log("리뷰 제목:", reviewName);
    console.log("리뷰 내용:", content);
    console.log("방문 날짜:", visitDate);
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <FormContainer>
      <BackButton onClick={handleBackButtonClick}>
        <span>← 뒤로가기</span>
      </BackButton>
      <NameInput
        placeholder="제목을 입력하세요"
        value={reviewName}
        onChange={setReviewName}
      />
      <DatePickerContainer>
        <DatePicker
          selected={visitDate}
          onChange={(date) => setVisitDate(date)}
          placeholderText="방문 날짜를 선택하세요"
          dateFormat="yyyy-MM-dd"
        />
      </DatePickerContainer>
      <TextAreaContainer>
        <TextAreaInput
          value={content}
          onChange={setContent}
          placeholder="리뷰를 입력하세요"
          onButtonClick={handleAddPictureButtonClick}
        />
      </TextAreaContainer>
      <CreateButton onClick={handleCreateReviewButtonClick} content="저장" />
    </FormContainer>
  );
};

export default ReviewForm;

const FormContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
`;

const BackButton = styled.button`
  display: flex;
  width: 40%;
  background: none;
  border: none;
  color: #036635;
  font-size: 1rem;
  margin-bottom: 1rem;

  span {
    cursor: pointer;
  }

  &:hover {
    text-decoration: underline;
  }
`;

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

const TextAreaContainer = styled.div`
  width: 40%;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
