import axiosInstance from '@/api/axiosInstance';
import handleError from '@/api/handleError';

interface LogRequest {
  selectBookId: string;
}

export const selectBookLog = async (logData: LogRequest) => {
  try {
    await axiosInstance.post('/logs', logData);
  } catch (e: unknown) {
    return handleError(e);
  }
};
