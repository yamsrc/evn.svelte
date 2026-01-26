import { browser } from '$app/environment'
import { account } from '@/iam'
import { subscribe, unsubscribe } from './svc'

const denied = (): boolean => 'Notification' in window && Notification.permission === 'denied'

function rc() {
  if (!browser)
    return

  account.subscribe((me) => {
    if (me === null || denied()) void unsubscribe()
    else void subscribe()
  })
}

export { rc }
