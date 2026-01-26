import { browser } from '$app/environment'
import { account, type Account } from '@/iam'
import { subscribe, unsubscribe } from './svc'

function isDenied(): boolean {
  return 'Notification' in window && Notification.permission === 'denied'
}

function syncSubscription(me: Account | null): void {
  if (!browser)
    return

  if (me === null || isDenied()) void unsubscribe()
  else void subscribe()
}

function rc() {
  if (!browser)
    return

  account.subscribe((me) => {
    syncSubscription(me)
  })
}

export { rc }
