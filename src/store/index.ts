import { configureStore } from '@reduxjs/toolkit';
import testSlice from '@/store/test';
import authReducer from '@/store/auth';

// storeに登録
export const store = configureStore({
  reducer: {
    test: testSlice.reducer,
    auth: authReducer,
  },
});

// 型を示すために使う
export type RootState = ReturnType<typeof store.getState>; // stateの型
export type AppDispatch = typeof store.dispatch; // dispatchの型
