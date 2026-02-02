import { browser } from '$app/environment'
import { account } from '@/iam'
import { get, getPermission, permission, request, subscribed, unsubscribe } from './svc'

async function init(): Promise<void> {
  if ((await get()) !== null) {
    subscribed.set(true)

    return
  }

  await request()
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
