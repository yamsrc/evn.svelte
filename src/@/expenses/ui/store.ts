import { writable } from 'svelte/store'
import type { Value } from './Form'

export interface Draft {
  id: string
  value: Value
}

export const draft = writable<Draft | null>(null)
