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

interface IconUploadResponse {
  iconUrl: string;
}

interface SigninRequest {
  email: string;
  password: string;
}

interface SigninResponse {
  token: string;
}

// 共通のエラーハンドリング
// エラーを整形して発生させる
const handleError = (e: unknown): never => {
  let errorMessage = '予期せぬエラーが発生しました';

  if (isAxiosError(e)) {
    // axiosではエラーが AxiosError となる
    if (e.response) {
      // レスポンスがある場合
      errorMessage = e.response.data?.ErrorMessageJP || e.message;
    } else if (e.request) {
      // リクエストはあるけどレスポンスがない場合
      errorMessage = 'ネットワークエラーが発生しました';
    }
  }
  // 整形したエラーを投げる
  throw new Error(errorMessage);
};

// ユーザー作成関数
export const userCreate = async (
  userData: UserCreateRequest,
): Promise<UserCreateResponse> => {
  try {
    const response = await axiosInstance.post('/users', userData);
    return response.data; // axiosでは.json()は不要

    // axios では HTTPステータスコードもエラーとなるため
    // response.ok は不要
  } catch (e: unknown) {
    // 整形したエラーを返す
    return handleError(e);
  }
};

// アイコンアップロード関数
export const iconUpload = async (
  token: string,
  file: File | Blob,
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
  } catch (e: unknown) {
    return handleError(e);
  }
};

export const signin = async (
  userData: SigninRequest,
): Promise<SigninResponse> => {
  try {
    const response = await axiosInstance.post('/signin', userData);

    // ローカルストレージにトークンをセット
    localStorage.setItem('authToken', response.data);
    return response.data;
  } catch (e: unknown) {
    return handleError(e);
  }
};
