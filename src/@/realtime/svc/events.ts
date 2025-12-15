import mitt from 'mitt'

export type Events = Record<string, unknown> // add domain events here

export const events = mitt<Events & { heartbeat: undefined }>()

events.on('*', (label, payload) => {
  if (payload === undefined) console.debug(label)
  else console.debug(label, payload)
})
