import { writable } from 'svelte/store'
import { fcm } from './fcm'
import { twa } from './twa'
import { web } from './web'
import type { Channel } from './Channel'

export let channel: Channel | null = null
export const supported = writable(false)

export async function boot(): Promise<void> {
  if (await twa.available())
    channel = twa
  else if (await fcm.available())
    channel = fcm
  else if (await web.available())
    channel = web

  if (channel !== null)
    supported.set(true)
}
