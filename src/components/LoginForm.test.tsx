import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import LoginForm from './LoginForm';

describe('ログインフォーム', () => {
  it('メールアドレスの入力欄が表示される', () => {
    render(<LoginForm />); // ログインフォームを描画
    // .getByLabelText(): ラベルのコントロール(input)を取得
    // .toBeInTheDocument(): DOMが存在しているか
    expect(screen.getByLabelText('メールアドレス')).toBeInTheDocument();
  });

  it('パスワードの入力欄が表示される', () => {
    render(<LoginForm />);
    expect(screen.getByLabelText('パスワード')).toBeInTheDocument();
  });

  it('ログインボタンが表示される', () => {
    render(<LoginForm />);
    expect(
      screen.getByRole('button', { name: 'ログイン' }),
    ).toBeInTheDocument();
  });
});
