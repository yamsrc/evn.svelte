import { expect, type Page } from '@playwright/test'
import { When, Then } from './fixtures'

When('I tap {string}', async ({ page }, id) => {
  const element = page.locator(`#${id}`)

  await element.click()
})

When('I double tap {string}', async ({ page }, id) => {
  const element = page.locator(`#${id}`)

  await element.dblclick()
})

When('I hold {string} for {int}s', async ({ page }, id, duration) => {
  const element = page.locator(`#${id}`)

  await expect(element).toBeVisible()
  await element.hover()
  await page.mouse.down()
  await page.waitForTimeout(duration * 1000)
  await page.mouse.up()
})

Then('{string} is visible', async ({ page }, id) => {
  const element = page.locator(`#${id}`)

  await expect(element).toBeVisible()
})

Then('{string} is focused', async ({ page }, id) => {
  const element = page.locator(`#${id}`)

  await expect(element).toBeVisible()
  await expect(element).toBeFocused()
})

Then('{string} is not disabled', async ({ page }, id) => {
  const element = page.locator(`#${id}`)

  await expect(element).not.toBeDisabled()
})

Then('input {string} contains that name', async ({ page, ctx }, id) => {
  await expect(page.locator(`#${id}`)).toHaveValue(ctx.name)
})

Then('some of {string} contains that {string}', async ({ page }, classname, text) => {
  await contains(page, `.${classname}`, text)
})

Then('some of {string} contains that name', async ({ page, ctx }, classname) => {
  await contains(page, `.${classname}`, ctx.name)
})

async function contains(page: Page, selector: string, text: string) {
  await expect(async () => {
    const elements = page.locator(selector)

    await expect(elements).toHaveCount(1)
    await expect(elements).toContainText(text)
  }).toPass()
}
