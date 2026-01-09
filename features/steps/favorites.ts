import { expect } from '@playwright/test'
import { When } from './fixtures'

When('I tap the favorite action button', async ({ page }) => {
  // After swiping, the actions appear as buttons in a separate div
  // The favorite action is the first button (star icon) in the actions area
  // The panel structure: the actions are in a div with class containing "snap-end"
  // Find the panel, then find its ancestor container, then find buttons in the actions div
  const panel = page.locator('.contacts-panel').first()
  // Find the scrollable container that contains both the panel and actions
  const container = panel.locator('xpath=ancestor::div[contains(@class, "overflow-x-auto")][1]')
  // Find buttons in the actions area (div with snap-end class)
  const favoriteButton = container.locator('div[class*="snap-end"] button').first()

  await expect(favoriteButton).toBeVisible({ timeout: 2000 })
  await favoriteButton.click()
})
