import { setContext as svelteSetContext, getContext as svelteGetContext } from 'svelte'
import type { Value } from './Form'

const CONTEXT = Symbol('form')

export function setContext(ctx: Context): void {
  svelteSetContext(CONTEXT, ctx)
}

export function getContext(): Context {
  return svelteGetContext(CONTEXT)
}

export function sumup({ participants, extras }: Value): number {
  const p = Object.values(participants).reduce((acc, participant) => acc + participant.amount, 0)
  const e = extras.reduce((acc, extra) => acc + extra.amount, 0)

  return p + e
}

export interface Context {
  payers: number
  split: boolean
  total: number
}
