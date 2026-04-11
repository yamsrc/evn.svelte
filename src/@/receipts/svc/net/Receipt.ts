export interface Receipt {
  id: string
  title: string
  identities: string[]
  status: 'pending' | 'failed' | 'success'
  attachments: string[]
  links?: Link[]
  merchant?: Merchant
  date?: string
  subtotal?: number
  total: number
  currency?: string
  category?: string
  items: Item[]
  extras: Extra[]
  done: Record<string, boolean>
  good?: Record<string, boolean>
  locked: boolean
  locker: string | null
  autolock?: string
  _version: number
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
