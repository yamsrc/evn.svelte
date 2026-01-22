interface BaseNotification<D extends string, E extends string, P> {
  id: string
  identity: string
  domain: D
  event: E
  key: string
  payload?: P
}

type NotificationMap = {
  accounts: {
    created: never
  }
  groups: {
    joined: { identities: string[] }
  }
}

type NotificationEntry<D extends string, E extends string, P> = BaseNotification<D, E, P> &
  ([P] extends [never] ? {} : { payload: P })

type NotificationData = {
  [D in keyof NotificationMap]: {
    [E in keyof NotificationMap[D]]: NotificationEntry<
      Extract<D, string>,
      Extract<E, string>,
      NotificationMap[D][E]
    >
  }[keyof NotificationMap[D]]
}[keyof NotificationMap]

export type AccountCreatedNotification = Extract<
  NotificationData,
  { domain: 'accounts'; event: 'created' }
>

export type GroupJoinedNotification = Extract<
  NotificationData,
  { domain: 'groups'; event: 'joined' }
>

export type Notification = NotificationData & {
  _created: number
  _version: number
}
