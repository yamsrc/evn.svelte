import { writable } from 'svelte/store'

export const identities = writable<string[]>([])
