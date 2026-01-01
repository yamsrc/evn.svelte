import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'

const { Then } = createBdd()

Then('I am authenticated', async ({ page }) => {
  const challenge = await page.evaluate(() => localStorage.getItem('auth:challenge'))

  expect(challenge).not.toBeNull()
})
