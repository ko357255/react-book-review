import {
  configureStore,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit';

interface TestState {
  value: number;
}

const initialState: TestState = {
  value: 0,
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    add: (state) => {
      state.value += 1;
    },
    remove: (state) => {
      state.value -= 1;
    },
    set: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { add, remove, set } = testSlice.actions;

export const store = configureStore({
  reducer: {
    test: testSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
