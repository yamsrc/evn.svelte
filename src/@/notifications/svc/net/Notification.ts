import type { Domain, Event } from '@/transmission'
import type { Expense } from '@/expenses'

type Constrain<T extends { [D in Domain]: Record<Event<D>, unknown> } & Record<Exclude<keyof T, Domain>, never>> = T

type Payloads = Constrain<{
  accounts: {
    created: never
  }
  groups: {
    joined: {
      identities: string[]
    }
  }
  expenses: {
    expense: {
      title: string
      location?: string
      participants: Expense['participants']
      extras: Expense['extras']
    }
  }
  contacts: {
    connected: never
    unchained: never
    transferred: {
      expense: string
      delta: number
      balance: number
    }
  }
  adventures: {
    joined: {
      title: string
      identities: string[]
    }
    expense: {
      title: string
      expense: {
        id: string
        title: string
        location?: string
        date: string
        amount: number
        payer: string
        attachments: string[]
      }
    }
  }
}>

type Payload<D extends Domain, E extends Event<D>> = Payloads[D][E & keyof Payloads[D]]
type Expand<T> = { [K in keyof T]: T[K] } & {}

type Base<D extends Domain, E extends Event<D>> = {
  id: string
  identity: string
  domain: D
  event: E
  key: string
  _created: number
  _version: number
}

type Entry<D extends Domain, E extends Event<D>> = Expand<
  [Payload<D, E>] extends [never] ? Base<D, E> : Base<D, E> & { payload: Payload<D, E> }
>

export type Notification = { [D in Domain]: { [E in Event<D>]: Entry<D, E> }[Event<D>] }[Domain]

export type Of<D extends Domain, E extends Event<D> = Event<D>> = Entry<D, E>
export type PayloadOf<D extends Domain, E extends Event<D>> = Payload<D, E>
