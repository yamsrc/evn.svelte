import { origin } from '@/net'
import type { Transaction } from './Transaction'

const transactions = origin.resource<Transaction>('/appstore/transactions/')

interface Post {
  signedTransactionInfo: string
}

export async function post(body: Post): Promise<Transaction | Error> {
  return transactions.json({ method: 'POST', body })
}
