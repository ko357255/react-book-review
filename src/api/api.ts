import { isAxiosError } from 'axios';
import axiosInstance from './axiosInstance';

interface UserCreateRequest {
  name: string;
  email: string;
  password: string;
}

interface UserCreateResponse {
  token: string;
}

export const UserCreate = async (
  userData: UserCreateRequest,
): Promise<UserCreateResponse> => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data;
  } catch (e: unknown) {
    if (isAxiosError(e)) {
      if (e.response) {
        // レスポンスがある場合
        throw e;
      } else if (e.request) {
        // リクエストはあるけど、レスポンスがない場合
        throw new Error('ネットワークエラーが発生しました');
      }
    }
    // それ以外の場合
    throw new Error('不明なエラーが発生しました');
  }
};

interface IconUploadResponse {
  iconUrl: string;
}

export const IconUpload = async (
  token: string,
  file: File,
): Promise<IconUploadResponse> => {
  const formData = new FormData();
  formData.append('icon', file);

  try {
    const response = await axiosInstance.post('/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // アップロードの場合はmultipart/form-data
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    if (isAxiosError(e)) {
      if (e.response) {
        throw e;
      } else if (e.request) {
        throw new Error('ネットワークエラーが発生しました');
      }
    }
    throw new Error('不明なエラーが発生しました');
  }
};
