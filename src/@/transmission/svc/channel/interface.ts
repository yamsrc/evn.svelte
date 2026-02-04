export interface Channel {
  init(): void
  getPermission(): NotificationPermission | null
  subscribe(): Promise<void | Error>
  unsubscribe(): Promise<void>
  isSubscribed(): Promise<boolean>
}
