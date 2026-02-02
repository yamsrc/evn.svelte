import { writable } from 'svelte/store'

export const permission = writable<NotificationPermission | null>(null)
export const subscribed = writable<boolean | null>(null)
