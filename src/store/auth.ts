import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('authToken') ?? null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ログイン時
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
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
});

export const { setToken, setTokenFromLocalStorage, logout } = authSlice.actions;

export default authSlice;
