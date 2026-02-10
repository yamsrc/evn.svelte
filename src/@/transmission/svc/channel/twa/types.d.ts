import type { Notification } from '@/transmission'

/** Messages sent from Android native to web via PostMessage */
export type NativeMessage =
  | { type: 'twa-init' }
  | { type: 'twa-pong' }
  | { type: 'push-token'; token: string }
  | { type: 'push-token-deleted' }
  | { type: 'push-permission-state'; state: 'granted' | 'denied' | 'default' }
  | { type: 'push-permission-result'; result: 'granted' | 'denied' }
  | { type: 'push-notification'; notification: Notification }
  | { type: 'push-notification-click'; notification: { action: string } }

/** Messages sent from web to Android native via MessagePort */
export type WebMessage =
  | { type: 'twa-ping' }
  | { type: 'push-token-request' }
  | { type: 'push-token-delete' }
  | { type: 'push-permission-request' }

export {}
