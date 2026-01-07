import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'
import { Given, When, Then } from './fixtures'
import type { Page } from '@playwright/test'

Given('new account', async ({ page }) => {
  await page.goto('/')
  await page.locator('#iam-email-tab').click()
  await expect(page.locator('#iam-username-input')).toBeFocused()
  await page.keyboard.type(faker.internet.email())
  await page.keyboard.press('Tab')
  await page.keyboard.type(faker.internet.password())
  await page.keyboard.press('Enter')
  await expect(page.locator('#accounts-name-input')).toBeFocused()
  await page.keyboard.type(faker.person.firstName())
  await page.keyboard.press('Enter')
  await isAuthenticated(page)
})

When('I log out', async ({ page }) => {
  await page.locator('#nav-me-button').click()
  await page.locator('#me-logout-button').click({ modifiers: ['Alt'] })

  await isNotAuthenticated(page)
})

Then('I am authenticated', async ({ page }) => {
  await isAuthenticated(page)
})

Then('I am not authenticated', async ({ page }) => {
  await isNotAuthenticated(page)
})

async function isAuthenticated(page: Page) {
  const button = page.locator('#nav-me-button')
  // Use toPass() to retry the visibility check, handling race conditions where
  // authentication completes but Nav component hasn't rendered yet
  // Increase timeout to 20 seconds to allow for slower authentication flows
  // toBeVisible() already waits for the element to be attached, so we don't need a separate waitFor

  await expect(async () => {
    await expect(button).toBeVisible({ timeout: 10_000 })
  }).toPass({ timeout: 20_000 })
}

async function isNotAuthenticated(page: Page) {
  await expect(page.locator('#nav-me-button')).not.toBeVisible()
}
