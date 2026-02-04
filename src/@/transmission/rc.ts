import { account } from '@/iam'
import { permission, subscribe, subscribed, unsubscribe } from './svc'
import { channel, boot } from './svc/channel'

async function autoSubscribe(): Promise<void> {
  if (await channel!.subscribed()) {
    subscribed.set(true)

    return
  }

  const error = await subscribe()

  if (error instanceof Error) console.error('Automatic subscription failed', error)
}

export async function rc() {
  await boot()

  if (channel === null) return

  account.subscribe(async (me) => {
    const status = await channel!.permission()

    permission.set(status)

    if (me === null || status !== 'granted') void unsubscribe()
    else void autoSubscribe()
  })
}
