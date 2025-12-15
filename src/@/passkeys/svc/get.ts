import { having } from 'svas'
import { account } from '@/iam'
import * as origin from './net'
import type { Passkey } from './store'

export async function get(): Promise<Passkey[] | Error> {
  const me = await having(account)

  return await origin.get(me.id)
}
