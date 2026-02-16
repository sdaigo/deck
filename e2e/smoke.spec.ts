import { expect, test } from "@playwright/test"

test("アプリにアクセスしてタイトルが表示される", async ({ page }) => {
  await page.goto("/")
  await expect(page.getByRole("heading", { name: "SimpleTodo" })).toBeVisible()
})
