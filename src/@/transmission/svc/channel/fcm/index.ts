import { account } from '@/iam'
import * as net from '../../net'
import type { Channel } from '../interface'

const mapPermission = (s: string): NotificationPermission =>
  s === 'authorized' ? 'granted' : s === 'notDetermined' ? 'default' : 'denied'

let permission: NotificationPermission | null = null
let token: string | null = null
let tokenResolve: ((t: string) => void) | null = null

const waitToken = (): Promise<string> =>
  token !== null ? Promise.resolve(token) : new Promise((resolve) => { tokenResolve = resolve })

async function send(): Promise<void | Error> {
  const me = account.extract()

  if (me === null) return

  if (token === null) return

  const result = await net.subscribe(me.id, { channel: 'fcm', endpoint: token })

  if (result instanceof Error) return result
}

export const fcm: Channel = {
  init() {
    window.addEventListener('push-permission-state', ((e: CustomEvent<string>) => {
      permission = mapPermission(e.detail)
    }) as EventListener)

    window.addEventListener('push-permission-request', ((e: CustomEvent<string>) => {
      permission = e.detail === 'granted' ? 'granted' : 'denied'
    }) as EventListener)

    window.addEventListener('push-token', ((e: CustomEvent<string>) => {
      token = e.detail
      tokenResolve?.(token)
    }) as EventListener)
  },

  getPermission: () => permission,

  async subscribe() {
    window.webkit?.messageHandlers?.['push-permission-request']?.postMessage({})
    await waitToken()

    return send()
  },

  async unsubscribe() {
    token = null
  },

  async isSubscribed() {
    return token !== null
  },
}
