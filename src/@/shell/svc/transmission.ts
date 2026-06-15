import { on, request, send } from './transport'

export interface Notification {
  id: string
  title?: string
  badge?: number
  body?: string
  action?: string
  data?: Record<string, unknown>
}

/** Push-notification (transmission) operations exposed through the native shell bridge. */
export const transmission = {
  /** Current device push token/address, if registered. */
  address(): Promise<string | Error> {
    return request<string>('transmission.address')
  },

  /** Current notification authorization status. */
  permission(): Promise<string | Error> {
    return request<string>('transmission.permission')
  },

  /** Prompt the user to grant notification permission; resolves with the resulting status. */
  request(): Promise<string | Error> {
    return request<string>('transmission.request')
  },

  /** Unregister the device from push notifications. */
  delete(): void {
    send('transmission.delete')
  },

  /**
   * Subscribe to incoming notifications delivered while the app is active.
   * @param cb invoked with each received {@link Notification}
   */
  onNotification(cb: (n: Notification) => void): void {
    on('transmission.notification', (d) => {
      if (d.kind === 'event') cb(d.payload as Notification)
    })
  },

  /**
   * Subscribe to notification taps that open or foreground the app.
   * @param cb invoked with the tapped {@link Notification}
   */
  onNotificationClick(cb: (n: Notification) => void): void {
    on('transmission.notification-click', (d) => {
      if (d.kind === 'event') cb(d.payload as Notification)
    })
  },
}
