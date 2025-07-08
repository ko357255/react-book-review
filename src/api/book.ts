import axiosInstance from '@/api/axiosInstance';
import handleError from '@/api/handleError';

export interface BookData {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
}

interface BookCreateRequest {
  title: string;
  url: string;
  detail: string;
  review: string;
}

interface BookCreateResponse {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
}

export const bookGet = async (offset: number = 0): Promise<BookData[]> => {
  try {
    const response = await axiosInstance.get('/books', {
      params: {
        offset: offset,
      },
    });

    return response.data;
  } catch (e: unknown) {
    // エラーを整形して発生させる
    return handleError(e);
  }
};

export const bookCreate = async (
  bookData: BookCreateRequest,
): Promise<BookCreateResponse> => {
  try {
    const response = await axiosInstance.post('/books', bookData);

    return response.data;
  } catch (e: unknown) {
    // エラーを整形して発生させる
    return handleError(e);
  }
};
