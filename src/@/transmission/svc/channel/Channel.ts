export interface Channel {
  init(): void
  permission(): Promise<NotificationPermission | null>
  request(): Promise<NotificationPermission | null>
  subscribe(): Promise<void | Error>
  unsubscribe(): Promise<void>
  isSubscribed(): Promise<boolean>
}
