import styled from "styled-components";
import { ReactComponent as PersonIconSVG } from "../../../assets/icons/person.svg";

interface User {
  name: string;
}

interface RoomUserInfoProps {
  user: User;
  isOwner?: boolean;
}

const RoomUserInfo = ({ user, isOwner }: RoomUserInfoProps) => (
  <UserInfoWrapper>
    <UserSection>
      <StyledPersonIcon />
      <UserName>{user.name}</UserName>
      {isOwner && <OwnerBadge>방장</OwnerBadge>}
    </UserSection>
  </UserInfoWrapper>
);

export default RoomUserInfo;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0.5rem 0;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 0.7rem;
`;

const StyledPersonIcon = styled(PersonIconSVG)`
  width: 1.25rem;
  height: 1.25rem;
`;

const UserName = styled.span`
  color: #0e0e0e;
  font-size: 1.2rem;
`;

const OwnerBadge = styled.span`
  background-color: #036635;
  color: white;
  font-size: 0.8rem;
  padding: 0.2rem 0.4rem;
  border-radius: 0.3rem;
  margin-left: 0.3rem;
`;
