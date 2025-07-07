import test, { expect } from 'playwright/test';

// テストをまとめる
test.describe('ログインフォームのバリデーション', () => {
  test('メールアドレス未入力エラーが表示されるかどうか', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // .fill(): テキストを入力する
    await page.fill('input[id="password"]', 'password123');

    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click(); // クリック

    // メールアドレスのエラーメッセージが表示されることを確認
    // + : 直後の隣の要素を取得する
    const emailError = page.locator('input#email + .invalid-feedback');
    await expect(emailError).toHaveText('メールアドレスを入力してください');
    
    // パスワードフィールドのエラーメッセージが表示されないことを確認
    const passwordError = page.locator('input#password + .invalid-feedback');
    await expect(passwordError).not.toBeVisible();
  });

  test('パスワード未入力エラーが表示されるかどうか', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[id="email"]', 'test@example.com');

    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click();

    const passwordError = page.locator('input#password + .invalid-feedback');
    await expect(passwordError).toHaveText('パスワードを入力してください');
    
    const emailError = page.locator('input#email + .invalid-feedback');
    await expect(emailError).not.toBeVisible();
  });

  test('メールアドレスとパスワードの未入力エラーが表示されるかどうか', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/login'); // ログインページ

    const loginButton = page.locator('button[type="submit"]');

    await loginButton.click();

    const emailError = page.locator('input#email + .invalid-feedback');
    await expect(emailError).toHaveText('メールアドレスを入力してください');
    
    const passwordError = page.locator('input#password + .invalid-feedback');
    await expect(passwordError).toHaveText('パスワードを入力してください');
  });

  test('メールアドレスとパスワード両方入力されている場合、エラーが表示されない', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[id="email"]', 'test@example.com');
    await page.fill('input[id="password"]', 'password123');

    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click();

    const emailError = page.locator('input#email + .invalid-feedback');
    await expect(emailError).not.toBeVisible();

    const passwordError = page.locator('input#password + .invalid-feedback');
    await expect(passwordError).not.toBeVisible();
  });
});
