import { expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { Given } from './fixtures'

Given('new managed contact', async ({ page, ctx }) => {
  await page.goto('/contacts/new/managed/')
  await expect(page.locator('#app-cosmetics-name-input')).toBeFocused()

  const name = faker.person.firstName()

  await page.keyboard.type(name)
  await page.keyboard.press('Enter')
  await expect(page.locator('#contacts-share-button')).toBeVisible()
  ctx.name = name
})
