import { ensure } from 'svas'
import { account } from '@/iam'
import * as net from './net'

export async function report(signedTransactionInfo: string) {
  const me = ensure(account)

  return await net.post(me.id, { signedTransactionInfo })
}
