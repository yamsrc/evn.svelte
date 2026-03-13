export interface Entry {
  id: string
  value: number
  name?: string
  href?: string
}

export interface Props {
  entries: Entry[]
  sign?: 'positive' | 'negative'
  neutral?: boolean
  top?: number
}
