import { derived, writable } from 'svelte/store'
import type { Return } from './Return'
import type { Action } from './Actions'

export const actions = writable<Action[]>([])
export const returns = writable<Return[]>([])

export const faded = derived(
  actions,
  ($actions, set) => {
    const a = $actions.at(-1) ?? null

    if (a === null || a.active === undefined) {
      set(false)

      return
    }

    const unsub = a.active.subscribe(set)

    return unsub
  },
  false,
)
