import { axiosInstance } from "../utils/apiConfig";
import { OAuthResponse } from "../types/api/auth";

export const handleOAuthLogin = async (
  provider: string,
  code: string
): Promise<OAuthResponse> => {
  const response = await axiosInstance.get(
    `${process.env.REACT_APP_API_BASE_URL}/oauth2/callback/${provider}?code=${code}`
  );

  return response.data;
};
