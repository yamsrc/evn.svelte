import { ensure } from 'svas'
import { account, update as updateIAM } from '@/iam'
import { update as updateAccount } from './update'
import type * as net from './net'

export async function update(properties: net.Editable): Promise<void | Error> {
  updateIAM(properties)

  const me = ensure(account)
  const err = await updateAccount(me.id, properties)

  if (err instanceof Error)
    return err
}
