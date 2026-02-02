import { setContext as svelteSetContext, getContext as svelteGetContext } from 'svelte'

export interface Context {
  increment: () => void
  decrement: () => void
  get collapsed(): boolean
  get stacked(): boolean
}

const CONTEXT = Symbol('stack')

export const getContext = () => svelteGetContext<Context>(CONTEXT)
export const setContext = (ctx: Context) => svelteSetContext(CONTEXT, ctx)
