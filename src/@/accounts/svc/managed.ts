import { ensure } from 'svas'
import { account as iam } from '@/iam'
import * as net from './net'
import { accounts } from './store'

export async function update(id: string, properties: net.Editable): Promise<void | Error> {
  const me = ensure(iam)
  const res = await net.managed.patch(me.id, id, properties)

  if (res instanceof Error)
    return res

  accounts.set(res.id, res)
}
