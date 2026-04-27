export interface Expense {
  id: string
  title: string
  location?: string
  date: string
  amount: number
  payer: string
  attachments: string[]
}

export interface Adventure {
  id: string
  originator?: string
  participants: Record<string, number>
  title: string
  picture: string
  expenses: Expense[]
  archived: boolean
  archivedAt: number | null
  archivator?: string
  _created: number
  _version: number
}

export interface Invitation {
  id: string
  title: string
  picture: string
  identities: string[]
}
