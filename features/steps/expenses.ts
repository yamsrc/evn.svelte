import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'
import { Given, When } from './fixtures'

Given('new expense', async ({ page, ctx }) => {
  await page.goto('/')
  await page.locator('#nav-actions-button').click()
  await page.locator('#nav-actions-cheques-input-button').click()
  await expect(page.locator('#expenses-spendings-add-participants-button')).toBeVisible()
  await page.locator('#expenses-spendings-add-participants-button').click()
  await expect(page.locator('#participants-selector-add-button')).toBeVisible()

  // Create a new participant via CreateDialog
  await page.locator('#expenses-add-participants-create-button').click()
  await expect(page.locator('#app-cosmetics-name-input')).toBeVisible()
  await page.locator('#app-cosmetics-name-input').click()
  await page.keyboard.type(faker.person.firstName())
  await expect(page.locator('#app-cosmetics-submit-button')).not.toBeDisabled()
  await page.locator('#app-cosmetics-submit-button').click()
  await expect(page.locator('#app-cosmetics-name-input')).not.toBeVisible()

  // Select the newly created participant and add it
  await page.locator('#contacts-list-content > *').first().click()
  await page.locator('#participants-selector-add-button').click()

  await expect(page.locator('#expenses-form-title-input')).toBeVisible()
  await page.locator('#expenses-form-title-input').click()
  ctx.name = faker.commerce.productName()
  await page.keyboard.type(ctx.name)
  await page.keyboard.press('Tab')
  await page.keyboard.type(faker.location.city())

  // Enter total amount (will auto-split between 2 participants: user + contact)
  await page.locator('#expenses-total-input').click()
  await page.keyboard.type('100')

  await expect(page.locator('#expenses-participant-amount-0')).toHaveValue('50')
  await expect(page.locator('#expenses-participant-amount-1')).toHaveValue('50')

  await expect(page.locator('#expenses-form-save-button')).toBeVisible()
  await expect(page.locator('#expenses-form-save-button')).toBeEnabled()
  await page.locator('#expenses-form-save-button').click()

  await expect(page.getByText(ctx.name)).toBeVisible()

  await page.locator('#expenses-recent-list > *').first().click()

  await expect(page).toHaveURL(/\/expenses\/[^/]+\/$/)
  await expect(page.locator('#expenses-details-title')).toContainText(ctx.name)
  await expect(page.locator('#expenses-edit-action')).toBeVisible()
})

When('I select payer from dropdown', async ({ page }) => {
  await page.locator('#expenses-payer-select-trigger').click()
  await expect(page.locator('[data-slot="select-content"]')).toBeVisible()

  const firstPayerOption = page.locator('[data-slot="select-content"]').locator('[role="option"]').first()

  await firstPayerOption.click()
})
