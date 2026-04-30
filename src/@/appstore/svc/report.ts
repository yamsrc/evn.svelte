import * as net from './net'

export async function report(signedTransactionInfo: string) {
  return await net.post({ signedTransactionInfo })
}
