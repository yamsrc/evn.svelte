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
    unchained: never
  }
  groups: {
    joined: { identities: string[] }
  }
  expenses: {
    expense: {
      title: string
      location?: string
      participants: Record<string, number>
      extras: Record<string, number>
    }
  }
  contacts: {
    transferred: {
      expense: string
      delta: number
      balance: number
    }
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

export type AccountUnchainedNotification = Extract<
  NotificationData,
  { domain: 'accounts'; event: 'unchained' }
>

export type GroupJoinedNotification = Extract<
  NotificationData,
  { domain: 'groups'; event: 'joined' }
>

export type ExpenseNotification = Extract<
  NotificationData,
  { domain: 'expenses'; event: 'expense' }
>

export type ContactTransferredNotification = Extract<
  NotificationData,
  { domain: 'contacts'; event: 'transferred' }
>

export type Notification = NotificationData & {
  _created: number
  _version: number
}
