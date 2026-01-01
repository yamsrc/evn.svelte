import { defineConfig } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

const testDir = defineBddConfig({
  features: './features/**/*.feature',
  steps: './features/steps/**/*.ts',
})

export default defineConfig({
  testDir,
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:5173',
    launchOptions: {
      args: ['--disable-features=WebShare'], // using clipboard for testing
    },
  },
  expect: { timeout: 3_000 },
})
