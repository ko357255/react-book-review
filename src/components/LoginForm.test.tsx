import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authSlice from '@/store/auth';
import { Provider } from 'react-redux';

// テスト用のstore
const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

describe('ログインフォーム', () => {
  it('メールアドレスの入力欄が表示される', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    ); // ログインフォームを描画
    // .getByLabelText(): ラベルのコントロール(input)を取得
    // .toBeInTheDocument(): DOMが存在しているか
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
  });

  it('パスワードの入力欄が表示される', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
  });

  it('ログインボタンが表示される', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginForm />
        </MemoryRouter>
      </Provider>,
    );
    expect(
      screen.getByRole('button', { name: 'ログイン' }),
    ).toBeInTheDocument();
  });
});
