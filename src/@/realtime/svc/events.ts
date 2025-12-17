import mitt from 'mitt'
import type { Events as AccountEvents } from '@/account/svc/net'

export type Events = AccountEvents // add domain events here

export const events = mitt<Events & { heartbeat: undefined }>()

events.on('*', (label, payload) => {
  if (payload === undefined) console.debug(label)
  else console.debug(label, payload)
})
