import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'
import { createBdd } from 'playwright-bdd'

const { Given, Then } = createBdd()

Given('new account', async ({ page }) => {
  await page.goto('/')
  await page.locator('#email-tab').click()
  await expect(page.locator('#username-input')).toBeFocused()
  await page.keyboard.type(faker.internet.email())
  await page.keyboard.press('Tab')
  await page.keyboard.type(faker.internet.password())
  await page.keyboard.press('Enter')

  const nameInput = page.locator('#name-input')

  await expect(nameInput).toBeFocused()
  await page.keyboard.type(faker.person.firstName())
  await page.keyboard.press('Enter')

  await expect(async () => {
    const challenge = await page.evaluate(() => localStorage.getItem('auth:challenge'))

    expect(challenge).not.toBeNull()
  }).toPass()
})

Then('I am authenticated', async ({ page }) => {
  const challenge = await page.evaluate(() => localStorage.getItem('auth:challenge'))

  expect(challenge).not.toBeNull()
})

Then('I am not authenticated', async ({ page }) => {
  const challenge = await page.evaluate(() => localStorage.getItem('auth:challenge'))

  expect(challenge).toBeNull()
})
