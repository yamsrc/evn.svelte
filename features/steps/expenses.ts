import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'
import { Given } from './fixtures'

Given('new expense', async ({ page, ctx }) => {
  await page.goto('/')
  await page.locator('#nav-actions-button').click()
  await page.locator('#nav-actions-cheqes-input-button').click()
  await expect(page.locator('#expenses-form-title-input')).toBeVisible()
  await page.locator('#expenses-form-title-input').click()
  ctx.name = faker.commerce.productName()
  await page.keyboard.type(ctx.name)
  await page.keyboard.press('Tab')
  await page.keyboard.type(faker.location.city())
  await expect(page.locator('#expenses-form-save-button')).toBeVisible()
  await expect(page.locator('#expenses-form-save-button')).toBeEnabled()
  await page.locator('#expenses-form-save-button').click()
  await expect(page).toHaveURL(/\/expenses\/[^/]+\/$/)
})
