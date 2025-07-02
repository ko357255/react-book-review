import test, { expect } from 'playwright/test';

// テストをまとめる
test.describe('ログインフォームのバリデーション', () => {
  test('メールアドレス未入力エラーが表示されるかどうか', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    // .fill(): テキストを入力する
    await page.fill('input[id="password"]', 'password123');

    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click(); // クリック

    const errorAlert = page.locator('div[role="alert"]');

    // .toHaveText(): テキストを持っている
    await expect(errorAlert.locator('div:nth-child(1)')).toHaveText(
      'メールアドレスを入力してください',
    );
    // .not.toBeVisible(): 表示されていない
    await expect(errorAlert.locator('div:nth-child(2)')).not.toBeVisible();
  });

  test('パスワード未入力エラーが表示されるかどうか', async ({ page }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[id="email"]', 'test@example.com');

    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click();

    const errorAlert = page.locator('div[role="alert"]');
    await expect(errorAlert.locator('div:nth-child(1)')).toHaveText(
      'パスワードを入力してください',
    );
    await expect(errorAlert.locator('div:nth-child(2)')).not.toBeVisible();
  });

  test('メールアドレスとパスワードの未入力エラーが表示されるかどうか', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/login'); // ログインページ

    const loginButton = page.locator('button[type="submit"]');

    await loginButton.click();

    const errorAlert = page.locator('div[role="alert"]');

    await expect(errorAlert.locator('div:nth-child(1)')).toHaveText(
      'メールアドレスを入力してください',
    );
    await expect(errorAlert.locator('div:nth-child(2)')).toHaveText(
      'パスワードを入力してください',
    );
  });

  test('メールアドレスとパスワード両方入力されている場合、エラーが表示されない', async ({
    page,
  }) => {
    await page.goto('http://localhost:5173/login');

    await page.fill('input[id="email"]', 'test@example.com');
    await page.fill('input[id="password"]', 'password123');

    const loginButton = page.locator('button[type="submit"]');
    await loginButton.click();

    const errorAlert = page.locator('div[role="alert"]');
    await expect(errorAlert).not.toBeVisible(); // エラーメッセージが表示されない
  });
});
