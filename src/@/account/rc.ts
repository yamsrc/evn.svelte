import { account, type Account } from '@/iam'
import { defaults } from './svc/defaults'

let unsubscribe: (() => void) | null = null

function subscriber(account: Account | null) {
  if (account === null)
    return

  unsubscribe?.()
  unsubscribe = null
  defaults(account)
}

account.subscribe((account) => {
  if (account === null && unsubscribe === null)
    subscribe()
})

function subscribe() {
  unsubscribe = account.subscribe(subscriber)
}

function rc() {
  subscribe()
}

export { rc }
