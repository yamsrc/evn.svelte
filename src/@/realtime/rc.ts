import { account } from '@/iam'
import { disconnect, connect } from './svc/connect'

function rc() {
  account.subscribe((me) => {
    if (me === null) disconnect()
    else void connect(me.id)
  })
}

export { rc }
