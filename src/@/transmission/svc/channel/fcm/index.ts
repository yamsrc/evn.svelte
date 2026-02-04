import { ensure, having, once, value } from 'svas'
import { account } from '@/iam'
import * as net from '../../net'
import type { Channel } from '../interface'
import type { Notification } from '@/transmission'

type Handler = keyof NonNullable<NonNullable<typeof window.webkit>['messageHandlers']>

const mapPermission = (s: string): NotificationPermission =>
  s === 'authorized' ? 'granted' : s === 'notDetermined' ? 'default' : 'denied'

const permission = value<NotificationPermission>()
const token = value<string>()

function postMessage(name: Handler, msg: unknown = {}): boolean {
  const handler = window.webkit?.messageHandlers?.[name]

  if (handler == null) return false

  handler.postMessage(msg)

  return true
}

async function send(): Promise<void | Error> {
  const me = ensure(account)
  const t = await having(token)

  if (me === null || t === null) return

  const result = await net.subscribe(me.id, { channel: 'fcm', endpoint: t })

  if (result instanceof Error) return result
}

export const fcm: Channel = {
  init() {
    window.addEventListener('push-permission-state', (e) => {
      permission.set(mapPermission(e.detail))
    })

    window.addEventListener('push-permission-request', (e) => {
      permission.set(e.detail === 'granted' ? 'granted' : 'denied')
    })

    window.addEventListener('push-token', (e) => {
      token.set(e.detail)
    })

    window.addEventListener('push-notification-click', (e: CustomEvent<Notification>) => {
      if (e.detail.action !== undefined && e.detail.action !== '')
        window.location.href = e.detail.action
    })

    postMessage('push-permission-state')
  },

  async permission(): Promise<NotificationPermission | null> {
    postMessage('push-token')

    return Promise.race([
      having(permission),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
    ])
  },

  async request(): Promise<NotificationPermission | null> {
    postMessage('push-permission-request')

    return Promise.race([
      once(permission, (permission) => permission !== 'default'),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 5000)),
    ])
  },

  async subscribe(): Promise<void | Error> {
    postMessage('push-permission-request')

    return send()
  },

  async unsubscribe(): Promise<void> {
    token.set(null)
  },

  async isSubscribed(): Promise<boolean> {
    return token.extract() !== null
  },
}
