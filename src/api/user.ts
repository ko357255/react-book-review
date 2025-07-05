import axiosInstance from '@/api/axiosInstance';
import handleError from '@/api/handleError';
import { setToken } from '@/store/auth';
import { useDispatch } from 'react-redux';

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
    localStorage.setItem('authToken', response.data.token);
    // storeにトークンをセット
    const dispatch = useDispatch();
    dispatch(setToken(response.data.token));
    return response.data;
  } catch (e: unknown) {
    return handleError(e);
  }
};
