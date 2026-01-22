export interface Participant {
  amount: number
  paid?: number
  comment?: string
}

export interface Extra {
  amount: number
  comment?: string
}

export interface Expense {
  id: string
  title: string
  location?: string
  date: string
  participants: Record<string, Participant>
  extras: Extra[]
  attachments: string[]
  _created: number
  _version: number
}
