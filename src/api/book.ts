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

export const bookGet = async (offset: number = 0): Promise<BookData[]> => {
  const token = localStorage.getItem('authToken');

  try {
    const response = await axiosInstance.get('/books', {
      params: {
        offset: offset,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (e: unknown) {
    // エラーを整形して発生させる
    return handleError(e);
  }
};

// export const bookGet = async (offset: number = 0): Promise<BookData[]> => {
//   const response = await axiosInstance.get('/books', {
//     params: {
//       offset: offset,
//     },
//   });
//   return response.data;
// };
