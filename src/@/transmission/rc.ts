import { account } from '@/iam'
import { permission, subscribe, subscribed, unsubscribe } from './svc'
import { channel } from './svc/channel'

async function init(): Promise<void> {
  if (await channel.subsscribed()) {
    subscribed.set(true)

    return
  }

  const error = await subscribe()

  if (error instanceof Error) console.error('Automatic subscription failed', error)
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
