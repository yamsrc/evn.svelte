import { writable } from 'svelte/store'
import type { Action } from './Actions'
import type { Return } from './Return'

export const actions = writable<Action[]>([])
export const returns = writable<Return[]>([])
