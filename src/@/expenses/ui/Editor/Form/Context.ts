import { setContext as svelteSetContext, getContext as svelteGetContext } from 'svelte'

const KEY = Symbol('form')

export function setContext(ctx: Context): void {
  svelteSetContext(KEY, ctx)
}

export function getContext(): Context {
  return svelteGetContext(KEY)
}

export interface Context {
  payers: string[]
  split: boolean
  total: number
  paid: number
}
