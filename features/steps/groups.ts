import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'
import { Given } from './fixtures'

Given('new group', async ({ page, ctx }) => {
  await page.goto('/contacts/groups/')

  const input = page.locator('#app-cosmetics-name-input')

  await expect(input).toBeVisible()
  await input.click()

  const name = faker.word.noun()

  await input.fill(name)
  await page.keyboard.press('Enter')
  ctx.name = name
  await expect(page.locator('#groups-favorite-button')).toBeVisible()
})
