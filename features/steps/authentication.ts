import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
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
  await expect(page.locator('#app-cosmetics-name-input')).toBeFocused()
  await page.keyboard.type(faker.person.firstName())
  await page.keyboard.press('Enter')
  await isAuthenticated(page)
})

When('I log out', async ({ page }) => {
  await page.locator('#header-me-button').click()
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
  await expect(page.locator('#header-me-button')).toBeVisible()
}

async function isNotAuthenticated(page: Page) {
  await expect(page.locator('#header-me-button')).not.toBeVisible()
}
