import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Given } from './fixtures'

Given('new group', async ({ page, ctx }) => {
  await page.goto('/contacts/')
  await page.goto('/contacts/groups/')

  const input = page.locator('#app-cosmetics-name-input')

  await expect(input).toBeVisible()
  await input.click()

  const name = faker.word.noun()

  await input.fill(name)
  ctx.name = name
  await page.locator('#nav-actions-groups-save-button').click()
  await expect(page.locator('#group-favorite-button')).toBeVisible()
})
