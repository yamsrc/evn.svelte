import { expect } from '@playwright/test'
import { When } from './fixtures'

When('I tap the favorite action button', async ({ page }) => {
  // Locate the favorite action associated with the first contacts panel
  // and simulate the user tapping that action button.
  // This step assumes the favorite action is exposed as a button in the panel's actions area.
  // Find the container that groups the contacts panel and its swipe actions.
  const container = page.locator('.panel-container:has(.contacts-panel)').first()
  // Within the actions area for this panel, select the first action button (favorite).
  const favoriteButton = container.locator('[role="toolbar"] button').first()

  await expect(favoriteButton).toBeVisible({ timeout: 2000 })
  await favoriteButton.click()
})
