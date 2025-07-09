import { userGet } from '@/api/user';
import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';
import type { RootState } from '@/store';

interface UserData {
  name: string;
  iconUrl: string;
}

interface AuthState {
  token: string | null;
  user: null | UserData;
  isLoading: boolean;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken') ?? null,
  user: null,
  isLoading: false,
};

export const fetchUser = createAsyncThunk('auth/fetch', async (_, thunkAPI) => {
  try {
    // store.getState()は循環エラーとなるため使わない
    const store = thunkAPI.getState() as RootState;
    const token = store.auth.token;
    if (!token) return null;

    const user = await userGet(token);
    return user;
  } catch (e: unknown) {
    let errorMessage = '予期せぬエラーが発生しました';
    if (e instanceof Error) {
      errorMessage = e.message;
    }
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ログイン時
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('authToken', action.payload);
    },
    // ローカルストレージを元にトークンをセット
    setTokenFromLocalStorage: (state) => {
      state.token = localStorage.getItem('authToken') ?? null;
    },
    // ログアウト時
    logout: (state) => {
      state.token = null;
      localStorage.removeItem('authToken');
    },
  },
  // AsyncThunkから受け付けるReducer
  extraReducers: (builder) => {
    builder
      // 開始時
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      // 終了時
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserData | null>) => {
          state.isLoading = false;
          state.user = action.payload;
        },
      )
      // エラー時
      .addCase(fetchUser.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setToken, setTokenFromLocalStorage, logout } = authSlice.actions;
export default authSlice;
