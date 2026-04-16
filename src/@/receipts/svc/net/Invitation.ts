import type { Merchant } from './Receipt'

export interface Invitation {
  id: string
  title: string
  total: number
  date: string
  merchant: Merchant
  identities: string[]
  attachments: string[]
}
