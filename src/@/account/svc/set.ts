import { having } from 'svas'
import { account } from '@/iam'
import * as net from './net'
import { sync } from './sync'

async function set(properties: net.Editable): Promise<void | Error> {
  // optimistic
  const asis = sync(properties)

  const me = await having(account)
  const res = await net.patch(me.id, properties)

  if (res instanceof Error) {
    if (asis !== null) sync(asis)

    return res
  }

  sync(res)
}

export { set }
