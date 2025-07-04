import { isAxiosError } from 'axios';

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

export default handleError;
