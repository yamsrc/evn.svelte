import { setContext as svelteSetContext, getContext as svelteGetContext } from 'svelte'

const KEY = Symbol('form')

export function setContext(ctx: Context): void {
  svelteSetContext(KEY, ctx)
}

export function getContext(): Context {
  return svelteGetContext(KEY)
}

export interface Context {
  readonly payers: string[]
  readonly split: boolean
  readonly total: number
  readonly paid: number
  readonly overpaid: number
  shares: Record<string, number>
}
