import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'

const { Given, When, Then } = createBdd()

Given('path {string}', async ({ page }, path) => {
  await page.goto(path)
})

Then('the page is loaded', async ({ page }) => {
  await expect(page).toHaveURL(/.+/)
})

When('I tap {string}', async ({ page }, marker) => {
  const element = page.locator(`[data-marker="${marker}"]`)

  await element.scrollIntoViewIfNeeded()
  await element.click()
})

Then('{string} is focused', async ({ page }, marker) => {
  const element = page.locator(`[data-marker="${marker}"]`)

  await expect(element).toBeVisible()
  await expect(element).toBeFocused()
})
