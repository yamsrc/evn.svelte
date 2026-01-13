import { account, authenticated } from '@/iam'
import { disconnect, connect } from './svc/connect'

function rc() {
  authenticated.subscribe((authenticated) => {
    const me = account.extract()!

    if (!authenticated) disconnect()
    else void connect(me.id)
  })
}

export { rc }
