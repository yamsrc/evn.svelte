export interface Template {
  id: string
  identity: string
  title: string
  location?: string
  participants: Participants
}

type Participants = Record<string, Participant>

interface Participant {
  amount: number
  paid?: number
  comment?: string
}
