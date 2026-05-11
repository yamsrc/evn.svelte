import { origin } from '@/net'
import { sync } from './svc/sync'
import { challenge } from './svc/store'

function rc() {
  origin.events.on('challenge', (value) => challenge.set(value))

  origin.events.on('error', (error) => {
    if (error.code === 401) challenge.set(null)
  })

  challenge.subscribe((challenge) => origin.authenticate(challenge))

  void sync()
}

export { rc }
