import mitt from 'mitt'
import type { Events as AccountEvents } from '@/accounts/svc/net'
import type { Events as ContactsEvents } from '@/contacts/svc/net'
import type { Events as GroupsEvents } from '@/groups/svc/net'

export type Events = AccountEvents & ContactsEvents & GroupsEvents // add domain events here

export type Message = {
  [E in keyof Events]: {
    event: E
    data: Events[E]
  }
}[keyof Events]

export const events = mitt<Events & { heartbeat: undefined }>()

events.on('*', (label, payload) => {
  if (payload === undefined) console.debug(label)
  else console.debug(label, payload)
})
