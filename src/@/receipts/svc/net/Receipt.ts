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
  locked: boolean
  autolock?: string
  _version: number
}

export interface Link {
  type: 'groups' | 'adventures'
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
  name: string
  amount: number
}
