import { account } from '@/iam'
import { permission, subscribe, subscribed, unsubscribe } from './svc'
import { channel } from './svc/channel'

async function init(): Promise<void> {
  if (await channel.isSubscribed()) {
    subscribed.set(true)

    return
  }

  await subscribe()
}

export function rc() {
  channel.init()

  account.subscribe(async (me) => {
    const status = await channel.permission()

    permission.set(status)

    if (me === null || status !== 'granted') void unsubscribe()
    else void init()
  })
}
