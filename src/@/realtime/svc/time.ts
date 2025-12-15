import { events } from '@toa.io/origin'
import { writable } from 'svelte/store'

// initially use client time
export const time = writable<number>(Date.now())

events.on('response', (response) => {
  const date = response.response.headers.get('date')

  if (date === null) return

  const timestamp = new Date(date).getTime()

  time.set(timestamp)
})
