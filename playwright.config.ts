import { defineBddConfig } from 'playwright-bdd'
import { defineConfig } from '@playwright/test'

const testDir = defineBddConfig({
  features: './features/**/*.feature',
  steps: './features/steps/**/*.ts',
})

export default defineConfig({
  testDir,
  use: {
    // read doesn't work without write permission
    // without exceptions or any other indication
    // fuck.
    permissions: ['clipboard-read', 'clipboard-write'],
    baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
    launchOptions: {
      slowMo: parseInt(process.env.PLAYWRIGHT_SLOW_MO || '0'),
    },
  },
  expect: { timeout: 3_000 },
})
