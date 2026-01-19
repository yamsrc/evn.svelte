import { expect, type Page } from '@playwright/test'
import { When, Then } from './fixtures'

When('I tap {string}', async ({ page }, id) => {
  const element = page.locator(`#${id}`)

  await element.click()
})

When('I clear {string}', async ({ page }, id) => {
  const element = page.locator(`#${id}`)

  await element.fill('')
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

When('I tap first item of {string}', async ({ page }, id) => {
  const container = page.locator(`#${id}`)
  const firstItem = container.locator('> *').first()

  await expect(firstItem).toBeVisible()
  await firstItem.click()
})

When('I tap first visible {string}', async ({ page }, id) => {
  const element = page.locator(`#${id}`).first()

  await expect(element).toBeVisible()
  await element.click()
})

Then('{string} is visible', async ({ page }, id) => {
  await expect(page.locator(`#${id}`)).toBeVisible()
})

Then('{string} is not visible', async ({ page }, id) => {
  await expect(page.locator(`#${id}`)).not.toBeVisible()
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

Then('input {string} contains {string}', async ({ page }, id, value) => {
  await expect(page.locator(`#${id}`)).toHaveValue(value)
})

Then('some of {string} contains that {string}', async ({ page }, classname, text) => {
  await contains(page, `.${classname}`, text)
})

Then('some of {string} contains that name', async ({ page, ctx }, classname) => {
  await contains(page, `.${classname}`, ctx.name)
})

Then('{string} contains text {string}', async ({ page }, id, text) => {
  await expect(page.locator(`#${id}`)).toContainText(text)
})

Then('the page contains text {string}', async ({ page }, text) => {
  await expect(page.getByText(text)).toBeVisible()
})

Then('the page contains that name', async ({ page, ctx }) => {
  await expect(page.getByText(ctx.name)).toBeVisible()
})

Then('{string} contains {int} {string} items', async ({ page }, containerId, count, itemClass) => {
  const container = page.locator(`#${containerId}`)
  const items = container.locator(`.${itemClass}`)

  await expect(items).toHaveCount(count)
  await expect(items.first()).toBeVisible()
})

Then('{string} contains {int} elements', async ({ page }, containerId, count) => {
  const container = page.locator(`#${containerId}`)
  const elements = container.locator('> *')

  await expect(elements).toHaveCount(count)
})

Then('{string} contains that name', async ({ page, ctx }, id) => {
  await contains(page, `#${id}`, ctx.name)
})

async function contains(page: Page, selector: string, text: string) {
  await expect(async () => {
    const elements = page.locator(selector)

    await expect(elements).toHaveCount(1)
    await expect(elements).toContainText(text)
  }).toPass()
}
