import { axiosInstance } from "../utils/apiConfig";
import { MemberInfo } from "../types/api/member";

export const getMemberInfo = async (): Promise<MemberInfo> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/members/info`
  );

  console.log(response);

  return response.data.data;
};
