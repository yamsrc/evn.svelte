export interface Receipt {
  id: string
  title: string
  identities: string[]
  status: 'pending' | 'failed' | 'success' | 'sealed'
  attachments: string[]
  links?: Link[]
  merchant?: Merchant
  total: number
  items: Item[]
  extras: Extra[]
  done: Record<string, boolean>
  good?: Record<string, boolean>
  locked: boolean
  locker: string | null
  autolock?: string
  _version: number
  _created: number
}

export interface Link {
  type: 'expense' | unknown
  id: string
}

export interface Merchant {
  name: string
  display: string
  location?: string
}

export interface Item {
  id: string
  name: string
  display: string
  quantity: number
  price: number
  /** identities per unit [[identity, ...], ...] */
  claims: string[][]
}

export interface Extra {
  id: string
  name: string
  amount: number
  included: boolean
}
