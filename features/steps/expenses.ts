import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'
import { Given, When } from './fixtures'

Given('new expense', async ({ page, ctx }) => {
  await page.goto('/')
  await page.locator('#nav-actions-button').click()
  await page.locator('#nav-actions-cheqes-input-button').click()
  await expect(page.locator('#expenses-add-participants-add-button')).toBeVisible()
  await page.locator('#expenses-add-participants-add-button').click()
  await expect(page.locator('#expenses-form-title-input')).toBeVisible()
  await page.locator('#expenses-form-title-input').click()
  ctx.name = faker.commerce.productName()
  await page.keyboard.type(ctx.name)
  await page.keyboard.press('Tab')
  await page.keyboard.type(faker.location.city())

  // Enter total amount
  await page.locator('#expenses-total-input').click()
  await page.keyboard.type('100')

  // Enter amount for participant to enable save button
  const firstParticipantInput = page.locator('#expenses-participant-amount-0')

  await firstParticipantInput.fill('100')

  // Select payer from dropdown
  await page.locator('#expenses-payer-select-trigger').click()
  await expect(page.locator('[data-slot="select-content"]')).toBeVisible()

  const firstPayerOption = page.locator('[data-slot="select-content"]').locator('[role="option"]').first()

  await firstPayerOption.click()

  await expect(page.locator('#expenses-form-save-button')).toBeVisible()
  await expect(page.locator('#expenses-form-save-button')).toBeEnabled()
  await page.locator('#expenses-form-save-button').click()
  await expect(page).toHaveURL(/\/expenses\/[^/]+\/$/)
})

When('I select payer from dropdown', async ({ page }) => {
  await page.locator('#expenses-payer-select-trigger').click()
  await expect(page.locator('[data-slot="select-content"]')).toBeVisible()

  const firstPayerOption = page.locator('[data-slot="select-content"]').locator('[role="option"]').first()

  await firstPayerOption.click()
})
