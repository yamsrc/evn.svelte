export interface Group {
  id: string
  name: string
  picture?: string
  identities: string[]
  reduction?: boolean
  balances?: Record<string, number>
  _created: number
  _version: number
}
