import { setContext as svelteSetContext, getContext as svelteGetContext } from 'svelte'

export interface Context {
  get opened(): boolean
  open: () => void
  close: () => void
  get id(): string
  setContentRef: (el: HTMLDivElement | undefined) => void
  setTriggerRef: (el: HTMLDivElement | undefined) => void
}

const CONTEXT = Symbol('action-menu')

export const getContext = (): Context => svelteGetContext<Context>(CONTEXT)
export const setContext = (ctx: Context) => svelteSetContext(CONTEXT, ctx)
