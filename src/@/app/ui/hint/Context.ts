import { setContext as set, getContext as get } from 'svelte'

export interface Context {
  get dismissing(): boolean
  later: () => void
  dismiss: () => void
}

const KEY = Symbol('hint')
export const getContext = () => get<Context>(KEY)
export const setContext = (ctx: Context) => set(KEY, ctx)
