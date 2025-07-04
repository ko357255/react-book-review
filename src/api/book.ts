import axiosInstance from '@/api/axiosInstance';
import handleError from '@/api/handleError';

interface Book {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
}

export const bookGet = async (offset: number = 0): Promise<Book> => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axiosInstance.get('/book', {
      params: {
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e: unknown) {
    return handleError(e);
  }
};
