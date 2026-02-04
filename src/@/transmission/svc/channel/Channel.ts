import type { SubscribeInput } from '../net'

export interface Channel {
  available(): Promise<boolean>
  permission(): Promise<NotificationPermission | null>
  request(): Promise<NotificationPermission | null>
  subscribe(): Promise<SubscribeInput | Error>
  unsubscribe(): Promise<void>
  subscribed(): Promise<boolean>
}
