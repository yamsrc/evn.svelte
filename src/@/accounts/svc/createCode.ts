import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function createCode(id: string): Promise<string | Error> {
  const me = ensure(account)
  const code = await net.codes.post(me.id, id)

  if (code instanceof Error)
    return code

  return code.code
}
