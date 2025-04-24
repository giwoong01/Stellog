import React from "react";
import styled from "styled-components";
import { ReactComponent as SearchSVG } from "../../../assets/icons/search.svg";

const RoomSearchBar = () => {
  return (
    <SearchBarContainer>
      <SearchInput type="text" placeholder="방을 검색해주세요." />
      <StyleSearchIcon
        onClick={() => {
          alert("검색 기능은 아직 구현되지 않았습니다.");
        }}
      />
    </SearchBarContainer>
  );
};

export default RoomSearchBar;

const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  padding: 0.8rem 1.2rem;
  border: 1px solid #e6e6e6;
  border-radius: 12px;
`;

const SearchInput = styled.input`
  width: 100%;
  font-size: 1rem;
  border: 0;
  outline: none;
`;

const StyleSearchIcon = styled(SearchSVG)`
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;
