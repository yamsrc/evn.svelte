import type { Notification } from '@/transmission'

declare global {
  interface Window {
    webkit?: {
      messageHandlers?: {
        'push-subscribe'?: { postMessage: (msg: { topic?: string, unsubscribe?: boolean }) => void }
        'push-permission-state'?: { postMessage: (msg: unknown) => void }
        'push-permission-request'?: { postMessage: (msg: unknown) => void }
        'push-token'?: { postMessage: (msg: unknown) => void }
      }
    }
  }

  interface WindowEventMap {
    'push-permission-state': CustomEvent<string>
    'push-permission-request': CustomEvent<string>
    'push-token': CustomEvent<string>
    'push-notification': CustomEvent<Notification>
    'push-notification-click': CustomEvent<Notification>
  }
}

export { }
