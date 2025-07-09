// import { store } from '@/store/index';
import axios from 'axios';

// axiosインスタンスを生成
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_RAILWAY_BOOK_REVIEW_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// axios リクエストの共通処理
axiosInstance.interceptors.request.use((config) => {
  // useSelector() はコンポーネント内でしか使えないため
  // store.getState()を使用する
  const token = localStorage.getItem('authToken');
  if (token) {
    // ヘッダーに認証情報を付与
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
