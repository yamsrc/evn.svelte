import { value } from 'svas'
import { writable } from 'svelte/store'
import { account } from '@/iam'
import { events } from '@/realtime'
import type { Permissions } from './net/Transmission'

export const permission = writable<NotificationPermission | null>(null)

export const subscribed = value<boolean | null>({
  persist: 'transmission:subscribed',
  default: null,
})

export const dismissed = value<number>({
  persist: 'transmission:dismissed',
  default: 0,
})

export const permissions = value<Permissions>({
  persist: 'transmission:permissions',
  bind: account,
})

events.on('default.transmission.sync', (data) => permissions.set(data.permissions))
