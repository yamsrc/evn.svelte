import { writable } from 'svelte/store'
import { fcm } from './fcm'
import { web } from './web'
import type { Channel } from './Channel'

export let channel: Channel | null = null
export const supported = writable(false)

export async function boot(): Promise<void> {
  if (await fcm.available())
    channel = fcm
  else if (await web.available())
    channel = web

  if (channel !== null) supported.set(true)
}
