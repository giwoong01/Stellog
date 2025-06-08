import { axiosInstance } from "../utils/apiConfig";
import { MemberInfo } from "../types/api/member";
import { FollowMember } from "../types/components/member";

export const getMemberInfo = async (): Promise<MemberInfo> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/members/info`
  );

  return response.data.data;
};

export const getMembers = async ({
  name,
}: {
  name: string;
}): Promise<MemberInfo[]> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/members`,
    { params: { name } }
  );

  return response.data.data.members;
};

export const updateMemberNickname = async (nickName: string) => {
  await axiosInstance.put(
    `${process.env.REACT_APP_API_BASE_URL}/members/nickname`,
    { nickName }
  );
};

export const getFollowers = async (): Promise<FollowMember[]> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/follows/followers`
  );

  return response.data.data.follows;
};

export const getFollowing = async (): Promise<FollowMember[]> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/follows/following`
  );

  return response.data.data.follows;
};

export const followMember = async (followId: number) => {
  await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/follows/${followId}`
  );
};

export const unfollowMember = async (followId: number) => {
  await axiosInstance.delete(
    `${process.env.REACT_APP_API_BASE_URL}/follows/${followId}`
  );
};

export const getMemberInfoById = async (memberId: number) => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/members/info/${memberId}`
  );

  return response.data.data;
};

export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  await axiosInstance.put(
    `${process.env.REACT_APP_API_BASE_URL}/members/profile`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
