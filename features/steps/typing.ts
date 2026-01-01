import { faker } from '@faker-js/faker'
import { createBdd } from 'playwright-bdd'

const { When } = createBdd()

When('I type {string}', async ({ page }, text) => {
  await page.keyboard.type(text)
})

When('I press {string}', async ({ page }, key) => {
  await page.keyboard.press(key)
})

When('I type random email', async ({ page }) => {
  await page.keyboard.type(faker.internet.email())
})

When('I type random password', async ({ page }) => {
  await page.keyboard.type(faker.internet.password())
})

When('I type random name', async ({ page }) => {
  await page.keyboard.type(faker.person.firstName())
})
