import { authenticate, events } from '@toa.io/origin'
import { hello } from './svc/hello'
import { challenge } from './svc/store'
import { sync } from './svc/sync'

function rc() {
  events.on('challenge', (value) => challenge.set(value))
  events.on(401, () => challenge.set(null))
  challenge.subscribe(authenticate)

  void hello()
  void sync()
}

export { rc }
