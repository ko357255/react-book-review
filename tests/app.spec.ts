import { test, expect } from "@playwright/test";

test("アプリのタイトル確認", async ({ page }) => {
  // サイトにアクセス
  await page.goto("http://localhost:5173");

  // テストを行う
  // タイトルが "Vite + React + TS かどうか
  await expect(page).toHaveTitle("Vite + React + TS");
});
