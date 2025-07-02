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
