import type { SubscribeInput } from '../net'

export interface Channel {
  init(): void
  permission(): Promise<NotificationPermission | null>
  request(): Promise<NotificationPermission | null>
  subscribe(): Promise<SubscribeInput | Error>
  unsubscribe(): Promise<void>
  subsscribed(): Promise<boolean>
}
