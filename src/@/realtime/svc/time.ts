import { writable } from 'svelte/store'
import { origin } from '@/net'

// initially use client time
export const time = writable<number>(Date.now())

origin.events.on('response', ({ headers }) => {
  const date = headers.get('date')

  if (date === null) return

  const timestamp = new Date(date).getTime()

  time.set(timestamp)
})
