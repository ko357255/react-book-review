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

interface BookGetRequest {
  id: string;
}

interface BookGetResponse {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: true;
}

export const bookListGet = async (offset: number = 0): Promise<BookData[]> => {
  try {
    const response = await axiosInstance.get('/books', {
      params: {
        offset: offset,
      },
    });

    return response.data;
  } catch (e: unknown) {
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
    return handleError(e);
  }
};

export const bookGet = async (
  bookData: BookGetRequest,
): Promise<BookGetResponse> => {
  try {
    const response = await axiosInstance.get(`/books/${bookData.id}`);

    return response.data;
  } catch (e: unknown) {
    return handleError(e);
  }
};
