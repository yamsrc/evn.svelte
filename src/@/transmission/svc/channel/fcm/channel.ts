import { having, once, value } from 'svas'
import { cap } from '$lib/tools'
import type { SubscribeInput } from '../../net'
import type { Channel } from '../Channel'
import type { Notification } from '@/transmission'

const TIMEOUT = 5000

type Handler = keyof NonNullable<NonNullable<typeof window.webkit>['messageHandlers']>

const mapPermission = (s: string): NotificationPermission =>
  s === 'authorized' ? 'granted' : s === 'notDetermined' ? 'default' : 'denied'

const permission = value<NotificationPermission>()
const token = value<string>()

let initialized = false

function init(): void {
  if (initialized) return

  initialized = true

  window.addEventListener('push-permission-state', (e) => {
    console.debug('push-permission-state', e.detail)
    permission.set(mapPermission(e.detail))
  })

  window.addEventListener('push-permission-request', (e) => {
    console.debug('push-permission-request', e.detail)
    permission.set(e.detail === 'granted' ? 'granted' : 'denied')
  })

  window.addEventListener('push-token', (e) => {
    console.debug('push-token', e.detail)
    token.set(e.detail)
  })

  window.addEventListener('push-notification', (e: CustomEvent<Notification>) => {
    console.debug('push-notification', e.detail)
  })

  window.addEventListener('push-notification-click', (e: CustomEvent<Notification>) => {
    console.debug('push-notification-click', e.detail)

    if (e.detail.action !== undefined && e.detail.action !== '')
      window.location.href = e.detail.action
  })

  postMessage('push-permission-state')
}

function postMessage(name: Handler, msg: unknown = {}): boolean {
  const handler = window.webkit?.messageHandlers?.[name]

  if (handler == null) return false

  handler.postMessage(msg)

  return true
}

export const fcm: Channel = {
  async available(): Promise<boolean> {
    if (
      typeof window === 'undefined' ||
      window.webkit?.messageHandlers?.['push-token'] === undefined
    ) return false

    init()
    postMessage('push-token')

    const t = await cap(once(token, (t) => t !== null), TIMEOUT)

    return t !== null && !t.startsWith('ERROR')
  },

  async permission(): Promise<NotificationPermission | null> {
    postMessage('push-permission-state')

    return cap(having(permission), TIMEOUT)
  },

  async request(): Promise<NotificationPermission | null> {
    postMessage('push-permission-request')

    return cap(once(permission, (p) => p !== 'default'), TIMEOUT)
  },

  async subscribe(): Promise<SubscribeInput | Error> {
    postMessage('push-permission-request')

    const t = await cap(once(token, (t) => t !== null), TIMEOUT)

    if (t === null) return new Error('Token timeout')

    return { channel: 'fcm', endpoint: t }
  },

  async unsubscribe(): Promise<void> {
    token.set(null)
  },

  async subscribed(): Promise<boolean> {
    return token.extract() !== null
  },
}
