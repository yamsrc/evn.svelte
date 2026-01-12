import { faker } from '@faker-js/faker'
import { expect } from '@playwright/test'
import { Given, When, Then } from './fixtures'

Given('new managed contact', async ({ page, ctx }) => {
  await page.goto('/contacts/new/managed/')
  await expect(page.locator('#app-cosmetics-name-input')).toBeFocused()
  await page.keyboard.type(faker.person.firstName())
  await page.keyboard.press('Enter')
  await expect(page.locator('#contacts-share-button')).toBeVisible()
})

Then('I capture the first contact name', async ({ page, ctx }) => {
  const firstContact = page.locator('#contacts-list-content > *').first()
  const contactName = await firstContact.textContent()
  // Extract just the name part (before any numbers/balance)
  // The name is typically the first word or words before numbers
  const nameMatch = contactName?.match(/^[\s]*([A-Za-z]+(?:\s+[A-Za-z]+)*)/) ?? null

  ctx.name = nameMatch === null ? (contactName?.trim() ?? '') : nameMatch[1].trim()
})

When('I swipe left on the panel', async ({ page }) => {
  const panel = page.locator('.contacts-panel').first()
  const box = await panel.boundingBox()

  if (box !== null) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()
    await page.mouse.move(box.x - box.width / 2, box.y + box.height / 2)
    await page.mouse.up()
    await page.waitForTimeout(300) // Wait for swipe animation
  }
})
