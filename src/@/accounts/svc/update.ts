import { ensure } from 'svas'
import { account, update as updateMe } from '@/iam'
import * as net from './net'
import { accounts } from './store'

export async function update(identity: string, properties: net.Editable): Promise<void | Error> {
  const res = await net.patch(identity, properties)

  if (res instanceof Error)
    return res

  accounts.set(res.id, res)

  if (identity === ensure(account).id)
    updateMe(res)
}
