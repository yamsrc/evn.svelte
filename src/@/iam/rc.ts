import { origin } from '@/net'
import { hello } from './svc/hello'
import { challenge } from './svc/store'
import { sync } from './svc/sync'

function rc() {
  origin.events.on('challenge', (value) => challenge.set(value))

  origin.events.on('error', (error) => {
    if (error.code === 401) challenge.set(null)
  })

  challenge.subscribe((challenge) => origin.authenticate(challenge))

  void hello()
  void sync()
}

export { rc }
