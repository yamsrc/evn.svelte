import { having } from 'svas'
import { account } from '@/iam'
import * as origin from './net'
import { passkeys } from './store'

export async function remove(id: string): Promise<void | Error> {
  const me = await having(account)
  const ok = await origin.del(me.id, id)

  if (ok instanceof Error) return ok

  passkeys.delete(id)
}
