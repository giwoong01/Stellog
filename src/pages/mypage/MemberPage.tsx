import styled from "styled-components";
import { MemberProfile } from "../../components/mypage/MemberProfile";
import { MemberInfo } from "../../components/mypage/MemberInfo";
import { useEffect, useState } from "react";
import { getMemberInfoById } from "../../api/member";
import { MemberInfo as MemberInfoType } from "../../types/components/member";
import { useParams } from "react-router-dom";

const MemberPage = () => {
  const { memberId } = useParams();
  const [memberInfo, setMemberInfo] = useState<MemberInfoType | null>(null);

  useEffect(() => {
    const fetchMemberInfo = async () => {
      const response = await getMemberInfoById(Number(memberId));
      setMemberInfo(response);
    };

    fetchMemberInfo();
  }, []);

  return (
    <MemberPageContainer>
      <MainContent>
        <MemberProfile
          profileImage={memberInfo?.profileImgUrl || ""}
          name={memberInfo?.name || ""}
          followers={memberInfo?.followerCount || 0}
          following={memberInfo?.followingCount || 0}
          isOwnProfile={false}
        />
        <MemberInfo
          nickname={memberInfo?.nickName || ""}
          provider={memberInfo?.provider || ""}
          email={memberInfo?.email || ""}
          roomCount={memberInfo?.roomCount || 0}
          reviewCount={memberInfo?.reviewCount || 0}
          isOwnProfile={false}
        />
      </MainContent>
    </MemberPageContainer>
  );
};

export default MemberPage;

const MemberPageContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  width: 40%;
  height: 100%;
`;
