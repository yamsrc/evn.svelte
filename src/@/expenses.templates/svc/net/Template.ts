export interface Template {
  id: string
  identity: string
  title: string
  location?: string
  participants: Participants
  mode?: 'sums' | 'shares'
  links?: Link[]
  _version: number
  _deleted?: number | null
}

type Participants = Record<string, Participant>

interface Participant {
  amount: number
  paid?: number
  comment?: string
}

interface Link {
  type: 'receipt' | 'group'
  id: string
}
