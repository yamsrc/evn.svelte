import { defineConfig } from '@playwright/test'
import { defineBddConfig } from 'playwright-bdd'

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
  },
  expect: { timeout: 3_000 },
})
