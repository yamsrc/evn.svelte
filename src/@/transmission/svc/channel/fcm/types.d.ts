import type { Notification } from '@/transmission'

declare global {
  interface WebkitMessageHandlers {
    'push-subscribe'?: { postMessage: (msg?: { topic?: string, unsubscribe?: boolean }) => void }
    'push-permission-state'?: { postMessage: () => void }
    'push-permission-request'?: { postMessage: () => void }
    'push-token'?: { postMessage: () => void }
    'push-token-delete'?: { postMessage: () => void }
  }

  interface WindowEventMap {
    'push-permission-state': CustomEvent<string>
    'push-permission-request': CustomEvent<string>
    'push-token': CustomEvent<string>
    'push-token-deleted': CustomEvent<string>
    'push-notification': CustomEvent<Notification>
    'push-notification-click': CustomEvent<Notification>
  }
}

export { }
