import { having, once, value } from 'svas'
import { cap } from '$lib/tools'
import type { SubscribeInput } from '../../net'
import type { Channel } from '../Channel'
import type { NativeMessage, WebMessage } from './types'

const TIMEOUT = 3000
const REQUEST_TIMEOUT = 10_000

const port = value<MessagePort | null>()
const token = value<string | null>()
const permission = value<NotificationPermission>()
const ready = value<boolean>()

let initialized = false

function setupPort(p: MessagePort): void {
  port.set(p)

  p.onmessage = (event) => {
    const msg = parse(event.data)

    if (msg === null) return

    handle(msg)
  }
}

function init(): void {
  if (initialized) return

  initialized = true

  window.addEventListener('message', (e) => {
    console.debug('message', e)

    if (e.ports.length === 0) return

    setupPort(e.ports[0])
  })

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible')
      send({ type: 'push-permission-state' })
  })
}

function parse(data: unknown): NativeMessage | null {
  if (typeof data === 'string')
    try {
      return JSON.parse(data)
    } catch {
      return null
    }

  if (typeof data === 'object' && data !== null && 'type' in data)
    return data as NativeMessage

  return null
}

function handle(msg: NativeMessage): void {
  console.debug('twa:', msg.type, msg)

  switch (msg.type) {
    case 'twa-init':
      send({ type: 'twa-ping' })

      break

    case 'twa-pong':
      ready.set(true)

      break

    case 'push-token':
      token.set(msg.token)

      break

    case 'push-token-deleted':
      token.set(null)

      break

    case 'push-permission-state':
      permission.set(msg.state)

      break

    case 'push-notification':
      console.debug('twa: push-notification', msg.notification)

      break

    case 'push-notification-click':
      if (msg.notification.action !== '')
        window.location.href = msg.notification.action

      break
  }
}

function send(msg: WebMessage): boolean {
  console.debug('postMessage', msg)

  const p = port.extract()

  if (p === null) return false

  p.postMessage(JSON.stringify(msg))

  return true
}

export const twa: Channel = {
  async available(): Promise<boolean> {
    if (typeof window === 'undefined') return false

    init()

    // Wait for port (delivered by native's twa-init via session.postMessage)
    const p = await cap(once(port, (p) => p !== null), TIMEOUT)

    if (p === null) return false

    // Request-reply: web pings, native pongs
    send({ type: 'twa-ping' })

    const ok = await cap(once(ready, (v) => v === true), TIMEOUT)

    return ok === true
  },

  async permission(): Promise<NotificationPermission | null> {
    permission.set(null)
    send({ type: 'push-permission-state' })

    return await cap(having(permission), TIMEOUT)
  },

  async request(): Promise<NotificationPermission | null> {
    permission.set(null)
    send({ type: 'push-permission-request' })

    return await cap(once(permission, (p) => p !== null && p !== 'default'), REQUEST_TIMEOUT) ?? null
  },

  async subscribe(): Promise<SubscribeInput | Error> {
    token.set(null)
    send({ type: 'push-token-request' })

    const t = await cap(once(token, (t) => t !== null), TIMEOUT)

    if (t === null) return new Error('Token timeout')

    return { channel: 'fcm', endpoint: t }
  },

  async unsubscribe(): Promise<void> {
    send({ type: 'push-token-delete' })
    await cap(once(token, (t) => t === null), TIMEOUT)
  },

  async subscribed(): Promise<boolean> {
    return false
  },
}
