import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'
import { Given } from './fixtures'

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

  // Click on payer to enable save button
  const payersList = page.locator('#expenses-payers-list-content')

  await expect(payersList).toBeVisible()
  await payersList.locator('.expenses-payer').first().click()

  // Enter amount for participant to enable save button
  const firstParticipantInput = page.locator('#expenses-participant-amount-0')

  await firstParticipantInput.fill('100')
  await expect(page.locator('#expenses-form-save-button')).toBeVisible()
  await expect(page.locator('#expenses-form-save-button')).toBeEnabled()
  await page.locator('#expenses-form-save-button').click()
  await expect(page).toHaveURL(/\/expenses\/[^/]+\/$/)
})
