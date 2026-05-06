import { origin } from '@/net'
import type { Transaction } from './Transaction'

const transactions = origin.resource<Transaction>('/appstore/transactions/', { credentials: 'include' })

interface Post {
  signedTransactionInfo: string
}

export async function post(identity: string, body: Post): Promise<Transaction | Error> {
  return transactions.json(identity, { method: 'POST', body })
}
