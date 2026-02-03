import { value } from 'svas'
import { writable } from 'svelte/store'

export const permission = writable<NotificationPermission | null>(null)

export const subscribed = value<boolean | null>({
  persist: 'transmission:subscribed',
  default: null,
})

export const dismissed = value<number>({
  persist: 'transmission:dismissed',
  default: 0,
})
