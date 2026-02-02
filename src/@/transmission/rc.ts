import { browser } from '$app/environment'
import { account } from '@/iam'
import { get, getPermission, permission, subscribe, subscribed, unsubscribe } from './svc'

async function init(): Promise<void> {
  await subscribe()
  subscribed.set((await get()) !== null)
}

export function rc() {
  if (!browser)
    return

  account.subscribe((me) => {
    const status = getPermission()

    permission.set(status)

    if (me === null || status !== 'granted') void unsubscribe()
    else void init()
  })
}
