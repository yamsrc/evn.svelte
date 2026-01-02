import { expect } from '@playwright/test'
import { Given, Then } from './fixtures'

Given('path {string}', async ({ page }, path) => {
  await page.goto(path)
})

Then('the page is loaded', async ({ page }) => {
  await expect(page).toHaveURL(/.+/)
})
