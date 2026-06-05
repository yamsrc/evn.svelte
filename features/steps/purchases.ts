import { expect } from '@playwright/test'
import { Given, Then } from './fixtures'

// Capture where the app sends us, but abort before Stripe's page actually loads.
Given('Stripe checkout is not loaded', async ({ page, ctx }) => {
  await page.route(/checkout\.stripe\.com/, async (route) => {
    ctx.redirect = route.request().url()

    await route.abort()
  })
})

Then('the browser is redirected to Stripe checkout', async ({ ctx }) => {
  await expect.poll(() => ctx.redirect, { timeout: 15_000 }).toContain('checkout.stripe.com')
})
