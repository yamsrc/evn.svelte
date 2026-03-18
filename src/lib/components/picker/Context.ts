import { setContext as set, getContext as get } from 'svelte'

export interface Context {
  state: State
  pick: (index: number) => void
}

export interface State {
  chosen?: number
  snap: 'start' | 'center' | 'end'
}

const KEY = Symbol('picker')

export const getContext = () => get<Context>(KEY)
export const setContext = (ctx: Context) => set(KEY, ctx)
