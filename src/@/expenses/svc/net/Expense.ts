export interface Expense {
  id: string
  title?: string
  location?: string
  date: string
  participants: Record<string, Participant>
  extras: Extra[]
  attachments: string[]
  _created: number
  _version: number
  links?: Link[]
}

export interface Participant {
  amount: number
  paid?: number
  comment?: string
}

export interface Extra {
  amount: number
  comment?: string
}

export interface Link {
  type: 'receipt' | unknown
  id: string
}
