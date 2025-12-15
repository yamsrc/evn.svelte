import mitt from 'mitt'

export const events = mitt<Events & { heartbeat: undefined }>()

events.on('*', (label, payload) => {
  if (payload === undefined) console.debug(label)
  else console.debug(label, payload)
})

export type Events = Record<string, unknown> // add domain events here
