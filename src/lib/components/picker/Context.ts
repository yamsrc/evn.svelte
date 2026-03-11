import { setContext as set, getContext as get } from 'svelte'

export interface Entry {
  id: symbol
  pickable: () => boolean
  order?: () => number
  rank?: number
}

export interface Context {
  state: State
  pick: (id: symbol) => void
  register: (entry: Entry) => void
  unregister: (id: symbol) => void
}

export interface State {
  chosen?: symbol
  snap: 'start' | 'center' | 'end'
}

const KEY = Symbol('picker')

export const getContext = () => get<Context>(KEY)
export const setContext = (ctx: Context) => set(KEY, ctx)
