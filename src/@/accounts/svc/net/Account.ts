export interface Account {
  id: string
  name: string
  picture: string
  locale?: string
  grammar?: Grammar | null
  overlord?: string | null
  _created: number
  _version: number
}

export type Grammar = 'he' | 'she' | 'they'
