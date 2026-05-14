import { derived, writable } from 'svelte/store'
import { value } from 'svas'
import { events } from '@/realtime'
import { account } from '@/iam'
import type { Permissions } from './net/Transmission'

export const permission = writable<NotificationPermission | null>(null)

export const subscribed = value<boolean>({
  persist: 'transmission:subscribed',
})

export const permissions = value<Permissions>({
  persist: 'transmission:permissions',
  bind: account,
  default: {},
})

export const promptable = derived([permission, subscribed],
  ([$permission, $subscribed]) => $permission === 'default' && $subscribed === false)

events.on('default.transmission.sync', (data) => permissions.set(data.permissions))
