import { on, request, send } from './transport'

export interface Notification {
  id: string
  title?: string
  badge?: number
  body?: string
  action?: string
  data?: Record<string, unknown>
}

export const transmission = {
  address(): Promise<string | Error> {
    return request<string>('transmission.address')
  },

  permission(): Promise<string | Error> {
    return request<string>('transmission.permission')
  },

  request(): Promise<string | Error> {
    return request<string>('transmission.request')
  },

  delete(): void {
    send('transmission.delete')
  },

  onNotification(cb: (n: Notification) => void): void {
    on('transmission.notification', (d) => {
      // single IO boundary: wire payload is `unknown`; facade labels it via Notification.
      if (d.kind === 'event') cb(d.payload as Notification)
    })
  },

  onNotificationClick(cb: (n: Notification) => void): void {
    on('transmission.notification-click', (d) => {
      if (d.kind === 'event') cb(d.payload as Notification)
    })
  },
}
