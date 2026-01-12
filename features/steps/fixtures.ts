import { test as base, createBdd } from 'playwright-bdd'

type Fixtures = {
  ctx: {
    name: string
  }
}

export const test = base.extend<Fixtures>({
  // eslint-disable-next-line no-empty-pattern
  ctx: async ({ }, use) => {
    const ctx = {} as Fixtures['ctx']

    await use(ctx)
  },
})

export const { Given, When, Then } = createBdd(test)
