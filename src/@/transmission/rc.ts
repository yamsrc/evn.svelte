import { account } from '@/iam'
import { getPermission, permission, request, subscribed, unsubscribe } from './svc'
import { channel } from './svc/channel'

async function init(): Promise<void> {
  if (await channel.isSubscribed()) {
    subscribed.set(true)

    return
  }

  await request()
}

export function rc() {
  channel.init()

  account.subscribe((me) => {
    permission.set(getPermission())

    if (me === null || getPermission() !== 'granted') void unsubscribe()
    else void init()
  })
}
