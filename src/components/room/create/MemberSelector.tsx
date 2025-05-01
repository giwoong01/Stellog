import styled from "styled-components";

interface Member {
  id: number;
  name: string;
  profileImage: string;
}

interface MemberSelectorProps {
  search: string;
  onSearchChange: (value: string) => void;
  filteredMembers: Member[];
  selectedMembers: Member[];
  toggleMember: (member: Member) => void;
  currentMemberId: number;
}

const MemberSelector = ({
  search,
  onSearchChange,
  filteredMembers,
  selectedMembers,
  toggleMember,
  currentMemberId,
}: MemberSelectorProps) => (
  <ListContainer>
    <SearchWrapper>
      <SearchInput
        placeholder="친구 찾기"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </SearchWrapper>

    {filteredMembers.length > 0 && (
      <FilteredMemberList>
        {filteredMembers
          .filter((m) => !selectedMembers.some((s) => s.id === m.id))
          .map((member) => (
            <FilteredMemberItem key={member.id}>
              <span>{member.name}</span>
              <input type="checkbox" onChange={() => toggleMember(member)} />
            </FilteredMemberItem>
          ))}
      </FilteredMemberList>
    )}

    {selectedMembers.length > 0 && (
      <MemberList>
        {selectedMembers
          .filter((member) => member.id !== currentMemberId)
          .map((member) => (
            <MemberItem key={member.id}>
              <span>{member.name}</span>
              <input
                type="checkbox"
                checked
                onChange={() => toggleMember(member)}
              />
            </MemberItem>
          ))}
      </MemberList>
    )}
  </ListContainer>
);

export default MemberSelector;

const ListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SearchWrapper = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  border-top: 0.3px solid #036635;
  border-bottom: 1.5px solid #036635;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.7rem;
  outline: none;
  border: 0;
`;

const FilteredMemberList = styled.ul`
  width: 50%;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #036635;
`;

const FilteredMemberItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;

const MemberList = styled.ul`
  width: 50%;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #036635;
`;

const MemberItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
`;
