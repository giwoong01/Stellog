import styled from "styled-components";
import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NameInput from "../components/NameInput";
import TextAreaInput from "../components/review/TextAreaInput";
import CreateButton from "../components/CreateButton";
import DatePickerInput from "../components/review/DatePickerInput";
import { createReview, updateReview } from "../api/review";
import { uploadImage } from "../api/image";
import { addDays, format } from "date-fns";

const ReviewForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { roomId } = useParams();
  const location = useLocation();
  const reviewId = location.state?.id;
  const starbucksId = location.state?.starbucksId;
  const isEdit = location.state?.isEdit;

  const [reviewName, setReviewName] = useState(location.state?.title || "");
  const [content, setContent] = useState(location.state?.content || "");
  const [visitedAt, setVisitedAt] = useState<Date | null>(
    location.state?.visitedAt || null
  );

  const handleAddPictureButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imageUrl = await uploadImage(file);
      setContent((prev: string) => prev + `\n${imageUrl}\n`);
    } catch (err) {
      alert("이미지 업로드에 실패했습니다.");
    }
  };

  function extractFirstImageUrl(content: string): string | undefined {
    const urlPattern =
      /(https?:\/\/(?:storage\.googleapis\.com|s3\.amazonaws\.com)\/[^\s]+)/gi;
    const match = content.match(urlPattern);
    return match ? match[0] : undefined;
  }

  const handleCreateReviewButtonClick = async () => {
    if (!reviewName || !content || !visitedAt) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    const mainImgUrl = extractFirstImageUrl(content);

    try {
      const reviewData = {
        title: reviewName,
        content,
        visitedAt: visitedAt ? format(visitedAt, "yyyy-MM-dd") : null,
        starbucksId,
        mainImgUrl,
      };

      if (isEdit) {
        await updateReview(reviewId, reviewData);
      } else {
        await createReview(Number(roomId), reviewData);
      }

      alert("리뷰가 성공적으로 저장되었습니다!");
      navigate(-1);
    } catch (e) {
      alert("리뷰 저장에 실패했습니다.");
    }
  };

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  if (!starbucksId) {
    return <div>잘못된 접근입니다.</div>;
  }

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
      <DatePickerInput
        selected={visitedAt}
        onChange={(date) => setVisitedAt(date)}
        placeholder="방문 날짜를 선택하세요"
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
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

const TextAreaContainer = styled.div`
  width: 40%;
  height: 100%;

  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;
