import axios from 'axios';

// axiosインスタンスを生成
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_RAILWAY_BOOK_REVIEW_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
