import { writable } from 'svelte/store'
import { value } from 'svas'
import { events } from '@/realtime'
import { account } from '@/iam'
import type { Permissions } from './net/Transmission'

export const permission = writable<NotificationPermission | null>(null)

export const subscribed = value<boolean | null>({
  persist: 'transmission:subscribed',
  default: null,
})

export const permissions = value<Permissions>({
  persist: 'transmission:permissions',
  bind: account,
  default: {},
})

events.on('default.transmission.sync', (data) => permissions.set(data.permissions))
