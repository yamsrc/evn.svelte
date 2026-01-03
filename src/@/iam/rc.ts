import { defaults } from '@/accounts/svc/defaults'
import { origin } from '@/net'
// import { hello } from './svc/hello'
import { account, challenge, type Account } from './svc/store'
import { sync } from './svc/sync'

let unsubscribe: (() => void) | null = null

function subscriber(account: Account | null) {
  if (account === null)
    return

  unsubscribe?.()
  unsubscribe = null
  defaults(account)
}

function subscribe() {
  unsubscribe = account.subscribe(subscriber)
}

function rc() {
  origin.events.on('challenge', (value) => challenge.set(value))

  origin.events.on('error', (error) => {
    if (error.code === 401) challenge.set(null)
  })

  challenge.subscribe((challenge) => origin.authenticate(challenge))

  // void hello()
  void sync()
  subscribe()
}

export { rc }
