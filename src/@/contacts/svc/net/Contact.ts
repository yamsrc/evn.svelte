export interface Contact {
  id: string
  identities: [string, string]
  balance: number
  balances?: Record<string, number>
  _created: number
  _version: number
}
