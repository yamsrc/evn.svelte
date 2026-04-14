import { writable } from 'svelte/store'
import type { Return } from './Return'
import type { Action } from './Actions'

export const actions = writable<Action[]>([])
export const returns = writable<Return[]>([])
