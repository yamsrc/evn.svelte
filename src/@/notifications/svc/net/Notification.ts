interface BaseNotification<D extends string = string, E extends string = string, P = unknown> {
  id: string
  identity: string
  domain: D
  event: E
  key: string
  payload: P
}

export type AccountCreatedNotification = BaseNotification<'accounts', 'created'>
export type GroupJoinedNotification = BaseNotification<'groups', 'joined', { identities: string[] }>

export type NotificationData = AccountCreatedNotification | GroupJoinedNotification

export type Notification = NotificationData & {
  _created: number
  _version: number
}
