import { origin } from '@/net'
import type { GenericError } from '@toa.io/origin'
import type { Transaction } from './Transaction'

const transactions = origin.resource<Transaction>('/googleplay/transactions/', { credentials: 'include' })

export async function post(identity: string, purchaseToken: string): Promise<Transaction | GenericError> {
  return transactions.json(`${identity}/`, { method: 'POST', body: { purchaseToken } })
}
