import { axiosInstance } from "../utils/apiConfig";

export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    `${process.env.REACT_APP_API_BASE_URL}/image`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data.data;
};
