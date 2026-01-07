import { expect } from '@playwright/test'
import { Given, Then } from './fixtures'

Given('path {string}', async ({ page }, path) => {
  await page.goto(path)
})

Then('the page is loaded', async ({ page }) => {
  await expect(page).toHaveURL(/.+/)
})

Then('my clipboard is not empty', async ({ page }) => {
  await expect(async () => {
    const clipboard = await page.evaluate(() => navigator.clipboard.readText())

    expect(clipboard).not.toBe('')
  }).toPass()
})

Then('I open link from the clipboard', async ({ page }) => {
  const clipboard = await page.evaluate(() => navigator.clipboard.readText())

  expect(clipboard).not.toBe('')

  const response = await page.goto(clipboard)

  expect(response?.status(), clipboard).toBe(200)
})

Then('I clear the session', async ({ page }) => {
  await page.evaluate(() => localStorage.clear())
})

Then('path matches {string}', async ({ page }, pattern) => {
  const regex = new RegExp(pattern)

  await expect(page).toHaveURL(regex)
})
