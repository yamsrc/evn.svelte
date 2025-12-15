import { events } from './events'
import * as net from './net'
import { reset } from './reset'
import { status } from './status'

let connected: string | null = null
let controller: AbortController | null = null

async function connect(id: string): Promise<void> {
  if (connected !== null && connected !== id)
    disconnect()

  if (connected === id) return
  else connected = id

  // eslint-disable-next-line no-unmodified-loop-condition
  while (connected === id) {
    status('connecting')

    const err = await consume(id).catch((err: Error) => err)

    if (err !== undefined)
      if (err.name === 'AbortError') console.debug('Realtime connection aborted')
      else {
        console.warn('Realtime connection exception', err)
        await new Promise((resolve) => setTimeout(resolve, 3000))
      }
  }
}

async function consume(id: string): Promise<void> {
  controller = new AbortController()

  const signal = controller.signal
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const generator = await net.post(id, { signal, body: { timezone } })

  if (generator instanceof Error) {
    status('disconnected')
    throw generator
  }

  console.debug('Realtime connected', id)
  status('connected')

  for await (const message of generator) emit(message)

  console.debug('Realtime connection lost', id)
}

function disconnect() {
  if (connected === null) return
  else connected = null

  if (controller === null)
    throw new Error('Realtime controller is NULL')

  controller.abort()
  reset()
}

function emit(message: net.Message) {
  if (typeof message === 'string') events.emit('heartbeat')
  else events.emit(message.event, message.data)
}

export { connect, disconnect }
